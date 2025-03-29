package com.danrley.gestao_tarefas.dto.task;

import java.time.LocalDate;

import com.danrley.gestao_tarefas.model.task.TaskPriority;
import com.danrley.gestao_tarefas.model.task.TaskStatus;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record TaskRequestDto(
    @NotBlank String title,
    String description,
    @NotNull Long assigneeId,
    @NotNull TaskPriority priority,
    @NotNull @FutureOrPresent LocalDate deadline,
    @NotNull TaskStatus status) {
}