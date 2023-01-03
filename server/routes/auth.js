import { Router } from 'express';
import {
  forgetPassword,
  handleLogin,
  handleLogout,
  handleRegister,
  resetPassword,
  verifyUser,
} from '../controllers/auth.js';
import { isLoggedIn } from '../middleware/auth.js';
import {
  loginValidator,
  registartionValidator,
} from '../middleware/validation.js';

const authRoute = Router();

// api plan
// /api/register
authRoute.post('/register', registartionValidator, handleRegister);
authRoute.post('/login', loginValidator, handleLogin);

authRoute.get('/logout', isLoggedIn, handleLogout);
authRoute.post('/verify-user', verifyUser);

authRoute.post('/forget-password', forgetPassword);
authRoute.put('/reset-password', resetPassword);

export default authRoute;
