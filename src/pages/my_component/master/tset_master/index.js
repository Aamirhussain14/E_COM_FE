/* eslint-disable arrow-body-style */
import React from 'react';
import { TestContextProvider } from './store/TestContextProvider';
import FieldArrayExample from './FieldArrayExample';
import MyForm from './MyForm';

const index = () => {
  return (
    <TestContextProvider>
      <h1>Hello context</h1>
      <FieldArrayExample />
      {/* <MyForm /> */}
    </TestContextProvider>
  );
};

export default index;
