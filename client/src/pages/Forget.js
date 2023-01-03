import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { forgetPassword } from '../service/userService';

const Forget = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log(email);
      const response = await forgetPassword({ email });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className='center vertical'>
      <h1>Forget Password</h1>
      <ToastContainer />
      <div>
        <form className='center vertical' onSubmit={handleSubmit}>
          <input
            type='email'
            placeholder='Email'
            value={email}
            name='email'
            size={40}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />

          <button type='submit'>Forget password</button>
        </form>
      </div>
    </div>
  );
};

export default Forget;
