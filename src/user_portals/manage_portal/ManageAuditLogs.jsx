import React, { useEffect, useMemo, useState } from "react";
import "../../../src/style.css";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
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

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton/>
      <GridToolbarDensitySelector />
      <GridToolbarFilterButton/>
    </GridToolbarContainer>
  );
}


function ManageAuditLogs() {
  const current_user = localStorage.getItem("current_user");
    const user = JSON.parse(localStorage.getItem(`user_${current_user}`));

  const [data, setData] = useState([]);

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${api.dev}/api/auditlogs?user_id=${user.uid}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.access_token} `,
      },
    };
    axios
      .request(config)
      .then((response) => {
        setData(response?.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const columns = [
    // {
    //   field: "user_id",
    //   headerName: "User ID",
    //   width: 150,
    //   headerClassName: "custom-header",
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      field: "username",
      headerName: "UserName",
      width: 150,
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
      width: 150,
      //cellClassName: "name-column--cell",
      //headerClassName: 'super-app-theme--header'
      headerClassName: "custom-header",
      // editable: true,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            <p
              style={{
                fontWeight: "400",
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
      width: 150,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            <p
              style={{
                fontWeight: "400",
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
      // type: "number",
      width: 150,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            <p
              style={{
                fontWeight: "500",
                color: "green",
                margin: "0",
                textTransform: "capitalize",
              }}
            >
              {params?.row?.event_details}
            </p>
          </div>
        );
      },
    },

    {
      field: "event_type",
      headerName: "Event Type",
      width: 150,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "ip_address",
      headerName: "IP Address",
      width: 150,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "log_id",
      headerName: "Log ID",
      width: 150,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
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

  const rows = useMemo(() => {
    const calculatedRows = [];
    data?.data &&
      data?.data?.forEach((item, index) => {
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
  }, [data?.data]);

  return (
    <>
      <div className="main">
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
                        <div className="cntnt_title">
                          <h3>Audit Logs</h3>
                          {/* <p>
                            Use this to monitor and interact with the call bock.
                          </p> */}
                        </div>

                        <ThemeProvider theme={theme}>
                        <div style={{ height: '100%', width: '100%' }}>
                            <DataGrid
                              rows={rows}
                              columns={columns}
                              headerClassName="custom-header"
                              components={{ Toolbar: GridToolbar }}
                              slots={{
                                toolbar: CustomToolbar,
                              }}
                                  autoHeight
                            />
                          </div>
                        </ThemeProvider>

                        {/* -----   Edit Campaign Modal Start   ----- */}
                        {/* <Modal
                          aria-labelledby="transition-modal-title"
                          aria-describedby="transition-modal-description"
                          open={edit}
                          closeAfterTransition
                          slots={{ backdrop: Backdrop }}
                          slotProps={{
                            backdrop: {
                              timeout: 500,
                            },
                          }}
                        >
                          <Fade in={edit}
                           className="mobile_width bg_imagess"
                          >
                            <Box
                              sx={style}
                              borderRadius="10px"
                              textAlign="center"
                            >
                              <IconButton
                                onClick={handleEditClose}
                                sx={{ float: "inline-end" }}
                              >
                                <Close />
                              </IconButton>
                              <br />
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
                                Update Destination
                              </Typography>
                              <Typography
                                id="transition-modal-description"
                                sx={{ mt: 2 }}
                              ></Typography>
                              <form style={{ textAlign: "center" }}>
                                <TextField
                                  style={{
                                    width: "100%",
                                    margin: " 5px 0 5px 0",
                                  }}
                                  type="text"
                                  label="Destination"
                                  variant="outlined"
                                  name="destination"
                                  value={destination}
                                  onChange={handleChange}
                                  padding={"0px 0 !important"}
                                  disabled
                                />
                                <br />
                                 <FormControl
                                      fullWidth
                                      style={{ width: "100%", margin: "7px 0" }}
                                    >
                                      <InputLabel id="demo-simple-select-label">
                                      Action
                                      </InputLabel>

                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Action"
                                        style={{ textAlign: "left" }}
                                        defaultValue={action}
                                        onChange={(e) => {
                                          setAction(e.target.value);
                                        }}
                                      >
                                        {state?.allManageExtension?.allmanageextension?.map(
                                          (item, index) => {
                                            return (
                                              <MenuItem
                                                key={index}
                                                value={item?.extension}
                                              >
                                                <label
                                                  style={{
                                                    margin: "0px",
                                                    padding: "0px",
                                                  }}
                                                >
                                                  {item?.extension}
                                                </label>
                                              </MenuItem>
                                            );
                                          }
                                        )}
                                        
                                      </Select>
                                    </FormControl>
                                <br />
                                <FormControl
                        fullWidth
                        style={{ width: "100%", margin: "7px 0" }}
                      >
                        <InputLabel id="demo-simple-select-label">
                        Enable
                        </InputLabel>

                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Enable"
                          style={{ textAlign: "left" }}
                          value={enable}
                          onChange={(e) => {
                            setEnable(e.target.value);
                          }}
                        >
                          <MenuItem value={"true"}>Active</MenuItem>
                          <MenuItem value={"false"}>Deactive</MenuItem>
                        </Select>
                      </FormControl>
                                <br />
                                <TextField
                                  style={{
                                    width: "100%",
                                    margin: " 5px 0 5px 0",
                                  }}
                                  type="text"
                                  label="Description"
                                  variant="outlined"
                                  name="description"
                                  value={description}
                                  onChange={handleChange}
                                  padding={"0px 0 !important"}
                                />
                                <br />
{/* 
                                <Button variant="contained" className="all_button_clr" sx={{marginTop:"20px"}} color="primary" onClick={handleUpdate}>
                                  Update
                                </Button> 


<Button
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
                                onClick={handleUpdate}
                              >
                                Update
                              </Button>


                              </form>
                            </Box>
                          </Fade>
                        </Modal> */}

                        {/* -----   Edit Campaign Modal End   ----- */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default ManageAuditLogs;
