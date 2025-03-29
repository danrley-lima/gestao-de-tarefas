package com.danrley.gestao_tarefas.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.danrley.gestao_tarefas.model.role.Role;
import com.danrley.gestao_tarefas.model.user.UserRole;

public interface RoleRepository extends JpaRepository<Role, Long> {
  boolean existsByName(UserRole name);

  Optional<Role> findByName(UserRole name);
}
