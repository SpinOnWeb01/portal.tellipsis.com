import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import {
  DataGrid,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import "../../Switcher.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAdminCallActive } from "../../redux/actions/adminPortal/adminPortal_callActiveAction";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-toastify";
import { api } from "../../mockData";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import dayjs from "dayjs";
import { Table } from "react-bootstrap";
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

function AdminCallActive({ colorThem }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [option, setOption] = useState("L");
  const [timeStamp, setTimeStamp] = useState([]);
  const [timeDifference, setTimeDifference] = useState([]);
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

  useEffect(() => {
    dispatch(getAdminCallActive());
  }, [dispatch]); // Empty dependency array ensures this effect runs once on mount

  const handleBarging = async (data) => {
    const token = JSON.parse(localStorage.getItem("admin"));
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
      width: 190,
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
          const formattedDate = dayjs(params.value).format("DD-MM-YYYY HH:mm:ss");

          return (
            <>
              <span style={{ color: "blue" }}>{formattedDate}</span>
            </>
          );
        }
        return null;
      },
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
          const index = mockDataTeam.findIndex(item => item.id === params.row.id);
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



    // {
    //   field: "Info",
    //   headerName: "Information",
    //   width: 150,
    //   headerClassName: "custom-header",
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //   field: "Status",
    //   headerName: "Status",
    //   width: 150,
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
    //           }}
    //         >
    //           {params?.row?.Status === "ANSWER" ? (
    //             <>
    //               {" "}
    //               <p
    //                 style={{
    //                   fontWeight: "500",
    //                   margin: "0",
    //                   color: "green",
    //                 }}
    //               >
    //                 {params?.row?.Status}
    //               </p>
    //             </>
    //           ) : (
    //             <></>
    //           )}
    //           {params?.row?.Status === "DIALING" ? (
    //             <>
    //               {" "}
    //               <p
    //                 style={{
    //                   fontWeight: "500",
    //                   margin: "0",
    //                   color: "violet",
    //                 }}
    //               >
    //                 {params?.row?.Status}
    //               </p>
    //             </>
    //           ) : (
    //             <></>
    //           )}
    //           {params?.row?.Status === "RINGING" ? (
    //             <>
    //               {" "}
    //               <p
    //                 style={{
    //                   fontWeight: "500",
    //                   margin: "0",
    //                   color: "skyblue",
    //                 }}
    //               >
    //                 {params?.row?.Status}
    //               </p>
    //             </>
    //           ) : (
    //             <></>
    //           )}
    //         </p>
    //       </div>
    //     );
    //   },
    // },
    //  -----before
    {
      field: "Status",
      headerName: "Status",
      width: 120,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
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
    //  -----before
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
              <FormControl fullWidth style={{ width: "100%", margin: "7px 0" }} className="table_dropdown">
                <Select
                  style={{ textAlign: "left" }}
                  defaultValue={option}
                  onChange={(e) => {
                    setOption(e.target.value);
                  }}
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

  const columns1 = [
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
      width: 190,
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
    },
    {
      field: "barging",
      headerName: "Options",
      width: 120,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
  ];





  // const mockDataTeam = useMemo(() => {

  //   if (state?.getAdminCallActive?.callactive !== undefined) {
  //     return Object.keys(state?.getAdminCallActive?.callactive)
  //       .map((key) => ({

  //         id: key,

  //         ...state?.getAdminCallActive?.callactive[key],
  //       }))
  //       //.filter((item) => item.Status === "ANSWER");
  //   }
  // }, [state?.getAdminCallActive?.callactive]);

  const mockDataTeam = useMemo(() => {
    if (state?.getAdminCallActive?.callactive !== undefined) {
      // Parse the object and map keys to desired structure
      const parsedData = Object.keys(state?.getAdminCallActive?.callactive)
        .map((key) => {
          try {
            const parsedValue = JSON.parse(state?.getAdminCallActive?.callactive[key]); // Parse JSON string
            return {
              id: key, // Add the key as 'id'
              ...parsedValue, // Spread the parsed object
            };
          } catch (error) {
            console.error(`Failed to parse JSON for key: ${key}`, error);
            return null; // Return null or handle error as needed
          }
        })
        .filter(Boolean); // Filter out any null entries

      // Sort data by TimeStamp in descending order
      return parsedData.sort((a, b) => {
        const dateA = dayjs(a.TimeStamp);
        const dateB = dayjs(b.TimeStamp);
        return dateB - dateA; // Descending order

      });
    }
    return [];
  }, [state?.getAdminCallActive?.callactive]);

  const columns2 = [
    { key: "sno", label: "S.No", textAlign: "center" },
    { key: "Username", label: "Username" },
    { key: "DIDNumber", label: "Did Number" },
    { key: "CallerID", label: "Caller Id" },
    { key: "Details", label: "Destination" },
    { key: "SubType", label: "Type" },
    { key: "TimeStamp", label: "Start Time" },
    { key: "CallDuration", label: "Call Duration", width: 100, textAlign: "center" },
    { key: "Status", label: "Status" },
    { key: "CallDirection", label: "Call Direction" },
    { key: "Extensions", label: "Extensions" },
    { key: "Options", label: "Options" },
    { key: "barging", label: "Barge" },




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

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return mockDataTeam;
    const dir = sortConfig.direction === "asc" ? 1 : -1;
    return [...mockDataTeam].sort((a, b) => {
      let av = a[sortConfig.key];
      let bv = b[sortConfig.key];
      av = String(av ?? "").toLowerCase();
      bv = String(bv ?? "").toLowerCase();
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return 0;
    });
  }, [mockDataTeam, sortConfig]);

  useEffect(() => {
    // Prepare timeStamp array from mockDataTeam
    const formattedTimeStamps = mockDataTeam?.map((item) => ({
      id: item.id,
      TimeStamp: item.TimeStamp, // Assuming TimeStamp is a property of each item
    }));

    setTimeStamp(formattedTimeStamps);
  }, [mockDataTeam]);


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
                      <div className="">
                        <h3>Live Calls</h3>
                        {/* <p>
                          Use this to monitor and interact with the active
                          calls.
                        </p> */}
                      </div>
                    </div>
                    {/* <div className="row">
                      <ThemeProvider theme={theme}>
                        {state?.getAdminCallActive?.callactive !== undefined ? (
                          <>
                            <div style={{ height: "100%", width: "100%" }}>
                              <DataGrid
                                // checkboxSelection
                                rows={mockDataTeam}
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
                                  footer: CustomFooterStatusComponent,
                                }}
                                autoHeight
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <div style={{ height: "100%", width: "100%" }}>
                              <DataGrid
                                // checkboxSelection
                                rows={rows}
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
                                  footer: CustomFooterStatusComponent,
                                }}
                                autoHeight
                              />
                            </div>
                          </>
                        )}
                      </ThemeProvider>
                    </div> */}


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
                                  console.log(row.Details)
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
                                      <td>{row.Username}</td>
                                      <td>{row.DIDNumber}</td>
                                      <td>{row.CallerID}</td>   
                                                                         
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

                                      <td>{row.SubType}</td>
                                      <td style={{ whiteSpace: 'nowrap', color: '#0000ff', }}>{dayjs(row.TimeStamp).format("DD-MM-YYYY HH:mm:ss")}
                                      </td>

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
                                      <td>{row.CallDirection}</td>
                                      <td style={{ whiteSpace: 'nowrap' }}>
                                        {Object.entries(row.Extensions || {}).map(([key, value]) => (
                                          <div key={key}>
                                            <strong>{key}: </strong>
                                            {value}
                                          </div>
                                        ))}
                                      </td>

                                      <td>
                                        {row.Status === "ANSWER" && (
                                          <FormControl fullWidth style={{ width: "100px", margin: "7px 0", }} className="table_dropdown table_slt_dropdown ">
                                            <Select
                                              style={{ textAlign: "left", paddingLeft: '7px !important', borderRadius: '5px', }}
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

                                    </tr>
                                  );
                                })
                              )}
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </div>

                          {/* staatic table demo */}


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

export default AdminCallActive;
