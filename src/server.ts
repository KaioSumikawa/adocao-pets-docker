import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';

import { sequelize } from './config/database';
import { appRoutes } from './routes';
import swaggerDocument from './docs/swagger.json';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', appRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = Number(process.env.PORT) || 3000;

async function iniciarServidor(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log('Banco de dados conectado com sucesso.');

    await sequelize.sync();
    console.log('Tabelas sincronizadas com sucesso.');

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(`Swagger: http://localhost:${PORT}/api-docs`);
    });
  } catch (error: unknown) {
    const mensagem = error instanceof Error ? error.message : 'Erro desconhecido';

    console.error('Erro ao iniciar o servidor:', mensagem);
  }
}

iniciarServidor();
