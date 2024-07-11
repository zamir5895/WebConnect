import React from 'react';
import { Search, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ConnectLogo from '../ConnectLogo/ConnectLogo';
import HeaderTabs from '../header/HeaderTabs';

const Topbar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-12 bg-blue-900 flex items-center justify-between sticky top-0 z-50 fixed">
      <div className="flex-1 flex items-center">
        <ConnectLogo className="text-white text-xl font-bold cursor-pointer ml-5" onClick={() => navigate("/")}/>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-3/4 h-8 bg-white rounded-full flex items-center px-2">
          <Search className="text-gray-500" />
          <input
            placeholder="Buscar en Connect"
            className="border-none w-full outline-none"
          />
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
