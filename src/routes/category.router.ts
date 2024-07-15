import { Router } from "express";
import { ValidateBody } from "../middleware/validateBody.middleware";
import { categoryCreateSchema } from "../schemas/category.schemas";
import { CategoryControllers } from "../controllers/category.controller";
import { IsCategoryIdValid } from "../middleware/isCategoryValid.middleware";
import { container } from "tsyringe";
import { CategoryServices } from "../services/category.services";
import { VerifyToken } from "../middleware/verifyToken.middleware";
import { IsTaskBelongsToUser } from "../middleware/IsTaskBelongsToUser.middleware";
import { IsCategoryBelongsToUser } from "../middleware/IsCategoryBelongsToUser.middleware";

export const categoryRouter = Router();

container.registerSingleton("CategoryServices", CategoryServices);
const categoryControllers = container.resolve(CategoryControllers);

categoryRouter.post("/", VerifyToken.execute, ValidateBody.execute(categoryCreateSchema) ,(req, res) => categoryControllers.create(req, res));

categoryRouter.delete("/:id", VerifyToken.execute, IsCategoryIdValid.execute, IsCategoryBelongsToUser.execute ,(req, res) => categoryControllers.delete(req, res));