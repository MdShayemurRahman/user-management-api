import { comparePassword, hashPassword } from '../helper/index.js';
import { User } from '../model/user.js';

export const handleRegister = async (req, res) => {
  try {
    const { name, email, password, about } = req.body;

    const hashPass = await hashPassword(password);

    const userData = {
      name, // name: name
      email,
      password: hashPass,
      about,
    };
    const newUser = new User(userData);
    const savedData = await newUser.save();
    if (!savedData) {
      return res.status(400).json({
        success: false,
        message: 'user was not created',
      });
    }

    return res.status(201).json({
      success: true,
      message: 'user was created',
    });
  } catch (error) {
    console.log(error);
    return res.json({
      error: error.message,
    });
  }
};

export const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // step1: is user exist in db with the email
    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'user was not found with this email. Please register first',
      });
    }

    // step2: password match
    const isPasswordMatched = await comparePassword(
      password,
      existingUser.password
    );

    if (!isPasswordMatched) {
      return res.status(400).json({
        success: false,
        message: 'user email/password not matched',
      });
    }

    return res.status(200).json({
      message: 'user was logged in',
    });
  } catch (error) {
    console.log(error);
    return res.json({
      error: error.message,
    });
  }
};

export const handleLogout = (req, res) => {
  try {
    return res.status(200).json({
      message: 'user was logged out',
    });
  } catch (error) {
    console.log(error);
    return res.json({
      error: error.message,
    });
  }
};
