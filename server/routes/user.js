import { Router } from 'express';
import {
  deleteProfile,
  getUserProfile,
  getUsers,
  updateProfile,
} from '../controllers/user.js';
import { isLoggedIn } from '../middleware/auth.js';

const userRoute = Router();

// userRoute.get('/user', isLoggedIn, getUser);
// userRoute.get('/users', isLoggedIn, getUsers);
userRoute.delete('/profile/:id', isLoggedIn, deleteProfile);
userRoute.put('/profile/:id', isLoggedIn, updateProfile);
userRoute.get('/profile', isLoggedIn, getUserProfile);

export default userRoute;
