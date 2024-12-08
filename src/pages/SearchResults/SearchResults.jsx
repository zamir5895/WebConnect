import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { buscarPublicaciones } from '../../services/api';
import SearchResultsList from '../../components/SearchResultList/SearchResultList';
import Navbar2 from '../../components/Navbar2/Navbar2';

const SearchResults = () => {
  const { value } = useParams();
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const results = await buscarPublicaciones(value);
        console.log('Resultados de búsqueda:', results);
        setPublicaciones(results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicaciones();
  }, [value]);

  if (loading) return <p className="text-center text-2xl">Cargando...</p>;
  if (error) return <p className="text-center text-2xl text-red-500">Error cargando los resultados: {error.message}</p>;
  if (publicaciones.length === 0) return (
    <div className="container mx-auto py-8">
      <Navbar2 />
      <h1 className="text-3xl font-bold mb-6 text-center">Resultados de Búsqueda</h1>
      <p className="text-center text-xl text-gray-600">No hay publicaciones que coincidan con "<span className="font-semibold">{value}</span>".</p>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 mt-6 mx-auto block"
        onClick={() => navigate(-1)}
      >
        Regresar
      </button>
    </div>
  );

  return (
    <div>
      <Navbar2 />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Resultados de Búsqueda</h1>
        <SearchResultsList publicaciones={publicaciones} />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 mt-6 mx-auto block"
          onClick={() => navigate(-1)}
        >
          Regresar
        </button>
      </div>
    </div>
  );
};

export default SearchResults;
