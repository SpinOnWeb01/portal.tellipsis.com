import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SearchIcon from "@mui/icons-material/Search";
import BlockIcon from "@mui/icons-material/Block";
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
  Popover,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
//import Frm from '../../pages/Frm';
import { useDispatch, useSelector } from "react-redux";
import {
  createBlockReport,
  getReport,
} from "../../redux/actions/adminPortal/reportAction";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "../../Switcher.scss";

import { makeStyles } from "@mui/styles";
import { getAllUsers } from "../../redux/actions/adminPortal/userAction";
import { getAdminUsersList } from "../../redux/actions/adminPortal/adminPortal_listAction";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { callStatusMessages } from "../../pages/Tooltips";

dayjs.extend(utc);
dayjs.extend(timezone);
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

const array = [
  "TFN_SUSPENDED",
  "SERVER_DOWN",
  "CALLER_ABANDONED",
  "CALL_TRANSFERED",
  "CALL_ANSWER",
  "TFN_USER_NOT_ACTIVE",
  "CALLERID_BLOCKED_BY_USER",
  "UNABLE_TO_JOIN_QUEUE",
  "DESTINATION_BUSY",
  "NOT_SUFFICIENT_FUNDS",
  "TFN_NOT_ACTIVE",
  "TRIED_ALL_CARRIER_NO_SUCCESS",
  "NORMAL_HANGUP",
  "DESTINATION_FAILED",
  "USER_NOT_FOUND",
  "TFN_USER_SUSPENDED",
  "NO_ANSWER",
  "CONGESTION",
  "DESTINATION_CONGESTION",
  "ANSWERED",
  "FASTAGI_DOWN",
];

// =====Start Items====>

// =====End Items====>

