import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import { Search, Person, Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import ConnectLogo from '../ConnectLogo/ConnectLogo';
import { getCurrentUser } from '../../services/api';

const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Usuario cerró sesión");
    localStorage.removeItem('token');
    setUserProfile(null);
    navigate('/entrance');
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const data = await getCurrentUser(token);
          setUserProfile(data);
          console.log("token", token);
          console.log(data);
        }
      } catch (error) {
        console.error("Error al obtener la información del usuario", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="bg-white shadow-md">
      <div className="flex justify-between items-center py-2 px-16 md:px-5 relative">
        <ConnectLogo />
        <div className="flex items-center gap-10 border border-gray-300 rounded-full h-12 px-5">
          <input
            type="text"
            placeholder="Search ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-none outline-none"
          />
          <IconButton onClick={() => navigate(`/propiedades/search/${search}`)} disabled={search === ""}>
            <Search className="text-pink-600" />
          </IconButton>
        </div>
        <div className="flex items-center gap-5">
          {!userProfile && (
            <a href="/login" className="text-blue-600 font-bold cursor-pointer hidden sm:block">
              Vuelvete un Host
            </a>
          )}

          <IconButton onClick={() => setDropdownMenu(!dropdownMenu)} className="flex items-center gap-2 h-12 px-3 border border-gray-300 rounded-full bg-white cursor-pointer">
            <MenuIcon className="text-gray-600" />
            {!userProfile ? (
              <Person className="text-gray-600" />
            ) : (
              <img
                src={userProfile.fotoPerfil || "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png"}
                alt="profile photo"
                className="w-10 h-10 object-cover rounded-full"
              />
            )}
          </IconButton>

          {dropdownMenu && !userProfile && (
            <div className="absolute bg-white right-16 top-20 flex flex-col w-52 p-2 border border-gray-200 rounded-xl shadow-lg z-50 sm:right-5">
              <Link to="/login" className="p-2 text-blue-600 font-bold hover:text-pink-600 hover:bg-gray-100">Log In</Link>
              <Link to="/register" className="p-2 text-blue-600 font-bold hover:text-pink-600 hover:bg-gray-100">Sign Up</Link>
            </div>
          )}

          {dropdownMenu && userProfile && (
            <div className="absolute bg-white right-16 top-20 flex flex-col w-52 p-2 border border-gray-200 rounded-xl shadow-lg z-50 sm:right-5">
              <Link to="/home" className="p-2 text-blue-600 font-bold hover:text-pink-600 hover:bg-gray-100">Home</Link>
              <Link to="/publicarAlojamiento" className="p-2 text-blue-600 font-bold hover:text-pink-600 hover:bg-gray-100">Publicar</Link>
              <a href="#" onClick={handleLogout} className="p-2 text-blue-600 font-bold hover:text-pink-600 hover:bg-gray-100">Log Out</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
