import {
  Box,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridToolbarExport,
} from "@mui/x-data-grid";
import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import "../../Switcher.scss";
import axios from "axios";
import { api } from "../../mockData";
import useMediaQuery from "@mui/material/useMediaQuery";
import ClearIcon from "@mui/icons-material/Clear";
import { InputAdornment } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles({
  borderedGreen: {
    borderLeft: "3px solid green", // Add your border styling here
    boxShadow: "2px -1px 4px -3px #686868",
    margin: "4px 4px 1px 4px !important",
  },
  borderedRed: {
    borderLeft: "3px solid red", // Add your border styling here
    boxShadow: "2px -1px 4px -3px #686868",
    margin: "4px 4px 1px 4px !important",
  },
  formControl: {
    "& .MuiInputBase-root": {
      color: "#666",
      borderColor: "transparent",
      borderWidth: "1px",
      borderStyle: "solid",
      height: "45px",
      minWidth: "120px",
      justifyContent: "center",
    },
    "& .MuiSelect-select.MuiSelect-select": {
      paddingRight: "0px",
    },
    "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
      top: "-4px !important",
    },
  },
  select: {
    width: "auto",
    fontSize: "12px",
    "&:focus": {
      backgroundColor: "transparent",
    },
  },
  selectIcon: {
    position: "relative",
    color: "#6EC177",
    fontSize: "14px",
  },
  paper: {
    borderRadius: 12,
    marginTop: 8,
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
    "& li": {
      fontWeight: 200,
      paddingTop: 8,
      paddingBottom: 8,
      fontSize: "12px",
    },
    "& li.Mui-selected": {
      color: "white",
      background: "#6EC177",
    },
    "& li.Mui-selected:hover": {
      background: "#6EC177",
    },
  },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const theme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          "& .MuiDataGrid-row": {
            minHeight: "auto", // Adjust row height to make it more compact
          },
        },
      },
      defaultProps: {
        density: "compact", // Set default density to compact
      },
    },
  },
});

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarDensitySelector />
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function AdminCMU({ colorThem }) {
  const token = JSON.parse(localStorage.getItem("admin"));
  const [values, setValues] = useState("");
  const [searchUserName, setSearchUserName] = useState("");
  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${api.dev}/api/cmu`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token} `,
      },
    };
    axios
      .request(config)
      .then((response) => {
        setValues(response?.data);
      })
      .catch((error) => {});
  }, []);

  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const columns = [
    {
      field: "username",
      headerName: "User Name",
      headerClassName: "custom-header",
      flex: 1,
      width: isXs ? 100 : "100%",
      minWidth: 100,
      maxWidth: "100%",
      headerAlign: "start",
      align: "start",
      cellClassName: "super-app-theme--cell",
      renderCell: (params) => (
        <span
          style={{
            textTransform: "capitalize",
            fontSize: "calc(0.6rem + 0.3vw)",
          }}
        >
          {params.row.username}
        </span>
      ),
    },
    {
      field: "extensions_limit",
      headerName: "Extensions Limit",
      headerClassName: "custom-header",
      flex: 1,
      width: isXs ? 90 : "100%",
      minWidth: 90,
      maxWidth: "100%",
      headerAlign: "start",
      align: "start",
      cellClassName: "super-app-theme--cell",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{
            fontSize: "calc(0.6rem + 0.15vw)",
            fontWeight: "bold",
            "&.MuiTypography-root": { color: "#fff !important" },
          }}
        >
          {isSmallScreen ? "Extn Limit" : "Extensions Limit"}
        </Typography>
      ),
      renderCell: (params) => (
        <span
          style={{
            textTransform: "capitalize",
            fontSize: "calc(0.6rem + 0.3vw)",
          }}
        >
          {params.row.extensions_limit}
        </span>
      ),
    },
    {
      field: "deactive_extension",
      headerName: "Deactive Extension",
      headerClassName: "custom-header",
      flex: 1,
      width: isXs ? 90 : "100%",
      minWidth: 90,
      maxWidth: "100%",
      headerAlign: "start",
      align: "start",
      cellClassName: "super-app-theme--cell",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{
            fontSize: "calc(0.6rem + 0.15vw)",
            fontWeight: "bold",
            "&.MuiTypography-root": { color: "#fff !important" },
          }}
        >
          {isSmallScreen ? "Deac Extn" : "Deactive Extension"}
        </Typography>
      ),
      renderCell: (params) => (
        <span
          style={{
            textTransform: "capitalize",
            fontSize: "calc(0.6rem + 0.3vw)",
          }}
        >
          {params.row.deactive_extension}
        </span>
      ),
    },
    {
      field: "number_of_extensions",
      headerName: "Number of Extensions",
      headerClassName: "custom-header",
      flex: 1,
      width: isXs ? 90 : "100%",
      minWidth: 90,
      maxWidth: "100%",
      headerAlign: "start",
      align: "start",
      cellClassName: "super-app-theme--cell",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{
            fontSize: "calc(0.6rem + 0.15vw)",
            fontWeight: "bold",
            "&.MuiTypography-root": { color: "#fff !important" },
          }}
        >
          {isSmallScreen ? "TFN" : "Number of Extensions"}
        </Typography>
      ),
      renderCell: (params) => (
        <span
          style={{
            textTransform: "capitalize",
            fontSize: "calc(0.6rem + 0.3vw)",
          }}
        >
          {params.row.number_of_extensions}
        </span>
      ),
    },
    {
      field: "billing_type",
      headerName: "Plan",
      flex: 1,
      width: isXs ? 60 : "100%",
      minWidth: 60,
      maxWidth: "100%",
      headerClassName: "custom-header",
      headerAlign: "start",
      align: "start",
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.3vw)" }} // Match header size or set your own
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "monthly_used_minute",
      headerName: "Monthly Used Minute",
      flex: 1,
      width: isXs ? 70 : "100%",
      minWidth: 70,
      maxWidth: "100%",
      headerClassName: "custom-header",
      headerAlign: "start",
      align: "start",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{
            fontSize: "calc(0.6rem + 0.15vw)",
            fontWeight: "bold",
            "&.MuiTypography-root": { color: "#fff !important" },
          }}
        >
          {isSmallScreen ? "MUM" : "Monthly Used Minute"}
        </Typography>
      ),
      renderCell: (params) => (
        <span
          style={{
            textTransform: "capitalize",
            fontSize: "calc(0.6rem + 0.3vw)",
          }}
        >
          {params.row.monthly_used_minute}
        </span>
      ),
    },
  ];

  const rows = useMemo(() => {
    const calculatedRows = [];
    values?.data &&
    values?.data?.forEach((item, index) => {
        calculatedRows.push({
          id: index + 1,
          billing_type: item.plan,
          reseller_id: item.reseller_id,
          username: item.user_username,
          created_date: item.created_date,
          extensions_limit: item.extensions_limit,
          remaining_minutes: item.remaining_minutes,
          total_minutes: item.total_minutes,
          monthly_used_minute: item.monthly_used_minute,
          deactive_extension: item.deactive_extension,
          user_id: item.user_id,
          cmu_id: item.id,
          number_of_extensions: item.total_no_of_extension,
          current_month_used_minute : item.current_month_used_minute,
        });
      });
    return calculatedRows;
  }, [values?.data]);

  const filteredRows = rows.filter((row) =>
    row.username?.toLowerCase().includes(searchUserName.toLowerCase())
  );

  return (
    <div className={`App ${colorThem} `}>
      <div className="contant_box">
        <Box
          className="right_sidebox mobile_top_pddng"
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="">
                  {/* <!----> */}
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="pills-home"
                      role="tabpanel"
                      aria-labelledby="pills-home-tab"
                    >
                      {/* <!--role-contet--> */}
                      <div className="">
                        <div
                          className="cntnt_title"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            <h3>Current Month Used</h3>
                            {/* <p>Use this to configure your Minutes.</p> */}
                          </div>
                          <Box sx={{ width: "auto" }}>
                            <TextField
                              size="small"
                              fullWidth
                              variant="outlined"
                              placeholder="Search Username..."
                              value={searchUserName} // Controlled by internal state
                              onChange={(e) =>
                                setSearchUserName(e.target.value)
                              } // Updates the state
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <SearchIcon fontSize="small" />
                                  </InputAdornment>
                                ),
                                endAdornment: searchUserName && ( // Show clear button only when there's input
                                  <InputAdornment position="end">
                                    <IconButton
                                      edge="end"
                                      size="small"
                                      sx={{ mr: -1 }}
                                      onClick={() => setSearchUserName("")} // Clears the input
                                    >
                                      <ClearIcon fontSize="small" />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                                sx: {
                                  fontSize: { xs: "0.875rem", sm: "1rem" },
                                  height: { xs: "36px", sm: "40px" },
                                },
                              }}
                            />
                          </Box>
                        </div>

                        <ThemeProvider theme={theme}>
                          <div
                            style={{
                              height: "100%",
                              width: "100%",
                              overflowY: "auto",
                            }}
                          >
                            <DataGrid
                              rows={filteredRows}
                              columns={columns}
                              density="compact"
                              headerClassName="custom-header"
                              components={{ Toolbar: GridToolbar }}
                              slots={{
                                toolbar: CustomToolbar,
                              }}
                              autoHeight
                              sx={{
                                "& .MuiDataGrid-toolbarContainer": {
                                  gap: "1px", // Spacing between buttons
                                },
                                "& .MuiButton-root": {
                                  // Targets all buttons (filter, export, density)
                                  fontSize: "calc(0.6rem + 0.4vw)", // Button text size
                                  minWidth: "unset", // Remove minimum width constraint
                                },
                                "& .MuiSvgIcon-root": {
                                  // Icons inside buttons
                                  fontSize: "calc(0.6rem + 0.4vw)", // Adjust icon size
                                },
                              }}
                            />
                          </div>
                        </ThemeProvider>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default AdminCMU;
