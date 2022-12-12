import { hashPassword, isEmail } from '../helper/index.js';

export const registartionValidator = (req, res, next) => {
  const { name, email, password, about } = req.body;

  if (!name.trim() || !email || !password) {
    return res.status(400).json({
      error: 'name, email, password is required',
    });
  }

  if (!isEmail(email)) {
    return res.status(400).json({
      error: 'email is not valid',
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      error: 'password must have atleast 6 character',
    });
  }

  next();
};

// middleware

export const loginValidator = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: 'email, password is required',
    });
  }

  if (!isEmail(email)) {
    return res.status(400).json({
      error: 'email is not valid',
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      error: 'password must have atleast 6 character',
    });
  }

  next();
};

// middleware
