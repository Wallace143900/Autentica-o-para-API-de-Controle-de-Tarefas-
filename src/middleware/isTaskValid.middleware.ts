import { Request, Response, NextFunction } from 'express';
import { prisma } from '../database/prisma';
import { AppError } from '../errors/appError';

export class IsTaskIdValid {
  static async execute(req: Request, res: Response, next: NextFunction) {
    const taskId = Number(req.params.id);

    if (isNaN(taskId) || taskId <= 0) {
      throw new AppError('Invalid task ID', 400);
    }

    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      throw new AppError('Task not found', 404);
    }

    // Anexa a tarefa encontrada ao objeto de resposta local para uso posterior
    res.locals.task = task;

    next();
  }
}