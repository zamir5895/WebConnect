import React, { useState, useEffect } from 'react';
import { updateImage, getAlojamiento } from '../../services/api';
import Navbar2 from '../Navbar2/Navbar2';

const ActualizarImagen = ({ alojamientoId, setCurrentSection }) => {
  const [imagenes, setImagenes] = useState([]);
  const [imagenIdSeleccionada, setImagenIdSeleccionada] = useState('');
  const [nuevaImagen, setNuevaImagen] = useState(null);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const fetchAlojamiento = async () => {
      try {
        const alojamiento = await getAlojamiento(alojamientoId);
        if (alojamiento.multimedia.length > 0) {
          setImagenes(alojamiento.multimedia);
        } else {
          setMensaje('No hay imágenes que editar');
        }
      } catch (error) {
        console.error('Error obteniendo los datos del alojamiento:', error);
        setMensaje('Error obteniendo los datos del alojamiento');
      }
    };

    fetchAlojamiento();
  }, [alojamientoId]);

  const handleSubmit = async () => {
    try {
      await updateImage(alojamientoId, imagenIdSeleccionada, nuevaImagen);
      alert('Imagen actualizada');
    } catch (error) {
      console.error('Error actualizando la imagen:', error);
      alert('Error actualizando la imagen');
    }
  };

  return (
    <div>
      <Navbar2 />
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center transition-all duration-300 hover:text-green-500 hover:scale-105">
          Actualizar Imagen
        </h2>
        {mensaje ? (
          <p className="text-red-500 text-center">{mensaje}</p>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {imagenes.map((imagen) => (
                <img
                  key={imagen.id}
                  src={imagen.url_contenido}
                  alt={`Imagen ${imagen.id}`}
                  onClick={() => setImagenIdSeleccionada(imagen.id)}
                  className={`cursor-pointer border-2 ${
                    imagenIdSeleccionada === imagen.id
                      ? 'border-green-500'
                      : 'border-transparent'
                  }`}
                />
              ))}
            </div>
            {imagenIdSeleccionada && (
              <>
                <input
                  type="file"
                  onChange={(e) => setNuevaImagen(e.target.files[0])}
                  className="border border-gray-300 rounded-md p-2 mb-4 w-full bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  onClick={handleSubmit}
                  className="bg-green-500 text-white px-4 py-2 rounded-md w-full transition-transform transform hover:scale-105 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 mb-4"
                >
                  Actualizar Imagen
                </button>
              </>
            )}
          </>
        )}
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

export default ActualizarImagen;
