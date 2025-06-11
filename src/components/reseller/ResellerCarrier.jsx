import { Close, Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  DataGrid,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  GridToolbarContainer,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import {
  createAdminCarrier,
  deleteAdminCarrier,
  getAdminCarrier,
  updateAdminCarrier,
} from "../../redux/actions/adminPortal/adminPortal_carrierAction";

const drawerWidth = 240;

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
    marginBottom: "10px",
  },
  tooltip: {
    backgroundColor: "#0E397F", // Change default background color
    color: "white",
    "&:hover": {
      backgroundColor: "#0E397F", // Change background color on hover
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

function ResellerCarrier({ colorThem }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [response, setResponse] = useState("");
  const [name, setName] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [priority, setPriority] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [alertMessage, setAlertMessage] = useState(false);
  const [carrierId, setCarrierId] = useState("");
  const handleOpen = () => setOpen(true);

  const handleAlertClose = () => {
    setCarrierId("");
    setName("");
    setAlertMessage(false);
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
    setIpAddress("");
    setPriority("");
    setCountryCode("");
  };

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
    setName("");
    setIpAddress("");
    setPriority("");
    setCountryCode("");
  }, []);

  const handleButtonClick = useCallback((row) => {
    setOpenModal(true);
    setName(row.name);
    setIpAddress(row.ip_address);
    setPriority(row.priority);
    setCountryCode(row.country_code);
  }, []); // Memoize event handler

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = JSON.stringify({
      name: name,
      ip_address: ipAddress,
      priority: priority,
      country_code: countryCode,
    });

    dispatch(createAdminCarrier(data, setOpen, setResponse));
  };

  const handleUpdate = useCallback(
    (e) => {
      e.preventDefault();
      let data = JSON.stringify({
        name: name,
        ip_address: ipAddress,
        priority: priority,
        country_code: countryCode,
      });
      dispatch(updateAdminCarrier(data, setOpenModal, setResponse));
    },
    [name, ipAddress, priority, countryCode, setOpenModal, setResponse]
  );

  const handleMessage = useCallback(
    (data) => {
      setName(data?.name);
      setCarrierId(data?.carrierId);
      setAlertMessage(true);
    },
    [setName]
  ); // Memoize event handler

  const handleDelete = useCallback(
    (id) => {
      dispatch(
        deleteAdminCarrier(
          { id: carrierId },
          setResponse,
          setCarrierId,
          setName
        )
      );
      setAlertMessage(false);
    },
    [carrierId, dispatch, setResponse, setCarrierId, setName]
  ); // Memoize event handler

  useEffect(() => {
    dispatch(getAdminCarrier());
  }, [response]);

  const columns = [
    {
      field: "action",
      headerName: "Action",
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      sortable: false,
      width: 100,
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            <IconButton onClick={() => handleButtonClick(params.row)}>
              <Edit
                index={params.row.id}
                style={{ cursor: "pointer", color: "#0e397f" }}
              />
            </IconButton>
            <Tooltip title="delete" disableInteractive interactive>
              <IconButton onClick={() => handleMessage(params?.row)}>
                <Delete style={{ cursor: "pointer", color: "red" }} />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      headerClassName: "custom-header",
      headerAlign: "center",
      width: 100,
      align: "center",
    },
    {
      field: "ip_address",
      headerName: "IP Address",
      headerClassName: "custom-header",
      headerAlign: "left",
      width: 280,
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
      field: "priority",
      headerName: "Priority",
      headerClassName: "custom-header",
      headerAlign: "center",
      width: 280,
      align: "center",
    },
    {
      field: "country_code",
      headerName: "Country Code",
      headerClassName: "custom-header",
      headerAlign: "center",
      width: 150,
      align: "center",
    },
    {
      field: "added_date",
      headerName: "Date",
      headerClassName: "custom-header",
      headerAlign: "center",
      width: 100,
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
  ];

  const rows = useMemo(() => {
    const calculatedRows = [];
    state?.getAdminCarrier?.getCarrier &&
      state?.getAdminCarrier?.getCarrier?.forEach((item, index) => {
        calculatedRows.push({
          id: index + 1,
          added_date: item?.added_date,
          country_code: item?.country_code,
          ip_address: item?.ip_address,
          name: item?.name,
          priority: item?.priority,
          carrierId: item?.id,
        });
      });
    return calculatedRows;
  }, [state?.getAdminCarrier?.getCarrier]);

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
                              <h3>Outbound Carrier</h3>
                              {/* <p>
                              Use this to configure your Carrier.
                              </p> */}
                            </div>

                            <IconButton
                              className="all_button_clr"
                              onClick={handleOpen}
                            >
                              Add
                              <AddOutlinedIcon />
                            </IconButton>

                            <Modal
                              aria-labelledby="transition-modal-title"
                              aria-describedby="transition-modal-description"
                              open={open}
                              closeAfterTransition
                              slots={{ backdrop: Backdrop }}
                              slotProps={{
                                backdrop: {
                                  timeout: 500,
                                },
                              }}
                            >
                              <Fade in={open} className="bg_imagess">
                                <Box
                                  sx={style}
                                  borderRadius="10px"
                                  textAlign="center"
                                >
                                  <IconButton
                                    onClick={handleClose}
                                    sx={{ float: "inline-end" }}
                                  >
                                    <Close />
                                  </IconButton>
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
                                    Add Carrier
                                  </Typography>
                                  <form
                                    style={{
                                      textAlign: "center",
                                      textAlign: "center",
                                      // height: "348px",
                                      height: "auto",
                                      // verflow: "auto",
                                      paddingTop: "10px",
                                      padding: "5px",
                                    }}
                                  >
                                    <TextField
                                      style={{
                                        width: "100%",
                                        margin: " 5px 0 5px 0",
                                      }}
                                      type="text"
                                      label="Name"
                                      variant="outlined"
                                      padding={"0px 0 !important"}
                                      name="carrierName"
                                      value={name}
                                      onChange={(e) => setName(e.target.value)}
                                    />
                                    <br />

                                    <TextField
                                      style={{
                                        width: "100%",
                                        margin: " 5px 0 5px 0",
                                      }}
                                      type="text"
                                      label="IP Address"
                                      variant="outlined"
                                      padding={"0px 0 !important"}
                                      name="carrierIP"
                                      value={ipAddress}
                                      onChange={(e) =>
                                        setIpAddress(e.target.value)
                                      }
                                    />
                                    <InputLabel
                                      style={{
                                        textAlign: "left",
                                        fontSize: "14px",
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <Tooltip
                                        style={{ color: "#fff" }}
                                        title="test"
                                        classes={{ tooltip: classes.tooltip }}
                                      >
                                        <InfoIcon
                                          style={{
                                            fontSize: "18px",
                                            color: "#0E397F",
                                          }}
                                        />
                                        &nbsp;
                                      </Tooltip>
                                    </InputLabel>

                                    <TextField
                                      style={{
                                        width: "100%",
                                        margin: " 5px 0 5px 0",
                                      }}
                                      type="text"
                                      label="Priority"
                                      variant="outlined"
                                      padding={"0px 0 !important"}
                                      name="carrierPriority"
                                      value={priority}
                                      onChange={(e) =>
                                        setPriority(e.target.value)
                                      }
                                    />

                                    <br />

                                    <TextField
                                      style={{
                                        width: "100%",
                                        margin: " 5px 0 5px 0",
                                      }}
                                      type="text"
                                      label="Country Code"
                                      variant="outlined"
                                      padding={"0px 0 !important"}
                                      name="carrierCountry"
                                      value={countryCode}
                                      onChange={(e) =>
                                        setCountryCode(e.target.value)
                                      }
                                    />
                                    <InputLabel
                                      style={{
                                        textAlign: "left",
                                        fontSize: "14px",
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <Tooltip
                                        style={{ color: "#fff" }}
                                        title="test"
                                        classes={{ tooltip: classes.tooltip }}
                                      >
                                        <InfoIcon
                                          style={{
                                            fontSize: "18px",
                                            color: "#0E397F",
                                          }}
                                        />
                                        &nbsp;
                                      </Tooltip>
                                    </InputLabel>

                                    <br />

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
                                      onClick={handleSubmit}
                                    >
                                      save
                                    </Button>
                                  </form>
                                </Box>
                              </Fade>
                            </Modal>
                          </div>

                          {/* edit-modal */}
                          <Dialog
                            open={openModal}
                            onClose={handleCloseModal}
                            sx={{ textAlign: "center" }}
                          >
                            <DialogTitle
                              sx={{
                                color: "#07285d",
                                fontWeight: "600",
                                width: "500px",
                              }}
                            >
                              <br />
                              Edit Carrier
                            </DialogTitle>
                            <DialogContent>
                              <form>
                                {/* <SelectComponent handleClose={handleClose} /> */}
                                <Typography variant="body1">
                                  <br />
                                  <form
                                    style={{
                                      textAlign: "center",
                                      height: "200px",
                                      overflow: "auto",
                                      paddingTop: "10px",
                                      padding: "5px",
                                      width: "auto",
                                    }}
                                  >
                                    <TextField
                                      style={{
                                        width: "100%",
                                        margin: " 5px 0 5px 0",
                                      }}
                                      type="text"
                                      label="Name"
                                      variant="outlined"
                                      padding={"0px 0 !important"}
                                      name="carrierName"
                                      value={name}
                                      onChange={(e) => setName(e.target.value)}
                                    />
                                    <br />

                                    <TextField
                                      style={{
                                        width: "100%",
                                        margin: " 5px 0 5px 0",
                                      }}
                                      type="text"
                                      label="IP Address"
                                      variant="outlined"
                                      padding={"0px 0 !important"}
                                      name="carrierIP"
                                      value={ipAddress}
                                      onChange={(e) =>
                                        setIpAddress(e.target.value)
                                      }
                                    />
                                    <InputLabel
                                      style={{
                                        textAlign: "left",
                                        fontSize: "14px",
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <Tooltip
                                        style={{ color: "#fff" }}
                                        title="test"
                                        classes={{ tooltip: classes.tooltip }}
                                      >
                                        <InfoIcon
                                          style={{
                                            fontSize: "18px",
                                            color: "#0E397F",
                                          }}
                                        />
                                        &nbsp;
                                      </Tooltip>
                                    </InputLabel>

                                    <TextField
                                      style={{
                                        width: "100%",
                                        margin: " 5px 0 5px 0",
                                      }}
                                      type="text"
                                      label="Priority"
                                      variant="outlined"
                                      padding={"0px 0 !important"}
                                      name="carrierPriority"
                                      value={priority}
                                      onChange={(e) =>
                                        setPriority(e.target.value)
                                      }
                                    />

                                    <br />

                                    <TextField
                                      style={{
                                        width: "100%",
                                        margin: " 5px 0 5px 0",
                                      }}
                                      type="text"
                                      label="Country Code"
                                      variant="outlined"
                                      padding={"0px 0 !important"}
                                      name="carrierCountry"
                                      value={countryCode}
                                      onChange={(e) =>
                                        setCountryCode(e.target.value)
                                      }
                                    />

                                    <InputLabel
                                      style={{
                                        textAlign: "left",
                                        fontSize: "14px",
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <Tooltip
                                        style={{ color: "#fff" }}
                                        title="test"
                                        classes={{ tooltip: classes.tooltip }}
                                      >
                                        <InfoIcon
                                          style={{
                                            fontSize: "18px",
                                            color: "#0E397F",
                                          }}
                                        />
                                        &nbsp;
                                      </Tooltip>
                                    </InputLabel>
                                  </form>
                                </Typography>
                              </form>
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
                                onClick={handleCloseModal}
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
                              >
                                Update
                              </Button>
                            </DialogActions>
                          </Dialog>
                          {/* end-edit-modal*/}

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
                              id="alert-dialog-title"
                              sx={{ color: "#07285d", fontWeight: "600" }}
                            >
                              {"Delete Confirmation"}
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText
                                id="alert-dialog-description"
                                sx={{ paddingBottom: "0px !important" }}
                              >
                                Are you sure you want to delete {name} ?
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
                                onClick={handleDelete}
                                startIcon={<DeleteIcon />}
                              >
                                Delete
                              </Button>
                            </DialogActions>
                          </Dialog>
                          {/* Delete Confirmation Modal End  */}
                          <ThemeProvider theme={theme}>
                            <div style={{ height: "100%", width: "100%" }}>
                              <DataGrid
                                rows={rows}
                                columns={columns}
                                headerClassName="custom-header"
                                // getRowClassName={(params) =>
                                //   `${params.rowClassName} ${
                                //     isRowBordered(params) ? classes.borderedGreen : classes.borderedRed
                                //   } ${classes.spacedRow}`
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
          </Box>
        </div>
      </div>
    </>
  );
}

export default ResellerCarrier;
