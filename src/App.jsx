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
import { ServerError } from './pages/Errors/ServerError';
import Login from './pages/Login/NewLogin';
import HomePage from './pages/Home/HomePage';
import Register from './pages/Register/Register';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import EditProfilePage from './pages/EditProfile/EditProfilePage';
import ApartmentDashboard from './pages/ApartmentDashboard/ApartmentDashboard';
import AlojamientosPage from './pages/AlojamientosPage/AlojamientosPage';
import MapaPage from './pages/MapPage/MapPage';
import DashboardTraveler from './pages/DashboardTraveler/DashboardTraveler';
import Unauthorized from './pages/Unauthorized/Unauthorized';
import DashboardHost from './pages/DashboardHost/DashboardHost';
import EditarAlojamiento from './pages/EditarAlojamiento/EditarAlojamiento';
import SearchResults from './pages/SearchResults/SearchResults';
import Alojamiento from './pages/Alojamiento/Alojamiento';
function App() {

  return (
    <MantineProvider>
        <Router>
            <Routes>
              <Route path="/entrance" element={<Entrance />} />
              <Route path="/" element={<Entrance/>} />
              <Route path="/login" element={<Login />} />
              <Route path="home" element={<HomePage />} />
              <Route path="/publicarAlojamiento" element={<ApartmentDashboard  />} />
              <Route path='/register' element={<Register />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path='/server-down' element={<ServerError />} />
              <Route path= "/Mi perfil" element = {<ProfilePage />} />
              <Route path="edit-profile" element={<EditProfilePage />} />
              <Route path="/alojamientos" element={<AlojamientosPage />} />
              <Route path="/mapa/:id" element={<MapaPage />} />
              <Route path="/hosthome" element={<DashboardHost/>} />
              <Route path="/travelerhome" element={<DashboardTraveler/>} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="/MiAlojamiento/:publicacionId/:alojamientoId" element={<EditarAlojamiento />} />
              <Route path="/propiedades/search/:value" element={<SearchResults />} />
              <Route path= "/alojamiento/:publicacionId/:alojamientoId" element = {<Alojamiento />} />
            </Routes>
        </Router>
    </MantineProvider>
  );
}

export default App;
