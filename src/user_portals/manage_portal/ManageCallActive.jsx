import { Box, Button, FormControl, Tooltip, FormControlLabel, FormLabel, IconButton, MenuItem, Radio, RadioGroup, Select } from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import socketIOClient from "socket.io-client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getAdminCallActive } from "../../redux/actions/adminPortal/adminPortal_callActiveAction";
import { toast } from "react-toastify";
import { api } from "../../mockData";
import axios from "axios";
import { Table } from "react-bootstrap";

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

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarDensitySelector />
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

export function CustomFooterStatusComponent(props) {
  return (<></>
    // <Box sx={{ p: 1, display: 'flex' }}>
    //   <FiberManualRecordIcon
    //     fontSize="small"
    //     sx={{
    //       mr: 1,
    //       color: props.status === 'connected' ? '#4caf50' : '#d9182e',
    //     }}
    //   />
    //   Status {props.status}
    // </Box>
  );
}

function ManageCallActive() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const current_user = localStorage.getItem("current_user");
  const userId = JSON.parse(localStorage.getItem(`user_${current_user}`));
  const [callDetails, setCallDetails] = useState("");
  const [selectedValue, setSelectedValue] = useState('Active'); // Initialize state for selected radio value
  const [option, setOption] = useState("L");
  const [timeStamp, setTimeStamp] = useState([]);
  const [timeDifference, setTimeDifference] = useState([]);
  const [queueRows, setQueueRows] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });


  const parseTimestamp = () => {
    return timeStamp?.map((item) => {
      const date = new Date(item.TimeStamp);
      return date; // Keep Date objects for time difference calculation
    });
  };

  const timestampDate = parseTimestamp();

  // Function to calculate time differences for each timestamp
  const calculateTimeDifferences = () => {
    const currentTime = new Date();
    const differences = timestampDate?.map((timestamp) => {
      const diffInMs = currentTime - timestamp;
      const diffInSeconds = Math.floor(diffInMs / 1000);
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);

      // Format with leading zeros
      const formattedHours = String(diffInHours).padStart(2, '0');
      const formattedMinutes = String(diffInMinutes % 60).padStart(2, '0');
      const formattedSeconds = String(diffInSeconds % 60).padStart(2, '0');

      return {
        days: diffInDays,
        hours: formattedHours,
        minutes: formattedMinutes,
        seconds: formattedSeconds
      };
    });

    setTimeDifference(differences);
  };

  // Calculate time differences initially and update every 5 seconds
  useEffect(() => {
    calculateTimeDifferences(); // Initial calculation

    const interval = setInterval(() => {
      calculateTimeDifferences(); // Recalculate every 5 seconds
    }, 5000);

    return () => clearInterval(interval);
  }, [timeStamp]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value); // Update state with the selected radio value
  };


  useEffect(() => {
    const socket = socketIOClient(`${api.dev}`);

    // Listen for events from the server
    socket.on("call_details", (data) => {
      // Handle the received data (e.g., update state, trigger a re-fetch)
      if (data?.data !== undefined) {
        //   console.log('data', data?.data)
        // const jsonData = JSON.parse(data?.data);
        setCallDetails(data?.data);
      }
    });

    return () => {
      // Disconnect the socket when the component unmounts
      socket.disconnect();
    };
    // dispatch(getReport());
  }, [selectedValue]); // Empty dependency array ensures this effect runs once on mount



  const handleBarging = async (data) => {
    const current_user = localStorage.getItem("current_user");
    const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
    let values = JSON.stringify({
      channel: data,
      option: option,
    });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token} `,
        },
      };
      const { data } = await axios.post(
        `${api.dev}/api/callbarge`,
        values,
        config
      );
      if (data?.status === 200) {
        toast.success(data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        });
      } else {
        toast.error(data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
      });
    }
  };

  const activeRows = useMemo(() => {
    if (callDetails !== undefined) {
      // Parse the object and map keys to desired structure
      return Object.keys(callDetails)
        .map((key) => {
          try {
            const parsedValue = JSON.parse(callDetails[key]); // Parse JSON string
            return {
              id: key, // Add the key as 'id'
              ...parsedValue, // Spread the parsed object
            };
          } catch (error) {
            console.error(`Failed to parse JSON for key: ${key}`, error);
            return null; // Return null or handle error as needed
          }
        })
        .filter(Boolean) // Filter out any null entries
        .filter((row) => row.UserId === userId.uid); // Filter rows where UserId matches userId.uid
    }
    return [];
  }, [callDetails, userId.uid]);


  // const activeRows = useMemo(() => {
  //   return Object.keys(callDetails)
  //     .filter((key) => callDetails[key].UserId === userId.uid)
  //     .map((key) => ({
  //       id: key,
  //       ...callDetails[key],
  //     }))
  //     //.filter(item => item.Status === "ANSWER");
  // }, [callDetails, userId.uid]);

  useEffect(() => {
    // Prepare timeStamp array from mockDataTeam
    const formattedTimeStamps = activeRows?.map((item) => ({
      id: item.id,
      TimeStamp: item.TimeStamp, // Assuming TimeStamp is a property of each item
    }));

    setTimeStamp(formattedTimeStamps);
  }, [activeRows]);

  const activeColumns = [
    // {
    //   field: "Username",
    //   headerName: "Username",
    //   headerClassName: "custom-header",
    //   headerAlign: "center",
    //   align: "center",
    //   width: 150,
    // },
    {
      field: "DIDNumber",
      headerName: "Did Number",
      width: 150,
      //cellClassName: "name-column--cell",
      //headerClassName: 'super-app-theme--header'
      headerClassName: "custom-header",
      // editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "CallerID",
      headerName: "Caller Id",
      // type: "number",
      width: 150,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
    },

    {
      field: "Details",
      headerName: "Extension",
      width: 150,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },

    // {
    //   field: "ServiceType",
    //   headerName: "Service Type",
    //   width: 150,
    //   headerClassName: "custom-header",
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //   field: "SubType",
    //   headerName: "Type",
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
    //             margin: "0",
    //             textTransform: "capitalize",
    //           }}
    //         >
    //           {params?.row?.SubType}
    //         </p>
    //       </div>
    //     );
    //   },
    // },
    // {
    //   field: "TimeStamp",
    //   headerName: "Start Time",
    //   width: 200,
    //   headerClassName: "custom-header",
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //   field: "Duration",
    //   headerName: "Duration",
    //   width: 150,
    //   headerClassName: "custom-header",
    //   headerAlign: "center",
    //   align: "center",
    // },

    {
      field: "CallDirection",
      headerName: "Call Direction",
      width: 150,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },

    {
      field: "CallDuration",
      headerName: "Call Duration",
      width: 150,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        if (params.value !== null) {
          const index = activeRows.findIndex(item => item.id === params.row.id);
          const duration = timeDifference && timeDifference[index];

          return (
            <span style={{ color: "green" }}>
              {duration ? `${duration.hours}:${duration.minutes}:${duration.seconds}` : ''}
            </span>
          );
        }
        return null;
      },
    },

    {
      field: "Status",
      headerName: "Status",
      width: 120,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
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
                onClick={(e) => {
                  handleBarging(params.row.Channel);
                }}
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
              <FormControl fullWidth style={{ width: "100%", margin: "7px 0" }}>
                <Select
                  style={{ textAlign: "left" }}
                  defaultValue={option}
                  onChange={(e) => {
                    setOption(e.target.value);
                  }}
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

  const queueColumns = [
    // {
    //   field: "Username",
    //   headerName: "Username",
    //   headerClassName: "custom-header",
    //   headerAlign: "center",
    //   align: "center",
    //   width: 150,
    // },
    {
      field: "DIDNumber",
      headerName: "Did Number",
      width: 150,
      //cellClassName: "name-column--cell",
      //headerClassName: 'super-app-theme--header'
      headerClassName: "custom-header",
      // editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "CallerID",
      headerName: "Caller Id",
      // type: "number",
      width: 150,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
    },

    {
      field: "Details",
      headerName: "Extension",
      width: 150,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },

    // {
    //   field: "ServiceType",
    //   headerName: "Service Type",
    //   width: 150,
    //   headerClassName: "custom-header",
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //   field: "SubType",
    //   headerName: "Type",
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
    //             margin: "0",
    //             textTransform: "capitalize",
    //           }}
    //         >
    //           {params?.row?.SubType}
    //         </p>
    //       </div>
    //     );
    //   },
    // },
    // {
    //   field: "TimeStamp",
    //   headerName: "Start Time",
    //   width: 200,
    //   headerClassName: "custom-header",
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //   field: "Duration",
    //   headerName: "Duration",
    //   width: 150,
    //   headerClassName: "custom-header",
    //   headerAlign: "center",
    //   align: "center",
    // },

    {
      field: "CallDirection",
      headerName: "Call Direction",
      width: 150,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },

    {
      field: "Status",
      headerName: "Status",
      width: 150,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
    // {
    //   field: "Extensions",
    //   headerName: "Extensions",
    //   width: 200,
    //   headerClassName: "custom-header",
    //   headerAlign: "center",
    //   align: "center",
    //   renderCell: (params) => (
    //     <div>
    //       {Object.entries(params.row.Extensions || {}).map(([key, value]) => (
    //         <div key={key}>
    //           <strong>{key}: </strong>
    //           {value}
    //         </div>
    //       ))}
    //     </div>
    //   ),
    // },
    {
      field: "Extensions",
      headerName: "Extensions",
      width: 200,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div>
          {params.row.Extensions && params.row.Extensions.map((extension, index) => (
            <div key={index}>
              <strong>{extension.key}: </strong>
              {extension.value}
            </div>
          ))}
          {!params.row.Extensions && <span>No Extensions</span>}
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
                onClick={(e) => {
                  handleBarging(params.row.Channel);
                }}
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
              <FormControl fullWidth style={{ width: "100%", margin: "7px 0" }}>
                <Select
                  style={{ textAlign: "left" }}
                  defaultValue={option}
                  onChange={(e) => {
                    setOption(e.target.value);
                  }}
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

  // const queueRows = useMemo(() => {

  //   return Object.keys(callDetails)
  //     .filter((key) => callDetails[key].UserId === userId.uid)
  //     .map((key) => ({
  //       id: key,
  //       ...callDetails[key],
  //     })).filter(item => item.SubType === "QUEUE");;
  // }, [callDetails, userId.uid]);





  const mockDataTeam = useMemo(() => {
    let rows = [];
    const uniqueIdSet = new Set();

    if (callDetails !== undefined) {

      Object.keys(callDetails).forEach((key) => {
        if (callDetails[key].UserId === userId.uid) {
          const { Extensions, Uniqueid, ...rest } = callDetails[key];

          // Handle cases where Extensions is empty
          if (!Extensions || Object.keys(Extensions).length === 0) {
            const uniqueId = `${Uniqueid}-default`;
            if (!uniqueIdSet.has(uniqueId)) {
              uniqueIdSet.add(uniqueId);
              rows.push({
                id: uniqueId,
                Uniqueid: Uniqueid,
                ...rest,
                Extensions: [{ key: '', value: null }],
              });
            }
          } else {
            // Handle cases where Extensions has entries
            Object.entries(Extensions).forEach(([extKey, value]) => {
              const uniqueId = `${Uniqueid}-${extKey}`;
              if (!uniqueIdSet.has(uniqueId)) {
                uniqueIdSet.add(uniqueId);
                rows.push({
                  id: uniqueId,
                  Uniqueid: Uniqueid,
                  ...rest,
                  Extensions: [{ key: extKey, value }],
                });
              }
            });
          }

        }
      });
    }

    const filteredRows = rows.filter(item => item.Status !== "ANSWER");
    setQueueRows(filteredRows);
    return filteredRows;
  }, [callDetails, userId.uid]);


  const columns2 = [
    { key: "sno", label: "S.No", textAlign: "center" },

    { key: "DIDNumber", label: "Did Number" },
    { key: "CallerID", label: "Caller Id" },
    { key: "Extension", label: "Extension" },
    { key: "CallDirection", label: "Call Direction" },
    { key: "CallDuration", label: "Call Duration", width: 100, textAlign: "center" },
    { key: "Status", label: "Status" },
    { key: "Extensions", label: "Extensions" },
    { key: "barging", label: "Barge" },
    { key: "Options", label: "Options" },


  ];


  const handleSort = (columnKey) => {
    if (sortConfig.key === columnKey) {
      if (sortConfig.direction === "asc") setSortConfig({ key: columnKey, direction: "desc" });
      else if (sortConfig.direction === "desc") setSortConfig({ key: null, direction: null });
      else setSortConfig({ key: columnKey, direction: "asc" });
    } else {
      setSortConfig({ key: columnKey, direction: "asc" });
    }
  };

  const getSortIcon = (columnKey) => {
    const isActive = sortConfig.key === columnKey;
    const direction = sortConfig.direction;
    let iconClass = "fa-solid ";
    if (!isActive) iconClass += "fa-arrow-up";
    else if (direction === "asc") iconClass += "fa-arrow-up";
    else if (direction === "desc") iconClass += "fa-arrow-down";

    return (
      <i
        className={iconClass}
        style={{
          opacity: isActive && direction ? 1 : 0,
          transition: "opacity 0.3s ease",
          color: isActive ? "#fff" : "#aaa",
          marginLeft: "5px",
        }}
      ></i>
    );
  };

  const displayData = useMemo(() => {
    return selectedValue === "Active" ? activeRows : queueRows;
  }, [selectedValue, activeRows, queueRows]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return displayData;
    const dir = sortConfig.direction === "asc" ? 1 : -1;
    return [...displayData].sort((a, b) => {
      let av = a[sortConfig.key];
      let bv = b[sortConfig.key];
      av = String(av ?? "").toLowerCase();
      bv = String(bv ?? "").toLowerCase();
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return 0;
    });
  }, [displayData, sortConfig]);

  return (
    <>
      <section className="sidebar-sec">
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


                    {/* <!--active-calls-contet--> */}
                    <div className="tab_cntnt_box">
                      <div
                        className="cntnt_title"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "end",
                        }}
                      >
                        {/* <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Live Calls</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={selectedValue} // Bind the selected value to state
        onChange={handleChange} // Handle change event
      >
        <FormControlLabel value="Active" control={<Radio />} label="Active Calls" />
        <FormControlLabel value="Queue" control={<Radio />} label="Queue Calls" />
      </RadioGroup>
    </FormControl> */}

                      </div>
                      {/* {selectedValue === "Active" ? (<> <div className="cntnt_title">
                        <h3>Live Calls</h3>
                      </div>
                        <ThemeProvider theme={theme}>
                          <div style={{ height: "100%", width: "100%" }}>
                            <DataGrid
                              rows={activeRows}
                              columns={activeColumns}
                              headerClassName="custom-header"
                              components={{ Toolbar: GridToolbar }}
                              slots={{
                                toolbar: CustomToolbar,
                                footer: CustomFooterStatusComponent,
                              }}
                              autoHeight
                            />
                          </div>
                        </ThemeProvider></>) : (<>
                          <div className="cntnt_title">
                            <h3>Queue Calls</h3>
                          </div>
                          <ThemeProvider theme={theme}>
                            <div style={{ height: "100%", width: "100%" }}>
                              <DataGrid
                                rows={queueRows}
                                columns={queueColumns}
                                headerClassName="custom-header"
                                components={{ Toolbar: GridToolbar }}
                                slots={{
                                  toolbar: CustomToolbar,
                                  footer: CustomFooterStatusComponent,
                                }}
                                autoHeight
                              />
                            </div>
                          </ThemeProvider>
                        </>)} */}


                      
                    </div>

                    <div className="table-wrapper">
                      <div className="scroll-top">
                        <div className="scroll-inner">
                          <Table hover size="sm" bordered responsive className="call-active-table border-1">
                            <tr className="active-table-head">
                              {columns2.map((col) => (
                                <th
                                  key={col.key}
                                  onClick={() => handleSort(col.key)}
                                  style={{ cursor: "pointer", userSelect: "none", textAlign: col.textAlign || "left" }}
                                >
                                  <span>{col.label}</span>
                                  <span className="sortingicon">{getSortIcon(col.key)}</span>
                                </th>
                              ))}
                            </tr>

                            <tbody>
                              {sortedData.length === 0 ? (
                                <tr>
                                  <td colSpan={columns2.length} className="text-center text-muted py-2">
                                    No rows
                                  </td>
                                </tr>
                              ) : (
                                sortedData.map((row, index) => {
                                  const duration = timeDifference[index];
                                  const date = new Date(row.TimeStamp);
                                  const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${String(
                                    date.getMonth() + 1
                                  ).padStart(2, "0")}/${date.getFullYear()}`;
                                  const formattedTime = `${String(date.getHours()).padStart(2, "0")}:${String(
                                    date.getMinutes()
                                  ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;

                                  return (
                                    <tr key={row.id}>
                                      <td className="text-center">{index + 1}</td>
                                      
                                      <td>{row.DIDNumber}</td>
                                      <td>{row.CallerID}</td>
                                      {/* <td>{row.Details}</td> */}

                                       <td className="ext-cell">
                                        <Tooltip 
                                          title={row.Details} 
                                          arrow 
                                          placement="top"
                                        >
                                          <span style={{ cursor: "pointer" }}>
                                            {
                                              row.Details
                                                .split(",")            // string → array
                                                .slice(0, 2)           // first 2 items
                                                .join(", ")            // comma-separated
                                            }
                                            {
                                              row.Details.split(",").length > 2 && " ..."
                                            }
                                          </span>
                                        </Tooltip>
                                      </td>
                                      <td>{row.CallDirection}</td>
                                      <td style={{ color: "green", textAlign: "center" }}>
                                        {duration
                                          ? `${duration.hours}:${duration.minutes}:${duration.seconds}`
                                          : ""}
                                      </td>
                                        
                                      <td>
                                        <span
                                          style={{
                                            color:
                                              row.Status === "ANSWER"
                                                ? "green"
                                                : row.Status === "RINGING"
                                                  ? "skyblue"
                                                  : row.Status === "DIALING"
                                                    ? "violet"
                                                    : "grey",
                                          }}
                                        >
                                          {row.Status}
                                        </span>
                                      </td>
                                      <td>
                                        {Object.entries(row.Extensions || {}).map(([key, value]) => (
                                          <div key={key}>
                                            <strong>{key}: </strong>
                                            {value}
                                          </div>
                                        ))}
                                      </td>

                                           <td>
                                        {row.Status === "ANSWER" && (
                                          <Button
                                            // variant="outlined"
                                            sx={{
                                              ":hover": {
                                                bgcolor: "error.main",
                                                color: "white",
                                              },
                                              padding: "2px",
                                              textTransform: "capitalize",
                                              fontSize: "12px",
                                              color: "error.main",
                                              borderColor: "error.main",
                                              border: "1px solid #d32f2f",
                                            }}
                                            onClick={(e) => {
                                              handleBarging(row.Channel);
                                            }}
                                          >
                                            Barge
                                          </Button>
                                        )}
                                      </td>
                                      <td>
                                        {row.Status === "ANSWER" && (
                                          <FormControl fullWidth style={{ width: "100%", margin: "7px 0",   }} className="table_dropdown">
                                            <Select
                                              style={{ textAlign: "left", paddingLeft:'7px !important', borderRadius: '5px', }}
                                              defaultValue={option}
                                              onChange={(e) => {
                                                setOption(e.target.value);
                                              }}
                                              className="table_slct_drop"

                                              sx={{
                                                
                                                fontSize: "12px",
                                                 marginLeft: "7px",
                                              padding: "5px 0px!important",
                                            
                                            }}
                                            >
                                              <MenuItem value={"L"}>Listen</MenuItem>
                                              <MenuItem value={"LT"}>Listen and Talk</MenuItem>
                                            </Select>
                                          </FormControl>
                                        )}
                                      </td>



                                   

                                    </tr>
                                  );
                                })
                              )}
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </div>
                    {/* <!--active-calls-content--> */}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ManageCallActive;
