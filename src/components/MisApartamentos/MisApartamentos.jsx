import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, getMisPublicaciones } from '../../services/api';

const MisApartamentos = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [propietarioId, setPropietarioId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPropietarioId = async () => {
      try {
        const user = await getCurrentUser();
        setPropietarioId(user.id);
      } catch (error) {
        console.error("Error obteniendo el ID del propietario", error);
      }
    };
    fetchPropietarioId();
  }, []);

  useEffect(() => {
    if (propietarioId !== null) {
      fetchPublicaciones();
    }
  }, [propietarioId, page]);

  const fetchPublicaciones = async () => {
    try {
      const data = await getMisPublicaciones(propietarioId, page, 10);
      const newPublicaciones = data.content;
      setPublicaciones((prevPublicaciones) => [...prevPublicaciones, ...newPublicaciones]);
      if (newPublicaciones.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error obteniendo publicaciones", error);
    }
  };

  const handleTitleClick = (alojamiento) => {
    navigate(`/mapa/${alojamiento.alojamientoId}`, { state: { lat: alojamiento.latitude, lng: alojamiento.longitud } });
  };

  const handleEditClick = (publicacionId, alojamientoId) => {
    navigate(`/MiAlojamiento/${publicacionId}/${alojamientoId}`);
  };

  const handleViewMoreClick = (publicacionId, alojamientoId) => {
    navigate(`/alojamiento/${publicacionId}/${alojamientoId}`);
  };

  return (
    <div className="infinite-scroll-component py-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-500 mb-8">
          Mis Apartamentos
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publicaciones.map((publicacion) => (
            <div key={publicacion.publicacionId} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105">
              <ImageCarousel images={publicacion.alojamientoMultimedia} />
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-blue-700 cursor-pointer hover:underline" onClick={() => handleTitleClick(publicacion)}>
                    {publicacion.titulo}
                  </h2>
                  <button onClick={() => handleEditClick(publicacion.publicacionId, publicacion.alojamientoId)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                    Editar
                  </button>
                </div>
                <p className="text-gray-700 mb-4">{publicacion.descripcion}</p>
                <p className="text-blue-600 mb-2">
                  {new Date(publicacion.fechaPublicacion).toLocaleDateString()}
                </p>
                <p className="text-gray-600 mb-2">{publicacion.direccion}</p>
                <p className="text-gray-600 mb-2"><span className="font-semibold">Estado:</span> {publicacion.estado}</p>
                <div className="flex flex-wrap justify-between items-center mt-4">
                  <div>
                    <p className="text-gray-600 mb-1"><span className="font-semibold">Reviews:</span> {publicacion.cantidadReviews}</p>
                    <p className="text-gray-600 mb-1"><span className="font-semibold">Rating:</span> {publicacion.promedioRating}</p>
                    <p className="text-gray-600 mb-1"><span className="font-semibold">Precio:</span> {publicacion.price} {publicacion.tipoMoneda}</p>
                    <p className="text-gray-600 mb-1"><span className="font-semibold">Baños:</span> {publicacion.cantidadBanios}</p>
                    <p className="text-gray-600 mb-1"><span className="font-semibold">Camas:</span> {publicacion.cantidadCamas}</p>
                    <p className="text-gray-600 mb-1"><span className="font-semibold">Habitaciones:</span> {publicacion.cantidadHabitaciones}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <button onClick={() => handleTitleClick(publicacion)} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300 mt-4 lg:mt-0">
                      Ver en Mapa
                    </button>
                    <button onClick={() => handleViewMoreClick(publicacion.publicacionId, publicacion.alojamientoId)} className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300 mt-2 lg:mt-0">
                      Ver más
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {hasMore && publicaciones.length > 0 && <div className="text-center py-4">Cargando más...</div>}
      </div>
    </div>
  );
};

const ImageCarousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const defaultImage = "/path/to/default/image.jpg";

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-full h-48 overflow-hidden relative">
      {images.length > 0 ? (
        <img src={images[currentImageIndex].url_contenido} alt={`Imagen ${currentImageIndex}`} className="w-full h-full object-cover transition-opacity duration-1000" />
      ) : (
        <img src={defaultImage} alt="Imagen por defecto" className="w-full h-full object-cover" />
      )}
      <div className="absolute bottom-0 left-0 w-full flex justify-center space-x-2 py-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${currentImageIndex === index ? 'bg-white' : 'bg-gray-400'}`}
            onClick={() => setCurrentImageIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default MisApartamentos;
