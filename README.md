# API de Adoção de Pets

API RESTful desenvolvida para a disciplina **LDW — Laboratório de Desenvolvimento Web**, com o tema **Plataforma de Adoção Pet**. Permite o gerenciamento completo (CRUD) de pets disponíveis para adoção, com persistência em PostgreSQL e documentação interativa via Swagger UI.

## Tecnologias

- **Node.js**
- **TypeScript**
- **Express**
- **Sequelize** (ORM)
- **PostgreSQL**
- **Swagger UI** (documentação interativa)
- **CORS**
- **dotenv**

## Pré-requisitos

Antes de rodar o projeto, é necessário ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [PostgreSQL](https://www.postgresql.org/) (versão 14 ou superior)

## Instalação e execução

### 1. Clonar o repositório

```bash
git clone https://github.com/KaioSumikawa/adocao-pets.git
cd adocao-pets
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Criar o banco de dados no PostgreSQL

Acesse o PostgreSQL e crie o banco:

```sql
CREATE DATABASE adocao_pets;
```

Alternativamente, via linha de comando:

```bash
psql -U postgres -h localhost -p 5432 -c "CREATE DATABASE adocao_pets;"
```

### 4. Configurar as variáveis de ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

No Windows (Prompt de Comando):

```bash
copy .env.example .env
```

Edite o arquivo `.env` com as credenciais do seu PostgreSQL:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=adocao_pets
DB_USER=postgres
DB_PASSWORD=sua_senha_aqui
DB_SSL=false
```

> **Observação:** a flag `DB_SSL` deve ser `true` ao utilizar bancos em nuvem (ex: Supabase) e `false` para instâncias locais.

### 5. Rodar a aplicação

Modo de desenvolvimento (com recarregamento automático):

```bash
npm run dev
```

Modo de produção:

```bash
npm run build
npm start
```

A API estará disponível em `http://localhost:3000/api`.

## Documentação (Swagger UI)

Após iniciar o servidor, acesse:

```
http://localhost:3000/api-docs
```

O Swagger UI permite visualizar e testar todos os endpoints diretamente pelo navegador.

## Endpoints

| Método | Rota              | Descrição                          | Sucesso |
|--------|-------------------|------------------------------------|---------|
| GET    | `/api/pets`       | Lista todos os pets                | 200     |
| GET    | `/api/pets/:id`   | Busca um pet por ID                | 200     |
| POST   | `/api/pets`       | Cadastra um novo pet               | 201     |
| PUT    | `/api/pets/:id`   | Atualiza os dados de um pet        | 200     |
| DELETE | `/api/pets/:id`   | Remove um pet                      | 204     |

### Exemplo de payload (POST / PUT)

```json
{
  "nome": "Rex",
  "especie": "Cachorro",
  "idade": 3,
  "adotado": false
}
```

## Estrutura do projeto

```
src/
├── config/
│   └── database.ts          # Configuração do Sequelize + PostgreSQL
├── controllers/
│   └── PetController.ts     # Lógica de negócio do CRUD de pets
├── docs/
│   └── swagger.json         # Especificação OpenAPI
├── models/
│   └── Pet.ts               # Model Sequelize tipado
├── routes/
│   ├── index.ts             # Agregador de rotas
│   └── petRoutes.ts         # Rotas do recurso Pet
└── server.ts                # Ponto de entrada da aplicação
```

## Modelo de dados: Pet

| Campo       | Tipo      | Obrigatório | Descrição                              |
|-------------|-----------|-------------|----------------------------------------|
| `id`        | INTEGER   | auto        | Identificador único (auto incremento)  |
| `nome`      | STRING    | sim         | Nome do pet                            |
| `especie`   | STRING    | sim         | Espécie (ex: Cachorro, Gato)           |
| `idade`     | INTEGER   | sim         | Idade em anos                          |
| `adotado`   | BOOLEAN   | não         | Status de adoção (padrão: `false`)     |
| `createdAt` | TIMESTAMP | auto        | Data de criação do registro            |
| `updatedAt` | TIMESTAMP | auto        | Data da última atualização             |

## Scripts disponíveis

| Script          | Descrição                                          |
|-----------------|----------------------------------------------------|
| `npm run dev`   | Inicia em modo desenvolvimento com hot reload      |
| `npm run build` | Compila o TypeScript para JavaScript em `dist/`    |
| `npm start`     | Executa a versão compilada                         |

## Autor

**Kaio Sumikawa**

Projeto desenvolvido individualmente para a disciplina **LDW — Laboratório de Desenvolvimento Web**.