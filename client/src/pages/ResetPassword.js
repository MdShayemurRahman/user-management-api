import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetPassword } from '../service/userService';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log(password);
      const response = await resetPassword({ password, token });
      navigate('/login');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Reset Password</h1>
      <div>
        <form className='center vertical' onSubmit={handleSubmit}>
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

          <button type='submit'>Reset password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
