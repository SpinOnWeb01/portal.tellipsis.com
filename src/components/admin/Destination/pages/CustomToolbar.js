import React from "react";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  GridToolbarExport,
} from "@mui/x-data-grid";

const CustomToolbar = React.memo(() => (
  <GridToolbarContainer>
    <GridToolbarColumnsButton />
    <GridToolbarDensitySelector />
    <GridToolbarFilterButton />
    <GridToolbarExport />
  </GridToolbarContainer>
));

export default CustomToolbar;