package com.danrley.gestao_tarefas.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.danrley.gestao_tarefas.dto.task.TaskRequestDto;
import com.danrley.gestao_tarefas.dto.task.TaskResponseDto;
import com.danrley.gestao_tarefas.dto.task.TaskUpdateDto;
import com.danrley.gestao_tarefas.dto.user.UserResponseDto;
import com.danrley.gestao_tarefas.exception.custom.TaskNotFoundException;
import com.danrley.gestao_tarefas.exception.custom.UserNotFoundException;
import com.danrley.gestao_tarefas.model.task.Task;
import com.danrley.gestao_tarefas.model.user.User;
import com.danrley.gestao_tarefas.repository.TaskRepository;
import com.danrley.gestao_tarefas.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TaskService {
  private final TaskRepository taskRepository;
  private final UserRepository userRepository;

  @Transactional
  public TaskResponseDto createTask(TaskRequestDto taskRequestDto) {
    User assignee = userRepository.findById(taskRequestDto.assigneeId())
        .orElseThrow(() -> new UserNotFoundException("User not found"));

    Task task = Task.builder()
        .title(taskRequestDto.title())
        .description(taskRequestDto.description())
        .assignee(assignee)
        .priority(taskRequestDto.priority())
        .deadline(taskRequestDto.deadline())
        .status(taskRequestDto.status())
        .build();

    Task savedTask = taskRepository.save(task);
    return toResponse(savedTask);
  }

  public TaskResponseDto getTaskById(Long id) {
    Task task = taskRepository.findById(id)
        .orElseThrow(() -> new TaskNotFoundException("Task not found with id: " + id));
    return toResponse(task);
  }

  public List<TaskResponseDto> getAllTasks() {
    return taskRepository.findAll().stream()
        .map(this::toResponse)
        .toList();
  }

  @Transactional
  public void deleteTask(Long id) {
    Task task = taskRepository.findById(id)
        .orElseThrow(() -> new TaskNotFoundException("Task not found with id: " + id));
    taskRepository.delete(task);
  }

  @Transactional
  public TaskResponseDto updateTask(Long id, TaskUpdateDto updateDto) {
    Task task = taskRepository.findById(id)
        .orElseThrow(() -> new TaskNotFoundException("Task not found with id: " + id));

    if (updateDto.assigneeId() != null) {
      User newAssignee = userRepository.findById(updateDto.assigneeId())
          .orElseThrow(() -> new UserNotFoundException("User not found with id: " + updateDto.assigneeId()));
      task.setAssignee(newAssignee); 
    }

    if (updateDto.title() != null) {
      task.setTitle(updateDto.title());
    }
    if (updateDto.description() != null) {
      task.setDescription(updateDto.description());
    }
    if (updateDto.priority() != null) {
      task.setPriority(updateDto.priority());
    }
    if (updateDto.deadline() != null) {
      task.setDeadline(updateDto.deadline());
    }
    if (updateDto.status() != null) {
      task.setStatus(updateDto.status());
    }

    Task updatedTask = taskRepository.save(task);
    return toResponse(updatedTask);
  }

  private TaskResponseDto toResponse(Task task) {
    return new TaskResponseDto(
        task.getId(),
        task.getTitle(),
        task.getDescription(),
        new UserResponseDto(
            task.getAssignee().getId(),
            task.getAssignee().getName(),
            task.getAssignee().getEmail()),
        task.getPriority(),
        task.getDeadline(),
        task.getStatus(),
        task.getCreatedAt());
  }
}
