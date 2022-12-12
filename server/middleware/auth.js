import jwt from 'jsonwebtoken';
import { dev } from '../config/index.js';
export const isLoggedIn = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(404).json({
      error: 'token not found. please sign in first',
    });
  }

  // validaity check of token
  jwt.verify(token, dev.app.jwtSecretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        error: 'token expired / Invalid token',
      });
    }
    req._id = decoded._id;
    next();
  });
};
