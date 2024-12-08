import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/home');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Upsss!!! Acceso no autorizado</h1>
      <p className="text-lg text-gray-600 mb-8">Lo sentimos, no tienes permiso para ver esta página.</p>
      <button
        onClick={handleGoHome}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 transition duration-300"
      >
        Regresar a la página principal
      </button>
    </div>
  );
};

export default Unauthorized;
