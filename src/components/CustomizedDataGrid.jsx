import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { columns } from '../internals/data/gridData';
import { useData } from '../DataContext';
import { useRows } from '../RowsContext';

export default function CustomizedDataGrid({ selectedRowIds, setSelectedRowIds, page }) {
  const { db } = useData();
  const { rows, setRows } = useRows();

  React.useEffect(() => {
    if (db && db.data) {
      const dataEntries = page == "Home" ? Object.entries(db.data) : Object.entries(db.bin);
      const arrOfRows = dataEntries.map(([key, value]) =>
        Object.assign({}, value, { id: key })
      );
      setRows(arrOfRows);
    }
  }, [db, setRows]);

  let thisColumns = columns;
  if (page == "Bin") {
    thisColumns = columns.filter(e => e.field !== "action")
  }

  // Function to handle the button click
  const handleButtonClick = () => {
    // Ensure the selectedRowIds are logged correctly
    console.log('Selected Row IDs:', selectedRowIds);

    // Process the selected rows as needed
    selectedRowIds.forEach((id) => {
      // Perform an action with each selected row ID
      console.log(`Processing row with ID: ${id}`);
    });
  };

  return (
    <div>
      {/* <Button
        variant="contained"
        color="primary"
        onClick={handleButtonClick}
        style={{ marginBottom: '16px' }}
      >
        Process Selected Rows
      </Button> */}
      <DataGrid
        autoHeight
        checkboxSelection
        rows={rows}
        columns={thisColumns}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
        }}
        pageSizeOptions={[10, 20, 50]}
        disableColumnResize
        density="compact"
        onRowSelectionModelChange={(newSelectionModel) => {
          setSelectedRowIds(newSelectionModel);
        }}
        selectionModel={selectedRowIds} // Ensure the selected rows are maintained in state
      />
    </div>
  );
}