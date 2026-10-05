# Adoção de Pets — API Containerizada

API REST para uma plataforma de adoção de pets, containerizada com Docker e com esteira de Integração Contínua (CI) configurada via GitHub Actions.

Projeto desenvolvido para a disciplina de **Integração e Entrega Contínua (IEC)**, reaproveitando a API construída em **Laboratório de Desenvolvimento Web (LDW)**.

## Stack

- **Node.js 20** + **TypeScript**
- **Express**
- **Sequelize** (ORM)
- **PostgreSQL 16**
- **pnpm** (gerenciador de pacotes)
- **Docker** + **Docker Compose**
- **ESLint** + **Prettier**
- **Husky** (git hooks)
- **GitHub Actions** (CI)

## Estrutura do projeto

```
.
├── .github/
│   └── workflows/
│       └── ci.yml             # Pipeline de CI
├── .husky/
│   └── pre-commit             # Hook de pre-commit
├── src/
│   ├── config/
│   │   └── database.ts        # Configuração do Sequelize
│   ├── controllers/
│   │   └── PetController.ts   # Lógica de negócio do CRUD
│   ├── docs/
│   │   └── swagger.json       # Especificação OpenAPI
│   ├── models/
│   │   └── Pet.ts             # Model Sequelize
│   ├── routes/
│   │   ├── index.ts
│   │   └── petRoutes.ts
│   └── server.ts              # Entrada da aplicação
├── Dockerfile
├── docker-compose.yml
├── eslint.config.js
├── .prettierrc
├── .dockerignore
├── package.json
├── pnpm-lock.yaml
└── tsconfig.json
```

## Como executar

### Opção 1 — Docker Compose (recomendado)

Sobe a API e o PostgreSQL simultaneamente, com volume persistente para os dados do banco.

```bash
docker compose up -d --build
```

A API estará disponível em:
- **API**: http://localhost:3000/api/pets
- **Swagger UI**: http://localhost:3000/api-docs

Para visualizar os containers em execução:

```bash
docker compose ps
```

Para visualizar logs:

```bash
docker compose logs -f api
```

Para parar (mantém os dados do banco no volume):

```bash
docker compose down
```

Para parar e remover também os dados do banco:

```bash
docker compose down -v
```

### Opção 2 — Execução local (sem Docker)

Requer PostgreSQL instalado e rodando localmente.

1. Instale as dependências:

```bash
pnpm install
```

2. Copie o arquivo de variáveis de ambiente e ajuste as credenciais:

```bash
cp .env.example .env
```

3. Crie o banco no PostgreSQL:

```sql
CREATE DATABASE adocao_pets;
```

4. Rode em modo desenvolvimento:

```bash
pnpm dev
```

## Scripts disponíveis

| Script | Descrição |
|--------|-----------|
| `pnpm dev` | Executa em modo desenvolvimento com hot reload |
| `pnpm build` | Compila TypeScript para `dist/` |
| `pnpm start` | Executa o build compilado |
| `pnpm lint` | Executa ESLint em todo o projeto |
| `pnpm format` | Formata o código com Prettier |
| `pnpm format:check` | Verifica formatação sem alterar arquivos |
| `pnpm typecheck` | Valida tipos com `tsc --noEmit` |

## Endpoints

| Método | Rota | Descrição | Sucesso |
|--------|------|-----------|---------|
| GET | `/api/pets` | Lista todos os pets | 200 |
| GET | `/api/pets/:id` | Busca um pet por ID | 200 |
| POST | `/api/pets` | Cadastra um novo pet | 201 |
| PUT | `/api/pets/:id` | Atualiza um pet existente | 200 |
| DELETE | `/api/pets/:id` | Remove um pet | 204 |

Exemplo de payload para POST/PUT:

```json
{
  "nome": "Rex",
  "especie": "Cachorro",
  "idade": 3,
  "adotado": false
}
```

## Qualidade de código

- **ESLint**: análise estática. Configurado com `typescript-eslint` e `eslint-config-prettier`.
- **Prettier**: formatação automática.
- **Husky**: hook de `pre-commit` que executa `pnpm lint` e `pnpm typecheck` antes de cada commit. Commits com erro de lint ou tipo são **bloqueados localmente**.

## Integração Contínua

O workflow em `.github/workflows/ci.yml` dispara automaticamente em push e pull request para a branch `main`. Executa:

1. Checkout do repositório
2. Setup do pnpm e Node.js 20
3. Instalação das dependências
4. Lint (`pnpm lint`)
5. Typecheck (`pnpm typecheck`)
6. Build (`pnpm build`)

## Variáveis de ambiente

Configuradas em `.env` (desenvolvimento local) ou diretamente no `docker-compose.yml` (containers):

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `PORT` | Porta da API | `3000` |
| `DB_HOST` | Host do PostgreSQL | `localhost` / `db` (container) |
| `DB_PORT` | Porta do PostgreSQL | `5432` |
| `DB_NAME` | Nome do banco | `adocao_pets` |
| `DB_USER` | Usuário do banco | `postgres` |
| `DB_PASSWORD` | Senha do banco | `postgres` (container) |
| `DB_SSL` | Habilita SSL na conexão | `false` |

## Autor

**Kaio Sumikawa**

Projeto desenvolvido individualmente para a disciplina **IEC — Integração e Entrega Contínua**.