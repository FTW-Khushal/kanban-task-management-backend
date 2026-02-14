# ⚙️ Kanban AI Backend (Enterprise-Grade Engine)

[![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?style=for-the-badge&logo=nestjs)](https://nestjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)

**The powerhouse behind [kanbanapp.net](http://kanbanapp.net/)**

This is the high-performance, scalable backbone of the Kanban AI ecosystem. Engineered with **NestJS 11** and **TypeScript**, this backend provides a robust API for task management, complex board workflows, and a cutting-edge **LLM-driven function calling system**.

---

## ⚡ Core Technical Strengths

### 🤖 Intelligent LLM Integration
The crown jewel of this backend is the `LlmModule`. It's not just an endpoint; it's a sophisticated bridge that handles:
- **Structured Tool Calling**: Translating natural language into executable JSON schemas.
- **Context-Aware Generation**: Managing system prompts and user requests for precise Kanban operations.
- **Robust Error Recovery**: Handling LLM hallucination and varied response formats with graceful fallbacks.

### 🏛️ Architecture & Data Integrity
Built with a focus on maintainability and data consistency:
- **NestJS Modular Design**: Deeply decoupled modules for `Boards`, `Tasks`, `Columns`, and `AI` logic.
- **Prisma ORM**: Type-safe database queries with high-performance relation handling and automated migrations.
- **Validation Pipe**: Strict DTO (Data Transfer Object) validation using `class-validator`, ensuring only pristine data enters the system.

### 🐳 DevOps & Deployment Ready
Designed for modern infrastructure:
- **Dockerized Environment**: Full `docker-compose` support for spinning up the API and PostgreSQL in seconds.
- **Automated Seeding**: Industrial-strength database reset and seeding service for consistent development environments.
- **CI/CD Integrated**: Optimized for automated build and test pipelines.

---

## 🚀 Tech Stack

- **Framework**: [NestJS 11](https://nestjs.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: PostgreSQL
- **Documentation**: [Swagger / OpenAPI](https://swagger.io/)
- **Testing**: [Jest](https://jestjs.io/) & Supertest
- **Runtime**: Node.js 22

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 22+
- Docker & Docker Compose
- (Optional) A Llama server or OpenAI key for AI features

### Local Setup

1. **Clone the Engine**:
   ```bash
   git clone https://github.com/FTW-Khushal/kanban-task-management-backend.git
   cd kanban-task-management-backend
   ```

2. **Fuel Dependencies**:
   ```bash
   npm install
   ```

3. **Configure the Core**:
   ```bash
   cp .env.example .env
   # Update DATABASE_URL and AI endpoints
   ```

4. **Launch with Docker**:
   ```bash
   docker-compose up -d
   ```

5. **Initialize Database**:
   ```bash
   npx prisma db push
   ```

---

## 📖 API Documentation

Once running, you can explore the full API surface via the interactive Swagger UI:
`http://localhost:3001/api/docs`

---

Built with precision and technical excellence by [Khushal](https://github.com/FTW-Khushal). Powering the future of task management at **[kanbanapp.net](http://kanbanapp.net/)**.
