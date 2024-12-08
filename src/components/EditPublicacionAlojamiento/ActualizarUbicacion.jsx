import React, { useState } from 'react';
import { updateUbicacion } from '../../services/api';
import Navbar2 from '../Navbar2/Navbar2';
import MapComponent from '../PostApartamento/MapComponent';

const ActualizarUbicacion = ({ alojamientoId, setCurrentSection }) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [ubicacion, setUbicacion] = useState('');

  const handleSubmit = async () => {
    try {
      await updateUbicacion(alojamientoId, { latitude, longitude, ubicacion });
      alert('Ubicación actualizada');
      console.log('Ubicación actualizada');

    } catch (error) {
      console.error('Error actualizando la ubicación:', error);
      alert('Error actualizando la ubicación');
    }
  };

  return (
    <div>
      <Navbar2 />
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center transition-all duration-300 hover:text-green-500 hover:scale-105">
            Actualizar Ubicación
          </h2>
          <MapComponent setLatitude={setLatitude} setLongitude={setLongitude} />
          <input
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="border p-2 mb-4 w-full"
            placeholder="Latitud"
            readOnly
          />
          <input
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className="border p-2 mb-4 w-full"
            placeholder="Longitud"
            readOnly
          />
          <input
            type="text"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            className="border p-2 mb-4 w-full"
            placeholder="Ubicación"
          />
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded-md w-full transition-transform transform hover:scale-105 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 mb-4"
          >
            Actualizar Ubicación
          </button>
          <button
            onClick={() => setCurrentSection('menu')}
            className="bg-gray-500 text-white px-4 py-2 rounded-md w-full transition-transform transform hover:scale-105 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            Regresar al menú
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActualizarUbicacion;
