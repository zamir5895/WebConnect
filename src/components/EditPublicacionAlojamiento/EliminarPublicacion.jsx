import React, { useState } from 'react';
import { deletePublicacion } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import Navbar2 from '../Navbar2/Navbar2';

const EliminarPublicacion = ({ publicacionId, setCurrentSection }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deletePublicacion(publicacionId);
      alert('Publicación eliminada');
      navigate('/hosthome');
    } catch (error) {
      console.error('Error eliminando la publicación:', error);
      alert('Error eliminando la publicación');
    }
  };

  return (
    <div>
      <Navbar2 />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center transition-all duration-300 hover:text-red-500 hover:scale-105">
            Eliminar Publicación
          </h2>
          <button
            onClick={() => setShowConfirmation(true)}
            className="bg-red-500 text-white px-4 py-2 rounded-md w-full transition-transform transform hover:scale-105 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 mb-4"
          >
            Eliminar Publicación
          </button>
          <button
            onClick={() => setCurrentSection('menu')}
            className="bg-gray-500 text-white px-4 py-2 rounded-md w-full transition-transform transform hover:scale-105 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            Regresar al menú
          </button>

          {showConfirmation && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded shadow-lg text-center">
                <p className="mb-4">¿Estás seguro de que quieres eliminar esta publicación?</p>
                <div className="flex justify-around">
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded-md w-24 transition-transform transform hover:scale-105 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 mb-4"
                  >
                    Sí, eliminar
                  </button>
                  <button
                    onClick={() => setShowConfirmation(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md w-24 transition-transform transform hover:scale-105 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>  
  );
};

export default EliminarPublicacion;
