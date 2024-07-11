import React from "react";
import Topbar from "../../components/TopBar/TopBar";
import Sidebar from "../../components/sideBar/sideBar";
import Postear from "../../components/Postear/Postear";
import ScrollablePosts from "../../components/ScrollablePosts/ScrollablePosts";

const HomePage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Topbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col items-center p-5 justify-start overflow-auto">
          <div className="w-full lg:w-2/4 mb-5">
            <Postear />
          </div>
          <div className="w-full lg:w-2/4">
            <ScrollablePosts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
