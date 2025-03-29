package com.danrley.gestao_tarefas.service;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.danrley.gestao_tarefas.domain.user.UserDetailsImpl;

@Service
public class JwtTokenService {
  @Value("${api.security.token.secret}")
  private String SECRET_KEY;

  public String generateToken(UserDetailsImpl user) {
    try {
      Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY);
      return JWT.create()
          .withIssuer("auth-api")
          .withIssuedAt(this.creationDate())
          .withExpiresAt(this.expirationDate())
          .withSubject(user.getEmail())
          .sign(algorithm);
    } catch (JWTCreationException exception) {
      throw new JWTCreationException("Erro ao gerar token.", exception);
    }
  }

  public String getSubjectFromToken(String token) {
    try {
      Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY);
      return JWT.require(algorithm)
          .withIssuer("auth-api")
          .build()
          .verify(token)
          .getSubject();
    } catch (JWTVerificationException exception) {
      throw new JWTVerificationException("Token inválido ou expirado.");
    }
  }

  private Instant creationDate() {
    return ZonedDateTime.now(ZoneId.of("America/Recife")).toInstant();
  }

  private Instant expirationDate() {
    return ZonedDateTime.now(ZoneId.of("America/Recife")).plusHours(4).toInstant();
  }
}
