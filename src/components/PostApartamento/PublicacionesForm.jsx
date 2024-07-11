import React, { useState, useEffect } from 'react';
import { crearPublicacionAlojamiento, getCurrentUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const PublicacionForm = ({ latitude, longitude, autorId, propietarioId }) => {
  const [titulo, setTitulo] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [tipoMoneda, setTipoMoneda] = useState('SOLES');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!autorId || !propietarioId) {
      console.error('Autor ID o Propietario ID no está establecido');
      return;
    }

    const publicacionAlojamientoDTO = {
      titulo,
      autorId,
      alojamiento: {
        propietarioId,
        latitude,
        longitude,
        ubicacion,
        descripcion,
        precio,
        tipoMoneda,
        multimedia: [],
      },
    };

    try {
      const data = await crearPublicacionAlojamiento(publicacionAlojamientoDTO);
      console.log('Publicación creada:', data);
    } catch (error) {
      console.error('Error creando la publicación:', error);
    }
  };
  const handleBack = () => {
    navigate('/home');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mt-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Crear Publicación de Alojamiento</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded"
        />
        <input type="text" placeholder="Latitude" value={latitude} readOnly className="p-2 border border-gray-300 rounded" />
        <input type="text" placeholder="Longitude" value={longitude} readOnly className="p-2 border border-gray-300 rounded" />
        <input
          type="text"
          placeholder="Ubicación"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded"
        />
        <select
          value={tipoMoneda}
          onChange={(e) => setTipoMoneda(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded"
        >
          <option value="SOLES">SOLES</option>
          <option value="DOLARES">DOLARES</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6 transition duration-300"
      >
        Crear Publicación
      </button>
      <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-4 transition duration-300"
            onClick={handleBack}
          >
            Regresar
          </button>
    </form>
  );
};

export default PublicacionForm;
