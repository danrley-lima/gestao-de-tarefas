package com.danrley.gestao_tarefas.dto;

import java.time.LocalDateTime;
import java.util.List;

public record ErrorResponseDto(
    int status,
    String message,
    List<String> errors,
    LocalDateTime timestamp) {
  public ErrorResponseDto(int status, String message, String error) {
    this(status, message, List.of(error), LocalDateTime.now());
  }

  // Para casos simples onde não há lista de erros
  public ErrorResponseDto(int status, String message) {
    this(status, message, null, LocalDateTime.now());
  }

  public ErrorResponseDto(int status, String message, List<String> errors) {
    this(status, message, errors, LocalDateTime.now());
  }
}
