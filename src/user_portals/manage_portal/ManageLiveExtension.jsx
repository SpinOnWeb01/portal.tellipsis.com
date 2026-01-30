import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  DataGrid,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import socketIOClient from "socket.io-client";
import { useSelector } from "react-redux";
import React, { useEffect, useMemo, useState } from "react";
import { api } from "../../mockData";

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

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarDensitySelector />
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

function ManageLiveExtension() {
  const state = useSelector((state) => state);
  const current_user = localStorage.getItem("current_user");
  const uid = JSON.parse(localStorage.getItem(`user_${current_user}`));
  const [liveExtension, setLiveExtension] = useState("");
  useEffect(() => {
    const socket = socketIOClient(`${api.dev}`);

    // Listen for events from the server
    socket.on("extension_status", (data) => {
      // Handle the received data (e.g., update state, trigger a re-fetch)
      if (data?.data !== undefined) {
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

  // =======table=======>

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
      headerAlign: "center",
      width: 480,
      align: "center",
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
      field: "application",
      headerName: "Application",
      headerClassName: "custom-header",
      headerAlign: "center",
      // width: 270,
      flex: 1,
      align: "center",
    },
  ];

  const classes = useStyles();

  // Function to determine whether a row should have the bordered style
  const isRowBordered = (params) => {
    const { row } = params;

    // Add your condition here, for example, adding border to rows where age is greater than 25
    return row.disposition === "ANSWERED";
  };
  const rows = useMemo(() => {
    const calculatedRows = [];
    liveExtension &&
      liveExtension.forEach((item, index) => {
        if (uid.uid === item[4]) {
          calculatedRows.push({
            id: index + 1,
            extension: item[0],
            location: item[1],
            updated: item[2],
            application: item[3],
          });
        }
      });
    return calculatedRows;
  }, [liveExtension]);

  return (
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
                        <h3>Live Extension</h3>
                      </div>
                    </div>

                    <ThemeProvider theme={theme}>
                      <div style={{ height: "100%", width: "100%" }}>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ManageLiveExtension;
