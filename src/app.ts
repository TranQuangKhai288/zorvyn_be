import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorMiddleware } from './middlewares/error.middleware';
import authRouter from './routes/auth.route';
import userRouter from './routes/user.route';
import transactionRouter from './routes/transaction.route';
import dashboardRouter from './routes/dashboard.route';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './config/swagger.config';

const app = express();

// Global Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/transactions', transactionRouter);
app.use('/api/dashboard', dashboardRouter);

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routing placeholder
app.get('/', (req: Request, res: Response) => {
  res.send('Finance Data Processing API is running');
});

// Fallback Route & Error Handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ status: 'error', message: `Can't find ${req.originalUrl} on this server!` });
});

app.use(errorMiddleware);

export default app;
