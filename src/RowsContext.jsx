import React, { createContext, useState, useContext } from 'react';

// Create a Context for the rows
const RowsContext = createContext();

// Create a Provider component
export const RowsProvider = ({ children }) => {
  const [rows, setRows] = useState([]);

  return (
    <RowsContext.Provider value={{ rows, setRows }}>
      {children}
    </RowsContext.Provider>
  );
};

// Custom hook to use the RowsContext
export const useRows = () => useContext(RowsContext);