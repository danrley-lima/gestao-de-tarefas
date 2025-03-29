package com.danrley.gestao_tarefas.service;

import org.springframework.stereotype.Service;

import com.danrley.gestao_tarefas.domain.user.UserRole;
import com.danrley.gestao_tarefas.model.Role;
import com.danrley.gestao_tarefas.repository.RoleRepository;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoleService {

  private final RoleRepository roleRepository;

  @PostConstruct
  public void initRoles() {
    for (UserRole userRole : UserRole.values()) {
      if (!roleRepository.existsByName(userRole)) {
        roleRepository.save(Role.from(userRole));
      }
    }
  }

  public Role getRoleByName(UserRole userRole) {
    return roleRepository.findByName(userRole)
        .orElseThrow(() -> new RuntimeException("Role não encontrada: " + userRole));
  }
}