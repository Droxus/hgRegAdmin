import React from 'react';
import { Button, ButtonGroup, Tooltip, Box } from '@mui/material/';
import CopyIcon from "@mui/icons-material/ContentCopy"
import DownloadIcon from "@mui/icons-material/Download"
import DeleteIcon from "@mui/icons-material/Delete"

const AboveTablePanel = () => {
  const handleCopy = () => {
    console.log('Copy button clicked');
  };

  const handleDownload = () => {
    console.log('Download button clicked');
  };

  const handleDelete = () => {
    console.log('Delete button clicked');
  };

  return (
    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end', padding: 2 }}>
      <ButtonGroup aria-label="action buttons"
      sx={{
        backgroundColor: '#f5f6fa',
        border: '1px solid #e5e7ed',
        borderRadius: 1,
      }}>
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