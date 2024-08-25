import authRoutes from './auth.routes';
import expensessRoutes from './expenses.routes';
import express from 'express';

export default function applyRoutes(app: express.Application) {
  expensessRoutes(app);
  authRoutes(app);
}