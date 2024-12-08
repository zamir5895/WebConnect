import React from 'react';
import ScrollableAlojamientos from '../../components/ScrollableAlojamientos/ScrollableAlojamientos';
import Topbar from '../../components/TopBar/TopBar';

const AlojamientosPage = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
        <Topbar />
      <ScrollableAlojamientos />
    </div>
  );
};

export default AlojamientosPage;
