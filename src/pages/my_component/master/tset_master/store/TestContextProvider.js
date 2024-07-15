/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useCallback, useEffect, useReducer } from 'react';
import axios from '../../../../../utils/axios';

import { TestReducer } from './TestReducer';

export const TestContext = createContext();
export const TestContextProvider = (props) => {
  const [state, dispatchTest] = useReducer(TestReducer, {
    payload: [],
    data: {},
    success: false,
  });

  useEffect(() => {
    dataHandler();
  }, []);

  //   const dataHandler = () => {
  //     axios.get('/v1/institutes/list').then((response) => {
  //         console.log(response, 'response');
  //     })
  //   }

  const dataHandler = useCallback(async () => {
    try {
      const response = await axios.get('/v1/institutes/list');
      console.log(response, 'response');
      dispatchTest({
        type: 'GATE_VALUE',
        payload: response.data.data,
        data: {},
        success: false,
      });
    } catch (error) {
      console.error({ error });
    }
  }, []);

  return (
    <TestContext.Provider value={[state, dispatchTest, dataHandler]}>
      {props.children}
    </TestContext.Provider>
  );
};
