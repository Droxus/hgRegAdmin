import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DataProvider } from './DataContext';
import { RowsProvider } from './RowsContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider>
      <RowsProvider>
      <App />
      </RowsProvider>
    </DataProvider>
  </StrictMode>,
)
