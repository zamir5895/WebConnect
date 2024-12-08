import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EditarTitulo from '../../components/EditPublicacionAlojamiento/EditarTitulo';
import Navbar2 from '../../components/Navbar2/Navbar2';
import EditarDescripcion from '../../components/EditPublicacionAlojamiento/EditarDescripcion';
import EditarEstado from '../../components/EditPublicacionAlojamiento/EditarEstado';
import ActualizarImagen from '../../components/EditPublicacionAlojamiento/ActualizarImagen';
import ActualizarPrecio from '../../components/EditPublicacionAlojamiento/ActualizarPrecio';
import EliminarImagen from '../../components/EditPublicacionAlojamiento/EliminarImagen';
import ActualizarUbicacion from '../../components/EditPublicacionAlojamiento/ActualizarUbicacion';
import EliminarPublicacion from '../../components/EditPublicacionAlojamiento/EliminarPublicacion';

const EditarAlojamiento = () => {
  const { publicacionId, alojamientoId } = useParams();
  const [currentSection, setCurrentSection] = useState('menu');
  const navigate = useNavigate();

  const renderSection = () => {
    switch (currentSection) {
      case 'Editar Título':
        return <EditarTitulo publicacionId={publicacionId} setCurrentSection={setCurrentSection} />;
      case 'Editar Descripción':
        return <EditarDescripcion alojamientoId={alojamientoId} setCurrentSection={setCurrentSection} />;
      case 'Editar Estado':
        return <EditarEstado alojamientoId={alojamientoId} setCurrentSection={setCurrentSection} />;
      case 'Actualizar Imagen':
        return <ActualizarImagen alojamientoId={alojamientoId} setCurrentSection={setCurrentSection} />;
      case 'Actualizar Precio':
        return <ActualizarPrecio alojamientoId={alojamientoId} setCurrentSection={setCurrentSection} />;
      case 'Actualizar Ubicación':
        return <ActualizarUbicacion alojamientoId={alojamientoId} setCurrentSection={setCurrentSection} />;
      case 'Eliminar Imagen':
        return <EliminarImagen alojamientoId={alojamientoId} setCurrentSection={setCurrentSection} />;
      case 'Eliminar Publicación':
        return <EliminarPublicacion publicacionId={publicacionId} setCurrentSection={setCurrentSection} />;
      default:
        return (
          <div>
            <Navbar2 />
            <div className="flex flex-col items-center mt-10">
              <h1 className="text-3xl font-bold mb-6 text-center">Editar Alojamiento</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <button onClick={() => setCurrentSection('Editar Título')} className="bg-blue-500 text-white px-6 py-3 rounded shadow hover:bg-blue-600 transition-transform transform hover:scale-105">Editar Título</button>
                <button onClick={() => setCurrentSection('Editar Descripción')} className="bg-blue-500 text-white px-6 py-3 rounded shadow hover:bg-blue-600 transition-transform transform hover:scale-105">Editar Descripción</button>
                <button onClick={() => setCurrentSection('Editar Estado')} className="bg-blue-500 text-white px-6 py-3 rounded shadow hover:bg-blue-600 transition-transform transform hover:scale-105">Editar Estado</button>
                <button onClick={() => setCurrentSection('Actualizar Imagen')} className="bg-blue-500 text-white px-6 py-3 rounded shadow hover:bg-blue-600 transition-transform transform hover:scale-105">Actualizar Imagen</button>
                <button onClick={() => setCurrentSection('Actualizar Precio')} className="bg-blue-500 text-white px-6 py-3 rounded shadow hover:bg-blue-600 transition-transform transform hover:scale-105">Actualizar Precio</button>
                <button onClick={() => setCurrentSection('Actualizar Ubicación')} className="bg-blue-500 text-white px-6 py-3 rounded shadow hover:bg-blue-600 transition-transform transform hover:scale-105">Actualizar Ubicación</button>
                <button onClick={() => setCurrentSection('Eliminar Imagen')} className="bg-blue-500 text-white px-6 py-3 rounded shadow hover:bg-blue-600 transition-transform transform hover:scale-105">Eliminar Imagen</button>
                <button onClick={() => setCurrentSection('Eliminar Publicación')} className="bg-red-500 text-white px-6 py-3 rounded shadow hover:bg-red-600 transition-transform transform hover:scale-105">Eliminar Publicación</button>
              </div>
              <button onClick={() => navigate(-1)} className="mt-6 bg-gray-500 text-white px-6 py-3 rounded shadow hover:bg-gray-600 transition-transform transform hover:scale-105">Regresar</button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto p-4">
      {renderSection()}
    </div>
  );
};

export default EditarAlojamiento;
