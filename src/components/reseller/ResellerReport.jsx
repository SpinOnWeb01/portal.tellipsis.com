import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';
import {
  Backdrop,
  Box,
  Button,
  Fade,
  FormControl,
  IconButton,
  InputLabel,
  Modal,
  TextField,
  Typography,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  CircularProgress,
  Tooltip,
  InputAdornment,
  Grid,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import FilterAlt from "@mui/icons-material/FilterAlt";
//import Frm from '../../pages/Frm';
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { getReport } from "../../redux/actions/adminPortal/reportAction";
import { Close, Delete, Edit, PlayArrow } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GetAppIcon from "@mui/icons-material/GetApp";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import socketIOClient from "socket.io-client";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "../../Switcher.scss";

import { makeStyles } from "@mui/styles";
import dayjs from 'dayjs';
import { getAllUsers } from '../../redux/actions/adminPortal/userAction';
const drawerWidth = 240;
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
      justifyContent: "center"
    },
    "& .MuiSelect-select.MuiSelect-select": {
      paddingRight: "0px"
    },
    "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
      top: "-4px"
    }
  },
  select: {
    width: "auto",
    fontSize: "12px",
    "&:focus": {
      backgroundColor: "transparent"
    }
  },
  selectIcon: {
    position: "relative",
    color: "#6EC177",
    fontSize: "14px"
  },
  paper: {
    borderRadius: 12,
    marginTop: 8
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
    "& li": {
      fontWeight: 200,
      paddingTop: 8,
      paddingBottom: 8,
      fontSize: "12px"
    },
    "& li.Mui-selected": {
      color: "white",
      background: "#6EC177"
    },
    "& li.Mui-selected:hover": {
      background: "#6EC177"
    }
  }
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
      <GridToolbarDensitySelector />
    </GridToolbarContainer>
  );
}

// =====Start Items====>

// =====End Items====>


