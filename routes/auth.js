import { Router } from 'express';
import {
  handleLogin,
  handleLogout,
  handleRegister,
} from '../controllers/auth.js';
import {
  loginValidator,
  registartionValidator,
} from '../middleware/validation.js';

const authRoute = Router();

// api plan
// /api/register
authRoute.post('/register', registartionValidator, handleRegister);
authRoute.post('/login', loginValidator, handleLogin);
// authRoute.post('/profile', isLogin, loadProfile);

authRoute.get('/logout', handleLogout);

export default authRoute;
