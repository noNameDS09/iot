import React from 'react';
import HomeScreen from '../../components/Home/Home';

const index = () => {
  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logout pressed');
  };

  return <HomeScreen onLogout={handleLogout} />;
};

export default index;
