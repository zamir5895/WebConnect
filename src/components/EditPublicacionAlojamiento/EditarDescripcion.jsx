import React, { useState } from 'react';
import { updateDescription } from '../../services/api';
import Navbar2 from '../Navbar2/Navbar2';

const EditarDescripcion = ({ alojamientoId, setCurrentSection }) => {
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = async () => {
    try {
      await updateDescription(alojamientoId, descripcion);
      alert('Descripción actualizada');
      console.log('Descripción actualizada');
    } catch (error) {
      console.error('Error actualizando la descripción:', error);
      alert('Error actualizando la descripción');
    }
  };

  const handleTextareaChange = (e) => {
    setDescripcion(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div>
        <Navbar2/>
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center transition-all duration-300 hover:text-green-500 hover:scale-105">
          Editar Descripción
        </h2>
        <textarea
          value={descripcion}
          onChange={handleTextareaChange}
          className="border p-2 mb-4 w-full resize-none overflow-hidden"
          placeholder="Nueva descripción"
          rows="1"
        />
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded w-full transition-transform transform hover:scale-105 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Actualizar Descripción
        </button>
        <button 
          onClick={() => setCurrentSection('menu')} 
          className="bg-gray-500 text-white px-4 py-2 rounded mt-4 transition-transform transform hover:scale-105 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          Regresar al menú
        </button>
      </div>
    </div>
    </div>
  );
};

export default EditarDescripcion;
