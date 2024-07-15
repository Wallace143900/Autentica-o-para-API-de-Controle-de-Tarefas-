

// user.router.ts
import { Router } from 'express';
import { UserControllers } from '../controllers/user.controller';
import { container } from 'tsyringe';
import { UserServices } from '../services/user.services';
import { IsEmailAlreadyRegistered } from '../middleware/isEmailAlreadyRegistered.middleware';
import { VerifyToken } from '../middleware/verifyToken.middleware';
import { ValidateBody } from '../middleware/validateBody.middleware';
import { userRegisterBodySchema } from '../schemas/user.schemas';

const userRouter = Router();
container.registerSingleton('UserServices', UserServices);
const userControllers = container.resolve(UserControllers);

userRouter.post('/', ValidateBody.execute(userRegisterBodySchema), IsEmailAlreadyRegistered.execute, (req, res) => userControllers.register(req, res));
userRouter.post('/login', (req, res) => userControllers.login(req, res));
userRouter.get('/profile', VerifyToken.execute, (req, res) => userControllers.getUser(req, res));


export { userRouter };

