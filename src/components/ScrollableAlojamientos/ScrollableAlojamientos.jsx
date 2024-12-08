import React, { useState, useEffect } from 'react';
import { getAllAlojamientos } from '../../services/api';
import AlojamientoCard from './AlojamientoCard';
import Navbar from '../Navbar/Navbar';

const ScrollableAlojamientos = () => {
  const [alojamientos, setAlojamientos] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAlojamientos = async () => {
      if (loading) return;
      setLoading(true);
      try {
        const data = await getAllAlojamientos(page, 10);
        setAlojamientos((prevAlojamientos) => [...prevAlojamientos, ...data.content]);
        setHasMore(!data.last);
        console.log('Alojamientos:', alojamientos);
      } catch (error) {
        console.error("Failed to fetch alojamientos:", error);
      }
      setLoading(false);
    };

    fetchAlojamientos();
  }, [page]);

  const loadMore = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && hasMore && !loading) {
      loadMore();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-col items-center mt-4 h-3/4 overflow-hidden">
        <div className="w-full lg:w-3/4 p-4 overflow-y-auto" onScroll={handleScroll}>
          {alojamientos.map((alojamiento) => (
            <AlojamientoCard key={alojamiento.id} alojamiento={alojamiento} />
          ))}
          {loading && <p className="text-center text-gray-500">Cargando más alojamientos...</p>}
        </div>
      </div>
    </div>
  );
};

export default ScrollableAlojamientos;
