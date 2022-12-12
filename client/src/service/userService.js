import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const loginUser = async (user) => {
  const response = await axios.post(`${BASE_URL}/login`, user);
  return response;
};

export const registerUser = async (newUser) => {
  const response = await axios.post(`${BASE_URL}/register`, newUser);
  return response;
};



export const getProfile = async (token) => {
  const response = await axios.get(`${BASE_URL}/profile`, {
    headers: {
      Authorization: token,
    },
  });
  return response;
};

export const deleteProfile = async (token, id) => {
  const response = await axios.delete(`${BASE_URL}/profile/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  return response;
};
