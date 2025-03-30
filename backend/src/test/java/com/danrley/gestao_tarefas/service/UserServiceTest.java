package com.danrley.gestao_tarefas.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.danrley.gestao_tarefas.dto.auth.RegisterRequestDto;
import com.danrley.gestao_tarefas.dto.user.UserResponseDto;
import com.danrley.gestao_tarefas.exception.custom.EmailAlreadyExistsException;
import com.danrley.gestao_tarefas.model.role.Role;
import com.danrley.gestao_tarefas.model.user.User;
import com.danrley.gestao_tarefas.model.user.UserRole;
import com.danrley.gestao_tarefas.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
  @Mock
  private UserRepository userRepository;

  @Mock
  private RoleService roleService;

  @Mock
  private PasswordEncoder passwordEncoder;

  @InjectMocks
  private UserService userService;

  @Test
  void createUser_ShouldReturnUserResponse() {
    // Arrange
    RegisterRequestDto request = new RegisterRequestDto(
        "user@test.com", "password", "User Test", false);

    when(userRepository.findByEmail("user@test.com")).thenReturn(Optional.empty());
    when(passwordEncoder.encode("password")).thenReturn("encodedPassword");
    when(roleService.getRoleByName(UserRole.USER)).thenReturn(Role.from(UserRole.USER));
    when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
      User user = invocation.getArgument(0);
      user.setId(1L);
      return user;
    });

    // Act
    UserResponseDto response = userService.createUser(request);

    // Assert
    assertNotNull(response);
    assertEquals(1L, response.id());
    assertEquals("User Test", response.name());
    verify(userRepository, times(1)).save(any(User.class));
  }

  @Test
  void createUser_ShouldThrowEmailConflict() {
    // Arrange
    RegisterRequestDto request = new RegisterRequestDto(
        "existing@test.com", "password", "User", false);

    when(userRepository.findByEmail("existing@test.com"))
        .thenReturn(Optional.of(new User()));

    // Act & Assert
    assertThrows(EmailAlreadyExistsException.class, () -> {
      userService.createUser(request);
    });
  }
}
