import React, { useState, useEffect } from "react";
import { Avatar, Divider } from "@mui/material";
import { Chat, Place, Apartment, Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from '../../services/api';
import "./sideBar.css";

const Sidebar = () => {
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = await getCurrentUser();
        setUserProfile(user);
        console.log("User Profile", user);
      } catch (error) {
        console.error("Error obteniendo la información del usuario", error);
      }
    };

    fetchUserProfile();
  }, []);

  const navigationMenu = userProfile && userProfile.rol === 'HOST' ? [
    { title: "Inicio", icon: <Home />, path: "/home" },
    { title: "Mensajería", icon: <Chat />, path: "/mensajeria" },
    { title: "Apartamentos", icon: <Apartment />, path: "/hosthome" },
  ] : [
    { title: "Inicio", icon: <Home />, path: "/travelerhome" },
    { title: "Mensajería", icon: <Chat />, path: "/mensajeria" },
    { title: "Lugares", icon: <Place />, path: "/travelerhome" },
  ];

  return (
    <div className="sidebar text-gray-800 h-screen flex flex-col justify-between py-5 bg-slate-300">
      <div className="space-y-8 pl-5">
        <div className="text-2xl font-bold text-yellow-600">
          <span className="logo">Connect ++</span>
        </div>
        <div className="space-y-8">
          {navigationMenu.map((item) => (
            <div
              key={item.title}
              onClick={() => navigate(item.path)}
              className="cursor-pointer flex space-x-3 items-center text-gray-800 hover:text-yellow-600 transition-colors duration-200"
            >
              {item.icon}
              <p className="text-xl">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      {userProfile && (
        <div>
          <Divider className="bg-gray-800" />
          <div className="pl-5 flex items-center justify-between pt-5">
            <div className="flex items-center space-x-3">
              <Avatar
                alt="User Avatar"
                src={userProfile.fotoPerfil || "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png"}
              />
              <div>
                <p className="font-bold text-gray-800">{userProfile.userName}</p>
                <p className="opacity-70">{userProfile.email}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
