package com.danrley.gestao_tarefas.service;

import java.util.List;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.danrley.gestao_tarefas.domain.user.User;
import com.danrley.gestao_tarefas.domain.user.UserDetailsImpl;
import com.danrley.gestao_tarefas.domain.user.UserRole;
import com.danrley.gestao_tarefas.dto.LoginRequestDto;
import com.danrley.gestao_tarefas.dto.RecoveryJwtTokenDto;
import com.danrley.gestao_tarefas.dto.RegisterRequestDto;
import com.danrley.gestao_tarefas.dto.UserResponseDto;
import com.danrley.gestao_tarefas.model.Role;
import com.danrley.gestao_tarefas.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
  private final UserRepository usuarioRepository;
  private final PasswordEncoder passwordEncoder;
  private final RoleService roleService;
  private final AuthenticationManager authenticationManager;
  private final JwtTokenService jwtTokenService;

  @Transactional
  public UserResponseDto register(RegisterRequestDto request) {

    if (usuarioRepository.findByEmail(request.email()).isPresent()) {
      throw new IllegalArgumentException("Email já está em uso.");
    }

    User newUser = User.builder()
        .email(request.email())
        .password(passwordEncoder.encode(request.password()))
        .name(request.name())
        .build();

    Role defaultRole = roleService.getRoleByName(UserRole.USER);
    newUser.addRole(defaultRole);

    if (request.isAdmin()) {
      Role adminRole = roleService.getRoleByName(UserRole.ADMIN);
      newUser.addRole(adminRole);
    }

    usuarioRepository.save(newUser);

    return new UserResponseDto(newUser.getId(), newUser.getName(), newUser.getEmail());
  }

  public List<UserResponseDto> getAllUsers() {
    return usuarioRepository.findAll().stream()
        .map(user -> new UserResponseDto(user.getId(), user.getName(), user.getEmail()))
        .toList();
  }

  public UserResponseDto getUserById(Long id) {
    User user = usuarioRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado com o ID: " + id));
    return new UserResponseDto(user.getId(), user.getName(), user.getEmail());
  }

  public RecoveryJwtTokenDto authenticateUser(LoginRequestDto request) {
    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
        request.login(), request.password());

    Authentication authentication = this.authenticationManager.authenticate(usernamePasswordAuthenticationToken);
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

    return new RecoveryJwtTokenDto(jwtTokenService.generateToken(userDetails));
  }
}
