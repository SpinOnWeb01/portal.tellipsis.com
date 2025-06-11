import React, { useEffect, useMemo, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Button,
  Fade,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import {
  DataGrid,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SearchIcon from "@mui/icons-material/Search";
import { getAdminCallActive } from "../../redux/actions/adminPortal/adminPortal_callActiveAction";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  getAddMinuteHistory,
  getHistory,
  postAddMinuteHistory,
} from "../../redux/actions/adminPortal/adminPortal_historyAction";
import { getAdminResellersList, getAdminUsersList } from "../../redux/actions/adminPortal/adminPortal_listAction";
import { api } from "../../mockData";
import axios from "axios";
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
      height: "48px",
      minWidth: "15px",
      justifyContent: "center",
    },
    
    "& .MuiSelect-select.MuiSelect-select": {
      paddingRight: "0px",
    },
    "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
      top: "-4px !important",
    },
    "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
      padding: "11.5px 14px",
    },
  },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
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
        exportButton: true,
      },
    },
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

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


function AdminAclHistory({colorThem}) {
    const token = JSON.parse(localStorage.getItem("admin"));
    const [data, setData] = useState([]);
    const [response, setResponse] = useState("");
    const [fromDate, setFromDate] = useState(dayjs().format('DD/MM/YYYY'));
    const [toDate, setToDate] = useState(dayjs().format('DD/MM/YYYY'));





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
    
      const handleSearch = (e) => {
        // Convert fromDate and toDate to YYYY-MM-DD format
        e.preventDefault();
        const formattedFromDate = fromDate
          ? dayjs(fromDate, "DD/MM/YYYY").format("YYYY-MM-DD")
          : null;
        const formattedToDate = toDate
          ? dayjs(toDate, "DD/MM/YYYY").format("YYYY-MM-DD")
          : null;
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `${api.dev}/api/acl_history?from=${formattedFromDate}&to=${formattedToDate}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.access_token} `,
          },
        };
        axios
          .request(config)
          .then((response) => {
            setData(response?.data);
            setResponse("");
            
          })
          .catch((error) => {
          });
        //dispatch(getHistory(data));
      };
    
      const handleReset = (e) => {
        e.preventDefault();
        setFromDate(dayjs().format('DD/MM/YYYY'));
        setToDate(dayjs().format('DD/MM/YYYY'));
        setResponse("hello");
      };
    

      const classes = useStyles();

      useEffect(()=>{
      
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `${api.dev}/api/acl_history?from=${dayjs(fromDate, "DD/MM/YYYY").format("YYYY-MM-DD")}&to=${dayjs(toDate, "DD/MM/YYYY").format("YYYY-MM-DD")}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.access_token} `,
          },
        };
        axios
          .request(config)
          .then((response) => {
            setData(response?.data);
            
          })
          .catch((error) => {
          });
        
      },[response])

  const rows = [];
  data?.data &&
  data?.data ?.forEach((item, index) => {
      rows.push({
        id: index + 1,
        data_id: item.id,
        description: item.description,
        action: item.action,
        topup: item.topup,
        ip: item.ip,
        created_at: item.created_at,
      });
    });


    const columns = [
        {
          field: "data_id",
          headerName: "Id",
          headerClassName: "custom-header",
          width: 150,
          headerAlign: "center",
          align: "center",
          cellClassName: "super-app-theme--cell",
        },
        {
          field: "ip",
          headerName: "Ip",
          headerClassName: "custom-header",
          width: 200,
          headerAlign: "center",
          align: "center",
          cellClassName: "super-app-theme--cell",
        },
        {
          field: "action",
          headerName: "Action",
          width: 140,
          headerClassName: "custom-header",
          headerAlign: "center",
          align: "center",
        },
        {
          field: "description",
          headerName: "Discription",
          width: 200,
          //cellClassName: "name-column--cell",
          //headerClassName: 'super-app-theme--header'
          headerClassName: "custom-header",
          // editable: true,
          headerAlign: "center",
          align: "center",
        },
    
        {
          field: "created_at",
          headerName: "Created At",
          width: 200,
          headerClassName: "custom-header",
          headerAlign: "center",
          align: "center",
          renderCell: (params) => {
            if (params.value !== null) {
              const date = new Date(params.value);
              var day = date.getUTCDate();
              var month = date.getUTCMonth() + 1; // Month starts from 0
              var year = date.getUTCFullYear();
              var hours = date.getUTCHours();
              var minutes = date.getUTCMinutes();
              var seconds = date.getUTCSeconds();
               // Formatting single-digit day/month with leading zero if needed
          day = (day < 10 ? "0" : "") + day;
          month = (month < 10 ? "0" : "") + month;
              hours = (hours < 10 ? "0" : "") + hours;
              minutes = (minutes < 10 ? "0" : "") + minutes;
              seconds = (seconds < 10 ? "0" : "") + seconds;
              var formattedDate = hours + ":" + minutes + ":" + seconds;
              return (
                <>
               <span style={{ color: "blue" }}>{day}/{month}/{year}</span>&nbsp;
                  <span style={{ color: "green" }}>
                    {hours}:{minutes}:{seconds}
                  </span>
                </>
              );
            }
          },
        },
      ];

      

  return (
    <>
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
                      <div
                        className="cntnt_title"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "end",
                        }}
                      >
                        <div>
                          <h3>ACL History</h3>
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
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "53px",
                          }}
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
                                label="From Date"
                                style={{ width: "300px" }}
                                value={
                                  fromDate
                                    ? dayjs(fromDate, "DD/MM/YYYY")
                                    : null
                                } // Convert selectedDate to a dayjs object
                                onChange={handleFromDateChange}
                                renderInput={(props) => (
                                  <TextField {...props} />
                                )}
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
                          style={{
                            display: "flex",
                            alignItems: "center",
                            height: "53px",
                            
                          }}
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
                                renderInput={(props) => (
                                  <TextField {...props} />
                                )}
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
                          style={{
                            display: "flex",
                            alignItems: "center",
                            height: "53px",
                            
                          }}
                        ></Grid>
                        <Grid
                          xl={3}
                          lg={3}
                          md={3}
                          sm={12}
                          xs={12}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            height: "53px",
                            
                          }}
                        ></Grid>
                      </Grid>
                      <Grid
                        container
                        className="cdr_filter_row"
                        style={{ padding: "20px 0" }}
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

                     
                      <ThemeProvider theme={theme}>
                        <div style={{ height: "100%", width: "100%" }}>
                          <DataGrid
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
                </div>
              </div>
            </div>
          </div>
        </Box>
      </div>
    </div>
  </>
  )
}

export default AdminAclHistory