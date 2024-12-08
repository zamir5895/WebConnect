import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { getCurrentUser } from '../../services/api';
import ScrollableAlojamientos from '../../components/ScrollableAlojamientos/ScrollableAlojamientos';

const DashboardTraveler = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorRol, setErrorRol] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const data = await getCurrentUser(token);
          setUserProfile(data);
          if (data.rol !== "TRAVELER") {
            setErrorRol(true);
          }
        } else {
          setErrorRol(false);
        }
      } catch (error) {
        console.error("Error al obtener la información del usuario", error);
        setErrorRol(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (errorRol) {
      navigate('/unauthorized'); 
    }
  }, [errorRol, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-gray-700 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <>
    
     
      <ScrollableAlojamientos />
      
    </>
  );
};

export default DashboardTraveler;
