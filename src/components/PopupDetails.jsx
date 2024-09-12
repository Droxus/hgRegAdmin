import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Backdrop,
  Fade,
  Modal,
  IconButton,
  Button,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useData } from '../DataContext';
import { useRows } from '../RowsContext';
import { forms } from "../forms"

export default function PopupDetails({ isPopupOpened, setPopupOpened }) {
  const { db, selectedParam } = useData();
  const { setRows } = useRows();
  const thisDoc = db.data[selectedParam] ?? {}
  const thisForm = forms[thisDoc.service] ?? {}
  
  const formDatDefault = Object.entries(thisForm).map(([key, value]) => new Object({
      id: key,
      label: value.labelName ?? "",
      value: thisDoc[key] ?? "",
      type: value.type == "textarea" ? "textarea" : "text",
  }))
  console.log(formDatDefault)
  const [formData, setFormData] = React.useState(formDatDefault);


  const updateFormData = (index, newValue, item) => {
    const updatedData = [...formData];
    updatedData[index].value = newValue;
    thisDoc[item.id] = newValue
    setFormData(updatedData);
  };

  const handleClose = () => setPopupOpened(false);

  function updateRows() {
    if (db && db.data) {
      const dataEntries = Object.entries(db.data);
      const arrOfRows = dataEntries.map(([key, value]) =>
        Object.assign({}, value, { id: key })
      );
      setRows(arrOfRows);
    }
  }

  const handleSave = async () => {
    console.log(thisDoc)
    await db.editDoc(selectedParam, thisDoc)
    console.log(db.data)
    console.log('Doc with id: ' + selectedParam + ' saved!');
    updateRows()
    setPopupOpened(false);
  };

  const handleDelete = async () => {
    await db.deleteDoc(selectedParam)
    console.log('Doc with id: ' + selectedParam + ' deleted!');
    updateRows()
    setPopupOpened(false);
  };

  const handleCopy = () => {
    const jsonString = JSON.stringify(thisDoc, null, 2);

    navigator.clipboard.writeText(jsonString)
      .then(() => {
        console.log('Object copied to clipboard successfully!');
      })
      .catch(err => {
        console.error('Failed to copy object to clipboard:', err);
      });
    console.log('Doc with id: ' + selectedParam + ' copied!');
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
    const fileName = `Info_Reg_${thisDoc.name ?? "Name"}_${thisDoc.surname ?? "Surname"}`;
    const fileType = ".txt"
    downloadFile(thisDoc, fileName, fileType)
    console.log('Doc with id: ' + selectedParam + ' downloaded!');
  };

  return (
    <Modal
      open={isPopupOpened}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(5px)',
        },
      }}
    >
      <Fade in={isPopupOpened}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            height: 800,
            bgcolor: 'background.paper',
            boxShadow: 24,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 1,
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Scrollable Form Content */}
          <Box
            sx={{
              p: 4,
              flexGrow: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {formData.map((item, index) => (
              <Box key={index} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="subtitle1">{item.label}</Typography>
                {item.type === 'text' ? (
                  <TextField
                    variant="outlined"
                    fullWidth
                    value={item.value}
                    onChange={(e) => updateFormData(index, e.target.value, item)}
                  />
                ) : (
                  <TextField
                    variant="outlined"
                    fullWidth
                    value={item.value}
                    onChange={(e) => updateFormData(index, e.target.value, item)}
                    multiline
                    minRows={4}
                  />
                )}
              </Box>
            ))}
          </Box>

          {/* Buttons: Save, Delete, Copy, Download */}
          <Stack
            direction="row"
            spacing={2}
            sx={{
              p: 2,
              justifyContent: 'flex-end',
              borderTop: '1px solid #e0e0e0',
              backgroundColor: 'background.paper',
            }}
          >
            <Button onClick={handleDelete} color="error" variant="contained">
              Delete
            </Button>
            <Button onClick={handleCopy} color="primary" variant="outlined">
              Copy
            </Button>
            <Button onClick={handleDownload} color="primary" variant="outlined">
              Download
            </Button>
            <Button onClick={handleSave} color="primary" variant="contained">
              Save
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
}