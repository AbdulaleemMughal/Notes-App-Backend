import express from 'express';
import { getUser, login, logout, signUp, updateUser } from '../controllers/userAuthAPI.js';
import { userAuth } from '../middlewares/userAuth.middleware.js';

export const userRouter = express.Router();

userRouter.post('/signup', signUp);
userRouter.post('/login', login);
userRouter.post('/logout', logout);
userRouter.get('/getProfile', userAuth, getUser);
userRouter.patch('/update-user', userAuth, updateUser);