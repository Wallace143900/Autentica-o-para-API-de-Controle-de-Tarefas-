"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
// user.router.ts
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const tsyringe_1 = require("tsyringe");
const user_services_1 = require("../services/user.services");
const isEmailAlreadyRegistered_middleware_1 = require("../middleware/isEmailAlreadyRegistered.middleware");
const verifyToken_middleware_1 = require("../middleware/verifyToken.middleware");
const validateBody_middleware_1 = require("../middleware/validateBody.middleware");
const user_schemas_1 = require("../schemas/user.schemas");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
tsyringe_1.container.registerSingleton('UserServices', user_services_1.UserServices);
const userControllers = tsyringe_1.container.resolve(user_controller_1.UserControllers);
userRouter.post('/', validateBody_middleware_1.ValidateBody.execute(user_schemas_1.userRegisterBodySchema), isEmailAlreadyRegistered_middleware_1.IsEmailAlreadyRegistered.execute, (req, res) => userControllers.register(req, res));
userRouter.post('/login', (req, res) => userControllers.login(req, res));
userRouter.get('/profile', verifyToken_middleware_1.VerifyToken.execute, (req, res) => userControllers.getUser(req, res));
