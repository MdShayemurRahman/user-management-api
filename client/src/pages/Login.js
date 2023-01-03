import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { loginUser } from '../service/userService';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    
    try {
      event.preventDefault();
      const user = {
        email,
        password,
      };
 
      const response = await loginUser(user);

      localStorage.setItem('jwt', response.data.token);
      // toast.success(response.data.message);
      navigate('/profile');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className='center vertical'>
      <h1>Login Page</h1>
      <ToastContainer />
      <div>
        <form className='center vertical' onSubmit={handleSubmit}>
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

          <button type='submit'>Login</button>
          <button
            onClick={() => {
              navigate('/forget-password');
            }}
          >
            Forgot password ?
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
