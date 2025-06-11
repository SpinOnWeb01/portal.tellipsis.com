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
  } from "@mui/material";
  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
  import RestartAltIcon from '@mui/icons-material/RestartAlt';
  import SearchIcon from '@mui/icons-material/Search';
  import React, { useEffect, useMemo, useState } from "react";
  import {
    DataGrid,
    GridToolbar,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarFilterButton,
  } from "@mui/x-data-grid";
  //import { makeStyles } from "@mui/styles";
  import "../../Switcher.scss";
  import socketIOClient from "socket.io-client";
  import { useDispatch, useSelector } from "react-redux";
  import { getAdminCallActive } from "../../redux/actions/adminPortal/adminPortal_callActiveAction";
  import { createTheme, ThemeProvider } from "@mui/material/styles";
  import MusicOffIcon from "@mui/icons-material/MusicOff";
  import { toast } from "react-toastify";
  import { api } from "../../mockData";
  import axios from "axios";
  import { makeStyles } from "@mui/styles";
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
    // list: {
    //   paddingTop: 0,
    //   paddingBottom: 0,
    //   "& li": {
    //     fontWeight: 200,
    //     paddingTop: 8,
    //     paddingBottom: 8,
    //     fontSize: "12px",
    //   },
    //   "& li.Mui-selected": {
    //     color: "white",
    //     background: "#6EC177",
    //   },
    //   "& li.Mui-selected:hover": {
    //     background: "#6EC177",
    //   },
    // },
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

  
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  

  
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarDensitySelector />
        <GridToolbarFilterButton />
      </GridToolbarContainer>
    );
  }
