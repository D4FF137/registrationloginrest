import { Router } from "express";
import UserController from "../controllers/userController.mjs";
import { AuthMidleware } from "../middleware/Auth.mjs";

const userRouter = Router();
userRouter.post('/create', UserController.create);
userRouter.post('/login',UserController.login);
userRouter.post('/adddishes',AuthMidleware.isAuth, UserController.dishes);
userRouter.post('/addreserve', UserController.Reserve)
userRouter.get('/getdishes', UserController.getDishes);
userRouter.get('/getuser', UserController.getUser);
userRouter.get('/getreserve', UserController.getReserve)

export default userRouter;