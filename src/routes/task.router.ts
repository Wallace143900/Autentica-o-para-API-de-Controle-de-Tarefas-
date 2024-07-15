import { Router } from "express";
import { ValidateBody } from "../middleware/validateBody.middleware";
import { taskCreateSchema, taskUpdateSchema } from "../schemas/task.schemas";
import { IsTaskIdValid } from "../middleware/isTaskValid.middleware";
import { container } from "tsyringe";
import { TaskServices } from "../services/task.services";
import { TaskControllers } from "../controllers/task.controller";
import { AddUserIdToRequest } from "../middleware/addUserIdToRequest.middleware";
import { VerifyToken } from "../middleware/verifyToken.middleware";
import { VerifyTaskOwnership } from "../middleware/VerifyTaskOwnership.middleware";

export const tasksRouter = Router();

container.registerSingleton("TaskServices", TaskServices);
const taskControllers = container.resolve(TaskControllers);
tasksRouter.use(VerifyToken.execute)
tasksRouter.post(
    "/",
    AddUserIdToRequest,
    ValidateBody.execute(taskCreateSchema),
    (req, res) => taskControllers.create(req, res)
);

tasksRouter.get(
    "/", 
    (req, res) => taskControllers.findMany(req, res)
);

tasksRouter.get(
    "/:id", IsTaskIdValid.execute,
    VerifyTaskOwnership.execute,
    (req, res) => taskControllers.findOne(req, res)
);

tasksRouter.patch(
    "/:id",
    ValidateBody.execute(taskUpdateSchema),
    IsTaskIdValid.execute,
    VerifyTaskOwnership.execute,
    (req, res, next) => taskControllers.update(req, res, next)
);

tasksRouter.delete(
    "/:id",
    IsTaskIdValid.execute,
    VerifyTaskOwnership.execute,
    (req, res, next) => taskControllers.delete(req, res, next)
);
