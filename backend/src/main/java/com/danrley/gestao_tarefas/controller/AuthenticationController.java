package com.danrley.gestao_tarefas.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.danrley.gestao_tarefas.dto.auth.LoginRequestDto;
import com.danrley.gestao_tarefas.dto.auth.RecoveryJwtTokenDto;
import com.danrley.gestao_tarefas.dto.auth.RegisterRequestDto;
import com.danrley.gestao_tarefas.dto.user.UserResponseDto;
import com.danrley.gestao_tarefas.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

  private final UserService userService;

  @PostMapping("login")
  public ResponseEntity<RecoveryJwtTokenDto> login(@RequestBody @Valid LoginRequestDto request) {
    RecoveryJwtTokenDto token = userService.authenticateUser(request);

    return ResponseEntity.ok(token);
  }

  @PostMapping("/register")
  public ResponseEntity<UserResponseDto> register(@RequestBody @Valid RegisterRequestDto request) {
    return ResponseEntity.status(201).body(userService.createUser(request));
  }

}
