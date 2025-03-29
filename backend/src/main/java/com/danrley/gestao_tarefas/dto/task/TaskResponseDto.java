package com.danrley.gestao_tarefas.dto.task;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.danrley.gestao_tarefas.dto.user.UserResponseDto;
import com.danrley.gestao_tarefas.model.task.TaskPriority;
import com.danrley.gestao_tarefas.model.task.TaskStatus;

public record TaskResponseDto(
    Long id,
    String title,
    String description,
    UserResponseDto assignee,
    TaskPriority priority,
    LocalDate deadline,
    TaskStatus status,
    LocalDateTime createdAt) {
}
