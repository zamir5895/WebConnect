import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageCarousel from './ImageCarousel';
import { getCurrentUser } from '../../services/api';

const SearchResultsList = ({ publicaciones }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error('Error obteniendo la información del usuario', error);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleVerEnMapa = (id, lat, lng) => {
    navigate(`/mapa/${id}`, { state: { lat, lng } });
  };

  const handleEditClick = (publicacionId, alojamientoId) => {
    navigate(`/MiAlojamiento/${publicacionId}/${alojamientoId}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {publicaciones.map((publicacion) => (
        <div key={publicacion.publicacionId} className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
          <ImageCarousel images={publicacion.alojamientoMultimedia} />
          <div className="p-4">
            <h2 className="text-2xl font-bold text-blue-700 mb-2">{publicacion.titulo}</h2>
            <p className="text-gray-600 mb-2">{publicacion.descripcion}</p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Autor:</span> {publicacion.autorFullName}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Dirección:</span> {publicacion.direccion || 'No especificada'}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Precio:</span> {publicacion.price} {publicacion.tipoMoneda}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Rating:</span> {publicacion.promedioRating} ({publicacion.cantidadReviews} reviews)
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Habitaciones:</span> {publicacion.cantidadHabitaciones}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Camas:</span> {publicacion.cantidadCamas}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Baños:</span> {publicacion.cantidadBanios}
            </p>
            <button
              onClick={() => handleVerEnMapa(publicacion.publicacionId, publicacion.latitude, publicacion.longitud)}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Ver en mapa
            </button>
            {currentUser && currentUser.rol === 'HOST' && currentUser.id === publicacion.propietarioId && (
              <button
                onClick={() => handleEditClick(publicacion.publicacionId, publicacion.alojamientoId)}
                className="mt-4 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
              >
                Editar
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResultsList;
