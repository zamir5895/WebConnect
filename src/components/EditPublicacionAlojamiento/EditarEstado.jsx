import React, { useState } from 'react';
import { updateEstado } from '../../services/api';
import Navbar2 from '../Navbar2/Navbar2';

const EditarEstado = ({ alojamientoId, setCurrentSection }) => {
  const [estado, setEstado] = useState('');

  const handleSubmit = async () => {
    try {
      await updateEstado(alojamientoId, estado);
      alert('Estado actualizado');
      console.log('Estado actualizado');
    } catch (error) {
      console.error('Error actualizando el estado:', error);
      alert('Error actualizando el estado');
    }
  };

  return (
    <div>
      <Navbar2 /> 
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
        
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center transition-all duration-300 hover:text-green-500 hover:scale-105">
          Editar Estado
        </h2>
        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          className="border border-gray-300 rounded-md p-2 mb-4 w-full bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="" disabled>Seleccionar estado</option>
          <option value="DISPONIBLE">Disponible</option>
          <option value="NODISPONIBLE">No Disponible</option>
        </select>
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded-md w-full transition-transform transform hover:scale-105 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Actualizar Estado
        </button>
        <button 
          onClick={() => setCurrentSection('menu')} 
          className="bg-gray-500 text-white px-4 py-2 rounded-md mt-4 w-full transition-transform transform hover:scale-105 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          Regresar al menú
        </button>
      </div>
    </div>
    </div>
  );
};

export default EditarEstado;
