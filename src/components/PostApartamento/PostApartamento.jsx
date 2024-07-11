import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../services/api';
import MapComponent from './Map';
import PublicacionForm from './PublicacionesForm';

const CrearPublicacionAlojamiento = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token'); 
        if (token) {
          const data = await getCurrentUser(token);
          setUserProfile(data);
        }
      } catch (error) {
        console.error("Error al obtener la información del usuario", error);
        if (error.response && error.response.status === 401) {
          setError("Ups, no estás permitido.");
          setTimeout(() => {
            navigate('/home');
          }, 3000);
        }
      }
    };

    fetchUserProfile();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center flex-col h-screen bg-gray-100 p-6">
      {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}
      {userProfile && (
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
          <MapComponent setLatitude={setLatitude} setLongitude={setLongitude} />
          <PublicacionForm latitude={latitude} longitude={longitude} autorId={userProfile.id} propietarioId={userProfile.id} />
        </div>
      )}
      {!userProfile && !error && <div className="text-gray-700">Cargando...</div>}
    </div>
  );
};

export default CrearPublicacionAlojamiento;
