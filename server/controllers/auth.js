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

    // const newUser = new User(userData);
    // const savedData = await newUser.save();
    // if (!savedData) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'user was not created',
    //   });
    // }

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
