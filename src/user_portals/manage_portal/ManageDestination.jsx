import React, { useEffect, useMemo, useState } from "react";
import "../../../src/style.css";
import {
  Box,
  Checkbox,
  Fade,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { Close, Edit } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  getManageDid,
  updateManageDestination,
} from "../../redux/actions/managePortal/managePortal_destinationAction";
import { getManageExtension } from "../../redux/actions/managePortal/managePortal_extensionAction";
import { api } from "../../mockData";
import { ip } from "@form-validation/validator-ip";
const names = ["Manage"];
const sub_type = ["Extension", "Queue"];
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  // backgroundColor: "rgb(9, 56, 134)",
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarDensitySelector />
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

function ManageDestination() {
  const current_user = localStorage.getItem("current_user");
  const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
  const [edit, setEdit] = useState(false);
  const [destination, setDestination] = useState("");
  const [enable, setEnable] = useState("");
  const [description, setDescription] = useState("");
  const [didId, setDidId] = useState("");
  const [response, setResponse] = useState("");
  const [recording, setRecording] = useState("");
  const [service, setService] = useState("");
  const [destinationAction, setDestinationAction] = useState([]);
  const [extensionNumber, setExtensionNumber] = useState([]);
  const [queue, setQueue] = useState([]);
  const [subType, setSubType] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [error, setError] = useState("");
  const [searchDestination, setSearchDestination] = useState("");
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleEditOpen = () => setEdit(true);
  const handleEditClose = () => {
    setEdit(false);
    setDestination("");
    setEnable("");
    setDescription("");
    setDidId("");
    setRecording("");
    setService("");
    setDestinationAction([]);
    setExtensionNumber([]);
    setQueue([]);
    setSubType("");
    setIpAddress("");
    setError("");
  };

  // Function to validate IP and Port
  const validateIpWithPort = (value) => {
    const [ipPart, portPart] = value.split(":"); // Split IP and port

    // Validate IP (only IPv4 in this case, set ipv6: true if needed)
    const ipValidationResult = ip().validate({
      value: ipPart,
      options: {
        ipv4: true,
        ipv6: false,
        message: "Invalid IP address",
      },
    });

    // If IP validation fails, return false
    if (!ipValidationResult.valid) {
      return {
        valid: false,
        message: ipValidationResult.message || "Invalid IP address",
      };
    }

    // If port is provided, validate it
    if (portPart) {
      const portNumber = parseInt(portPart, 10);
      if (isNaN(portNumber) || portNumber < 0 || portNumber > 65535) {
        return {
          valid: false,
          message: "Invalid port number. Must be between 0 and 65535.",
        };
      }
    }

    // Both IP and Port are valid
    return { valid: true };
  };

  // Handle input change and validation
  const handleIpChange = (e) => {
    const newValue = e.target.value;
    setIpAddress(newValue);

    const validationResult = validateIpWithPort(newValue);

    if (validationResult.valid) {
      setError(""); // Clear error if valid
    } else {
      setError(validationResult.message); // Set error message if invalid
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "destination":
        setDestination(value);
        break;
      case "enabled":
        setEnable(value);
        break;
      case "description":
        setDescription(value);
        break;
      default:
        break;
    }
  };

  const handleEdit = (data) => {
    handleEditOpen();
    setService(
      data?.service_type === "IP"
        ? data?.service_type
        : data?.service_type.charAt(0).toUpperCase() +
            data?.service_type.slice(1).toLowerCase()
    );
    setDidId(data?.did_id);
    setDescription(data?.description);
    setDestination(data?.tfn_number);
    setEnable(data?.status);
    setRecording(data?.recording.toString());
    setIpAddress(data?.service_type === "IP" ? data.destination_actions : "");
    const stringArray = data?.destination_actions
      .replace(/[{}]/g, "") // Remove curly braces
      .split(",") // Split by commas
      .map((item) => item.trim().replace(/'/g, "")); // Trim whitespace and remove single quotes if present
    setDestinationAction(stringArray);
    setSubType(
      data?.sub_type.charAt(0) + data?.sub_type.slice(1).toLowerCase()
    );
  };

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${api.dev}/api/getuserprofileextensions`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token} `,
      },
    };
    axios
      .request(config)
      .then((response) => {
        setExtensionNumber(response?.data);
      })
      .catch((error) => {
        console.log("error", error);
      });

    let ure = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${api.dev}/api/getuserprofilequeues`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token} `,
      },
    };
    axios
      .request(ure)
      .then((response) => {
        setQueue(response?.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [didId, token.access_token]);

  useEffect(() => {
    dispatch(getManageDid());
    dispatch(getManageExtension());
  }, [response, dispatch]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const request = JSON.stringify({
      id: didId,
      is_active: enable.toString().charAt(0),
      details: Array.isArray(destinationAction)
        ? destinationAction.join(",")
        : destinationAction,
      description: description,
      recording: recording?.charAt(0),
      service_type: service?.toUpperCase(),
      sub_type: subType?.toUpperCase(),
      ip_address: ipAddress,
    });
    if (error === "") {
      dispatch(updateManageDestination(request, setEdit, setResponse));
    }
  };

  const columns = [
    {
      field: "edit",
      headerName: "Action",
      width: 100,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            <Tooltip title="Edit" disableInteractive interactive>
              <IconButton onClick={() => handleEdit(params.row)}>
                <Edit
                  index={params.row.id}
                  style={{ cursor: "pointer", color: "#0e397f" }}
                />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
    {
      field: "tfn_number",
      headerName: "Destination",
      headerClassName: "custom-header",
      headerAlign: "center",
      width: 150,
      align: "center",
    },

    {
      field: "service_type",
      headerName: "Service",
      headerClassName: "custom-header",
      width: 100,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "sub_type",
      headerName: "Sub Type",
      headerClassName: "custom-header",
      width: 100,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "destination_actions",
      headerName: "Details",
      width: 150,
      //cellClassName: "name-column--cell",
      //headerClassName: 'super-app-theme--header'
      headerClassName: "custom-header",
      // editable: true,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "description",
      headerName: "Description",
      width: 150,
      headerClassName: "custom-header",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "created_date",
      headerName: "Create Date",
      headerClassName: "custom-header",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const valueFormatter = (params) => {
          const date = new Date(params.value);
          return `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`;
        };

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
              {valueFormatter(params)}
            </p>
          </div>
        );
      },
    },
    {
      field: "updated_date",
      headerName: "Update Date",
      headerClassName: "custom-header",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const valueFormatter = (params) => {
          const date = new Date(params.value);
          return `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`;
        };

        return (
          <div className="d-flex justify-content-between align-items-center">
            <p
              style={{
                fontWeight: "400",
                color: "brown",
                margin: "0",
                textTransform: "capitalize",
              }}
            >
              {valueFormatter(params)}
            </p>
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            {params.row.status === true ? (
              <>
                <div
                  // style={{
                  //   color: "white",
                  //   background: "green",
                  //   padding: "7px",
                  //   borderRadius: "5px",
                  //   fontSize: "12px",
                  //   textTransform: "capitalize",
                  // }}
                  style={{
                    color: "green",
                    //background: "green",
                    padding: "7px",
                    borderRadius: "5px",
                    fontSize: "15px",
                    textTransform: "capitalize",
                    fontWeight: "600",
                  }}
                >
                  Active
                </div>
              </>
            ) : (
              <>
                <div
                  // style={{
                  //   color: "white",
                  //   background: "red",
                  //   padding: "7px",
                  //   borderRadius: "5px",
                  //   fontSize: "12px",
                  //   textTransform: "capitalize",
                  // }}
                  style={{
                    color: "red",
                    //   background: "red",
                    padding: "7px",
                    borderRadius: "5px",
                    fontSize: "15px",
                    textTransform: "capitalize",
                    fontWeight: "600",
                  }}
                >
                  Deactive
                </div>
              </>
            )}
          </div>
        );
      },
    },
  ];

  const rows = useMemo(() => {
    const calculatedRows = [];
    state?.allManageDid?.allmanagedid?.data &&
      state?.allManageDid?.allmanagedid?.data.forEach((item, index) => {
        calculatedRows.push({
          id: index + 1,
          did_id: item.id,
          tfn_number: item?.didnumber,
          username: item?.username,
          service_type: item?.service_type,
          insert_date: item?.insert_date,
          description: item?.description,
          destination_actions: item?.details,
          created_date: item?.created_date,
          updated_date: item?.updated_date,
          sub_type: item.sub_type,
          status: item?.is_active,
          recording: item?.recording,
        });
      });
    return calculatedRows;
  }, [state?.allManageDid?.allmanagedid?.data]);

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
                        <div className="cntnt_title d-flex justify-content-between">
                          <h3>Destination</h3>
                          <Box sx={{ width: "auto" }}>
                            <TextField
                              size="small"
                              fullWidth
                              variant="outlined"
                              placeholder="Search destination numbers..."
                              value={searchDestination} // Controlled by internal state
                              onChange={(e) =>
                                setSearchDestination(e.target.value)
                              } // Updates the state
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <SearchIcon fontSize="small" />
                                  </InputAdornment>
                                ),
                                endAdornment: searchDestination && ( // Show clear button only when there's input
                                  <InputAdornment position="end">
                                    <IconButton
                                      edge="end"
                                      size="small"
                                      sx={{ mr: -1 }}
                                      onClick={() => setSearchDestination("")} // Clears the input
                                    >
                                      <ClearIcon fontSize="small" />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                                sx: {
                                  fontSize: { xs: "0.875rem", sm: "1rem" },
                                  height: { xs: "36px", sm: "40px" },
                                },
                              }}
                            />
                          </Box>
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

                        {/* -----   Edit Campaign Modal Start   ----- */}
                        <Modal
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
                          <Fade in={edit} className="mobile_width bg_imagess">
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

                                <FormControl
                                  style={{
                                    width: "100%",
                                    margin: " 5px 0 5px 0",
                                  }}
                                >
                                  <InputLabel id="demo-multiple-checkbox-label">
                                    Services
                                  </InputLabel>
                                  <Select
                                    style={{ textAlign: "left" }}
                                    labelId="demo-multiple-checkbox-label"
                                    label="Services"
                                    id="demo-multiple-checkbox"
                                    fullWidth
                                    value={service}
                                    onChange={(e) => {
                                      setService(e.target.value);
                                    }}
                                  >
                                    {names.map((name) => (
                                      <MenuItem key={name} value={name}>
                                        {name}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>

                                {service === "Manage" ? (
                                  <>
                                    <FormControl
                                      style={{
                                        width: "100%",
                                        margin: " 5px 0 5px 0",
                                      }}
                                    >
                                      <InputLabel id="demo-multiple-checkbox-label">
                                        Sub Type
                                      </InputLabel>
                                      <Select
                                        style={{ textAlign: "left" }}
                                        labelId="demo-multiple-checkbox-label"
                                        label="Sub Type"
                                        id="demo-multiple-checkbox"
                                        //multiple
                                        fullWidth
                                        value={subType}
                                        onChange={(e) => {
                                          const newSubType = e.target.value;
                                          setSubType(newSubType);
                                          // Clear destinationAction if subType is Extension or Queue
                                          if (
                                            newSubType === "Extension" ||
                                            newSubType === "Queue"
                                          ) {
                                            setDestinationAction([]);
                                          }
                                        }}
                                        // input={
                                        //   <OutlinedInput label="Sub Type" />
                                        // }
                                        // renderValue={(selected) =>
                                        //   selected.join(", ")
                                        // }
                                        // MenuProps={MenuProps}
                                      >
                                        {sub_type.map((name) => {
                                          if (
                                            token.billing_type === "Postpaid" &&
                                            name !== "Extension"
                                          ) {
                                            return null; // skip other names
                                          }
                                          return (
                                            <MenuItem key={name} value={name}>
                                              {name}
                                            </MenuItem>
                                          );
                                        })}
                                      </Select>
                                    </FormControl>
                                    {subType === "Extension" ? (
                                      <>
                                        <FormControl
                                          style={{
                                            width: "100%",
                                            margin: "5px 0 5px 0",
                                          }}
                                        >
                                          <InputLabel id="demo-multiple-checkbox-label">
                                            Extension
                                          </InputLabel>
                                          <Select
                                            style={{
                                              textAlign: "left",
                                            }}
                                            labelId="demo-multiple-checkbox-label"
                                            label="Extension"
                                            id="demo-multiple-checkbox"
                                            multiple // Enable multiple selection
                                            fullWidth
                                            value={destinationAction ?? []} // Ensure the state is an array
                                            onChange={(e) => {
                                              setDestinationAction(
                                                e.target.value
                                              ); // Update state with selected values
                                            }}
                                            renderValue={(selected) =>
                                              selected.join(", ")
                                            } // Display selected values
                                            MenuProps={MenuProps}
                                          >
                                            {extensionNumber?.data?.map(
                                              (name) => (
                                                <MenuItem
                                                  key={name}
                                                  value={name}
                                                >
                                                  <Checkbox
                                                    checked={destinationAction.includes(
                                                      name
                                                    )}
                                                  />{" "}
                                                  {/* Add Checkbox */}
                                                  {name}
                                                </MenuItem>
                                              )
                                            )}
                                          </Select>
                                        </FormControl>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                    {subType === "Queue" ? (
                                      <>
                                        {" "}
                                        <FormControl
                                          fullWidth
                                          style={{
                                            width: "100%",
                                            margin: "7px 0",
                                          }}
                                        >
                                          <InputLabel id="demo-simple-select-label">
                                            Queue
                                          </InputLabel>

                                          <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Queue"
                                            style={{ textAlign: "left" }}
                                            // multiple
                                            value={destinationAction}
                                            onChange={(e) => {
                                              setDestinationAction(
                                                e.target.value
                                              );
                                            }}
                                            // input={
                                            //   <OutlinedInput label="Extension" />
                                            // }
                                            // renderValue={(selected) =>
                                            //   selected.join(", ")
                                            // }
                                            MenuProps={MenuProps}
                                            required
                                          >
                                            {queue.data?.map((item, index) => {
                                              return (
                                                <MenuItem
                                                  key={index}
                                                  value={item}
                                                >
                                                  {/* <Checkbox
                                            checked={
                                              destinationAction.indexOf(item) > -1
                                            }
                                          /> */}
                                                  {/* <ListItemText
                                                        primary={item}
                                                      /> */}
                                                  {item}
                                                </MenuItem>
                                              );
                                            })}
                                          </Select>
                                        </FormControl>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    {service === "IP" ? (
                                      <>
                                        <TextField
                                          style={{
                                            width: "100%",
                                            margin: "7px 0",
                                          }}
                                          type="text"
                                          label="IP Address"
                                          variant="outlined"
                                          value={ipAddress}
                                          onChange={handleIpChange}
                                          error={Boolean(error)}
                                        />
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                )}
                                <br />
                                <FormControl
                                  fullWidth
                                  style={{ width: "100%", margin: "7px 0" }}
                                >
                                  <InputLabel id="demo-simple-select-label">
                                    Recording
                                  </InputLabel>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Recording"
                                    style={{ textAlign: "left" }}
                                    value={recording}
                                    onChange={(e) => {
                                      setRecording(e.target.value);
                                    }}
                                    required
                                  >
                                    <MenuItem value={"true"}>Yes</MenuItem>
                                    <MenuItem value={"false"}>No</MenuItem>
                                  </Select>
                                </FormControl>
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
                                    <MenuItem value={"false"}>
                                      Deactive
                                    </MenuItem>
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
                                </Button> */}

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
                                  onClick={handleEditClose}
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
                        </Modal>
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

export default ManageDestination;
