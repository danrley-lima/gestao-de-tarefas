package com.danrley.gestao_tarefas.exception.custom;

public class UserNotFoundException extends RuntimeException {
  public UserNotFoundException(String message) {
    super(message);
  }
}
