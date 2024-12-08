import React, { useEffect, useState } from 'react';
import Navbar2 from '../../components/Navbar2/Navbar2';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../services/api';
import MisApartamentos from '../../components/MisApartamentos/MisApartamentos';

const DashboardHost = () => {
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
          if (data.rol !== "HOST") { 
            setErrorRol(true);
          }
        } else {
          setErrorRol(false);
        }
      } catch (error) {
        console.error("Error al obtener la información del usuario", error);
        setErrorRol(true);
        navigate('/entrance');
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
    <div>
      <Navbar2 />
      <MisApartamentos />
    </div>
  );
};

export default DashboardHost;
