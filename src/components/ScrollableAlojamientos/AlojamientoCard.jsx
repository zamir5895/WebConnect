import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import ImageCarousel from '../SearchResultList/ImageCarousel';

const AlojamientoCard = ({ alojamiento }) => {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate(`/mapa/${alojamiento.alojamientoId}`, { state: { lat: alojamiento.latitude, lng: alojamiento.longitud } });
  };

  const handleViewMoreClick = () => {
    navigate(`/alojamiento/${alojamiento.publicacionId}/${alojamiento.alojamientoId}`);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, index) => (
          <AiFillStar key={`full-${index}`} className="text-yellow-500" />
        ))}
        {[...Array(halfStars)].map((_, index) => (
          <AiFillStar key={`half-${index}`} className="text-yellow-500" />
        ))}
        {[...Array(emptyStars)].map((_, index) => (
          <AiOutlineStar key={`empty-${index}`} className="text-yellow-500" />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-5 mb-5 w-full flex">
      <div className="w-1/3">
        <ImageCarousel images={alojamiento.alojamientoMultimedia} />
      </div>
      <div className="w-2/3 pl-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center mb-4">
            {alojamiento.autorPhotoUrl ? (
              <img src={alojamiento.autorPhotoUrl} alt="Profile" className="w-10 h-10 rounded-full mr-4" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-300 mr-4"></div>
            )}
            <div>
              <h3 className="text-xl font-bold cursor-pointer text-blue-500" onClick={handleTitleClick}>
                {alojamiento.titulo}
              </h3>
              <p className="text-sm text-gray-500">{new Date(alojamiento.fechaPublicacion).toLocaleString()}</p>
            </div>
          </div>
          <p className="mb-4">{alojamiento.descripcion}</p>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <span className="text-gray-500 mr-2">{alojamiento.price} {alojamiento.tipoMoneda}</span>
            </div>
            <div className="flex items-center">
              {renderStars(alojamiento.promedioRating)}
              <span className="text-blue-500 ml-2">({alojamiento.cantidadReviews} reviews)</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-gray-500">
            <span>{alojamiento.cantidadHabitaciones} Habitaciones </span>
            <span>{alojamiento.cantidadCamas} Camas </span>
            <span>{alojamiento.cantidadBanios} Baños</span>
          </div>
          <div className="flex">
            <button
              onClick={handleTitleClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Ver en mapa
            </button>
            <button
              onClick={handleViewMoreClick}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Ver más
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlojamientoCard;
