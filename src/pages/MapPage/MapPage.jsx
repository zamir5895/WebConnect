import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const MapaPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { lat, lng } = location.state || {};

  if (!lat || !lng) {
    return <div className="text-center text-red-500">Ubicación no disponible.</div>;
  }

  const handleBack = () => {
    navigate(-1);  // Navega a la página anterior en el historial
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="w-full h-4/5">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          src={`https://www.google.com/maps?q=${lat},${lng}&hl=es;z=14&output=embed`}
          allowFullScreen
        ></iframe>
      </div>
      <button
        onClick={handleBack}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Regresar
      </button>
    </div>
  );
};

export default MapaPage;
