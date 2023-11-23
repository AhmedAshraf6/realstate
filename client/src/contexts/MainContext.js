'use client';
import { domainUrl } from '@/utils/axios';
import { getUserFromLocalStorage } from '@/utils/localStorage';
import React, { useEffect, useState } from 'react';
import { createContext, useContext } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
const MainContext = createContext();
const getSocket = () => {
  const socket = io(domainUrl);
  return socket;
};

export default function MainProvider({ children }) {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    setSocket(getSocket());
  }, []);
  return (
    <MainContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
export const useMainContext = () => {
  return useContext(MainContext);
};
