package com.danrley.gestao_tarefas.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.danrley.gestao_tarefas.dto.task.TaskRequestDto;
import com.danrley.gestao_tarefas.dto.task.TaskResponseDto;
import com.danrley.gestao_tarefas.dto.task.TaskUpdateDto;
import com.danrley.gestao_tarefas.service.TaskService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

  private final TaskService taskService;

  @PostMapping()
  public ResponseEntity<TaskResponseDto> createTask(@RequestBody @Valid TaskRequestDto taskRequestDto) {
    TaskResponseDto task = taskService.createTask(taskRequestDto);
    return ResponseEntity.status(201).body(task);
  }

  @GetMapping("/{id}")
  public ResponseEntity<TaskResponseDto> getTaskById(@PathVariable Long id) {
    TaskResponseDto task = taskService.getTaskById(id);
    return ResponseEntity.ok(task);
  }

  @GetMapping
  public ResponseEntity<List<TaskResponseDto>> getAllTasks() {
    List<TaskResponseDto> tasks = taskService.getAllTasks();
    return ResponseEntity.ok(tasks);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
    taskService.deleteTask(id);
    return ResponseEntity.noContent().build();
  }

  @PutMapping("/{id}")
  public ResponseEntity<TaskResponseDto> updateTask(@PathVariable Long id,
      @RequestBody @Valid TaskUpdateDto updateDto) {
    TaskResponseDto updatedTask = taskService.updateTask(id, updateDto);
    return ResponseEntity.ok(updatedTask);
  }
}
