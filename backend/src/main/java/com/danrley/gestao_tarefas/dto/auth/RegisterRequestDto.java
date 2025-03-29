package com.danrley.gestao_tarefas.dto.auth;

import jakarta.validation.constraints.NotBlank;

public record RegisterRequestDto(
    @NotBlank String email,
    @NotBlank String name,
    @NotBlank String password,
    boolean isAdmin) {
}
