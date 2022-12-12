import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteProfile, getProfile } from '../service/userService';

const Profile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('jwt');
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getUserProfile = async () => {
    try {
      setIsLoading(true);
      const response = await getProfile(token);
      setUser(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      navigate('/login');
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const handleDeleteProfile = async (id) => {
    try {
      await deleteProfile(token, id);
      setUser();
      navigate('/register');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Profile Page</h1>
      {isLoading && <p>Loading...</p>}
      {user && (
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>{user.about}</p>
          <button
            onClick={() => {
              handleDeleteProfile(user._id);
            }}
          >
            Delete Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
