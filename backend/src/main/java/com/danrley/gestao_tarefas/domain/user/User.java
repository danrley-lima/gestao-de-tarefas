package com.danrley.gestao_tarefas.domain.user;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.danrley.gestao_tarefas.model.Role;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "users")
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(nullable = false)
  private Long id;

  @Column(nullable = false)
  private String name;

  @Column(unique = true, length = 100, nullable = false)
  private String email;

  @Column(nullable = false)
  private String password;

  @CreationTimestamp
  @Column(updatable = false, name = "created_at")
  private Date createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at")
  private Date updatedAt;

  @ManyToMany(fetch = FetchType.EAGER)
  @Builder.Default
  @JoinTable(name = "users_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
  private Set<Role> roles = new HashSet<>();

  public void addRole(Role role) {
    this.roles.add(role);
  }
  // public Integer getId() {
  // return id;
  // }

  // public void setId(Integer id) {
  // this.id = id;
  // }

  // public String Name() {
  // return name;
  // }

  // public void Name(String name) {
  // this.name = name;
  // }

  // public String getEmail() {
  // return email;
  // }

  // public void setEmail(String email) {
  // this.email = email;
  // }

  // public String getPassword() {
  // return password;
  // }

  // public void setPassword(String password) {
  // this.password = password;
  // }

  // public Date getCreatedAt() {
  // return createdAt;
  // }

  // public void setCreatedAt(Date createdAt) {
  // this.createdAt = createdAt;
  // }

  // public Date getUpdatedAt() {
  // return updatedAt;
  // }

  // public void setUpdatedAt(Date updatedAt) {
  // this.updatedAt = updatedAt;
  // }

}