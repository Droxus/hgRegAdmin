import React from 'react';
import { Button, ButtonGroup, Tooltip, Box } from '@mui/material/';
import CopyIcon from "@mui/icons-material/ContentCopy"
import DownloadIcon from "@mui/icons-material/Download"
import DeleteIcon from "@mui/icons-material/Delete"
import RecyclingIcon from '@mui/icons-material/Recycling';
import { useData } from '../DataContext';
import { useRows } from '../RowsContext';

const AboveTablePanel = ({ selectedRowIds, page }) => {
  const { db } = useData();
  const { setRows } = useRows();

  function updateRows() {
    if (page == "Home" && db && db.data) {
      const dataEntries = Object.entries(db.data);
      const arrOfRows = dataEntries.map(([key, value]) =>
        Object.assign({}, value, { id: key })
      );
      setRows(arrOfRows);
    } else if (page == "Bin" && db && db.bin) {
      const dataEntries = Object.entries(db.bin);
      const arrOfRows = dataEntries.map(([key, value]) =>
        Object.assign({}, value, { id: key })
      );
      setRows(arrOfRows);
    }
  }

  const handleCopy = () => {
    const arrayOfDocs = (page == "Home") ? 
    selectedRowIds.map((rowId) => db.data[rowId]) : 
    selectedRowIds.map((rowId) => db.bin[rowId])
    const jsonString = JSON.stringify(arrayOfDocs, null, 2);
    navigator.clipboard.writeText(jsonString)
      .then(() => {
        console.log('Object copied to clipboard successfully!');
      })
      .catch(err => {
        console.error('Failed to copy object to clipboard:', err);
      });
    console.log('Docs are copied!');
  };

  function downloadFile(obj, fileName, fileType) {
    const jsonString = JSON.stringify(obj, null, 2);
    const blob = new Blob([jsonString], { type: 'text/plain' });
    const link = document.createElement('a');
    link.download = `${fileName}.${fileType}`;
    link.href = window.URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } 

  const handleDownload = () => {
    const fileType = ".txt"
    const arrayOfDocs = (page == "Home") ? 
    selectedRowIds.map((rowId) => db.data[rowId]) : 
    selectedRowIds.map((rowId) => db.bin[rowId])
    arrayOfDocs.forEach((thisDoc) => {
      const fileName = `Info_Reg_${thisDoc.name ?? "Name"}_${thisDoc.surname ?? "Surname"}`;
      downloadFile(thisDoc, fileName, fileType)
    })
    console.log('Download button clicked');
  };

  const handleRecover = async () => {
    try {
      await Promise.all(selectedRowIds.map((id) => db.recoverDoc(id)));
  
      updateRows();
  
      console.log('Recover button clicked and all documents deleted.');
    } catch (error) {
      console.error('Error recovering documents:', error);
    }
    console.log('Recover button clicked');
  };

  const handleDelete = async () => {
      try {
        if (page == "Home") {
          await Promise.all(selectedRowIds.map((id) => db.deleteDoc(id)));
        } else {
          await Promise.all(selectedRowIds.map((id) => db.deleteDocFromBin(id)));
        }
    
        updateRows();
    
        console.log('Delete button clicked and all documents deleted.');
      } catch (error) {
        console.error('Error deleting documents:', error);
      }
  };

  return (
    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end', padding: 2 }}>
      <ButtonGroup aria-label="action buttons"
      sx={{
        backgroundColor: '#f5f6fa',
        border: '1px solid #e5e7ed',
        borderRadius: 1,
      }}>
        {page == "Bin" && 
          <Tooltip title="Recover">
            <Button
              onClick={handleRecover}
              startIcon={<RecyclingIcon />}
              sx={{
                backgroundColor: '#f5f6fa',
                border: 'none', // Remove default border
                '&:hover': {
                  backgroundColor: '#ecedf1', // Lighter shade on hover
                },
                '&.Mui-disabled': {
                  backgroundColor: '#f5f6fa', // Ensure disabled state color
                },
                borderRadius: 1, // Optional: adjust border radius
                fontSize: '0.875rem', // Smaller font size
                padding: '12px 12px', // Adjust padding to make the button smaller
                margin: '0px 2px',
                outline: 'none',
              }}
            >
              Recover
            </Button>
          </Tooltip>
        }
        <Tooltip title="Copy">
          <Button
            onClick={handleCopy}
            startIcon={<CopyIcon />}
            sx={{
              backgroundColor: '#f5f6fa',
              border: 'none', // Remove default border
              '&:hover': {
                backgroundColor: '#ecedf1', // Lighter shade on hover
              },
              '&.Mui-disabled': {
                backgroundColor: '#f5f6fa', // Ensure disabled state color
              },
              borderRadius: 1, // Optional: adjust border radius
              fontSize: '0.875rem', // Smaller font size
              padding: '12px 12px', // Adjust padding to make the button smaller
              margin: '0px 2px',
              outline: 'none',
            }}
          >
            Copy
          </Button>
        </Tooltip>
        <Tooltip title="Download">
          <Button
            onClick={handleDownload}
            startIcon={<DownloadIcon />}
            sx={{
              backgroundColor: '#f5f6fa',
              border: 'none', // Remove default border
              '&:hover': {
                backgroundColor: '#ecedf1', // Lighter shade on hover
              },
              '&.Mui-disabled': {
                backgroundColor: '#f5f6fa', // Ensure disabled state color
              },
              borderRadius: 1, // Optional: adjust border radius
              fontSize: '0.875rem', // Smaller font size
              padding: '12px 12px', // Adjust padding to make the button smaller
              margin: '0px 2px',
              outline: 'none',
            }}
          >
            Download
          </Button>
        </Tooltip>
        <Tooltip title="Delete">
          <Button
            onClick={handleDelete}
            startIcon={<DeleteIcon />}
            sx={{
              backgroundColor: '#f5f6fa',
              border: 'none', // Remove default border
              '&:hover': {
                backgroundColor: '#ecedf1', // Lighter shade on hover
              },
              '&.Mui-disabled': {
                backgroundColor: '#f5f6fa', // Ensure disabled state color
              },
              borderRadius: 1, // Optional: adjust border radius
              fontSize: '0.875rem', // Smaller font size
              padding: '12px 12px', // Adjust padding to make the button smaller
              margin: '0px 2px',
              outline: 'none',
            }}
          >
            Delete
          </Button>
        </Tooltip>
      </ButtonGroup>
    </Box>
  );
};
export default AboveTablePanel;