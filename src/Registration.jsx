import './App.css';
import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import Loader from './Loader'; // Adjust the path as needed
import { useData } from './DataContext'; // Adjust the path as needed
import Dashboard from "./Dashboard"

function Registration() {
  const { db, loading, userLoggedIn, error } = useData();
  const [signInLoading, setSignInLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSignIn = async () => {
    setSignInLoading(true);
    setShowError(false);

    try {
      const isAuthenticated = await db.checkUserLoginStatus();
      if (isAuthenticated) {
        await db.updateData(); // Fetch data after sign-in
      } else {
        await db.signInWithGoogle();
      }
    } catch (err) {
      setShowError(true);
    } finally {
      setSignInLoading(false);
    }
  };

  if (loading || signInLoading) {
    return <Loader />;
  }

  if (userLoggedIn) {
    return <Dashboard />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#fff',
        position: 'relative',
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        {showError && (
          <Typography variant="h6" color="error" sx={{ mb: 2 }}>
            Oops, something went wrong.
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSignIn}
          sx={{
            width: '200px',
            height: '60px',
            fontSize: '1.2rem',
            textTransform: 'none',
          }}
        >
          Sign In
        </Button>
      </Box>
    </Box>
  );
}

export default Registration;