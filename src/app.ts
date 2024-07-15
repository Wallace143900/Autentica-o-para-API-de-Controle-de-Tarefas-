import 'reflect-metadata';
import 'express-async-errors';
import express, { json } from 'express';
import helmet from 'helmet';
import cors from "cors";
import { HandleErrors } from './middleware/handleErrors.middleware';
import { tasksRouter } from './routes/task.router';
import { categoryRouter } from './routes/category.router';
import { userRouter } from './routes/user.router';

export const app = express();

app.use(json());
app.use(helmet());
app.use(cors())
app.use('/tasks', tasksRouter);
app.use('/categories', categoryRouter);
app.use('/users', userRouter);

app.use(HandleErrors.execute);
