// sideBar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChatIcon from "@mui/icons-material/Chat";
import PlaceIcon from "@mui/icons-material/Place";
import ApartmentIcon from "@mui/icons-material/Apartment";

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <div className="w-64 h-full bg-blue-700 text-white p-4 fixed">
            <div className="mb-4 cursor-pointer" onClick={() => navigate('/messaging')}>
                <ChatIcon className="mr-2" /> Mensajería
            </div>
            <div className="mb-4 cursor-pointer" onClick={() => navigate('/places')}>
                <PlaceIcon className="mr-2" /> Lugares
            </div>
            <div className="mb-4 cursor-pointer" onClick={() => navigate('/dashboard')}>
                <ApartmentIcon className="mr-2" /> Apartamentos
            </div>
        </div>
    );
}

export default Sidebar;
