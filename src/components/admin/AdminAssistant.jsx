import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { getAdminAssitant } from "../../redux/actions/adminPortal/adminPortal_assitantAction";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import axios from "axios";
import { toast } from "react-toastify";
import { api } from "../../mockData";

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
const drawerWidth = 240;

const useStyles = makeStyles({
  borderedGreen: {
    borderLeft: "3px solid green", // Add your border styling here
    boxShadow: "2px -1px 4px -3px #686868",
    // margin: "4px 4px 1px 4px !important",
  },
  borderedRed: {
    borderLeft: "3px solid red", // Add your border styling here
    boxShadow: "2px -1px 4px -3px #686868",
    // margin: "4px 4px 1px 4px !important",
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

function AdminAssistant({ colorThem }) {
  const state = useSelector((state) => state);
  const token = JSON.parse(localStorage.getItem("admin"));
  const dispatch = useDispatch();
  const [response, setResponse] = useState("");
  const [alertMessage, setAlertMessage] = useState(false);
  const [assisId, setAssisId] = useState("");

  const handleAlertClose = () => {
    setAlertMessage(false);
    setAssisId("");
  };

  const handleMessage = useCallback((data) => {
    setAlertMessage(true);
    setAssisId(data.assistantid);
  }, []); // Memoize event handler

  const handleUpdate = async (row) => {
    let data = JSON.stringify({
      id: assisId,
      is_suspended: 0,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`,
      },
    };

    try {
      const val = await axios.put(`${api.dev}/api/didrecover`, data, config);
      if (val?.data?.status === 200) {
        toast.success(val?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        });
        setResponse(data);
        setAlertMessage(false);
      }
    } catch (error) {
      toast.error("Update failed!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    dispatch(getAdminAssitant());
  }, [response]);

  const columns = [
    {
      field: "didnumber",
      headerName: "TFN Number",
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      width: 120,
    },
    {
      field: "username",
      headerName: "User Name",
      width: 120,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "service_type",
      headerName: "Service",
      width: 120,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "details",
      headerName: "Extension",
      headerClassName: "custom-header",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    // {
    //   field: "is_active",
    //   headerName: "Status",
    //   width: 100,
    //   headerClassName: "custom-header",
    //   headerAlign: "center",
    //   align: "center",
    //   renderCell: (params) => {
    //     return (
    //       <div className="d-flex justify-content-between align-items-center">
    //         {params.row.is_active === true ? (
    //           <>
    //             <div
    //               style={{
    //                 color: "green",
    //                 //background: "green",
    //                 padding: "7px",
    //                 borderRadius: "5px",
    //                 fontSize: "15px",
    //                 textTransform: "capitalize",
    //                 fontWeight: "600",
    //               }}
    //             >
    //               Active
    //             </div>
    //           </>
    //         ) : (
    //           <>
    //             <div
    //               style={{
    //                 color: "red",
    //                 //   background: "red",
    //                 padding: "7px",
    //                 borderRadius: "5px",
    //                 fontSize: "15px",
    //                 textTransform: "capitalize",
    //                 fontWeight: "600",
    //               }}
    //             >
    //               Deactive
    //             </div>
    //           </>
    //         )}
    //       </div>
    //     );
    //   },
    // },
    // {
    //   field: "description",
    //   headerName: "Description",
    //   headerClassName: "custom-header",
    //   width: 200,
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      field: "created_date",
      headerName: "Create Date",
      headerClassName: "custom-header",
      width: 150,
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

          var formattedDate = day + "/" + month + "/" + year + " ";
          return (
            <>
              <span style={{ color: "blue" }}>
                {day}/{month}/{year}
              </span>
            </>
          );
        }
      },
    },

    {
      field: "updated_date",
      headerName: "Suspend Date",
      width: 150,
      headerClassName: "custom-header",
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

          var formattedDate = day + "/" + month + "/" + year + " ";
          return (
            <>
              <span style={{ color: "brown" }}>
                {day}/{month}/{year}
              </span>
            </>
          );
        }
      },
    },
    {
      field: "is_suspended",
      headerName: "Action",
      width: 100,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            {params?.row?.is_suspended === 1 && (
              <Button
                // variant="outlined"
                sx={{
                  ":hover": {
                    bgcolor: "info.main",
                    color: "black",
                  },
                  padding: "2px",
                  textTransform: "capitalize",
                  fontSize: "12px",
                  color: "#fff",
                  background: "#02679f",
                  borderColor: "info.main",
                  border: "1px solid #0288d1",
                }}
                onClick={() => handleMessage(params.row)}
              >
                Recover
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  const classes = useStyles();

  // Function to determine whether a row should have the bordered style
  const isRowBordered = (params) => {
    const { row } = params;

    // Add your condition here, for example, adding border to rows where age is greater than 25
    return row.is_active === true;
  };

  const rows = useMemo(() => {
    const calculatedRows = [];
    state?.getAdminAssistant?.assistant &&
      state?.getAdminAssistant?.assistant?.forEach((item, index) => {
        calculatedRows.push({
          id: index + 1,
          user_id: item?.user_id,
          username: item?.username,
          updated_date: item?.updated_date,
          service_type: item?.service_type,
          is_suspended: item?.is_suspended,
          created_date: item?.created_date,
          is_active: item?.is_active,
          didnumber: item?.didnumber,
          details: item?.details,
          description: item?.description,
          assistantid: item?.id,
        });
      });
    return calculatedRows;
  }, [state?.getAdminAssistant?.assistant]);

  return (
    <>
      <div className={`App ${colorThem} `}>
        <div className="contant_box" style={{ height: "100vh" }}>
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
                        <h3>Suspended</h3>
                      </div>
                    </div>

                    <div className="row">
                      <ThemeProvider theme={theme}>
                        <div style={{ height: "100%", width: "100%" }}>
                          <DataGrid
                            // checkboxSelection
                            rows={rows}
                            columns={columns}
                            headerClassName="custom-header"
                            getRowClassName={(params) =>
                              isRowBordered(params)
                                ? classes.borderedGreen
                                : classes.borderedRed
                            }
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
                    {/* Delete Confirmation Modal Start  */}
                    <Dialog
                      open={alertMessage}
                      onClose={handleAlertClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                      sx={{ textAlign: "center" }}
                      //className="bg_imagess"
                    >
                      <DialogTitle
                        className="modal_heading"
                        id="alert-dialog-title"
                        sx={{ color: "#133325", fontWeight: "600" }}
                      >
                        Confirm Recover
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText
                          id="alert-dialog-description"
                          sx={{ paddingBottom: "0px !important" }}
                        >
                          Are you sure you want to recover this record?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          paddingBottom: "20px",
                        }}
                      >
                        <Button
                          variant="contained"
                          sx={{
                            fontSize: "16px !impotant",
                            background:
                              "linear-gradient(180deg, #0E397F 0%, #001E50 100%) !important",
                            marginTop: "20px",
                            marginLeft: "0px !important",
                            padding: "10px 20px !important",
                            textTransform: "capitalize !important",
                          }}
                          className="all_button_clr"
                          color="info"
                          onClick={handleAlertClose}
                          autoFocus
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          sx={{
                            fontSize: "16px !impotant",
                            marginTop: "20px",
                            padding: "10px 20px !important",
                            textTransform: "capitalize !important",
                            marginLeft: "0px !important",
                            marginRight: "0px !important",
                          }}
                          className="all_button_clr"
                          color="error"
                          onClick={handleUpdate}
                          startIcon={<UpgradeIcon />}
                        >
                          Recover
                        </Button>
                      </DialogActions>
                    </Dialog>
                    {/* Update Confirmation Modal End  */}
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

export default AdminAssistant;
