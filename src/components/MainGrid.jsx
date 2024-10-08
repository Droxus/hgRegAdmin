import * as React from "react";
import Box from "@mui/material/Box";
import HomePage from "./HomePage";
import AnalyticsPage from "./AnalyticsPage"
import BinPage from "./BinPage"

export default function MainGrid({ page }) {
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
        {page === "Home" && <HomePage />}
        {page === "Analytics" && <AnalyticsPage />}
        {page === "Bin" && <BinPage />}
    </Box>
  );
}
