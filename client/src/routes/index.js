import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../layout/Navbar';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
import Verify from '../pages/Verify';
import Forget from '../pages/Forget';
import ResetPassword from '../pages/ResetPassword';
import { ToastContainer, toast } from 'react-toastify';

const Index = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/forget-password' element={<Forget />} />
        <Route path='/auth/activte/:token' element={<Verify />} />
        <Route path='/auth/reset-password/:token' element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Index;
