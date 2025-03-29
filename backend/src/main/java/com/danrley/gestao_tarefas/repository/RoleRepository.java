package com.danrley.gestao_tarefas.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.danrley.gestao_tarefas.domain.user.UserRole;
import com.danrley.gestao_tarefas.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
  boolean existsByName(UserRole name);

  Optional<Role> findByName(UserRole name);
}
