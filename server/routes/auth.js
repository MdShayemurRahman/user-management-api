import { Router } from 'express';
import {
  handleLogin,
  handleLogout,
  handleRegister,
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

export default authRoute;
