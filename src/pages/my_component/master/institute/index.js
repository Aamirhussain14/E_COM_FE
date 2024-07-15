/* eslint-disable arrow-body-style */
import React from 'react';
import { InstituteContextProvider } from './store/InstituteContextProvider';
import  InstituteList  from './InstituteList';

const InstituteIndex = () => {
  return (
    <InstituteContextProvider>
      <InstituteList />
    </InstituteContextProvider>
  );
};

export default InstituteIndex;
