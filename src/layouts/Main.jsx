import React from 'react';
import NavBar from '../components/NabBar';

export default ({ children }) => {
  console.log('render Main');

  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};
