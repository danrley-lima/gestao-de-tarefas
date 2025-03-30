package com.danrley.gestao_tarefas.config;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.danrley.gestao_tarefas.model.role.Role;
import com.danrley.gestao_tarefas.model.task.Task;
import com.danrley.gestao_tarefas.model.task.TaskPriorityEnum;
import com.danrley.gestao_tarefas.model.task.TaskStatusEnum;
import com.danrley.gestao_tarefas.model.user.User;
import com.danrley.gestao_tarefas.model.user.UserRoleEnum;
import com.danrley.gestao_tarefas.repository.TaskRepository;
import com.danrley.gestao_tarefas.repository.UserRepository;
import com.danrley.gestao_tarefas.service.RoleService;

import lombok.RequiredArgsConstructor;

@Component
@Profile({ "dev", "test" })
@RequiredArgsConstructor
public class DatabaseSeeder implements CommandLineRunner {

  @Value("${app.database-seeder-enabled:false}")
  private boolean isSeederEnabled;

  private final PasswordEncoder passwordEncoder;
  private final UserRepository userRepository;
  private final TaskRepository taskRepository;
  private final RoleService roleService;

  @Override
  public void run(String... args) throws Exception {
    if (!isSeederEnabled) {
      return;
    }

    Role roleUser = roleService.getRoleByName(UserRoleEnum.USER);
    Role roleAdmin = roleService.getRoleByName(UserRoleEnum.ADMIN);

    User user1 = User.builder()
        .name("Antônio do Cuscuz")
        .email("antonio@example.com")
        .password(passwordEncoder.encode("123"))
        .roles(Set.of(roleUser, roleAdmin))
        .build();

    User user2 = User.builder()
        .name("John Doe")
        .email("john.doe@example.com")
        .password(passwordEncoder.encode("123"))
        .roles(Set.of(roleUser, roleAdmin))
        .build();

    userRepository.saveAll(List.of(user1, user2));

    Task task1 = Task.builder()
        .title("Finalizar relatório")
        .description("Relatório anual de desempenho")
        .assignee(user1)
        .priority(TaskPriorityEnum.HIGH)
        .deadline(LocalDate.now().plusDays(7))
        .status(TaskStatusEnum.IN_PROGRESS)
        .build();

    Task task2 = Task.builder()
        .title("Revisar contrato")
        .description("Revisar contrato com fornecedor")
        .assignee(user2)
        .priority(TaskPriorityEnum.MEDIUM)
        .deadline(LocalDate.now().plusDays(3))
        .status(TaskStatusEnum.COMPLETED)
        .build();

    Task task3 = Task.builder()
        .title("Planejar reunião")
        .description("Planejar reunião com a equipe de vendas")
        .assignee(user1)
        .priority(TaskPriorityEnum.LOW)
        .deadline(LocalDate.now().plusDays(10))
        .status(TaskStatusEnum.COMPLETED)
        .build();

    Task task4 = Task.builder()
        .title("Atualizar sistema")
        .description("Atualizar o sistema para a nova versão")
        .assignee(user2)
        .priority(TaskPriorityEnum.HIGH)
        .deadline(LocalDate.now().plusDays(5))
        .status(TaskStatusEnum.IN_PROGRESS)
        .build();

    Task task5 = Task.builder()
        .title("Enviar e-mail para cliente")
        .description("Enviar e-mail com proposta comercial")
        .assignee(user1)
        .priority(TaskPriorityEnum.MEDIUM)
        .deadline(LocalDate.now().plusDays(2))
        .status(TaskStatusEnum.COMPLETED)
        .build();

    taskRepository.saveAll(List.of(task1, task2, task3, task4, task5));
  }
}