function AdminMDR({colorThem}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const [response, setResponse] = useState("");
    const [fromDate, setFromDate] = useState(dayjs().format('DD/MM/YYYY'));
    const [toDate, setToDate] = useState(dayjs().format('DD/MM/YYYY'));

    const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
          },
        },
        classes: {
          list: classes.list,
          paper: classes.paper
        },
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center"
        },
        transformOrigin: {
          vertical: "top",
          horizontal: "center"
        },
        getContentAnchorEl: null
      };
    

    useEffect(() => {
        dispatch(getAdminCallActive());
      }, []); // Empty dependency array ensures this effect runs once on mount

      const handleFromDateChange = (date) => {
        if (dayjs(date, 'DD/MM/YYYY', true).isValid()) {
          // Convert the selected date to the desired format before updating state
          setFromDate(dayjs(date).format('DD/MM/YYYY'));
        } else {
          setFromDate(null);
        }
      };
    
      const handleToDateChange = (date) => {
        if (dayjs(date, 'DD/MM/YYYY', true).isValid()) {
          // Convert the selected date to the desired format before updating state
          setToDate(dayjs(date).format('DD/MM/YYYY'));
        } else {
          setToDate(null);
        }
       
      };
      useEffect(() => {
        let data = JSON.stringify({
           
          from_date: dayjs().format('YYYY-MM-DD'),
          to_date: dayjs().format('YYYY-MM-DD'),
        });
        // dispatch(getReport(data));
        // dispatch(getAllUsers(""));
      }, [dispatch, response]);
     
       const handleSearch = (e) => {
          // Convert fromDate and toDate to YYYY-MM-DD format
      const formattedFromDate = fromDate ? dayjs(fromDate, 'DD/MM/YYYY').format('YYYY-MM-DD') : null;
      const formattedToDate = toDate ? dayjs(toDate, 'DD/MM/YYYY').format('YYYY-MM-DD') : null;
         let data = JSON.stringify({
           
           from_date: formattedFromDate,
           to_date: formattedToDate,
        //    call_direction: callDirection,
        //    did_number: didNumber,
        //    destination: destination
         });
        //  dispatch(
        //    getReport(
        //      data
        //    )
        //  );
       }
    
        const handleReset = (e) => {
    //     setFromDate(null);
    //     setToDate(null);
    //     setUserId("");
    //     setCallDirection("");
    //     setDidNumber("");
    //     setDestination("");
    //     setResponse("data");
       }
    
    

    const columns = [
        {
          field: "Username",
          headerName: "Username",
          headerClassName: "custom-header",
          headerAlign: "center",
          align: "center",
          width: 100,
        },
        {
          field: "DIDNumber",
          headerName: "Did Number",
          width: 130,
          headerClassName: "custom-header",
          headerAlign: "center",
          align: "center",
        },
        {
          field: "CallerID",
          headerName: "Caller Id",
          width: 130,
          headerAlign: "center",
          align: "center",
          headerClassName: "custom-header",
        },
    
        {
          field: "Details",
          headerName: "Destination",
          width: 100,
          headerClassName: "custom-header",
          headerAlign: "center",
          align: "center",
        },
    
        // {
        //   field: "ServiceType",
        //   headerName: "Service Type",
        //   width: 120,
        //   headerClassName: "custom-header",
        //   headerAlign: "center",
        //   align: "center",
        //   renderCell: (params) => {
        //     return (
        //       <div className="d-flex justify-content-between align-items-center">
        //         <p
        //           style={{
        //             fontWeight: "500",
        //             color: "orange",
        //             margin: "0",
        //             textTransform: "capitalize",
        //           }}
        //         >
        //           {params?.row?.ServiceType}
        //         </p>
        //       </div>
        //     );
        //   },
        // },
        {
          field: "SubType",
          headerName: "Type",
          width: 120,
          headerClassName: "custom-header",
          headerAlign: "center",
          align: "center",
          renderCell: (params) => {
            return (
              <div className="d-flex justify-content-between align-items-center">
                <p
                  style={{
                    fontWeight: "500",
                    margin: "0",
                    textTransform: "capitalize",
                  }}
                >
                  {params?.row?.SubType}
                </p>
              </div>
            );
          },
        },
        {
          field: "TimeStamp",
          headerName: "Start Time",
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
    
              // Formatting single-digit hours/minutes/seconds with leading zero if needed
              hours = (hours < 10 ? "0" : "") + hours;
              minutes = (minutes < 10 ? "0" : "") + minutes;
              seconds = (seconds < 10 ? "0" : "") + seconds;
              var formattedDate =
                day +
                "/" +
                month +
                "/" +
                year +
                " " +
                hours +
                ":" +
                minutes +
                ":" +
                seconds;
              return (
                <>
                  <span style={{ color: "blue" }}>
                    {day}/{month}/{year}
                  </span>
                  &nbsp;
                  <span style={{ color: "green" }}>
                    {hours}:{minutes}:{seconds}
                  </span>
                </>
              );
            }
          },
        },
        {
          field: "CallDirection",
          headerName: "Call Direction",
          width: 150,
          headerClassName: "custom-header",
          headerAlign: "center",
          align: "center",
        },
    
        // {
        //   field: "Info",
        //   headerName: "Information",
        //   width: 150,
        //   headerClassName: "custom-header",
        //   headerAlign: "center",
        //   align: "center",
        // },
        {
          field: "Status",
          headerName: "Status",
          width: 150,
          headerClassName: "custom-header",
          headerAlign: "center",
          align: "center",
          renderCell: (params) => {
            return (
              <div className="d-flex justify-content-between align-items-center">
                <p
                  style={{
                    fontWeight: "500",
                    margin: "0",
                  }}
                >
                  {params?.row?.Status === "ANSWER" ? (
                    <>
                      {" "}
                      <p
                        style={{
                          fontWeight: "500",
                          margin: "0",
                          color: "green",
                        }}
                      >
                        {params?.row?.Status}
                      </p>
                    </>
                  ) : (
                    <></>
                  )}
                  {params?.row?.Status === "DIALING" ? (
                    <>
                      {" "}
                      <p
                        style={{
                          fontWeight: "500",
                          margin: "0",
                          color: "violet",
                        }}
                      >
                        {params?.row?.Status}
                      </p>
                    </>
                  ) : (
                    <></>
                  )}
                  {params?.row?.Status === "RINGING" ? (
                    <>
                      {" "}
                      <p
                        style={{
                          fontWeight: "500",
                          margin: "0",
                          color: "skyblue",
                        }}
                      >
                        {params?.row?.Status}
                      </p>
                    </>
                  ) : (
                    <></>
                  )}
                </p>
              </div>
            );
          },
        },
        {
          field: "Extensions",
          headerName: "Extensions",
          width: 200,
          headerClassName: "custom-header",
          headerAlign: "center",
          align: "center",
          renderCell: (params) => (
            <div>
              {Object.entries(params.row.Extensions || {}).map(([key, value]) => (
                <div key={key}>
                  <strong>{key}: </strong>
                  {value}
                </div>
              ))}
            </div>
          ),
        },
        // {
        //   field: "AnsweredBy",
        //   headerName: "Answered By",
        //   width: 150,
        //   headerClassName: "custom-header",
        //   headerAlign: "center",
        //   align: "center",
        // },
        {
          field: "barging",
          headerName: "Barge",
          width: 120,
          headerClassName: "custom-header",
          headerAlign: "center",
          align: "center",
          renderCell: (params) => {
            return (
              <div className="d-flex justify-content-between align-items-center">
                {params.row.Status === "ANSWER" && (
                  <Button
                    // variant="outlined"
                    sx={{
                      ":hover": {
                        bgcolor: "error.main",
                        color: "white",
                      },
                      padding: "2px",
                      textTransform: "capitalize",
                      fontSize: "14px",
                      color: "error.main",
                      borderColor: "error.main",
                      border: "1px solid #d32f2f",
                    }}
                    // onClick={(e) => {
                    //   handleBarging(params.row.Channel);
                    // }}
                  >
                    Barge
                  </Button>
                )}
              </div>
            );
          },
        },
        {
          field: "id",
          headerName: "Options",
          width: 150,
          headerClassName: "custom-header",
          headerAlign: "center",
          align: "center",
          renderCell: (params) => {
            return (
              <div className="d-flex justify-content-between align-items-center">
                {params.row.Status === "ANSWER" && (
                  <FormControl fullWidth style={{ width: "100%", margin: "7px 0" }} className="table_dropdown">
                    <Select
                      style={{ textAlign: "left" }}
                    //  defaultValue={option}
                    //   onChange={(e) => {
                    //     setOption(e.target.value);
                    //   }}
                      className="table_slct_drop"
                    >
                      <MenuItem value={"L"}>Listen</MenuItem>
                      <MenuItem value={"LT"}>Listen and Talk</MenuItem>
                    </Select>
                  </FormControl>
                )}
              </div>
            );
          },
        },
      ];   
      
      const mockDataTeam = useMemo(() => {
        if (state?.getAdminCallActive?.callactive !== undefined) {
          return Object.keys(state?.getAdminCallActive?.callactive)
            .map((key) => ({
              id: key,
              ...state?.getAdminCallActive?.callactive[key],
            }))
            .filter((item) => item.SubType !== "QUEUE");
        }
      }, [state?.getAdminCallActive?.callactive]);
    
      const rows = useMemo(() => {
        return []; // Return an empty array to prevent any rows from being displayed initially
      }, []);



  return (
    <>
    <div className={`App ${colorThem} `} >
      <div className="contant_box" > 
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
                  
                      <h3>Minute Details Report</h3>
                      {/* <p>
                        Use this to monitor and interact with the active
                        calls.
                      </p> */}
                  
                  </div>

                  <Grid container className='cdr_filter_row' style={{padding:'20px 0'}}>
                  <Grid xl={3} lg={3} md={3} sm={12} xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                            <TextField
                              className={classes.formControl}
                              style={{
                                width: "98%",
                                margin: " 5px 0 5px 0",
                              }}
                              type="text"
                              label="All"
                              variant="outlined"
                            />

                          </Grid>
                        <Grid xl={3} lg={3} md={3} sm={12} xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                        <FormControl
                                      fullWidth
                                      style={{ width: "98%", margin: "7px 0" }}
                                      className={classes.formControl}
                                    >
                                      <InputLabel id="demo-simple-select-label">
                                        UserName
                                      </InputLabel>

                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="UserName"
                                        style={{ textAlign: "left" }}
                                        // value={userId}
                                        // onChange={(e) => {
                                        //   setUserId(e.target.value);
                                        // }}
                                        required
                                      >
                                        {state?.allUsers?.users?.map(
                                          (item, index) => {
                                            return (
                                              <MenuItem
                                                key={index}
                                                value={item?.id}
                                              >
                                                {item.username}
                                              </MenuItem>
                                            );
                                          }
                                        )}
                                      </Select>
                                    </FormControl>
                          </Grid>

                          <Grid xl={3} lg={3} md={3} sm={12} xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                            <TextField
                              className={classes.formControl}
                              style={{
                                width: "98%",
                                margin: " 5px 0 5px 0",
                              }}
                              type="text"
                              label="TFN"
                              variant="outlined"
                            />

                          </Grid>

                          <Grid xl={3} lg={3} md={3} sm={12} xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                            <TextField
                              className={classes.formControl}
                              style={{
                                width: "98%",
                                margin: " 5px 0 5px 0",
                              }}
                              type="text"
                              label="Extension"
                              variant="outlined"
                            />
                          </Grid>
                          {/* <Grid xl={3} lg={3} md={3} sm={12} xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                          <TextField
                              className={classes.formControl}
                              style={{
                                width: "98%",
                                margin: " 5px 0 5px 0",
                              }}
                              type="text"
                              label="Duration"
                              variant="outlined"
                            />
                          </Grid> */}
                          {/* <Grid xl={3} lg={3} md={3} sm={12} xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                          <TextField
                              className={classes.formControl}
                              style={{
                                width: "98%",
                                margin: " 5px 0 5px 0",
                              }}
                              type="text"
                              label="DID Number"
                              variant="outlined"
                            //   value={didNumber}
                            //             onChange={(e) => {
                            //               setDidNumber(e.target.value);
                            //             }}
                            />
                          </Grid>
                          <Grid xl={3} lg={3} md={3} sm={12} xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                          <TextField
                              className={classes.formControl}
                              style={{
                                width: "98%",
                                margin: " 5px 0 5px 0",
                              }}
                              type="text"
                              label="Destination Number"
                              variant="outlined"
                            //   value={destination}
                            //             onChange={(e) => {
                            //               setDestination(e.target.value);
                            //             }}
                            />
                          </Grid>
                          <Grid xl={3} lg={3} md={3} sm={12} xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                            <FormControl
                              className={classes.formControl}
                              fullWidth
                              style={{ width: "98%", margin: "7px 0", }}
                            >
                              <InputLabel id="demo-simple-select-label">
                                Call Direction
                              </InputLabel>

                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Call Direction"
                                style={{ textAlign: "left" }}
                                // value={callDirection}
                                //         onChange={(e) => {
                                //           setCallDirection(e.target.value);
                                //         }}

                                required

                              >
                                <MenuItem value={"Inbound"}>Inbound</MenuItem>
                                <MenuItem value={"Outbound"}>
                                  Outbound
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid xl={3} lg={3} md={3} sm={12} xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                          <FormControl
                              className={classes.formControl}
                              fullWidth
                              style={{ width: "98%", margin: "7px 0px" }}
                            >
                              <InputLabel id="demo-simple-select-label">
                                Status
                              </InputLabel>

                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Status"
                                style={{ textAlign: "left" }}
                              >
                                <MenuItem value={"FAILED"}>FAILED</MenuItem>
                                <MenuItem value={"BUSY"}>BUSY</MenuItem>
                                <MenuItem value={"NO ANSWER"}>
                                  NO ANSWER
                                </MenuItem>
                                <MenuItem value={"CONGESTION"}>
                                  CONGESTION
                                </MenuItem>
                                <MenuItem value={"ANSWERED"}>ANSWERED</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid> */}


                          <Grid xl={3} lg={3} md={3} sm={12} xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}  className={classes.formControl} >
      <DemoContainer components={['DatePicker']} sx={{width:"98%"}}>
        <DatePicker 
        label="From Date"
        style={{ width: "300px"}}
        value={fromDate ? dayjs(fromDate, "DD/MM/YYYY") : null} // Convert selectedDate to a dayjs object
        onChange={handleFromDateChange}
        renderInput={(props) => <TextField {...props} />}
        format="DD/MM/YYYY"
         />
      </DemoContainer>
    </LocalizationProvider>
                          </Grid>
                          <Grid xl={3} lg={3} md={3} sm={12} xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}  className={classes.formControl}>
      <DemoContainer components={['DatePicker']} sx={{width:"98%"}}>
        <DatePicker 
        label="To Date"
        style={{ width: "98%"}}
        value={toDate ? dayjs(toDate, "DD/MM/YYYY") : null} // Convert selectedDate to a dayjs object
        onChange={handleToDateChange}
        renderInput={(props) => <TextField {...props} />}
        format="DD/MM/YYYY"
         />
      </DemoContainer>
    </LocalizationProvider>
                          </Grid>

                          <Grid xl={12} lg={12} md={12} sm={12} xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'end',padding:'20px 0' }}>
                              <IconButton
                                className="filter_search_btn"
                                style={{ marginLeft: '0 !important', background: 'green !important' }}
                                onClick={handleSearch}
                              >
                                Search &nbsp;<SearchIcon />
                              </IconButton>
                              <IconButton
                                className="filter_reset_btn"
                                style={{ marginLeft: '0 !important', backgroundColor: 'grey !important' }}
                               onClick={handleReset}
                              >
                                Reset &nbsp;<RestartAltIcon />
                              </IconButton>
                           
                          </Grid>
                        </Grid>
                  <div className="row">
                    <ThemeProvider theme={theme}>
                    
                          <div style={{ height: "100%", width: "100%" }}>
                            <DataGrid
                              // checkboxSelection
                              rows={[]}
                              columns={[]}
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
  )
}

export default AdminMDR;