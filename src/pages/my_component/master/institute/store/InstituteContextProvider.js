/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useCallback, useEffect, useReducer } from 'react';
import axios from '../../../../../utils/axios';

import { InstituteReducer } from './InstituteReducer';

export const InstituteContext = createContext();
export const InstituteContextProvider = (props) => {
  const [state, dispatchInstitute] = useReducer(InstituteReducer, {
    payload: [],
    data: {},
    success: false,
  });

  useEffect(() => {
    dataInstituteHandler();
  }, []);

  //   const dataHandler = () => {
  //     axios.get('/v1/institutes/list').then((response) => {
  //         console.log(response, 'response');
  //     })
  //   }

  const dataInstituteHandler = useCallback(async () => {
    try {
      const response = await axios.get('/v1/institutes/list');
      console.log(response, 'response');
      dispatchInstitute({
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
    <InstituteContext.Provider value={[state, dispatchInstitute, dataInstituteHandler]}>
      {props.children}
    </InstituteContext.Provider>
  );
};
