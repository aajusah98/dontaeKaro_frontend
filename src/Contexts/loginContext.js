import React, { createContext, useState, useContext, useEffect } from 'react';
import useLocalStorage from '../customHooks/useLocalStorage';

const LoginContext = createContext(null);

export const LoginContextProvider = ({ children }) => {
  const [loginValues, setLoginValues] = useState({ email: '', password: '' });
  const [data, setData] = useLocalStorage('user_details', {});

  return (
    <LoginContext.Provider
      value={{ loginValues, setLoginValues, data, setData }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export function useLoginContext() {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error(
      'useJuicerBaseURL must be used within a LoginContextProvider. Please wrap app in app folder with <LoginContextProvider> to fix this error.'
    );
  }
  return context;
}
