import cors from 'cors';
import logger from './utils/logger';
import helmet from 'helmet';
import express from 'express';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';

// Carregar variáveis de ambiente
config();

// Importar configurações
import { limiter } from './config/express.config';
import { corsOptions } from './config/cors.config';
import { helmetConfig } from './config/security.config';

// Importar middleware
import hpp from 'hpp';
import applyRoutes from './routes/index.routes';
import sanitizeInput from './middleware/sanitizeInput.middleware';
import mongoSanitize from 'express-mongo-sanitize';
import loggerMiddleware from './middleware/logger.middleware';
import forceHttpsMiddleware from './middleware/forceHttps.middleware';
import { errorHandler } from './middleware/errorHandler.middleware';

const configureApp = () => {
  const app = express();

  // Middleware de Segurança
  app.use(helmet());
  app.use(helmetConfig);

  // Limitação de Taxa
  app.use(limiter);

  // Middleware de Parsing de Corpor de Requisição
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // Configuração de CORS
  app.use(cors(corsOptions));

  // Middleware de Logging
  app.use(loggerMiddleware);

  // Middleware de Segurança
  app.use(mongoSanitize());
  app.use(hpp());
  app.use(cookieParser());
  app.use(sanitizeInput);
  app.use(forceHttpsMiddleware);

  // Aplicar Rotas
  applyRoutes(app);

  // Middleware de Tratamento de Erros
  app.use(errorHandler);

  return app;
}

// Criar a aplicação
const app = configureApp();

// Validar e Definir Porta
const port = process.env.PORT || 3000;
if (!port) {
  logger.error('PORT must be set in the environment variables');
  process.exit(1);
}

// Iniciar o servidor
app.listen(port, () => logger.info(`Server running on port ${port}`));

export default app;