import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { verifyUser } from '../service/userService';

const Verify = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const handleVerifyUser = async () => {
    try {
      const response = await verifyUser({ token: token });
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Verify User</h1>
      <button onClick={handleVerifyUser}>Verify User</button>
    </div>
  );
};

export default Verify;
