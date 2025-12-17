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
import { getAllUsers } from "../../redux/actions/adminPortal/userAction";
import { getAdminResellersList, getAdminUsersList } from "../../redux/actions/adminPortal/adminPortal_listAction";
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
      minWidth: "120px",
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
  // select: {
  //   width: "auto",
  //   fontSize: "12px",
  //   "&:focus": {
  //     backgroundColor: "transparent",
  //   },
  // },
  // selectIcon: {
  //   position: "relative",
  //   color: "#6EC177",
  //   fontSize: "14px",
  // },
  // paper: {
  //   borderRadius: 12,
  //   marginTop: 8,
  // },
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

function AdminHistory({ colorThem }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [resellerId, setResellerId] = useState("");
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [tMinutes, setTMinutes] = useState("");
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = useState([]);
  const [resellers, setResellers] = useState([]);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setTMinutes("");
    setUserId("");
    setResellerId("");
    setFromDate();
    setToDate();
  };

  useEffect(() => {
    dispatch(getAdminCallActive());
    dispatch(getAllUsers(""));
    dispatch(getHistory({}));
    dispatch(getAddMinuteHistory());
    dispatch(postAddMinuteHistory({}));
    dispatch(getAdminUsersList());
    dispatch(getAdminResellersList())
  }, []); // Empty dependency array ensures this effect runs once on mount

  useMemo(()=>{
    if(state?.getAdminUsersList?.userList){
    const usersArray = Object.keys(state?.getAdminUsersList?.userList)?.map(key => ({
      
      user_id: key,
      username: state?.getAdminUsersList?.userList[key]
      
    }));
    setUsers(usersArray);
  } 
  if(state?.getAdminResellersList?.resellerList){
    const resellerArray = Object.keys(state?.getAdminResellersList?.resellerList)?.map(key => ({
      
      reseller_id: key,
      username: state?.getAdminResellersList?.resellerList[key]
      
    }));
    setResellers(resellerArray);
  }
   },[state?.getAdminUsersList?.userList, state?.getAdminResellersList?.resellerList])

 

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
    let data = JSON.stringify({
      user_id: userId,
      reseller_id: resellerId,
      from_date: formattedFromDate,
      to_date: formattedToDate,
    });
    dispatch(getHistory(data));
  };

  const handleReset = (e) => {
    e.preventDefault();
    setTMinutes("");
    setUserId("");
    setResellerId("");
    setFromDate();
    setToDate();
    dispatch(getHistory({}));
  };

  const handleSearchModal = (e) => {
    // Convert fromDate and toDate to YYYY-MM-DD format
    e.preventDefault();
    const formattedFromDate = fromDate
      ? dayjs(fromDate, "DD/MM/YYYY").format("YYYY-MM-DD")
      : null;
    const formattedToDate = toDate
      ? dayjs(toDate, "DD/MM/YYYY").format("YYYY-MM-DD")
      : null;
    let data = JSON.stringify({
      user_id: userId,
      from_date: formattedFromDate,
      to_date: formattedToDate,
    });
    dispatch(postAddMinuteHistory(data));
  };

  const handleResetModal = (e) => {
    e.preventDefault();
    setTMinutes("");
    setUserId("");
    setResellerId("");
    setFromDate();
    setToDate();
    dispatch(postAddMinuteHistory({}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const columns = [
    {
      field: "username",
      headerName: "User Name",
      headerClassName: "custom-header",
      width: 150,
      headerAlign: "center",
      align: "center",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "added_by",
      headerName: "Added By",
      headerClassName: "custom-header",
      width: 200,
      headerAlign: "center",
      align: "center",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "topup",
      headerName: "Bucket",
      width: 140,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "added_date",
      headerName: "Date",
      width: 200,
      //cellClassName: "name-column--cell",
      //headerClassName: 'super-app-theme--header'
      headerClassName: "custom-header",
      // editable: true,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        if (params.value !== null) {
          const date = new Date(params.value);
          var day = date.getUTCDate();
          var month = date.getUTCMonth() + 1; // Month starts from 0
          var year = date.getUTCFullYear();

          // Formatting single-digit day/month with leading zero if needed
          day = (day < 10 ? "0" : "") + day;
          month = (month < 10 ? "0" : "") + month;

          // Formatting single-digit hours/minutes/seconds with leading zero if needed

          var formattedDate = day + "/" + month + "/" + year + " ";
          return (
            <>
              <span style={{ color: "blue" }}>
                {day}/{month}/{year}
              </span>
            </>
          );
        }
      },
    },

    {
      field: "added_time",
      headerName: "Time",
      width: 200,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        if (params.value !== null) {
          const date = new Date(params.value);
          var hours = date.getUTCHours();
          var minutes = date.getUTCMinutes();
          var seconds = date.getUTCSeconds();
          hours = (hours < 10 ? "0" : "") + hours;
          minutes = (minutes < 10 ? "0" : "") + minutes;
          seconds = (seconds < 10 ? "0" : "") + seconds;
          var formattedDate = hours + ":" + minutes + ":" + seconds;
          return (
            <>
              <span style={{ color: "green" }}>
                {hours}:{minutes}:{seconds}
              </span>
            </>
          );
        }
      },
    },
    {
      field: "reseller_name",
      headerName: "Reseller Name",
      width: 140,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
  ];

  const columns1 = [
    {
      field: "user",
      headerName: "User Name",
      headerClassName: "custom-header",
      width: 150,
      headerAlign: "center",
      align: "center",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "total_add_minutes",
      headerName: "Total Add Minutes",
      headerClassName: "custom-header",
      width: 200,
      headerAlign: "center",
      align: "center",
      cellClassName: "super-app-theme--cell",
    },
  ];

  const classes = useStyles();

  // Function to determine whether a row should have the bordered style
  const isRowBordered = (params) => {
    const { row } = params;

    // Add your condition here, for example, adding border to rows where age is greater than 25
    return row.disposition === "ANSWERED";
  };

  const rows = [];
  state?.getAdminHistory?.getHistory &&
    state?.getAdminHistory?.getHistory?.forEach((item, index) => {
      rows.push({
        id: index + 1,
        added_by: item.added_by,
        added_date: item.added_date,
        added_time: item.added_date,
        topup: item.topup,
        username: item.username,
        user_id: item.user_id,
        historyId: item.id,
        reseller_name: item.reseller_name,
      });
    });

  const rows1 = [];
  state?.postAdminAddMinute?.addMinute &&
    state?.postAdminAddMinute?.addMinute?.forEach((item, index) => {
      rows1.push({
        id: index + 1,
        total_add_minutes: item.total_add_minutes,
        user: item.username,
        user_id: item.user_id,
      });
    });

  return (
    <>
      <div className={`App ${colorThem} `}>
        <div className="contant_box">
          <Box
            className="right_sidebox mobile_top_pddng"
            component="main"
            sx={{
              flexGrow: 1,
              p: 0,
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
                            <h3>Reseller Commision Report</h3>
                          </div>
                          <IconButton
                            className="all_button_clr"
                            onClick={handleOpen}
                          >
                            Check Add Minute
                            <AddOutlinedIcon />
                          </IconButton>

                          <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="child-modal-title"
                            aria-describedby="child-modal-description"
                           >
                            <Fade in={open} className="bg_imagess">
                              <Box sx={{ ...style, width: 700 }}>
                                <IconButton
                                  onClick={handleClose}
                                  sx={{ float: "inline-end" }}
                                >
                                  <Close />
                                </IconButton>
                                <br />
                                <Typography
                                  id="transition-modal-title"
                                  variant="h6"
                                  component="h2"
                                  color={"#092b5f"}
                                  fontSize={"18px"}
                                  fontWeight={"600"}
                                  marginBottom={"16px"}
                                >
                                  Check Add Minute
                                </Typography>
                                <form
                                  style={{
                                    textAlign: "center",
                                    textAlign: "center",
                                    height: "auto",
                                    overflow: "auto",
                                    paddingTop: "10px",
                                    padding: "5px",
                                  }}
                                >
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
                                      xl={4}
                                      lg={4}
                                      md={4}
                                      sm={12}
                                      xs={12}
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <FormControl
                                        fullWidth
                                        style={{
                                          width: "98%",
                                          margin: "7px 0",
                                        }}
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
                                          value={userId}
                                          onChange={(e) => {
                                            setUserId(e.target.value);
                                          }}
                                          required
                                        >
                                          {users?.map((item, index) => {
                                            return (
                                              <MenuItem
                                                key={index}
                                                value={item?.user_id}
                                              >
                                                {item.username}
                                              </MenuItem>
                                            );
                                          })}
                                        </Select>
                                      </FormControl>
                                    </Grid>

                                    <Grid
                                      xl={4}
                                      lg={4}
                                      md={4}
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
                                      xl={4}
                                      lg={4}
                                      md={4}
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
                                              toDate
                                                ? dayjs(toDate, "DD/MM/YYYY")
                                                : null
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
                                  </Grid>
                                  <Grid
                                    container
                                    className="cdr_filter_row"
                                    style={{ padding: "0px 0" }}
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
                                        padding: "0px 0",
                                      }}
                                    >
                                      <IconButton
                                        className="filter_search_btn"
                                        style={{
                                          marginLeft: "0 !important",
                                          background: "green !important",
                                        }}
                                        onClick={handleSearchModal}
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
                                        onClick={handleResetModal}
                                      >
                                        Reset &nbsp;
                                        <RestartAltIcon />
                                      </IconButton>
                                    </Grid>
                                  </Grid>
                                  <br />

                                  <Box>
                                    <ThemeProvider theme={theme}>
                                      <div
                                        style={{
                                          height: "300px",
                                          width: "100%",
                                        }}
                                      >
                                        <DataGrid
                                          rows={rows1}
                                          columns={columns1}
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
                                        />
                                      </div>
                                    </ThemeProvider>
                                  </Box>
                                </form>
                                <Box>
                                  {/* <Button
                                      variant="contained"
                                      className="all_button_clr"
                                      color="primary"
                                      sx={{
                                        fontSize: "16px !impotant",
                                        background:
                                          "linear-gradient(180deg, #0E397F 0%, #001E50 100%) !important",
                                        marginTop: "20px",
                                        padding: "10px 20px !important",
                                        textTransform: "capitalize !important",
                                      }}
                                      onClick={handleClose}
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      variant="contained"
                                      className="all_button_clr"
                                      color="primary"
                                      sx={{
                                        fontSize: "16px !impotant",
                                        background: "#092b5f",
                                        marginTop: "20px",
                                        padding: "10px 20px !important",
                                        textTransform: "capitalize !important",
                                      }}
                                      onClick={handleSubmit}
                                    >
                                      save
                                    </Button> */}
                                </Box>
                              </Box>
                            </Fade>
                          </Modal>
                        </div>

                        <Grid
                          container
                          className="cdr_filter_row"
                          style={{
                            padding: "0px 0",
                            display: "flex",
                            justifyContent: "start",
                          }}
                        >
                          <Grid
                            xl={2}
                            lg={2}
                            md={2}
                            sm={12}
                            xs={12}
                            style={{ display: "flex", alignItems: "center" }}
                          >
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
                                value={userId}
                                onChange={(e) => {
                                  setUserId(e.target.value);
                                }}
                                required
                              >
                                {users?.map((item, index) => {
                                  return (
                                    <MenuItem key={index} value={item?.user_id}>
                                      {item.username}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid
                            xl={2}
                            lg={2}
                            md={2}
                            sm={12}
                            xs={12}
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <FormControl
                              fullWidth
                              style={{ width: "98%", margin: "7px 0" }}
                              className={classes.formControl}
                            >
                              <InputLabel id="demo-simple-select-label">
                                Reseller Name
                              </InputLabel>

                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Reseller Name"
                                style={{ textAlign: "left" }}
                                value={resellerId}
                                onChange={(e) => {
                                  setResellerId(e.target.value);
                                }}
                                required
                              >
                                {resellers?.map((item, index) => {
                                  return (
                                    <MenuItem
                                      key={index}
                                      value={item?.reseller_id}
                                    >
                                      {item.username}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid
                            xl={2.5}
                            lg={2.5}
                            md={2.5}
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
                            xl={2.5}
                            lg={2.5}
                            md={2.5}
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
                            sm={3}
                            xs={3}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "end",
                              padding: "0px 0",
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
                       

                        <Box
                          style={{ display: "flex", justifyContent: "left" }}
                        >
                          <Typography
                            style={{
                              fontSize: "17px",
                              fontWeight: "600",
                              color: "#04255c",
                              paddingBottom: "20px" 
                            }}
                          >
                            Total Add Minute:-{" "}
                            <span style={{ fontWeight: "400"}}>
                              {
                                state?.getAdminAddMinute?.addMinute
                                  ?.total_add_minutes
                              }
                            </span>
                          </Typography>
                        </Box>
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
  );
}

export default AdminHistory;
