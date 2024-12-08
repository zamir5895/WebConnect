import React, { useState } from 'react';
import { updatePrice } from '../../services/api';
import Navbar2 from '../Navbar2/Navbar2';

const ActualizarPrecio = ({ alojamientoId, setCurrentSection }) => {
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('');

  const handleSubmit = async () => {
    try {
      const priceDTO = { precio: parseFloat(price), tipoMoneda: currency };
      await updatePrice(alojamientoId, priceDTO);
      alert('Precio actualizado');
      console.log('Precio actualizado:', priceDTO);
    } catch (error) {
      console.error('Error actualizando el precio:', error);
      alert('Error actualizando el precio');
    }
  };

  return (
    <div>
      <Navbar2 />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center transition-all duration-300 hover:text-green-500 hover:scale-105">
            Actualizar Precio
          </h2>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mb-4 w-full bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Nuevo precio"
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mb-4 w-full bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="" disabled>Seleccionar tipo de moneda</option>
            <option value="SOLES">SOLES</option>
            <option value="DOLARES">DOLARES</option>
            {/* Añade otras opciones de moneda según sea necesario */}
          </select>
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded-md w-full transition-transform transform hover:scale-105 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 mb-4"
          >
            Actualizar Precio
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

export default ActualizarPrecio;
