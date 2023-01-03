import { comparePassword, hashPassword } from '../helper/index.js';
import { User } from '../model/user.js';
import jwt from 'jsonwebtoken';
import { dev } from '../config/index.js';
import { sendEmailWithNodeMailer } from '../helper/email.js';

export const handleRegister = async (req, res) => {
  try {
    const { name, email, password, about } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(404).json({
        success: false,
        message: 'User was already registered',
      });
    }

    const hashPass = await hashPassword(password);

    const userData = {
      name, // name: name
      email,
      password: hashPass,
      about,
    };

    // create a jwt token

    const token = jwt.sign(userData, dev.app.jwtSecretKey, {
      expiresIn: '5m',
    });

    const emailData = {
      email,
      subject: 'Account Activation Email',
      html: `
      <h2> Hello ${name} . </h2>
      <p> Please click here to  <a href="http://127.0.0.1:3000/auth/activte/${token}"> activate your account </a>  </p>     
      `, // html body
    };

    sendEmailWithNodeMailer(emailData);

    return res.status(201).json({
      success: true,
      message:
        'An email has been sent to your email address. Please verify and then login',
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
    console.log(existingUser);
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
    console.log(isPasswordMatched);

    if (!isPasswordMatched) {
      return res.status(400).json({
        success: false,
        message: 'user email/password not matched',
      });
    }

    const token = jwt.sign({ _id: existingUser._id }, dev.app.jwtSecretKey, {
      expiresIn: '5m',
    });

    return res.status(200).json({
      message: 'user was logged in',
      token,
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

export const verifyUser = (req, res) => {
  try {
    const token = req.body.token;

    if (!token) {
      return res.status(404).json({
        error: 'token not found',
      });
    }
    jwt.verify(token, dev.app.jwtSecretKey, async (err, decoded) => {
      if (err) {
        return res.status(400).json({
          message: 'token was expired. please register again',
        });
      }

      const newUser = new User(decoded);
      const savedData = await newUser.save();
      if (!savedData) {
        return res.status(400).json({
          success: false,
          message: 'user was not created',
        });
      }
    });

    return res.status(200).json({
      message: 'user was created',
    });
  } catch (error) {
    console.log(error);
    return res.json({
      error: error.message,
    });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    // step1: is user exist in db with the email
    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'This email is not registered. Please sign up first',
      });
    }

    if (existingUser) {
      const token = jwt.sign({ _id: existingUser._id }, dev.app.jwtSecretKey, {
        expiresIn: '5m',
      });

      const emailData = {
        email,
        subject: 'Password Reset Email',
        html: `
      <h2> Hello ${existingUser.name}. </h2>
      <p> Please click here to  <a href="http://127.0.0.1:3000/auth/reset-password/${token}"> reset your account </a>  </p>     
      `, // html body
      };

      sendEmailWithNodeMailer(emailData);

      return res.status(200).json({
        success: true,
        message:
          'A password reset email has been sent to your email address. Please reset password and then login',
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      error: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { password, token } = req.body;
    console.log(password, token);

    jwt.verify(token, dev.app.jwtSecretKey, async (err, decoded) => {
      if (err) {
        return res.status(400).json({
          message: 'token was expired. please register again',
        });
      }

      console.log(decoded._id);
     
      const updateUser = await User.findByIdAndUpdate(
        { _id: decoded._id },
        {
          password: await hashPassword(password),
        },
        { new: true }
      );
      console.log('updated user:  ' + updateUser);
      if (!updateUser) {
        return res.status(400).json({
          success: false,
          message: 'user was not updated',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'password reset was successful',
      });
    });
  } catch (error) {
    console.log(error);
    return res.json({
      error: error.message,
    });
  }
};
