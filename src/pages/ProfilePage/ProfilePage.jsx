import React, { useState, useEffect } from 'react';
import Topbar from '../../components/TopBar/TopBar';
import { format, parseISO } from 'date-fns';

import { getProfile } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [profileInfo, setProfileInfo] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = await getProfile(token);
        setProfileInfo(data);
        console.log(data);
      } catch (error) {
        console.error('Ups No haz iniciado sesion o no estas registrado:', error);
        setError('Failed to fetch profile. Please try again.');
      }
    };

    fetchProfile();
  }, []);

  const handleNoRegister = () => {
    navigate('/entrance');}

  if (error) {
    return <div className="text-red-500 text-center mt-10">
      {error}
      <div className="mt-6 flex justify-center">
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleNoRegister}
            >
              Registrate
            </button>
          </div>
      </div>;
  }

  if (!profileInfo) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  return (
    <div>
      <Topbar />
      <div className="max-w-7xl mx-auto mt-10 p-5">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center">
            <img src={profileInfo.fotoUrl || 'https://via.placeholder.com/150'} alt="Profile" className="w-24 h-24 rounded-full shadow-md" />
            <div className="ml-6">
              <h2 className="text-2xl font-bold">{profileInfo.pnombre} {profileInfo.papellido}</h2>
              <p className="text-gray-600">{profileInfo.username}</p>
              <p className="text-gray-600">{profileInfo.email}</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Información Personal</h3>
              <p><strong>Nombre Completo:</strong> {profileInfo.pnombre} {profileInfo.snombre} {profileInfo.papellido} {profileInfo.sapellido}</p>
              <p><strong>Fecha de Nacimiento:</strong> {profileInfo.fechaNacimiento ? format(parseISO(profileInfo.fechaNacimiento), 'dd/MM/yyyy') : 'N/A'}</p>
              <p><strong>Género:</strong> {profileInfo.genero}</p>
              <p><strong>País:</strong> {profileInfo.pais}</p>
              <p><strong>Ciudad:</strong> {profileInfo.ciudad}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Contacto</h3>
              <p><strong>Teléfono:</strong> {profileInfo.telefono}</p>
              <p><strong>Dirección:</strong> {profileInfo.direccion || 'No especificado'}</p>
              <p><strong>Descripción:</strong> {profileInfo.descripcion || 'No especificado'}</p>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleEditProfile}
            >
              Editar Perfil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
