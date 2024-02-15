import express from 'express';
import { loginUser, registerUser, getUser } from '../controllers/users.js';
import { checkData, authenticate } from '../middlewares/users.js';

const usersRouter = express.Router();

usersRouter.post('/login', checkData, loginUser);
usersRouter.post('/', checkData, registerUser);
usersRouter.get("/user", authenticate, getUser)

export default usersRouter;