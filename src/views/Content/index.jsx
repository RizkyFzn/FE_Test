import React from 'react';
import { useSelector } from 'react-redux';
import DashboardComponent from '../../components/ContentComponent/DashboardComponent';
import MasterDataGerbang from '../../components/ContentComponent/MasterDataGerbang';
import LalinComponent from '../../components/ContentComponent/LalinComponent';

const Content = () => {
  const activeContent = useSelector((state) => state.content.activeContent);

  const renderContent = () => {
    switch (activeContent) {
      case 'dashboard':
        return <DashboardComponent />;
      case 'lalin':
        return <LalinComponent />;
      case 'masterdata':
        return <MasterDataGerbang />;
      default:
        return <DashboardComponent />;
    }
  };

  return (
    <div className='bg-blue-50 flex-grow p-3'>
      {renderContent()}
    </div>
  );
};

export default Content;
