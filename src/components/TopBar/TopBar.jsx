import React, { useState } from 'react';
import { Search, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ConnectLogo from '../ConnectLogo/ConnectLogo';
import HeaderTabs from '../header/HeaderTabs';

const Topbar = () => {
  const [search, setSearch] = useState(""); 
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search) {
      navigate(`/properties/search/?q=${search}`);
    }
  };

  return (
    <div className="w- h-16 bg-slate-200 flex items-center justify-between sticky top-0 z-50 px-6 md:px-4">
      <div className="flex-1 flex justify-between items-center py-2 px-16 md:px-5 relative items-center">
        <ConnectLogo className="text-white text-xl font-bold cursor-pointer" onClick={() => navigate("/")} />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-80 h-12 bg-white rounded-full flex items-center px-4 shadow-lg">
          <Search className="text-gray-500" />
          <input
            type="text"
            placeholder="Buscar en Connect"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-none w-full outline-none ml-2"
          />
          <button
            onClick={handleSearch}
            className="text-gray-500 ml-2"
          >
            Buscar
          </button>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-end">
        <div className="flex items-center">
          <div className="relative mr-4 cursor-pointer" onClick={() => navigate("/home")}>
            <Person className="text-white" />
            <span className="w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center absolute top-0 right-0 text-xs">1</span>
          </div>
          <div className="flex items-center gap-2">
            <HeaderTabs />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
