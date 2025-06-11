import { Box, IconButton, Tooltip } from "@mui/material";
import { DataGrid, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from "@mui/x-data-grid";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import socketIOClient from "socket.io-client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Edit } from "@mui/icons-material";
import { getManageBilling } from "../../redux/actions/managePortal/managePortal_billingAction";

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
      <GridToolbarColumnsButton/>
      <GridToolbarDensitySelector />
      <GridToolbarFilterButton/>
    </GridToolbarContainer>
  );
}

function ManageCallActive() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const current_user = localStorage.getItem("current_user");
    const userId = localStorage.getItem(`user_${current_user}`)



  useEffect(() => {
    dispatch(getManageBilling())
  }, []); // Empty dependency array ensures this effect runs once on mount

  const columns = [
    // {
    //   field: "username",
    //   headerName: "User Name",
    //   headerClassName: "custom-header",
    //   width: 200,
    //   headerAlign: "center",
    //   align: "center",
    //   cellClassName: "super-app-theme--cell",
    // },
    {
      field: "username",
      headerName: "Added By",
      headerClassName: "custom-header",
      width: 300,
      headerAlign: "center",
      align: "center",
      cellClassName: "super-app-theme--cell",
    },
    {
      field: "topup",
      headerName: "Top Up",
      width: 300,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "added_date",
      headerName: "Date",
      width: 300,
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
       
          var formattedDate =
            day +
            "/" +
            month +
            "/" +
            year +
            " " ;
          return (<><span style={{color:"blue"}}>{day}/{month}/{year}</span></>);
        }
      },
    },
    
    {
      field: "added_time",
      headerName: "Time",
      width: 300,
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
          var formattedDate =
            hours +
            ":" +
            minutes +
            ":" +
            seconds;
            return (<>
            <span style={{color:"green"}}>{hours}:{minutes}:{seconds}</span></>);
        }
      },
    },
  ];
  
  const rows = useMemo(() => {
    const calculatedRows = [];
    state?.getManageBilling?.billing &&
      state?.getManageBilling?.billing?.forEach((item, index) => {
        calculatedRows.push({
          id: index + 1,
          username: item?.username,
          added_date: item?.added_date,
          added_time: item?.added_date,
          topup: item.topup
        });
      });
    return calculatedRows;
  }, [state?.getManageBilling?.billing]);
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
                    {/* <!--role-contet--> */}
                    <div className="tab_cntnt_box">
                      <div
                        className="cntnt_title"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "end",
                        }}
                      >
                        <div>
                          <h3>Billing</h3>
                          {/* <p>
                            Quickly access information and tools related to your
                            account.
                          </p> */}
                        </div>
                      </div>
                      {/* <!--table---> */}
                      <ThemeProvider theme={theme}>
                      <div style={{ height: '100%', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          headerClassName="custom-header"
          // getRowClassName={(params) =>
          //   isRowBordered(params) ? 'borderedGreen' : 'borderedRed'
          // }
          components={{ Toolbar: GridToolbar }}
          slots={{
            toolbar: CustomToolbar,
          }}
              autoHeight
        />
                        </div>
                      </ThemeProvider>

                      {/* <!--table-end--> */}
                    </div>
                    {/* <!--role-content--> */}
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                  ></div>
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
