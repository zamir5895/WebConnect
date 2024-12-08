import React, { useState, useEffect } from 'react';
import Topbar from '../../components/TopBar/TopBar';
import Sidebar from '../../components/sideBar/sideBar';
import Postear from '../../components/Postear/Postear';
import ScrollablePosts from '../../components/ScrollablePosts/ScrollablePosts';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula una carga de datos
    const fetchData = async () => {
      try {
        // Aquí puedes hacer la llamada a tu API o cargar los datos necesarios
        // await fetchYourData();
      } catch (error) {
        console.error("Error al cargar los datos", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-gray-700 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Topbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col items-center p-5 justify-start overflow-auto">
          <div className="w-full lg:w-2/4 mb-5">
            <Postear />
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default HomePage;
