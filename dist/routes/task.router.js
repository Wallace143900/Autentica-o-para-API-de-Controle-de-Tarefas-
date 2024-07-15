"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksRouter = void 0;
const express_1 = require("express");
const validateBody_middleware_1 = require("../middleware/validateBody.middleware");
const task_schemas_1 = require("../schemas/task.schemas");
const isTaskValid_middleware_1 = require("../middleware/isTaskValid.middleware");
const tsyringe_1 = require("tsyringe");
const task_services_1 = require("../services/task.services");
const task_controller_1 = require("../controllers/task.controller");
const addUserIdToRequest_middleware_1 = require("../middleware/addUserIdToRequest.middleware");
const verifyToken_middleware_1 = require("../middleware/verifyToken.middleware");
const VerifyTaskOwnership_middleware_1 = require("../middleware/VerifyTaskOwnership.middleware");
exports.tasksRouter = (0, express_1.Router)();
tsyringe_1.container.registerSingleton("TaskServices", task_services_1.TaskServices);
const taskControllers = tsyringe_1.container.resolve(task_controller_1.TaskControllers);
exports.tasksRouter.use(verifyToken_middleware_1.VerifyToken.execute);
exports.tasksRouter.post("/", addUserIdToRequest_middleware_1.AddUserIdToRequest, validateBody_middleware_1.ValidateBody.execute(task_schemas_1.taskCreateSchema), (req, res) => taskControllers.create(req, res));
exports.tasksRouter.get("/", (req, res) => taskControllers.findMany(req, res));
exports.tasksRouter.get("/:id", isTaskValid_middleware_1.IsTaskIdValid.execute, VerifyTaskOwnership_middleware_1.VerifyTaskOwnership.execute, (req, res) => taskControllers.findOne(req, res));
exports.tasksRouter.patch("/:id", validateBody_middleware_1.ValidateBody.execute(task_schemas_1.taskUpdateSchema), isTaskValid_middleware_1.IsTaskIdValid.execute, VerifyTaskOwnership_middleware_1.VerifyTaskOwnership.execute, (req, res, next) => taskControllers.update(req, res, next));
exports.tasksRouter.delete("/:id", isTaskValid_middleware_1.IsTaskIdValid.execute, VerifyTaskOwnership_middleware_1.VerifyTaskOwnership.execute, (req, res, next) => taskControllers.delete(req, res, next));
