import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

const loggerMiddleware = (request: Request, response: Response, next: NextFunction) => {
  logger.info(`Incoming request: ${request.method} ${request.path}`);
  next();
}

export default loggerMiddleware;