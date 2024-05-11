import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {

  const [data, setData] = useState('default value');

  const updateData = (newData) => {
    setData(newData);
  };

  return (
    <UserContext.Provider value={{ data, updateData }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };