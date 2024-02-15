import express from 'express';
import { loginUser, registerUser } from '../controllers/users.js';
import { checkData } from '../middlewares/users.js';

const usersRouter = express.Router();

usersRouter.post('/login', loginUser);
usersRouter.post('/', checkData, registerUser);

export default usersRouter;