function AdminReport({ colorThem }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [currentAudio, setCurrentAudio] = useState(null);
  const [userId, setUserId] = useState("");
  const railwayZone = "Asia/Kolkata"; // Replace with your desired timezone
  const [fromDate, setFromDate] = useState(
    dayjs().tz(railwayZone).startOf("day").format("DD/MM/YYYY HH:mm")
  );
  const [toDate, setToDate] = useState(
    dayjs().tz(railwayZone).endOf("day").format("DD/MM/YYYY HH:mm") // Default to 23:59
  );
  const [callDirection, setCallDirection] = useState("");
  const [didNumber, setDidNumber] = useState("");
  const [destination, setDestination] = useState("");
  const [status, setStatus] = useState("");
  const [response, setResponse] = useState("");
  const [callerId, setCallerId] = useState("");
  const [extension, setExtension] = useState("");
  const audioRefs = useRef({}); // Store references to audio elements
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectionChange = (selection) => {
    setSelectedRows(selection);
  };

  const classes = useStyles();
  const handleFromDateChange = (date) => {
    if (dayjs(date, "DD/MM/YYYY HH:mm", true).isValid()) {
      setFromDate(dayjs(date).tz(railwayZone).format("DD/MM/YYYY HH:mm"));
    } else {
      setFromDate(null);
    }
  };

  const handleToDateChange = (date) => {
    if (dayjs(date, "DD/MM/YYYY HH:mm", true).isValid()) {
      setToDate(dayjs(date).tz(railwayZone).format("DD/MM/YYYY HH:mm"));
    } else {
      setToDate(null);
    }
  };
  useEffect(() => {
    let data = JSON.stringify({
      from_date: dayjs().startOf("day").format("YYYY-MM-DD HH:mm"),
      to_date: dayjs().format("YYYY-MM-DD HH:mm"),
    });
    dispatch(getReport(data));
    dispatch(getAllUsers(""));
    dispatch(getAdminUsersList());
  }, [dispatch, response]);

  useMemo(() => {
    if (state?.getAdminUsersList?.userList) {
      const usersArray = Object.keys(state?.getAdminUsersList?.userList)?.map(
        (key) => ({
          user_id: key,
          username: state?.getAdminUsersList?.userList[key],
        })
      );
      setUsers(usersArray);
    }
  }, [state?.getAdminUsersList?.userList]);

  const handleSearch = (e) => {
    // Convert fromDate and toDate to YYYY-MM-DD format
    const formattedFromDate = fromDate
      ? dayjs(fromDate, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD HH:mm")
      : null;
    const formattedToDate = toDate
      ? dayjs(toDate, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD HH:mm")
      : null;
    let data = JSON.stringify({
      caller_id: callerId,
      user_id: userId,
      from_date: formattedFromDate,
      to_date: formattedToDate,
      call_direction: callDirection,
      didnumber: didNumber,
      destination: destination,
      hangup_reason: status,
      extension: extension,
    });
    dispatch(getReport(data));
  };

  const handleReset = (e) => {
    setFromDate(null);
    setToDate(null);
    setUserId("");
    setCallDirection("");
    setDidNumber("");
    setDestination("");
    setResponse("data");
    setExtension("");
    setCallerId("");
    setStatus("");
  };

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

    const getStatusMessage = (key) => {
      const status = callStatusMessages.find((item) => item.key === key);
      return status ? status.value : "Unknown Status";
    };
  
    const CallStatusTooltip = ({ statusKey }) => {
      const isMobile = useMediaQuery("(max-width:600px)"); // Detect mobile
      const [anchorEl, setAnchorEl] = useState(null);
    
      const handleClick = (event) => {
        if (isMobile) {
          setAnchorEl(event.currentTarget); // Open Popover on click
        }
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
    
      return (
        <>
          {isMobile ? (
            <>
              {/* Clickable text for mobile */}
              <span
                onClick={handleClick}
                style={{
                  fontSize: "12.215px",
                  color: "#1976d2",
                  display: "block",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "120px",
                }}
              >
                {statusKey}
              </span>
    
              {/* Popover for Mobile */}
              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Typography sx={{ p: 2, maxWidth: "200px", fontSize: "12.215px", }}>
                  {getStatusMessage(statusKey)}
                </Typography>
              </Popover>
            </>
          ) : (
            // Tooltip for Desktop
            <Tooltip title={getStatusMessage(statusKey)} arrow>
              <span
                style={{
                  fontSize: "12.215px",
                  color: "#1976d2",
                  display: "block",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "200px",
                }}
              >
                {statusKey}
              </span>
            </Tooltip>
          )}
        </>
      );
    };

  const columns = [
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
          return (
            <>
              <span style={{ color: "blue", fontSize: "12.215px", }}>
                {day}/{month}/{year}
              </span>
              &nbsp;
              <span style={{ color: "green", fontSize: "12.215px", }}>
                {hours}:{minutes}:{seconds}
              </span>
            </>
          );
        }
      },
    },
    {
      field: "username",
      headerName: "Username",
      headerClassName: "custom-header",
      width: 150,
      headerAlign: "center",
      align: "center",
      cellClassName: "super-app-theme--cell",
          renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">            
             <span style={{ fontSize: "12.215px", }}>  {params?.row?.username}</span>            
          </div>
        );
      },
    },
    {
      field: "caller_id_number",
      headerName: "Caller ID",
      headerClassName: "custom-header",
      width: 120,
      headerAlign: "center",
      align: "center",
      cellClassName: "super-app-theme--cell",
         renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">            
             <span style={{ fontSize: "12.215px", }}>  {params?.row?.caller_id_number}</span>            
          </div>
        );
      },
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
        renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">            
             <span style={{ fontSize: "12.215px", }}>  {params?.row?.did_tfn}</span>            
          </div>
        );
      },
    },
    
    {
      field: "call_direction",
      headerName: "Call Direction",
      width: 120,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            {params.row.call_direction === "Inbound" ? (
              <span
                style={{
                  fontWeight: "500",
                  color: "#17a2b8",
                  margin: "0",
                  fontSize: "12.215px",
                  textTransform: "capitalize",
                }}
              >
                {params?.row?.call_direction}
              </span>
            ) : (
              <span
                style={{
                  fontWeight: "500",
                  color: "#fd7e14",
                  margin: "0",
                  textTransform: "capitalize",
                }}
              >
                {params?.row?.call_direction}
              </span>
            )}
          </div>
        );
      },
    },

    {
      field: "hangup_reason",
      headerName: "Hangup Reason",
      width: 220,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      renderCell: (params) => <CallStatusTooltip statusKey={params.value} style={{ fontSize: "12.215px", }} />
    },

    {
      field: "call_result",
      headerName: "Status",
      width: 220,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.15vw)", fontWeight: "bold" }}
        >
          Status
        </Typography>
      ),
      renderCell: (params) => (
        <span
          style={{
            color:
              params.row.call_result === "ANSWERED"
                ? "green"
                : params.row.call_result === "Missed"
                  ? "orange"
                  : params.row.call_result === "Failed"
                    ? "red"
                    : "red",
            fontSize: "calc(0.5rem + 0.2vw)",
          }}
        >
          {params.row.call_result}
        </span>
      ),
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
                fontSize: "12.215px",
                
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
      fontSize: "12.215px",
      align: "center",
         renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">            
             <span style={{ fontSize: "12.215px", }}>  {params?.row?.destination_type}</span>            
          </div>
        );
      },
      
    },
    
    {
      field: "destination",
      headerName: "Destination",
      width: 150,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
        renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">            
             <span style={{ fontSize: "12.215px", }}>  {params?.row?.destination}</span>            
          </div>
        );
      },
    },
    {
      field: "duration",
      headerName: "Duration",
      width: 100,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
        renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">            
             <span style={{ fontSize: "12.215px", }}>  {params?.row?.duration}</span>            
          </div>
        );
      },
    },

    {
      field: "billsec",
      headerName: "Bill Sec",
      width: 100,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
        renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">            
             <span style={{ fontSize: "12.215px", }}>  {params?.row?.billsec}</span>            
          </div>
        );
      },
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
          return <></>;
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
        renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">            
             <span style={{ fontSize: "12.215px", }}>  {params?.row?.answered_by}</span>            
          </div>
        );
      },
    },
    {
      field: "transfered_to",
      headerName: "Transfered",
      width: 130,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
        renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">            
             <span style={{ fontSize: "12.215px", }}>  {params?.row?.transfered_to}</span>            
          </div>
        );
      },
    },
    {
      field: "answer_at",
      headerName: "Call Answer Time",
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
          return (
            <>
              <span style={{ color: "blue", fontSize: "12.215px", }}>
                {day}/{month}/{year}
              </span>
              &nbsp;
              <span style={{ color: "green", fontSize: "12.215px", }}>
                {hours}:{minutes}:{seconds}
              </span>
            </>
          );
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

          return (
            <>
              <span style={{ color: "blue", fontSize: "12.215px", }}>
                {day}/{month}/{year}
              </span>
              &nbsp;
              <span style={{ color: "green", fontSize: "12.215px", }}>
                {hours}:{minutes}:{seconds}
              </span>
            </>
          );
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
        renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">            
             <span style={{ fontSize: "12.215px", }}>  {params?.row?.uniqueid}</span>            
          </div>
        );
      },
    },
  ];

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
        answered_by: item.answered_by,
        transfered_to: item.transfered_to,
        call_result: item.call_result,
      });
    });

  const selectedCallerDataMap = new Map();

  selectedRows.forEach((id) => {
    const selectedRow = rows.find((row) => row.id === id);
    if (selectedRow) {
      const userId = selectedRow.user_uuid;
      if (!selectedCallerDataMap.has(userId)) {
        selectedCallerDataMap.set(userId, {
          type: "CallerID",
          details: [],
          description: "Report",
          user_id: JSON.stringify(userId),
          is_active: true,
        });
      }
      const data = selectedCallerDataMap.get(userId);
      if (!data.details.includes(selectedRow.caller_id_number)) {
        data.details.push(selectedRow.caller_id_number);
      }
    }
  });

  const selectedCallerData = Array.from(selectedCallerDataMap.values());

  const handleBlockCallerIds = () => {
    dispatch(createBlockReport(JSON.stringify(selectedCallerData)));
  };

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

                        <div className="cntnt_title">
                          <div className="col-12">
                            <h3>call details records</h3>
                          </div>
                        </div>

                        <Grid
                          container
                          className="cdr_filter_row"
                          style={{ padding: "0px 0" }}
                        >
                          <Grid
                            xl={2}
                            lg={2}
                            md={3}
                            sm={12}
                            xs={12}
                            style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
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
                            <TextField
                              className={classes.formControl}
                              style={{
                                width: "98%",
                                margin: " 5px 0 5px 0",
                              }}
                              type="text"
                              label="Caller Id"
                              variant="outlined"
                              value={callerId}
                              onChange={(e) => setCallerId(e.target.value)}
                            />
                          </Grid>
                          <Grid
                            xl={2}
                            lg={2}
                            md={2}
                            sm={12}
                            xs={12}
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <TextField
                              className={classes.formControl}
                              style={{
                                width: "98%",
                                margin: " 5px 0 5px 0",
                              }}
                              type="text"
                              label="Extension"
                              variant="outlined"
                              value={extension}
                              onChange={(e) => setExtension(e.target.value)}
                            />
                          </Grid>

                          <Grid
                            xl={2}
                            lg={2}
                            md={2}
                            sm={12}
                            xs={12}
                            style={{ display: "flex", alignItems: "center" }}
                          >
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
                          <Grid
                            xl={2}
                            lg={2}
                            md={2}
                            sm={12}
                            xs={12}
                            style={{ display: "flex", alignItems: "center" }}
                          >
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
                          <Grid
                            xl={2}
                            lg={2}
                            md={2}
                            sm={12}
                            xs={12}
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <FormControl
                              className={classes.formControl}
                              fullWidth
                              style={{ width: "98%", margin: "7px 0" }}
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
                                <MenuItem value={"Outbound"}>Outbound</MenuItem>
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
                              className={classes.formControl}
                              fullWidth
                              style={{ width: "98.5%", margin: "7px 0px" }}
                            >
                              <InputLabel id="demo-simple-select-label">
                                Status
                              </InputLabel>

                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Status"
                                style={{ textAlign: "left" }}
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                              >
                                {array.map((item, index) => (
                                  <MenuItem key={index} value={item}>
                                    {item}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid
                            xl={3}
                            lg={3}
                            md={3}
                            sm={12}
                            xs={12}
                            style={{ display: "flex", alignItems: "center", margin: "7px 0" }}
                          >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DateTimePicker
                                label="From Date"
                                value={
                                  fromDate
                                    ? dayjs(fromDate, "DD/MM/YYYY HH:mm")
                                    : null
                                }
                                onChange={handleFromDateChange}
                                renderInput={(props) => (
                                  <TextField {...props} />
                                )}
                                format="DD/MM/YYYY HH:mm" // 24-hour format
                                ampm={false} // Disables AM/PM toggle
                                minutesStep={1}
                              />
                            </LocalizationProvider>
                          </Grid>
                          <Grid
                            xl={3}
                            lg={3}
                            md={3}
                            sm={12}
                            xs={12}
                            style={{ display: "flex", alignItems: "center", margin: "7px 0" }}
                          >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DateTimePicker
                                label="To Date"
                                value={
                                  toDate
                                    ? dayjs(toDate, "DD/MM/YYYY HH:mm")
                                    : null
                                }
                                onChange={handleToDateChange}
                                renderInput={(props) => (
                                  <TextField {...props} />
                                )}
                                format="DD/MM/YYYY HH:mm" // 24-hour format
                                ampm={false} // Disables AM/PM toggle
                                minutesStep={1} // Show all minutes (no step increment)
                              />
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
                              justifyContent: "end",
                              padding: "20px 0",
                            }}
                          >
                            <div>
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
                            </div>

                                 <div>
                            <IconButton
                              className="filter_block_btn"
                              style={{
                                marginLeft: "0 !important",
                                background: selectedCallerData.length
                                  ? "red"
                                  : "black",
                              }}
                              onClick={handleBlockCallerIds}
                            >
                              Block &nbsp;
                              <BlockIcon />
                            </IconButton>
                          </div>
                          </Grid>

                     
                        </Grid>

                        <ThemeProvider theme={theme}>
                          <div style={{ height: 500, width: "100%" }}>
                            <DataGrid
                              rows={rows}
                              columns={columns}
                              checkboxSelection
                              disableRowSelectionOnClick 
                              components={{ Toolbar: GridToolbar }}
                              onRowSelectionModelChange={handleSelectionChange}
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

export default AdminReport;
