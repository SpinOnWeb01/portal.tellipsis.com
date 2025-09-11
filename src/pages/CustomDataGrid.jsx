import { styled } from "@mui/material/styles";
import { DataGrid } from '@mui/x-data-grid';
export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-columnHeader": {
    position: "relative",
  },
  "& .MuiDataGrid-columnHeader .MuiDataGrid-iconButtonContainer": {
    display: "none", // Remove the sort icon container entirely
  },
  "& .MuiDataGrid-columnHeader:hover .MuiDataGrid-menuIcon": {
    visibility: "visible", // Show the menu icon (three dots) on hover
  },
  "& .MuiDataGrid-menuIcon": {
    visibility: "hidden", // Hide the menu icon by default
  },
}));