function ResellerReport({ colorThem }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [currentAudio, setCurrentAudio] = useState(null);
  const [userId, setUserId] = useState("");
  const [fromDate, setFromDate] = useState(dayjs().format('DD/MM/YYYY'));
  const [toDate, setToDate] = useState(dayjs().format('DD/MM/YYYY'));
  const [callDirection, setCallDirection] = useState("");
  const [didNumber, setDidNumber] = useState("");
  const [destination, setDestination] = useState("");
  const [response, setResponse] = useState("");
  const audioRefs = useRef({}); // Store references to audio elements
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [val, setVal] = useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

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
    dispatch(getReport(data));
    dispatch(getAllUsers(""));
  }, [dispatch, response]);
 
   const handleSearch = (e) => {
      // Convert fromDate and toDate to YYYY-MM-DD format
  const formattedFromDate = fromDate ? dayjs(fromDate, 'DD/MM/YYYY').format('YYYY-MM-DD') : null;
  const formattedToDate = toDate ? dayjs(toDate, 'DD/MM/YYYY').format('YYYY-MM-DD') : null;
     let data = JSON.stringify({
       
       from_date: formattedFromDate,
       to_date: formattedToDate,
       call_direction: callDirection,
       did_number: didNumber,
       destination: destination
     });
     dispatch(
       getReport(
         data
       )
     );
   }

   const handleReset = (e) => {
    setFromDate(null);
    setToDate(null);
    setUserId("");
    setCallDirection("");
    setDidNumber("");
    setDestination("");
    setResponse("data");
  }

  // Function to handle audio clicks
  const handleAudioClick = (audioSrc) => {
    const audio = audioRefs.current[audioSrc];
    // const audio = document.getElementById(audioSrc);
    // Check if the clicked audio is already the current audio
    if (currentAudio === audio) {
      // Toggle play/pause
      if (audio.pause) {
        audio.play();
      } else {
        audio.pause();
      }
    } else {
      // If a different audio is clicked, pause the current audio (if any) and play the new one
      if (currentAudio) {
        currentAudio.pause();
      }
      setCurrentAudio(audio);
      audio.play();
    }
  };

  const handleAudioPause = () => {
    //  setCurrentAudio(null);
  };



  const handleDownload = (recordingPath) => {
    // You can implement download logic here
    // For example, create a link with the recording path and click it programmatically
    const link = document.createElement("a");
    link.href = recordingPath;
    link.download = recordingPath.split("/").pop(); // Set filename to the last part of the path
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    {
      field: "username",
      headerName: "Username",
      headerClassName: "custom-header",
      width: 150,
      headerAlign: "center",
      align: "center",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "caller_id_number",
      headerName: "Caller ID",
      headerClassName: "custom-header",
      width: 200,
      headerAlign: "center",
      align: "center",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "did_tfn",
      headerName: "DID Number",
      width: 140,
      //cellClassName: "name-column--cell",
      //headerClassName: 'super-app-theme--header'
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      // editable: true
    },
    {
      field: "destination_number",
      headerName: "Service",
      //type: "number",
      width: 120,
      headerAlign: "center",
      align: "center",
      // headerAlign: "center",
      // align: "center",
      headerClassName: "custom-header",
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            <p
              style={{
                fontWeight: "500",
                color: "orange",
                margin: "0",
                textTransform: "capitalize",
              }}
            >
              {params?.row?.destination_number}
            </p>
          </div>
        );
      },
    },
    {
      field: "destination_type",
      headerName: "Destination Type",
      width: 150,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "destination",
      headerName: "Destination",
      width: 150,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "duration",
      headerName: "Duration",
      width: 100,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
    },

    {
      field: "call_direction",
      headerName: "Call Direction",
      width: 150,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
    },

    {
      field: "billsec",
      headerName: "Bill Sec",
      width: 100,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
    },

    {
      field: "recording_path",
      headerName: "Recording",
      width: 380,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      renderCell: (params) => {
        if (params.row.billsec >= 0) {
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <audio
                ref={(audio) =>
                  (audioRefs.current[params.row.recording_path] = audio)
                }
                id={params.row.recording_path}
                src={params.row.recording_path}
                controls
                controlsList="download"
                onPlay={() => handleAudioClick(params.row.recording_path)}
                onPause={handleAudioPause}
                style={{ padding: "10px" }}
              />

              {/* <IconButton onClick={() => handleDownload(params.row.recording_path)}>
          <GetAppIcon />
        </IconButton> */}
            </div>
          );
        } else {
          return (<></>)
        }
      },
    },
    {
      field: "answered_by",
      headerName: "Answered By",
      width: 130,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
    },
    {
      field: "disposition",
      headerName: "Status",
      width: 120,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            {params.row.disposition === "ANSWERED" ? (
              <>
                <div
                  style={{
                    color: "white",
                    background: "green",
                    padding: "7px",
                    borderRadius: "5px",
                    fontSize: "12px",
                    textTransform: "capitalize",
                  }}
                >
                  {params.row.disposition.toString().toLowerCase()}
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    color: "white",
                    background: "red",
                    padding: "7px",
                    borderRadius: "5px",
                    fontSize: "12px",
                    textTransform: "capitalize",
                  }}
                >
                  {params.row.disposition.toString().toLowerCase()}
                </div>
              </>
            )}
          </div>
        );
      },
      //  cellClassName: 'super-app-theme--cell',
    },

    {
      field: "hangup_reason",
      headerName: "Hangup Reason",
      width: 220,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
    },
    {
      field: "answer_at",
      headerName: "Call Answer Time",
      width: 160,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      //valueFormatter
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
          return (<><span style={{ color: "blue" }}>{day}/{month}/{year}</span>&nbsp;
            <span style={{ color: "green" }}>{hours}:{minutes}:{seconds}</span></>);
        }
      },
    },

    {
      field: "start_at",
      headerName: "Call Start Time",
      width: 160,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
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
          return (<><span style={{ color: "blue" }}>{day}/{month}/{year}</span>&nbsp;
            <span style={{ color: "green" }}>{hours}:{minutes}:{seconds}</span></>);
        }
      },
    },

    {
      field: "end_at",
      headerName: "Call End Time",
      width: 160,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
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
            "<span style='color: blue'>" +
            day +
            "/" +
            month +
            "/" +
            year +
            "</span>" +
            " " +
            "<span style='color: green'>" +
            hours +
            ":" +
            minutes +
            ":" +
            seconds +
            "</span>";

          return (<><span style={{ color: "blue" }}>{day}/{month}/{year}</span>&nbsp;
            <span style={{ color: "green" }}>{hours}:{minutes}:{seconds}</span></>);
        }
      },
    },

    {
      field: "uniqueid",
      headerName: "Unique Id",
      width: 180,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
    },
  ];


  // Function to determine whether a row should have the bordered style
  const isRowBordered = (params) => {
    const { row } = params;

    // Add your condition here, for example, adding border to rows where age is greater than 25
    return row.disposition === "ANSWERED";
  };

  const rows = [];
  state?.report?.report?.data &&
    state?.report?.report?.data?.forEach((item, index) => {
      rows.push({
        id: index + 1,
        did_tfn: item.tfn_number,
        destination_number: item.service_type,
        uniqueid: item.uniqueid,
        caller_id_number: item.clid,
        user_uuid: item?.user_uuid,
        call_direction: item?.call_direction,
        disposition: item?.disposition,
        duration: item?.duration,
        billsec: item?.billsec,
        answer_at: item.answer_at,
        time: item.answer_at,
        end_at: item.end_at,
        start_at: item.start_at,
        start_time: item.start_at,
        end_at: item.end_at,
        recording_path: item.recording_path,
        hangup_reason: item.hangup_reason,
        destination_type: item.destination_type,
        destination: item.destination,
        username: item.username,
        answered_by: item.answered_by
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
                        // style={{
                        //   display: "flex",
                        //   justifyContent: "space-between",
                        //   alignItems: "end",
                        // }}
                        >
                          <div className="col-12">
                            <h3>call details records</h3>
                           
                          </div>

                        </div>


                        <Grid container className='cdr_filter_row' style={{padding:'20px 0'}}>
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
                                        value={userId}
                                        onChange={(e) => {
                                          setUserId(e.target.value);
                                        }}
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
                              label="Caller Number"
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
                          <Grid xl={3} lg={3} md={3} sm={12} xs={12} style={{ display: 'flex', alignItems: 'center' }}>
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
                          </Grid>
                          <Grid xl={3} lg={3} md={3} sm={12} xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                          <TextField
                              className={classes.formControl}
                              style={{
                                width: "98%",
                                margin: " 5px 0 5px 0",
                              }}
                              type="text"
                              label="DID Number"
                              variant="outlined"
                              value={didNumber}
                                        onChange={(e) => {
                                          setDidNumber(e.target.value);
                                        }}
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
                              value={destination}
                                        onChange={(e) => {
                                          setDestination(e.target.value);
                                        }}
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
                                value={callDirection}
                                        onChange={(e) => {
                                          setCallDirection(e.target.value);
                                        }}

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
                          </Grid>
                          <Grid xl={3} lg={3} md={3} sm={12} xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}  className={classes.formControl} >
      <DemoContainer components={['DatePicker']} sx={{width:"98%"}}>
        <DatePicker 
        label="From Date"
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

                        <ThemeProvider theme={theme}>
                        <div style={{ height: '500px', width: '100%' }}>
                            <DataGrid
                              // className="tbl_innr_box"
                              rows={rows}
                              columns={columns}
                              headerClassName="custom-header"
                              // getRowClassName={(params) =>
                              //   isRowBordered(params)
                              //     ? classes.borderedGreen
                              //     : classes.borderedRed
                              // }
                              components={{ Toolbar: GridToolbar }}
                              //autoHeight
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

export default ResellerReport;
