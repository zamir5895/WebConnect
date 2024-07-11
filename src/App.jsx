// src/App.jsx
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import './App.css';
import '@mantine/core/styles.css';

import './index.css';
import ResetPassword from './pages/ResetPassword/resetPassword';
import { MantineProvider } from '@mantine/core';
import Entrance from './pages/Entrada/Entrance';
import ApartmentPage from './pages/ApartmentPage/ApartmentPage';
import { ServerError } from './pages/Errors/ServerError';
import Login from './pages/Login/NewLogin';
import HomePage from './pages/Home/HomePage';
import Register from './pages/Register/Register';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import EditProfilePage from './pages/EditProfile/EditProfilePage';
import ApartmentDashboard from './pages/ApartmentDashboard/ApartmentDashboard';
function App() {

  return (
    <MantineProvider>
        <Router>
            <Routes>
              <Route path="/entrance" element={<Entrance />} />
              <Route path="/" element={<Entrance/>} />
              <Route path='/apartment/:id' element={<ApartmentPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="home" element={<HomePage />} />
              <Route path="/dashboard" element={<ApartmentDashboard />} />
              <Route path='/register' element={<Register />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path='/server-down' element={<ServerError />} />
              <Route path= "/Mi perfil" element = {<ProfilePage />} />
              <Route path="edit-profile" element={<EditProfilePage />} />
            </Routes>
        </Router>
    </MantineProvider>
  );
}

export default App;
