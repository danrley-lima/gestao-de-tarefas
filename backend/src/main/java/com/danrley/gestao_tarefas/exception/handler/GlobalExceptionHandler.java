package com.danrley.gestao_tarefas.exception.handler;

import java.util.Arrays;
import java.util.List;

import org.apache.commons.lang3.exception.ExceptionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.danrley.gestao_tarefas.dto.ErrorResponseDto;
import com.danrley.gestao_tarefas.exception.custom.InvalidTokenException;
import com.danrley.gestao_tarefas.exception.custom.TaskNotFoundException;
import com.danrley.gestao_tarefas.exception.custom.TokenGenerationException;

@ControllerAdvice
public class GlobalExceptionHandler {

  @Autowired
  private Environment environment;

  @ExceptionHandler(TaskNotFoundException.class)
  public ResponseEntity<ErrorResponseDto> handleTaskNotFoundException(TaskNotFoundException ex) {
    ErrorResponseDto error = new ErrorResponseDto(
        HttpStatus.NOT_FOUND.value(),
        "Recurso não encontrado",
        ex.getMessage());
    return new ResponseEntity<ErrorResponseDto>(error, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ErrorResponseDto> handleValidationErrors(MethodArgumentNotValidException ex) {
    List<String> errors = ex.getBindingResult().getFieldErrors()
        .stream()
        .map(error -> error.getField() + ": " + error.getDefaultMessage())
        .toList();

    return ResponseEntity.badRequest().body(
        new ErrorResponseDto(
            HttpStatus.BAD_REQUEST.value(),
            "Erro de validação nos dados enviados",
            errors));
  }

  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<ErrorResponseDto> handleBusinessErrors(IllegalArgumentException ex) {
    ErrorResponseDto error = new ErrorResponseDto(
        HttpStatus.BAD_REQUEST.value(),
        "Regra de negócio violada",
        ex.getMessage());
    return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
  }

  // Exceção genérica para capturar todas as outras exceções não tratadas
  @ExceptionHandler(Exception.class)
  public ResponseEntity<ErrorResponseDto> handleAllExceptions(Exception ex) {
    String details = null;
    if (Arrays.asList(environment.getActiveProfiles()).contains("dev")) {
      details = ex.getMessage() + "\n" + ExceptionUtils.getStackTrace(ex);
    }

    ErrorResponseDto error = new ErrorResponseDto(
        HttpStatus.INTERNAL_SERVER_ERROR.value(),
        "Erro interno no servidor",
        details);
    return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @ExceptionHandler(TokenGenerationException.class)
  public ResponseEntity<ErrorResponseDto> handleTokenGenerationException(TokenGenerationException ex) {
    return ResponseEntity
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(new ErrorResponseDto(
            500,
            "Erro interno no servidor",
            "Não foi possível gerar o token de autenticação"));
  }

  @ExceptionHandler(InvalidTokenException.class)
  public ResponseEntity<ErrorResponseDto> handleInvalidTokenException(InvalidTokenException ex) {
    return ResponseEntity
        .status(HttpStatus.UNAUTHORIZED)
        .body(new ErrorResponseDto(
            401,
            "Não autorizado",
            ex.getMessage()));
  }
}