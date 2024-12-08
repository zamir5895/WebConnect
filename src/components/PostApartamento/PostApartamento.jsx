import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../services/api';
import MapComponent from './MapComponent';
import PublicacionForm from './PublicacionForm';
import Navbar2 from '../Navbar2/Navbar2';

const LoadingIndicator = () => (
  <div className="flex items-center justify-center space-x-2 animate-pulse">
    <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
    <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
    <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
  </div>
);

const CrearPublicacionAlojamiento = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorStatus, setErrorStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          console.log('Token encontrado:', token);
          const data = await getCurrentUser(token);
          console.log('Datos del usuario:', data);
          if (data.rol === 'HOST') {
            setUserProfile(data);
          } else {
            setError(true);
            setErrorMessage("No autorizado. Redirigiendo a página no autorizada...");
            setErrorStatus(403);
          }
        } catch (error) {
          console.error("Error al obtener la información del usuario", error);
          if (error.response && error.response.status === 401) {
            setError(true);
            setErrorMessage("No autorizado. Redirigiendo a login...");
            setErrorStatus(401);
          } else {
            setError(true);
            setErrorMessage("No tienes cuenta. Redirijiendo......");
            navigate('/entrance');
          }
        } finally {
          setLoading(false);
        }
      } else {
        setError(true);
        setErrorMessage("Tiene que tener una cuenta para poder ver este contenido. Redirigiendo a login...");
        setErrorStatus(401);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  useEffect(() => {
    if (errorStatus === 401) {
      setTimeout(() => {
        navigate('/entrance');
      }, 3000);
    } else if (errorStatus === 403) {
      setTimeout(() => {
        navigate('/unauthorized');
      }, 3000);
    }
  }, [errorStatus, navigate]);

  return (
    <>
      <Navbar2 />
      <div className="flex justify-center items-center flex-col bg-gray-100 p-6 min-h-screen">
        {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{errorMessage}</div>}
        {loading && (
          <div className="flex justify-center items-center min-h-screen">
            <LoadingIndicator />
          </div>
        )}
        {!loading && !error && userProfile && (
          <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
            <PublicacionForm latitude={latitude} longitude={longitude} autorId={userProfile.id} propietarioId={userProfile.id} />
            <MapComponent setLatitude={setLatitude} setLongitude={setLongitude} />
          </div>
        )}
      </div>
    </>
  );
};

export default CrearPublicacionAlojamiento;
