import {Router} from "express";
import userController from "../controller/UserController";
import auth from "../middleware/jwt";

export const userRouter = Router();
userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/', userController.findAll)

