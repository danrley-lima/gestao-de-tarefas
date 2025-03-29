package com.danrley.gestao_tarefas.dto;

import jakarta.validation.constraints.NotBlank;

public record LoginRequestDto(
    @NotBlank String login,
    @NotBlank String password) {

}
