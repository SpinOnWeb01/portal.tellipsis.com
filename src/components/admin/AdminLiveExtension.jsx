import { Box } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react'
import {  DataGrid, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton, } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import "../../Switcher.scss";
import socketIOClient from "socket.io-client";
import { api } from '../../mockData';

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
    spacedRow: {
        // Adjust spacing here, e.g., margin, padding, etc.
        marginBottom: '10px',
      },
  });

  const theme = createTheme({
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            '& .MuiDataGrid-row': {
              minHeight: 'auto', // Adjust row height to make it more compact
            },
          },
        },
        defaultProps: {
          density: 'compact', // Set default density to compact
        },
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

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton/>
        <GridToolbarDensitySelector />
        <GridToolbarFilterButton/>
      </GridToolbarContainer>
    );
  }

function AdminLiveExtension({colorThem}) {
    const state = useSelector((state) => state);
    const classes = useStyles();

    const [liveExtension, setLiveExtension] = useState("");
    
    useEffect(() => {
        const socket = socketIOClient(`${api.dev}`);
    
        // Listen for events from the server
        socket.on("extension_status", (data) => {
          // Handle the received data (e.g., update state, trigger a re-fetch)
          if(data?.data !== undefined){
          // const jsonData = JSON.parse(data?.data);
          // console.log('jsonData', jsonData)
          setLiveExtension(data?.data);
          }
        });
    
        return () => {
          // Disconnect the socket when the component unmounts
          socket.disconnect();
        };
        // dispatch(getReport());
      }, []); // Empty dependency array ensures this effect runs once on mount

    const isRowBordered = (params) => {
        const { row } = params;
    
        // Add your condition here, for example, adding border to rows where age is greater than 25
        return row.disposition === "Ok";
      };
 

    

    const columns = [
        {
          field: "extension",
          headerName: "Extension",
          headerClassName: "custom-header",
          headerAlign: "center",
          width: 100,
          align: "center",
        },
        {
          field: "location",
          headerName: "Location",
          headerClassName: "custom-header",
          headerAlign: "left",
          width: 380,
          align: "left",
        },
        {
          field: "updated",
          headerName: "Updated At",
          headerClassName: "custom-header",
          headerAlign: "center",
          width: 170,
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
                
              return (<><span style={{color:"blue"}}>{day}/{month}/{year}</span>&nbsp;
              <span style={{color:"green"}}>{hours}:{minutes}:{seconds}</span></>);
            }
          },
        },
        {
          field: "application",
          headerName: "Application",
          headerClassName: "custom-header",
          headerAlign: "center",
          width: 170,
          align: "center",
        },
       
      ];

      const rows = useMemo(() => {
        const calculatedRows = [];
        liveExtension &&
        liveExtension.forEach((item, index) => {
            calculatedRows.push({
              id: index + 1,
              extension: item[0],
              location: item[1],
              updated: item[2],
              application: item[3],
            });
          });
        return calculatedRows;
      }, [liveExtension]);
    

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
                              alignItems: "end",
                            }}
                          >
                            <div>
                              <h3>SIP Registrations</h3>
                              {/* <p>
                              Use this to configure your SIP extensions.
                              </p> */}
                            </div>
                          </div>                        
                          <ThemeProvider theme={theme}>
                          <div style={{ height: '100%', width: '100%' }}>
                              <DataGrid
                                rows={rows}
                                columns={columns}
                                components={{ Toolbar: GridToolbar }}
                                // getRowClassName={(params) =>
                                //   `${params.rowClassName} ${
                                //     isRowBordered(params) ? classes.borderedGreen : classes.borderedRed
                                //   } ${classes.spacedRow}`
                                // }
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
            </div>
       </Box>
       </div>
    </div>
  )
}

export default AdminLiveExtension;