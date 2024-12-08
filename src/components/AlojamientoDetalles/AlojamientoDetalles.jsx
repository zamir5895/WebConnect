// components/AlojamientoDetalles/AlojamientoDetalles.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { NavigateBeforeRounded } from '@mui/icons-material';
import { getAlojamientoDetails, getCurrentUser } from '../../services/api';
import ImageCarousel from '../SearchResultList/ImageCarousel';
import CrearReview from '../CrearReview/CrearReview';
import ReviewsList from '../ReviewsList/ReviewsList';

const AlojamientoDetalles = () => {
  const { publicacionId } = useParams();
  const [alojamiento, setAlojamiento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlojamientoDetails = async () => {
      try {
        const data = await getAlojamientoDetails(publicacionId);
        setAlojamiento(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlojamientoDetails();
  }, [publicacionId]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = await getCurrentUser();
        setUserProfile(user);
      } catch (error) {
        console.error("Error obteniendo la información del usuario", error);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) return <p className="text-center text-2xl">Cargando...</p>;
  if (error) return <p className="text-center text-2xl text-red-500">Error cargando los detalles: {error.message}</p>;

  return (
    <div className="container mx-auto py-8 px-4 lg:px-0">
      <IconButton onClick={() => navigate(-1)} className="mb-4">
        <NavigateBeforeRounded />
      </IconButton>
      {alojamiento && (
        <div className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
          <ImageCarousel images={alojamiento.alojamientoMultimedia} />
          <div className="p-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{alojamiento.titulo}</h1>
            <p className="text-lg text-gray-700 mb-6">{alojamiento.descripcion}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600"><span className="font-semibold">Publicado el:</span> {new Date(alojamiento.fechaPublicacion).toLocaleDateString()}</p>
                <p className="text-gray-600"><span className="font-semibold">Dirección:</span> {alojamiento.direccion}</p>
                <p className="text-gray-600"><span className="font-semibold">Estado:</span> {alojamiento.estado}</p>
                <p className="text-gray-600"><span className="font-semibold">Precio:</span> {alojamiento.price} {alojamiento.tipoMoneda}</p>
              </div>
              <div>
                <p className="text-gray-600"><span className="font-semibold">Baños:</span> {alojamiento.cantidadBanios}</p>
                <p className="text-gray-600"><span className="font-semibold">Camas:</span> {alojamiento.cantidadCamas}</p>
                <p className="text-gray-600"><span className="font-semibold">Habitaciones:</span> {alojamiento.cantidadHabitaciones}</p>
                <p className="text-gray-600"><span className="font-semibold">Rating:</span> {alojamiento.promedioRating}</p>
                <p className="text-gray-600"><span className="font-semibold">Reviews:</span> {alojamiento.cantidadReviews}</p>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-gray-600"><span className="font-semibold">Autor:</span> {alojamiento.autorFullName}</p>
              <p className="text-gray-600"><span className="font-semibold">Número de Autor:</span> {alojamiento.autorNumber}</p>
            </div>
            {userProfile && userProfile.rol === 'TRAVELER' && (
              <CrearReview publicacionId={publicacionId} />
            )}
            <ReviewsList publicacionId={publicacionId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AlojamientoDetalles;
