# Sistema de Gestão de Tarefas

Aplicação full stack para gerenciamento de tarefas, desenvolvida como parte do processo seletivo da ESIG Group.  
**Frontend**: Angular 19 | **Backend**: Spring Boot 3 (Java 21) | **Banco de Dados**: PostgreSQL (Docker)

---

## 📋 Funcionalidades Implementadas
- **CRUD de Tarefas**:
  - Criar, editar, excluir e listar tarefas.
  - Filtros por título, responsável e status (Em andamento/Concluída).
  <!-- - Marcar tarefas como concluídas. -->
- **Autenticação JWT**: Login seguro com token de acesso.
- **Extras** (diferenciais):
  - Configuração automatizada do PostgreSQL via Docker Compose.
  - Documentação da API com Swagger.
  - Testes unitários nas camadas de serviço.

---

## 🛠️ Tecnologias Utilizadas
- **Frontend**:
  - Angular 19
  - TypeScript, HTML/CSS
- **Backend**:
  - Java 21
  - Spring Boot 3, Spring Security, JPA/Hibernate
  - JUnit 5, Mockito (testes unitários)
- **Banco de Dados**:
  - PostgreSQL 17 (Docker)
- **Autenticação**:
  - JWT (Secret: `gise-terces`)
- **Ferramentas**:
  - Docker Compose, Maven, Swagger UI

---

## ⚙️ Pré-requisitos
- Java JDK 21
- Node.js ^20.11.1 e npm 9+
- Docker e Docker Compose

---

## 🚀 Instruções para Execução

### 1. Banco de Dados (PostgreSQL via Docker)
```bash
# Na pasta backend:
cd backend
docker-compose up -d
```

**Configuração do Banco**:
- Nome: `gestao-tarefas`
- Usuário/Senha: `postgres/postgres`
- Porta: `5432`

---

### 2. Backend (Spring Boot)
```bash
# Na pasta backend:
mvn spring-boot:run
```

**Endpoints**:
- API: `http://localhost:3000/api`
- Swagger: `http://localhost:3000/swagger-ui.html`

**Testes Unitários**:
```bash
# Executar todos os testes:
mvn test
# Executar testes específicos (ex: TaskServiceTest):
mvn test -Dtest=TaskServiceTest
```

---

### 3. Frontend (Angular 19)
```bash
# Na pasta frontend:
npm install
ng serve
```

**Acesso**:
- URL: `http://localhost:4200`
- Configuração do ambiente: `environment.ts` aponta para `http://localhost:3000/api`

---

## 🔑 Autenticação
- **Login** (`POST /api/auth/login`):
  ```json
  {
    "email": "usuario@exemplo.com",
    "password": "senha"
  }
  ```
- Tokens JWT são enviados no header `Authorization` para endpoints protegidos.

---

## 📌 Itens Implementados (Checklist)
| Item | Descrição                       | Status |
| ---- | ------------------------------- | ------ |
| a    | Frontend Angular (v19)          | ✅      |
| b    | Backend Java/Spring Boot 3      | ✅      |
| c    | Persistência com PostgreSQL/JPA | ✅      |
| d    | Endpoints REST                  | ✅      |
| e    | Autenticação JWT                | ✅      |
| f    | Testes de Unidade               | ✅      |
| g    | Documentação Swagger            | ✅      |
| h    | Deploy em Cloud                 | ❌      |
| i    | Docker Compose para PostgreSQL  | ✅      |

---

## 🔧 Configurações Técnicas
- **Backend**:
  - Porta: `3000`
  - DDL automático: `create-drop` (ambiente `dev`)
  - Logs: SQL e Hibernate em modo `debug`
- **Testes**:
  - Cobertura das classes de serviço
  - Mock de dependências com Mockito
- **Frontend**:
  - Variáveis de ambiente em `src/environments/environment.ts`

--- 

## 📂 Estrutura do Backend (Principais Componentes)
```
backend/
├── src/main/java/com/danrley/gestao_tarefas/
│   ├── config/               # Configurações (CORS, Security, Swagger)
│   ├── controller/           # Endpoints REST (Auth, Task, User)
│   ├── dto/                  # Objetos de transferência de dados
│   ├── exception/            # Exceções customizadas e handlers
│   ├── model/                # Entidades (Task, User, Role)
│   ├── repository/           # Repositórios Spring Data JPA
│   ├── security/             # Lógica de autenticação JWT
│   └── service/              # Serviços de negócio
└── src/test/java/            # Testes unitários (TaskService, UserService, JwtTokenService)
```

---

## 📂 Estrutura do Projeto (Frontend)
```
frontend/
└── src/
    ├── app/
    │   ├── components/           # Componentes reutilizáveis
    │   │   ├── button/           # Botões estilizados
    │   │   ├── table/            # Tabela de exibição de tarefas
    │   │   └── task-form/        # Formulário de criação/edição
    │   ├── pages/                # Páginas da aplicação
    │   │   ├── signin-page/      # Login de usuários
    │   │   ├── register-page     # Registro de novos usuários
    │   │   └── manager-task-page # Gestão de tarefas
    │   ├── services/             # Comunicação com a API (TaskService, AuthService)
    │   └── shared/               # Utilitários e pipes de tradução
    ├── assets/                   # Imagens e recursos estáticos
    └── domain/                   # Tipos e DTOs (Task.types.ts, CreateTaskDTO.ts)
```

