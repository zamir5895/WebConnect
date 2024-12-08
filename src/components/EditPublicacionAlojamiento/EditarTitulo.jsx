import React, { useState } from 'react';
import { updateTitle } from '../../services/api';
import Navbar2 from '../Navbar2/Navbar2';

const EditarTitulo = ({ publicacionId, setCurrentSection }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async () => {
    try {
      await updateTitle(publicacionId, title);
      alert('Título actualizado');
      console.log('Título actualizado:', title);
    } catch (error) {
      console.error('Error actualizando el título:', error);
      alert('Error actualizando el título');
    }
  };

  const handleTextareaChange = (e) => {
    setTitle(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div>
        <Navbar2/>
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center transition-all duration-300 hover:text-green-500 hover:scale-105">
          Editar Título
        </h2>
        <textarea
          value={title}
          onChange={handleTextareaChange}
          className="border p-2 mb-4 w-full resize-none overflow-hidden"
          placeholder="Nuevo título"
          rows="1"
        />
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded w-full transition-transform transform hover:scale-105 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Actualizar Título
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

export default EditarTitulo;
