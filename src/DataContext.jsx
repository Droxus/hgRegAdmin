import React, { createContext, useState, useEffect } from 'react';
import DataBase from '../db'; // Adjust the path as needed

// Create a Context
const DataContext = createContext();

// Create a Provider component
export const DataProvider = ({ children }) => {
  const [db, setDb] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [selectedParam, setSelectedParam] = useState(null);

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        const database = new DataBase();
        setDb(database);
        const isLoggedIn = await database.checkUserLoginStatus();
        setUserLoggedIn(isLoggedIn);

        if (isLoggedIn) {
          await database.updateData(); // Fetch initial data if logged in
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    initializeDatabase();
  }, []);

  return (
    <DataContext.Provider value={{ db, loading, error, userLoggedIn, selectedParam, setSelectedParam }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use data context
export const useData = () => React.useContext(DataContext);