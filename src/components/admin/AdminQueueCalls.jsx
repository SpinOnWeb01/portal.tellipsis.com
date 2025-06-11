
import { Box, Button, FormControl, IconButton, MenuItem, Select, Tooltip } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { DataGrid, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from "@mui/x-data-grid";
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
const drawerWidth = 240;

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
        <GridToolbarColumnsButton/>
        <GridToolbarDensitySelector />
        <GridToolbarFilterButton/>
      </GridToolbarContainer>
    );
  };
  

function AdminQueueCalls({colorThem}) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [option, setOption] = useState("L");
  const [rows, setRows] = useState([]);

  useEffect(() => {
    dispatch(getAdminCallActive());
     //setData(state?.getAdminCallActive?.callactive)
   }, [dispatch]);

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
    //   headerName: "Type",
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
                    border:"1px solid #d32f2f"
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
          headerName: "Extension",
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
        //   field: "Answerd By",
        //   headerName: "Answerd By",
        //   width: 120,
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
      
      const mockDataTeam = useMemo(() => {
        let rows = [];
        const uniqueIdSet = new Set();
    
        if (state?.getAdminCallActive?.callactive !== undefined) {
            Object.keys(state?.getAdminCallActive?.callactive).forEach((key) => {
                const { Extensions, Uniqueid, ...rest } = state?.getAdminCallActive?.callactive[key];
    
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
            });
        }
    
        // Filter rows based on the Status condition
        const filteredRows = rows.filter(item => item.Status !== "ANSWER");
        setRows(filteredRows);
        return filteredRows;
    }, [state?.getAdminCallActive?.callactive]);
    

      // const showAnswerTable = rows.find(item => item.Status === "ANSWER");
      const showAnswerTable = rows.filter(item => item.Status === "ANSWER").length > 0;
      
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
                      <h3>Queue Calls</h3>
                      {/* <p>
                        Use this to monitor and interact with the active
                        calls.
                      </p> */}
                    </div>
                  </div>
                  <div className="row">
            
                  <ThemeProvider theme={theme}>
    <div style={{ height: '100%', width: '100%' }}>
      {showAnswerTable ? (
        <DataGrid
          rows={[]}
          columns={columns1}
          headerClassName="custom-header"
          components={{ Toolbar: GridToolbar }}
          slots={{ toolbar: CustomToolbar }}
          autoHeight
        />
      ) : (
        <>
          {state?.getAdminCallActive?.callactive !== undefined ? (
            <DataGrid
              rows={rows}
              columns={columns}
              headerClassName="custom-header"
              components={{ Toolbar: GridToolbar }}
              slots={{ toolbar: CustomToolbar }}
              autoHeight
            />
          ) : (
            <DataGrid
              rows={[]}
              columns={columns1}
              headerClassName="custom-header"
              components={{ Toolbar: GridToolbar }}
              slots={{ toolbar: CustomToolbar }}
              autoHeight
            />
          )}
        </>
      )}
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

export default AdminQueueCalls;