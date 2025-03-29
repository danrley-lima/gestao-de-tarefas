package com.danrley.gestao_tarefas.service;

import java.util.List;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.danrley.gestao_tarefas.dto.auth.LoginRequestDto;
import com.danrley.gestao_tarefas.dto.auth.RecoveryJwtTokenDto;
import com.danrley.gestao_tarefas.dto.auth.RegisterRequestDto;
import com.danrley.gestao_tarefas.dto.user.UserResponseDto;
import com.danrley.gestao_tarefas.model.role.Role;
import com.danrley.gestao_tarefas.model.user.User;
import com.danrley.gestao_tarefas.model.user.UserRole;
import com.danrley.gestao_tarefas.repository.UserRepository;
import com.danrley.gestao_tarefas.security.auth.UserDetailsImpl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final RoleService roleService;
  private final AuthenticationManager authenticationManager;
  private final JwtTokenService jwtTokenService;

  @Transactional
  public UserResponseDto createUser(RegisterRequestDto registerRequestDto) {

    if (userRepository.findByEmail(registerRequestDto.email()).isPresent()) {
      throw new IllegalArgumentException("Email is already in use.");
    }

    User newUser = User.builder()
        .email(registerRequestDto.email())
        .password(passwordEncoder.encode(registerRequestDto.password()))
        .name(registerRequestDto.name())
        .build();

    Role defaultRole = roleService.getRoleByName(UserRole.USER);
    newUser.addRole(defaultRole);

    if (registerRequestDto.isAdmin()) {
      Role adminRole = roleService.getRoleByName(UserRole.ADMIN);
      newUser.addRole(adminRole);
    }

    userRepository.save(newUser);

    return toResponse(newUser);
  }

  public List<UserResponseDto> getAllUsers() {
    return userRepository.findAll().stream()
        .map(this::toResponse)
        .toList();
  }

  public UserResponseDto getUserById(Long id) {
    User user = userRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + id));
    return toResponse(user);
  }

  public RecoveryJwtTokenDto authenticateUser(LoginRequestDto request) {
    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
        request.login(), request.password());

    Authentication authentication = this.authenticationManager.authenticate(usernamePasswordAuthenticationToken);
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

    return new RecoveryJwtTokenDto(jwtTokenService.generateToken(userDetails));
  }

  private UserResponseDto toResponse(User user) {
    return new UserResponseDto(
        user.getId(),
        user.getName(),
        user.getEmail());
  }
}
