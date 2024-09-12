// import './App.css';
// import React, { useState } from 'react';
// import { Button, Box, Typography } from '@mui/material';
// import Loader from './Loader'; // Adjust the path as needed
// import { useData } from './DataContext'; // Adjust the path as needed

// // Dummy function for authentication state
// const inAuthState = async () => {
//   // Simulate an API call to check authentication state
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       // Replace with actual authentication check
//       resolve(false); // true if authenticated, false otherwise
//     }, 1000);
//   });
// };

// function Registration() {
//   const [loading, setLoading] = useState(false);
//   const [signedIn, setSignedIn] = useState(false);

//   const handleSignIn = async () => {
//     setLoading(true);

//     const isAuthenticated = await inAuthState();
//     setLoading(false);

//     if (isAuthenticated) {
//       setSignedIn(true); // User is already signed in
//     }
//     // Handle sign-in logic here if needed
//   };

//   if (signedIn) {
//     return <Dashboard />; // Render Dashboard if user is signed in
//   }

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100vh',
//         backgroundColor: '#fff',
//         position: 'relative',
//       }}
//     >
//       {loading && <Loader />}
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleSignIn}
//         sx={{
//           width: '200px',
//           height: '60px',
//           fontSize: '1.2rem',
//           textTransform: 'none',
//           position: 'relative',
//         }}
//       >
//         Sign In
//       </Button>
//     </Box>
//   );
// }

// export default Registration;


// Registration.jsx
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