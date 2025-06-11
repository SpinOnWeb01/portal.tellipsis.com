import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
//import { makeStyles } from "@mui/styles";
import "../../Switcher.scss";
import socketIOClient from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SearchIcon from "@mui/icons-material/Search";
import { getAdminCallActive } from "../../redux/actions/adminPortal/adminPortal_callActiveAction";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import {
  getAdminBillingMinutes,
  getAdminTotalMinutes,
} from "../../redux/actions/adminPortal/adminPortal_minutesAction";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
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
      top: "-4px",
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

function AdminBillingMinut({ colorThem }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [tMinutes, setTMinutes] = useState(0);
  const [response, setResponse] = useState("");
  const [fromDate, setFromDate] = useState(dayjs().format("DD/MM/YYYY"));
  const [toDate, setToDate] = useState(dayjs().format("DD/MM/YYYY"));

  // const MenuProps = {
  //   PaperProps: {
  //     style: {
  //       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
  //       width: 250,
  //     },
  //   },
  //   classes: {
  //     list: classes.list,
  //     paper: classes.paper,
  //   },
  //   anchorOrigin: {
  //     vertical: "bottom",
  //     horizontal: "center",
  //   },
  //   transformOrigin: {
  //     vertical: "top",
  //     horizontal: "center",
  //   },
  //   getContentAnchorEl: null,
  // };

  const handleFromDateChange = (date) => {
    if (dayjs(date, "DD/MM/YYYY", true).isValid()) {
      // Convert the selected date to the desired format before updating state
      setFromDate(dayjs(date).format("DD/MM/YYYY"));
    } else {
      setFromDate(null);
    }
  };

  const handleToDateChange = (date) => {
    if (dayjs(date, "DD/MM/YYYY", true).isValid()) {
      // Convert the selected date to the desired format before updating state
      setToDate(dayjs(date).format("DD/MM/YYYY"));
    } else {
      setToDate(null);
    }
  };
  useEffect(() => {
    let data = JSON.stringify({
      from_date: dayjs().format("YYYY-MM-DD"),
      to_date: dayjs().format("YYYY-MM-DD"),
    });
    // dispatch(getReport(data));
    // dispatch(getAllUsers(""));
  }, [dispatch, response]);

  const handleSearch = (e) => {
    // Convert fromDate and toDate to YYYY-MM-DD format
    e.preventDefault();
    const formattedFromDate = fromDate
      ? dayjs(fromDate, "DD/MM/YYYY").format("YYYY-MM-DD")
      : null;
    const formattedToDate = toDate
      ? dayjs(toDate, "DD/MM/YYYY").format("YYYY-MM-DD")
      : null;
    let data = JSON.stringify({
      from_date: formattedFromDate,
      to_date: formattedToDate,
    });
    dispatch(getAdminTotalMinutes(data, setTMinutes));
  };

  const handleReset = (e) => {
    e.preventDefault();
    setTMinutes(0);
  };

  useEffect(() => {
    dispatch(getAdminBillingMinutes());
    dispatch(getAdminCallActive());
  }, []);

  const classes = useStyles();

  const columns = [
    {
      field: "username",
      headerName: "Username",
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      width: 100,
    },
    {
      field: "monthly_minutes",
      headerName: "Monthly Usage Minutes",
      width: 150,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },

    {
      field: "total_billsec",
      headerName: "Bill Sec",
      width: 150,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
  ];
  const rows = useMemo(() => {
    const calculatedRows = [];
    state?.getAdminBillingMinutes?.billingminutes &&
      state?.getAdminBillingMinutes?.billingminutes?.forEach((item, index) => {
        calculatedRows.push({
          id: index + 1,
          username: item?.username,
          monthly_minutes: item?.monthly_minutes,
          total_billsec: item?.total_billsec,
        });
      });
    return calculatedRows;
  }, [state?.getAdminBillingMinutes?.billingminutes]);

  return (
    <>
      <div className={`App ${colorThem} `}>
        <div className="contant_box" style={{ height: "100vh" }}>
          <Box
            className="right_sidebox mobile_top_pddng"
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
          >
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
                    <div className="cntnt_title">
                      <div className="">
                        <h3>Usage Minutes</h3>
                        {/* <p>
                          Use this to monitor and interact with the active
                          calls.
                        </p> */}
                      </div>
                    </div>
                    <Grid
                      container
                      className="cdr_filter_row"
                      style={{
                        padding: "20px 0",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Grid
                        xl={3}
                        lg={3}
                        md={3}
                        sm={12}
                        xs={12}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LocalizationProvider
                          dateAdapter={AdapterDayjs}
                          className={classes.borderedGreen}
                        >
                          <DemoContainer
                            components={["DatePicker"]}
                            sx={{ width: "98%" }}
                          >
                            <DatePicker
                              label="From Date"
                              style={{ width: "300px" }}
                              value={
                                fromDate ? dayjs(fromDate, "DD/MM/YYYY") : null
                              } // Convert selectedDate to a dayjs object
                              onChange={handleFromDateChange}
                              renderInput={(props) => <TextField {...props} />}
                              format="DD/MM/YYYY"
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </Grid>
                      <Grid
                        xl={3}
                        lg={3}
                        md={3}
                        sm={12}
                        xs={12}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <LocalizationProvider
                          dateAdapter={AdapterDayjs}
                          className={classes.formControl}
                        >
                          <DemoContainer
                            components={["DatePicker"]}
                            sx={{ width: "98%" }}
                          >
                            <DatePicker
                              label="To Date"
                              style={{ width: "98%" }}
                              value={
                                toDate ? dayjs(toDate, "DD/MM/YYYY") : null
                              } // Convert selectedDate to a dayjs object
                              onChange={handleToDateChange}
                              renderInput={(props) => <TextField {...props} />}
                              format="DD/MM/YYYY"
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      className="cdr_filter_row"
                      style={{
                        padding: "20px 0",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Grid
                        xl={12}
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Box
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <Typography
                            style={{
                              fontSize: "17px",
                              fontWeight: "600",
                              color: "#04255c",
                            }}
                          >
                            Total Used Minute:-{" "}
                            <span style={{ fontWeight: "400" }}>
                              {tMinutes}
                            </span>
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid
                        xl={12}
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "end",
                          padding: "20px 0",
                        }}
                      >
                        <IconButton
                          className="filter_search_btn"
                          style={{
                            marginLeft: "0 !important",
                            background: "green !important",
                          }}
                          onClick={handleSearch}
                        >
                          Search &nbsp;
                          <SearchIcon />
                        </IconButton>
                        <IconButton
                          className="filter_reset_btn"
                          style={{
                            marginLeft: "0 !important",
                            backgroundColor: "grey !important",
                          }}
                          onClick={handleReset}
                        >
                          Reset &nbsp;
                          <RestartAltIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                    <div className="row">
                      <ThemeProvider theme={theme}>
                        <div style={{ height: "100%", width: "100%" }}>
                          <DataGrid
                            // checkboxSelection
                            rows={rows}
                            columns={columns}
                            headerClassName="custom-header"
                            // getRowClassName={(params) =>
                            //   isRowBordered(params)
                            //     ? classes.borderedGreen
                            //     : classes.borderedRed
                            // }
                            components={{ Toolbar: GridToolbar }}
                            slots={{
                              toolbar: CustomToolbar,
                            }}
                            autoHeight
                          />
                        </div>
                      </ThemeProvider>
                    </div>
                  </div>

                  {/* <!----> */}
                  {/* 
            <!----> */}
                </div>
                {/* <!----> */}
              </div>
            </div>
          </Box>
        </div>
      </div>
    </>
  );
}

export default AdminBillingMinut;
