import { Box, ThemeProvider, createTheme } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  DataGrid,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAdminAuditLogs } from "../../redux/actions/adminPortal/adminPortal_auditLogs";

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
      <GridToolbarColumnsButton/>
      <GridToolbarDensitySelector />
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

function AdminAuditLog({ colorThem }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAdminAuditLogs());
  }, []);

  const columns = [
    {
      field: "log_id",
      headerName: "Log ID",
      width: 80,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "username",
      headerName: "UserName",
      width: 120,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "application_type",
      headerName: "Application Type",
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "event_date",
      headerName: "Event Date",
      width: 130,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            <p
              style={{
                fontWeight: "500",
                color: "blue",
                margin: "0",
                textTransform: "capitalize",
              }}
            >
              {params?.row?.event_date}
            </p>
          </div>
        );
      },
    },

    {
      field: "event_time",
      headerName: "Event Time",
      width: 100,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
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
              {params?.row?.event_time}
            </p>
          </div>
        );
      },
    },

    {
      field: "event_details",
      headerName: "Event Details",
      width: 120,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            {params.row.event_details === "successful" ? (
              <>
                <div
                  style={{
                    color: "green",
                    // background: "green",
                    // padding: "7px",
                    // borderRadius: "5px",
                    // fontSize: "12px",
                    textTransform: "capitalize",
                  }}
                >
                  Successful
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    color: "red",
                    // background: "red",
                    // padding: "7px",
                    // borderRadius: "5px",
                    // fontSize: "12px",
                    textTransform: "capitalize",
                  }}
                >
                  Blocked
                </div>
              </>
            )}
          </div>
        );
      },
    },

    {
      field: "event_type",
      headerName: "Event Type",
      width: 100,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "ip_address",
      headerName: "IP Address",
      width: 150,
      headerClassName: "custom-header",
      headerAlign: "left",
      align: "left",
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            <p
              style={{
                fontWeight: "500",
                color: "blue",
                margin: "0",
                textTransform: "capitalize",
              }}
            >
              {params?.row?.ip_address}
            </p>
          </div>
        );
      },
    },

    {
      field: "misc",
      headerName: "Misc",
      width: 200,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
  ];

  const isRowBordered = (params) => {
    // const { row } = params;
    // // Add your condition here, for example, adding border to rows where age is greater than 25
    // return row.status === "Ok";
  };

  const mockDataTeam = useMemo(() => {
    const calculatedRows = [];
    state?.getAdminAuditLogs?.auditLogs &&
      state?.getAdminAuditLogs?.auditLogs?.forEach((item, index) => {
        calculatedRows.push({
          id: index + 1,
          user_id: item?.user_id,
          username: item?.username,
          application_type: item?.application_type,
          event_date: item?.event_date,
          event_details: item?.event_details,
          event_time: item?.event_time,
          event_type: item?.event_type,
          ip_address: item?.ip_address,
          log_id: item?.log_id,
          misc: item?.misc,
        });
      });
    return calculatedRows;
  }, [state?.getAdminAuditLogs?.auditLogs]);

  return (
    <>
      <div className={`App ${colorThem} `}>
        <div className="contant_box" style={{height:"100vh"}}>
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
                        <h3>Audit Logs</h3>
                        {/* <p>
                          Use this to monitor and interact with the active
                          calls.
                        </p> */}
                      </div>
                    </div>
                    <div className="row">
                      <ThemeProvider theme={theme}>
                      <div style={{ height: '100%', width: '100%' }}>
                          <DataGrid
                            // checkboxSelection
                            className="tbl_innr_box"
                            rows={mockDataTeam}
                            columns={columns}
                           // headerClassName="custom-header"
                            components={{ Toolbar: GridToolbar }}
                            slots={{
                              toolbar: CustomToolbar,
                            }}
                            autoHeight
                            // getRowClassName={(params) =>
                            //   isRowBordered(params)
                            //     ? classes.borderedGreen
                            //     : classes.borderedRed
                            // }
                          />
                        </div>
                      </ThemeProvider>
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

export default AdminAuditLog;
