package com.danrley.gestao_tarefas.dto.task;

import java.time.LocalDate;

import com.danrley.gestao_tarefas.model.task.TaskPriority;
import com.danrley.gestao_tarefas.model.task.TaskStatus;

import jakarta.validation.constraints.FutureOrPresent;

public record TaskUpdateDto(
    Long assigneeId,
    String title,
    String description,
    TaskPriority priority,
    @FutureOrPresent LocalDate deadline,
    TaskStatus status) {
}
