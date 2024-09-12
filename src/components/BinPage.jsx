import * as React from "react";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Copyright from "../internals/components/Copyright";
import CustomizedDataGrid from "./CustomizedDataGrid";
import AboveTablePanel from "./AboveTablePanel"

export default function BinPage() {
  const [selectedRowIds, setSelectedRowIds] = React.useState([]);

  return (
    <>
      <Typography component="h2" variant="h6" sx={{ mb: 0 }}>
        Details
      </Typography>
      <Grid container spacing={0} columns={12}>
        <Grid size={{ md: 12, lg: 12 }}>
          <AboveTablePanel selectedRowIds={selectedRowIds} page={"Bin"}/>
        </Grid>
      </Grid>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ md: 12, lg: 12 }}>
          <CustomizedDataGrid selectedRowIds={selectedRowIds} setSelectedRowIds={setSelectedRowIds} page={"Bin"}/>
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </>
  );
}
