import React, { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import { registerUser } from '../service/userService';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [about, setAbout] = useState('');

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const newUser = {
        name,
        email,
        password,
        about,
      };

      const response = await registerUser(newUser);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className='center vertical'>
      <h1>Register Page</h1>
      <ToastContainer />
      <div>
        <form className='center vertical' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Name'
            value={name}
            name='name'
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
          <input
            type='email'
            placeholder='Email'
            value={email}
            name='email'
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            name='password'
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <textarea
            name='about'
            value={about}
            placeholder='About'
            onChange={(e) => {
              setAbout(e.target.value);
            }}
          ></textarea>

          <button type='submit'>Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
