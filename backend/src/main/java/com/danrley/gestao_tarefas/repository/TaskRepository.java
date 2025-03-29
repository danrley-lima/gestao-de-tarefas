package com.danrley.gestao_tarefas.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.danrley.gestao_tarefas.model.task.Task;
import com.danrley.gestao_tarefas.model.task.TaskPriority;
import com.danrley.gestao_tarefas.model.task.TaskStatus;

public interface TaskRepository extends JpaRepository<Task, Long> {
  List<Task> findByAssigneeId(Long assigneeId);

  List<Task> findByStatus(TaskStatus status);

  List<Task> findByPriority(TaskPriority priority);

  List<Task> findByDeadline(LocalDate deadline);

  List<Task> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

}
