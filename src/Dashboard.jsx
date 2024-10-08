import * as React from 'react';

import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './components/AppNavbar';
import Header from './components/Header';
import MainGrid from './components/MainGrid';
import SideMenu from './components/SideMenu';
import PopupDetails from './components/PopupDetails';
import AppTheme from './shared-theme/AppTheme';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from './theme/customizations';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

const PopupContext = React.createContext();

function PopupProvider({ children }) {
  const [isPopupOpened, setPopupOpened, selectedParam] = React.useState(false);
  
  return (
    <PopupContext.Provider value={{ isPopupOpened, setPopupOpened }}>
      {children}
      {isPopupOpened && <PopupDetails isPopupOpened={isPopupOpened} setPopupOpened={setPopupOpened} selectedParam={selectedParam}/>}
    </PopupContext.Provider>
  );
}

export function usePopup() {
  return React.useContext(PopupContext);
}

export default function Dashboard(props) {
  const [page, setPage] = React.useState("Home");

  return (
    <PopupProvider>
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu page={page} setPage={setPage}/>
        <AppNavbar />
        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
         {/* <PopupDetails/> */}
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 5,
              pb: 10,
              mt: { xs: 8, md: 1 },
            }}
          >
            <Header page={page}/>
            <MainGrid page={page} />
          </Stack>
        </Box>
      </Box>
    </AppTheme>
    </PopupProvider>
  );
}