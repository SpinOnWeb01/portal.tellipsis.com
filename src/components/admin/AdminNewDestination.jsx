import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Close, Edit } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Fade,
  Modal,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  Checkbox,
  OutlinedInput,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Radio,
  RadioGroup,
  InputAdornment,
  DialogContentText,
  useMediaQuery,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  DataGrid,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  getDid,
  createDestination,
  updateDestination,
  updateAssignment,
  suspendDestination,
} from "../../redux/actions/adminPortal/destinationAction";
import { getExtension } from "../../redux/actions/adminPortal/extensionAction";
import { getAllUsers } from "../../redux/actions/adminPortal/userAction";
import { makeStyles } from "@mui/styles";
import { api } from "../../mockData";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import HowToRegIcon from "@mui/icons-material/HowToReg"; // For Un-Suspend
import {
  getAdminResellersList,
  getAdminUsersList,
} from "../../redux/actions/adminPortal/adminPortal_listAction";
import { ip } from "@form-validation/validator-ip";
import { GET_DID_SUCCESS } from "../../redux/constants/adminPortal/destinationConstants";
const drawerWidth = 240;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
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
const names = ["Manage", "IP"];
const sub_type = ["Extension", "Queue"];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarDensitySelector />
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function AdminNewDestination({ colorThem }) {
  const state = useSelector((state) => state);
  const token = JSON.parse(localStorage.getItem("admin"));
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("admin"));
  const [selectedValue, setSelectedValue] = useState("t");
  const [suspendValue, setSuspendValue] = useState(0);
  const [subType, setSubType] = useState("");
  const [didId, setDidId] = useState("");
  const [serviceType, setServiceType] = useState([]);
  const [destinationDescription, setDestinationDescription] = useState("");
  const [destinationAction, setDestinationAction] = useState([]);
  const [openimport, setOpenImport] = React.useState(false);
  const [file, setFile] = useState();
  const [open, setOpen] = React.useState(false);
  const [response, setResponse] = useState("");
  const [edit, setEdit] = useState(false);
  const [tfnNumber, setTfnNumber] = useState("");
  const [userId, setUserId] = useState("");
  const [deleteRow, setDeleteRow] = useState("");
  const [recording, setRecording] = useState("");
  const [service, setService] = useState("");
  const [resellerUsersData, setResellerUsersData] = useState([]);
  const [extensionNumber, setExtensionNumber] = useState([]);
  const [queue, setQueue] = useState([]);
  const [carrierName, setCarrierName] = useState("");
  const [resellerId, setResellerId] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [error, setError] = useState("");
  const [resellerUsers, setResellerUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [resellers, setResellers] = useState([]);
  const [radioValue, setRadioValue] = useState("true");
  const [searchDestination, setSearchDestination] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [alertMessage, setAlertMessage] = useState(false);
  const [loader, setLoader] = useState(true);
  const [validation, setValidation] = useState({
    tfnNumber: "",
    userId: "",
    serviceType: "",
    recording: "",
    selectedValue: "",
    carrierName: "",
    ipAddress: "",
  });

  const handleOpen = () => setOpen(true);
  const classes = useStyles();

  const handleClick = () => {
    window.open("/file/upload_destination_number.csv", "_blank");
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedValue("t");
    setServiceType([]);
    setTfnNumber("");
    setDestinationAction([]);
    setDestinationDescription("");
    setRecording("");
    setExtensionNumber([]);
    setQueue([]);
    setSubType("");
    setUserId("");
    setCarrierName("");
    setValidation({
      tfnNumber: "",
      userId: "",
      serviceType: "",
      recording: "",
      selectedValue: "",
      carrierName: "",
    });
    setResellerId("");
    setIpAddress("");
    setError("");
  };

   const handleSelectionChange = (selection) => {
    setSelectedRows(selection);
  };

  const handleAlertClose = () => {
    setAlertMessage(false);
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

  const handleEditOpen = () => setEdit(true);

  const handleEditClose = () => {
    setEdit(false);
    setSelectedValue("");
    setTfnNumber("");
    setDestinationAction([]);
    setDestinationDescription("");
    setRecording("");
    setExtensionNumber([]);
    setQueue([]);
    setSubType("");
    setUserId("");
    setSuspendValue("");
    setCarrierName("");
    setValidation({
      tfnNumber: "",
      userId: "",
      serviceType: "",
      recording: "",
      selectedValue: "",
      carrierName: "",
    });
    setResellerId("");
    setService("");
    setIpAddress("");
    setError("");
  };

  const handleEdit = (data) => {
    handleEditOpen();
    setTfnNumber(data?.tfn_number);
    setSelectedValue(data?.is_active === "Active" ? "t" : "f");
    const stringArray = data?.details
      .replace(/[{}]/g, "") // Remove curly braces
      .split(",") // Split by commas
      .map((item) => item.trim().replace(/'/g, "")); // Trim whitespace and remove single quotes if present
    setDestinationAction(stringArray);
    setCarrierName(data?.carrier_name);
    setDestinationDescription(data?.description);
    setDidId(data?.did_id);
    setRecording(data?.recording.toString());
    setUserId(data.user_id);
    setService(
      data?.service_type === "IP"
        ? data?.service_type
        : data?.service_type.charAt(0).toUpperCase() +
            data?.service_type.slice(1).toLowerCase()
    );
    setIpAddress(data?.service_type === "IP" ? data.details : "");
    setResellerId(data?.reseller_id === null ? "" : data?.reseller_id);
    setSubType(
      data?.sub_type.charAt(0) + data?.sub_type.slice(1).toLowerCase()
    );
    setSuspendValue(data?.is_suspended);
  };

  useEffect(() => {
    if (userId !== "") {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${api.dev}/api/getuserextensions?user_id=${userId}`,
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
    }

    if (userId !== "") {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${api.dev}/api/getuserqueues?user_id=${userId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token} `,
        },
      };
      axios
        .request(config)
        .then((response) => {
          setQueue(response?.data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [userId]);

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleChanges = (event) => {
    const {
      target: { value },
    } = event;
    setServiceType(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const checkValidation = useCallback(() => {
    let errors = { ...validation };
    let isValid = true;

    if (!tfnNumber) {
      errors.tfnNumber = "Field is required";
      isValid = false;
    } else {
      errors.tfnNumber = "";
    }

    if (!carrierName) {
      errors.carrierName = "Field is required";
      isValid = false;
    } else {
      errors.carrierName = "";
    }

    setValidation(errors);
    return isValid;
  }, [
    validation,
    tfnNumber,
    userId,
    service,
    serviceType,
    recording,
    selectedValue,
    carrierName,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = checkValidation();
    if (isValid) {
      let data = JSON.stringify({
        user_id: userId,
        reseller_id: resellerId,
        didnumber: tfnNumber,
        details: Array.isArray(destinationAction)
          ? destinationAction.join(",")
          : destinationAction,
        description: destinationDescription,
        is_active: selectedValue,
        service_type: serviceType[0].toUpperCase(),
        sub_type: subType.toUpperCase(),
        recording: recording.toString().charAt(0),
        carrier_name: carrierName,
        ip_address: ipAddress,
      });

      if (error === "") {
        dispatch(createDestination(data, setOpen, setResponse));
      }
    }
  };

  const handleUpdateAssignment = useCallback((data) => {
    let form = JSON.stringify({
      id: data.did_id,
      user_id: "None",
    });
    dispatch(updateAssignment(form, setResponse));
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    const isValid = checkValidation();
    if (isValid) {
      let data = JSON.stringify({
        description: destinationDescription,
        is_active: selectedValue?.charAt(0),
        id: didId,
        user_id: userId,
        service_type: service?.toUpperCase(),
        sub_type: subType?.toUpperCase(),
        recording: recording?.charAt(0),
        details: Array.isArray(destinationAction)
          ? destinationAction.join(",")
          : destinationAction,
        is_suspended: suspendValue,
        carrier_name: carrierName,
        reseller_id: resellerId,
        didnumber: tfnNumber,
        ip_address: ipAddress,
      });

      if (error === "") {
        dispatch(
          updateDestination(
            data,
            setResponse,
            setEdit,
            setTfnNumber,
            setDestinationDescription,
            setSelectedValue,
            setUserId,
            setSubType,
            setRecording,
            setDestinationAction,
            setSuspendValue,
            setCarrierName
          )
        );
      }
    }
  };

  // ======import

  const handleOpenImport = () => setOpenImport(true);
  const handleCloseImport = () => setOpenImport(false);

  const handleOnChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      const token = JSON.parse(localStorage.getItem("admin"));
      try {
        const response = await axios.post(
          `${api.dev}/api/import_did_from_csv`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token.access_token} `,
            },
          }
        );
        if (response.data.status === 200) {
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          });
          setResponse(response);
          handleCloseImport();
          // navigate("/")}
        } else {
          toast.error(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          });
        }
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          toast.error(
            `Error: ${error.response.status} - ${error.response.data.message}`,
            {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1500,
            }
          );
        } else if (error.request) {
          // The request was made but no response was received
          toast.error("No response from server. Please try again later.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          });
        } else {
          // Something happened in setting up the request that triggered an Error
          toast.error("An error occurred while setting up the request.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          });
        }
      }
    } else {
      toast.warn("Please select a file to upload.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });
    }
  };

    useEffect(() => {
    dispatch(getDid(radioValue, setLoader));
    dispatch({
      type: GET_DID_SUCCESS,
      payload: [],
    });
  }, [radioValue, response]);

  useEffect(() => {
    dispatch(getExtension(""));
    dispatch(getAllUsers(""));
    dispatch(getAdminUsersList());
    dispatch(getAdminResellersList());
  }, []);
  useEffect(() => {
    if (resellerId !== "None") {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${api.dev}/api/getreselleruserlist?reseller_id=${resellerId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token} `,
        },
      };
      axios
        .request(config)
        .then((response) => {
          setResellerUsersData(response?.data?.data);
        })
        .catch((error) => {});
    }
  }, [resellerId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "tfnNumber":
        const trimmedValue = value.trim();
        setTfnNumber(trimmedValue);
        break;
      case "status":
        setSelectedValue(value);
        break;

      default:
        break;
    }
  };

  const isRowBordered = (params) => {
    const { row } = params;

    // Add your condition here, for example, adding border to rows where age is greater than 25
    return row.status === true;
  };

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));

  useMemo(() => {
    if (state?.getAdminUsersList?.userList) {
      const usersArray = Object.keys(state?.getAdminUsersList?.userList)?.map(
        (key) => ({
          user_id: key,
          username: state?.getAdminUsersList?.userList[key],
        })
      );
      setUsers(usersArray);
    }
    if (state?.getAdminResellersList?.resellerList) {
      const resellerArray = Object.keys(
        state?.getAdminResellersList?.resellerList
      )?.map((key) => ({
        reseller_id: key,
        username: state?.getAdminResellersList?.resellerList[key],
      }));
      setResellers(resellerArray);
    }

    if (resellerUsersData) {
      const usersArray = Object.keys(resellerUsersData)?.map((key) => ({
        user_id: key,
        username: resellerUsersData[key],
      }));
      setResellerUsers(usersArray);
    }
  }, [
    state?.getAdminUsersList?.userList,
    state?.getAdminResellersList?.resellerList,
    resellerUsersData,
  ]);

  const columns = [
    {
      field: "action",
      headerName: "Action",
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      sortable: false,
      width: 50,
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            {/* <IconButton>
              <PlayArrow style={{ cursor: "pointer", color: "grey" }} />
            </IconButton> */}
            {user.user_role === "Reseller" ? (
              <></>
            ) : (
              <>
                <IconButton onClick={() => handleEdit(params.row)}>
                  <Edit
                    index={params.row.id}
                    style={{ cursor: "pointer", color: "#0e397f" }}
                  />
                </IconButton>
              </>
            )}
            {/* <IconButton onClick={() => handleDelete(params.row)}>
              <Delete style={{ cursor: "pointer", color: "red" }} />
            </IconButton> */}
          </div>
        );
      },
    },
    {
      field: "tfn_number",
      headerName: "Destination",
      headerClassName: "custom-header",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "username",
      headerName: "User",
      headerClassName: "custom-header",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "reseller_name",
      headerName: "Reseller",
      headerClassName: "custom-header",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    // {
    //   field: "total_call_duration",
    //   headerName: "Total Call Duration",
    //   headerClassName: "custom-header",
    //   width: 150,
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      field: "service_type",
      headerName: "Service",
      headerClassName: "custom-header",
      width: 80,
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
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            {params.row.sub_type === "EXTENSION" ||
            params.row.sub_type === "Extension" ? (
              <>
                <div
                  style={{
                    color: "white",
                    background: "cornflowerblue",
                    padding: "7px",
                    borderRadius: "5px",
                    fontSize: "12px",
                    textTransform: "capitalize",
                  }}
                >
                  {params.row.sub_type?.toString()?.toLowerCase()}
                </div>
              </>
            ) : (
              <></>
            )}
            {params.row.sub_type === "QUEUE" ||
            params.row.sub_type === "Queue" ? (
              <>
                <div
                  style={{
                    color: "white",
                    background: "blueviolet",
                    padding: "7px",
                    borderRadius: "5px",
                    fontSize: "12px",
                    textTransform: "capitalize",
                  }}
                >
                  {params.row.sub_type?.toString()?.toLowerCase()}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        );
      },
    },

    {
      field: "details",
      headerName: "Details",
      headerClassName: "custom-header",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    // {
    //   field: "Assignment",
    //   headerName: "Assignment",
    //   width: 90,
    //   headerClassName: "custom-header",
    //   headerAlign: "center",
    //   align: "center",
    //   renderCell: (params) => {
    //     return (
    //       <div className="d-flex justify-content-between align-items-center">
    //         {params.row.Assignment === "Assign" ? (
    //           <>
    //             <div
    //               style={{
    //                 color: "white",
    //                 background: "rgb(122 5 119)",
    //                 padding: "7px",
    //                 borderRadius: "5px",
    //                 fontSize: "12px",
    //                 textTransform: "capitalize",
    //                 // textDecoration: "underline",
    //                 cursor: "pointer",
    //               }}
    //               onClick={() => handleEdit(params.row)}
    //             >
    //               Assign
    //             </div>
    //           </>
    //         ) : (
    //           <>
    //             <div
    //               style={{
    //                 color: "white",
    //                 cursor: "pointer",
    //                 textDecoration: "underline",
    //                 background: "#f5c61d",
    //                 padding: "7px",
    //                 borderRadius: "5px",
    //                 fontSize: "12px",
    //                 textTransform: "capitalize",
    //               }}
    //               onClick={() => handleUpdateAssignment(params.row)}
    //             >
    //               Unassign
    //             </div>
    //           </>
    //         )}
    //       </div>
    //     );
    //   },
    // },

    {
      field: "recording",
      headerName: "Recording",
      headerClassName: "custom-header",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            {params.row.recording === false ? (
              <>
                <div
                  style={{
                    color: "red",
                    //background: "red",
                    padding: "7px",
                    borderRadius: "5px",
                    fontSize: "12px",
                    textTransform: "capitalize",
                  }}
                >
                  {"No"}
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    color: "green",
                    // background: "green",
                    padding: "7px",
                    borderRadius: "5px",
                    fontSize: "12px",
                    textTransform: "capitalize",
                  }}
                >
                  Yes
                </div>
              </>
            )}
          </div>
        );
      },
    },
    {
      field: "description",
      headerName: "Description",
      headerClassName: "custom-header",
      width: 150,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "carrier_name",
      headerName: "Carrier Name",
      headerClassName: "custom-header",
      width: 100,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "created_date",
      headerName: "Create Date",
      headerClassName: "custom-header",
      width: 100,
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

    // {
    //   field: "created_date",
    //   headerName: "Create Date",
    //   headerClassName: "custom-header",
    //   width: 100,
    //   headerAlign: "center",
    //   align: "center",
    //   renderCell: (params) => {
    //     return (
    //       <div className="d-flex justify-content-between align-items-center">
    //         <p
    //           style={{
    //             fontWeight: "500",
    //             color: "green",
    //             margin: "0",
    //             textTransform: "capitalize",
    //           }}
    //         >
    //           valueFormatter: (params) => {
    //     const date = new Date(params.value);
    //     return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    //   },
    //         </p>
    //       </div>
    //     );
    //   },

    // },
    {
      field: "updated_date",
      headerName: "Update Date",
      headerClassName: "custom-header",
      width: 100,
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

      valueFormatter: (params) => {},
    },

     {
      field: "status",
      headerName: "Status",
      headerClassName: "custom-header",
      width: isXs ? 70 : 80,
      minWidth: 70,
      maxWidth: 80,
      headerAlign: "start",
      align: "start",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{
            fontSize: "calc(0.6rem + 0.2vw)",
            fontWeight: "bold",
            color: "white !important",
          }}
        >
          Status
        </Typography>
      ),
      renderCell: (params) => {
        const { is_active, is_suspended } = params.row;

        // Define the key as a string like "true_1", "false_0", etc.
        const key = `${String(is_active)}_${String(is_suspended)}`;
        console.log('key', key)

        // Lookup map
        const labelMap = {
          1: { label: "Suspend", color: "orange" }, // Suspend gets priority
          Active_0: { label: "Active", color: "green" },
          Deactive_1: { label: "Suspend", color: "orange" },
          Deactive_0: { label: "Deactive", color: "red" },
        };

        // Fallback in case of unknown values
        const { label, color } = labelMap[key] || {
          label: "Suspend",
          color: "orange",
        };

        return (
          <div
            style={{
              color,
              padding: isMobile ? "5px" : "7px",
              borderRadius: "5px",
              textAlign: "center",
              fontSize: "calc(0.6rem + 0.2vw)",
            }}
          >
            {label}
          </div>
        );
      },
    },
  ];

  const rows = useMemo(() => {
    const calculatedRows = [];
    state?.allDid?.alldid &&
      state?.allDid?.alldid?.forEach((item, index) => {
        calculatedRows.push({
          id: index + 1,
          //client_name: item?.client_name,
          did_id: item?.id,
          tfn_number: item?.didnumber,
          // max_call: item?.max_call,
          username: item?.username,
          record: item?.destination_record,
          service_type: item?.service_type,
          created_date: item?.created_date,
          updated_date: item?.updated_date,
          extension: item?.destination_actions,
          status: item?.status,
          details: item?.details,
          description: item?.description,
          recording: item.recording,
          user_id: item.user_id,
          reseller_id: item.reseller_id,
          reseller_name: item.reseller_name,
          sub_type: item.sub_type,
          carrier_name: item.carrier_name,
          total_call_duration: item.total_call_duration,
          Assignment: item.status,
          is_active: item.is_active,
          is_suspended: item.is_suspended,
        });
      });
    return calculatedRows;
  }, [state?.allDid?.alldid]);

   const filteredRows = rows.filter((row) =>
    row.tfn_number?.toLowerCase().includes(searchDestination.toLowerCase())
  );

  const selectedCallerDataSet = new Set(); // Using Set to avoid duplicates

  selectedRows.forEach((id) => {
    const selectedRow = filteredRows.find((row) => row.id === id);
    if (selectedRow) {
      selectedCallerDataSet.add(selectedRow.did_id); // Add only did_id
    }
  });

  const selectedCallerData = Array.from(selectedCallerDataSet); // Convert to comma-separated string

    const handleMessage = useCallback(
    () => {
      setAlertMessage(true);
    },
    [setAlertMessage]
  );

  const handleDelete = useCallback(() => {
    let isSuspendedStatus = 1; // default suspend

    // Find the first selected row's suspension status
    const firstSelectedRow = filteredRows.find(
      (row) => row.id === selectedRows[0]
    );
    if (firstSelectedRow) {
      isSuspendedStatus = firstSelectedRow.is_suspended === 1 ? 0 : 1;
    }

    const selectedCallerDataSet = new Set();

    selectedRows.forEach((id) => {
      const selectedRow = filteredRows.find((row) => row.id === id);
      if (selectedRow) {
        selectedCallerDataSet.add(selectedRow.did_id);
      }
    });

    const selectedCallerData = Array.from(selectedCallerDataSet);

    dispatch(
      suspendDestination(
        JSON.stringify({
          ids: selectedCallerData,
          is_suspended: isSuspendedStatus,
        }),
        setResponse
      )
    );

    setAlertMessage(false);
    setSelectedRows([]);
  }, [dispatch, setResponse, setSelectedRows, selectedRows, filteredRows]);

    const getToggleSuspendText = () => {
    const firstSelectedRow = filteredRows.find(
      (row) => row.id === selectedRows[0]
    );
    if (firstSelectedRow?.is_suspended === 1) return "Un-Suspend";
    return "Suspend";
  };

  const getSuspendIcon = () => {
    const firstSelectedRow = filteredRows.find(
      (row) => row.id === selectedRows[0]
    );
    return firstSelectedRow?.is_suspended === 1 ? (
      <HowToRegIcon />
    ) : (
      <NoAccountsIcon />
    );
  };


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
                              <h3>Destination</h3>
                              {/* <p>
                                Inbound destinations are the DID/DDI, DNIS or
                                Alias for inbound calls.
                              </p> */}
                            </div>

                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                position: "relative",
                                top: "0",
                              }}
                            >
                              {/* import */}
                              {user.user_role === "Reseller" ? (
                                <></>
                              ) : (
                                <>
                                  <Typography
                                    onClick={handleClick}
                                    target="_blank"
                                    className="hover-content"
                                    style={{ cursor: "pointer" }}
                                  >
                                    <IconButton>
                                      <FileDownloadIcon />
                                    </IconButton>
                                  </Typography>

                                  <div
                                    className="n-ppost"
                                    style={{ paddingRight: "20px" }}
                                  >
                                    Sample
                                  </div>
                                  <img
                                    className="n-ppost-name"
                                    src="https://i.ibb.co/rMkhnrd/sample2.png"
                                    alt="Image"
                                  />

                                  <div>
                                    <IconButton
                                      className="all_button_clr"
                                      onClick={handleOpenImport}
                                    >
                                      Import <ImportExportIcon />
                                    </IconButton>
                                  </div>
                                </>
                              )}

                              <Modal
                                open={openimport}
                                onClose={handleCloseImport}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                              >
                                <Fade in={openimport} className="bg_imagess">
                                  <Box
                                    sx={style}
                                    borderRadius={"10px"}
                                    textAlign={"center"}
                                  >
                                    <IconButton
                                      onClick={handleCloseImport}
                                      sx={{ float: "inline-end" }}
                                    >
                                      <Close />
                                    </IconButton>
                                    <br />
                                    <br />
                                    <img
                                      src="/img/import-icon.png"
                                      alt="import"
                                      style={{ borderRadius: "30px" }}
                                    />

                                    <form
                                      style={{
                                        textAlign: "center",
                                        height: "auto",
                                        overflow: "auto",
                                        paddingTop: "10px",
                                        padding: "20px",
                                      }}
                                    >
                                      <Typography
                                        id="transition-modal-title"
                                        variant="h6"
                                        component="h2"
                                        color={"#092b5f"}
                                        fontSize={"18px"}
                                        fontWeight={"600"}
                                      >
                                        Import File
                                      </Typography>

                                      <br />
                                      <input
                                        style={{
                                          //width: "100%",
                                          margin: "7px 0",
                                          textAlign: "center !important",
                                        }}
                                        type={"file"}
                                        // id={"csvFileInput"}
                                        // accept={".csv"}
                                        onChange={handleOnChange}
                                      />
                                      <br />
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
                                          textTransform:
                                            "capitalize !important",
                                        }}
                                        onClick={handleCloseImport}
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
                                          textTransform:
                                            "capitalize !important",
                                        }}
                                        onClick={(e) => {
                                          handleOnSubmit(e);
                                        }}
                                      >
                                        Submit
                                      </Button>
                                    </form>
                                  </Box>
                                </Fade>
                              </Modal>
                              {/* import-end */}

                              {/* ==Add-modal== */}

                              {user.user_role === "Reseller" ? (
                                <></>
                              ) : (
                                <>
                                  {" "}
                                  <div>
                                    <IconButton
                                      className="all_button_clr"
                                      onClick={handleOpen}
                                    >
                                      Add <AddOutlinedIcon />
                                    </IconButton>
                                  </div>
                                </>
                              )}

                              

                              {/* -----   Add Campaigns Modal Start   ----- */}

                              <Dialog
                                open={open}
                                onClose={handleClose}
                                sx={{
                                  textAlign: "center",
                                  borderRadius: "10px",
                                }}
                              >
                                <Box>
                                  <IconButton
                                    onClick={handleClose}
                                    sx={{
                                      float: "inline-end",
                                      display: "flex",
                                      justifyContent: "end",
                                      margin: "10px 10px 0px 0px",
                                    }}
                                  >
                                    <Close />
                                  </IconButton>
                                </Box>
                                <DialogTitle
                                  sx={{
                                    color: "#07285d",
                                    fontWeight: "600",
                                    width: "500px",
                                  }}
                                >
                                  <Box>
                                    {" "}
                                    <img
                                      src="/img/admin-did-icon.png"
                                      alt="user icon"
                                    />
                                  </Box>
                                  Add DID
                                </DialogTitle>

                                <DialogContent>
                                  <form>
                                    <form
                                      style={{
                                        textAlign: "center",
                                        height: "348px",
                                        paddingTop: "10px",
                                        padding: "5px",
                                        width: "auto",
                                      }}
                                    >
                                      <TextField
                                        style={{
                                          width: "100%",
                                          margin: "7px 0",
                                        }}
                                        type="text"
                                        label="Destination"
                                        variant="outlined"
                                        name="tfnNumber"
                                        value={tfnNumber}
                                        onChange={(e) => {
                                          const numericValue =
                                            e.target.value.replace(
                                              /[^0-9]/g,
                                              ""
                                            );
                                          setTfnNumber(numericValue);
                                        }}
                                        inputProps={{
                                          inputMode: "numeric",
                                          // pattern: '[0-9]*',
                                        }}
                                      />
                                      {validation.tfnNumber && (
                                        <p
                                          className="mb-0"
                                          style={{
                                            color: "red",
                                            textAlign: "left",
                                          }}
                                        >
                                          {validation.tfnNumber}
                                        </p>
                                      )}

                                      <FormControl
                                        fullWidth
                                        style={{
                                          width: "100%",
                                          margin: "7px 0",
                                        }}
                                        className={classes.formControl}
                                      >
                                        <InputLabel id="demo-simple-select-label">
                                          Reseller
                                        </InputLabel>

                                        <Select
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          label="Reseller"
                                          style={{ textAlign: "left" }}
                                          value={resellerId}
                                          onChange={(e) => {
                                            setResellerId(e.target.value);
                                          }}
                                          required
                                        >
                                          <MenuItem value={""}>none</MenuItem>
                                          {resellers?.map((item, index) => {
                                            return (
                                              <MenuItem
                                                key={index}
                                                value={item?.reseller_id}
                                              >
                                                {item.username}
                                              </MenuItem>
                                            );
                                          })}
                                        </Select>
                                      </FormControl>

                                      <br />
                                      {resellerId === "" ? (
                                        <>
                                          <FormControl
                                            fullWidth
                                            style={{
                                              width: "100%",
                                              margin: "7px 0",
                                            }}
                                          >
                                            <InputLabel id="demo-simple-select-label">
                                              UserName
                                            </InputLabel>

                                            <Select
                                              labelId="demo-simple-select-label"
                                              id="demo-simple-select"
                                              label="UserName"
                                              style={{ textAlign: "left" }}
                                              value={userId}
                                              onChange={(e) => {
                                                setUserId(e.target.value);
                                              }}
                                            >
                                              <MenuItem value={""}>
                                                none
                                              </MenuItem>
                                              {users?.map((item, index) => {
                                                return (
                                                  <MenuItem
                                                    key={index}
                                                    value={item?.user_id}
                                                  >
                                                    {item.username}
                                                  </MenuItem>
                                                );
                                              })}
                                            </Select>
                                          </FormControl>
                                          {validation.userId && (
                                            <p
                                              className="mb-0"
                                              style={{
                                                color: "red",
                                                textAlign: "left",
                                              }}
                                            >
                                              {validation.userId}
                                            </p>
                                          )}
                                        </>
                                      ) : (
                                        <>
                                          <FormControl
                                            fullWidth
                                            style={{
                                              width: "100%",
                                              margin: "7px 0",
                                            }}
                                          >
                                            <InputLabel id="demo-simple-select-label">
                                              UserName
                                            </InputLabel>

                                            <Select
                                              labelId="demo-simple-select-label"
                                              id="demo-simple-select"
                                              label="UserName"
                                              style={{ textAlign: "left" }}
                                              value={userId}
                                              onChange={(e) => {
                                                setUserId(e.target.value);
                                              }}
                                            >
                                              <MenuItem value={""}>
                                                none
                                              </MenuItem>
                                              {resellerUsers?.map(
                                                (item, index) => {
                                                  return (
                                                    <MenuItem
                                                      key={index}
                                                      value={item?.user_id}
                                                    >
                                                      {item.username}
                                                    </MenuItem>
                                                  );
                                                }
                                              )}
                                            </Select>
                                          </FormControl>
                                          {validation.userId && (
                                            <p
                                              className="mb-0"
                                              style={{
                                                color: "red",
                                                textAlign: "left",
                                              }}
                                            >
                                              {validation.userId}
                                            </p>
                                          )}
                                        </>
                                      )}

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
                                          //multiple
                                          fullWidth
                                          value={serviceType}
                                          onChange={handleChanges}
                                          input={
                                            <OutlinedInput label="Services" />
                                          }
                                          renderValue={(selected) =>
                                            selected.join(", ")
                                          }
                                          MenuProps={MenuProps}
                                          // disabled={true}
                                        >
                                          {names.map((name) => (
                                            <MenuItem key={name} value={name}>
                                              <Checkbox
                                                checked={
                                                  serviceType.indexOf(name) > -1
                                                }
                                              />
                                              <ListItemText primary={name} />
                                            </MenuItem>
                                          ))}
                                        </Select>
                                      </FormControl>
                                      {validation.serviceType && (
                                        <p
                                          className="mb-0"
                                          style={{
                                            color: "red",
                                            textAlign: "left",
                                          }}
                                        >
                                          {validation.serviceType}
                                        </p>
                                      )}

                                      {serviceType.map((item, index) => {
                                        return (
                                          <>
                                            {item === "Manage" ? (
                                              <>
                                                {" "}
                                                <br />
                                                <FormControl
                                                  style={{
                                                    width: "100%",
                                                    margin: " 5px 0 5px 0",
                                                  }}
                                                >
                                                  <InputLabel id="demo-multiple-checkbox-label">
                                                    Type
                                                  </InputLabel>
                                                  <Select
                                                    style={{
                                                      textAlign: "left",
                                                    }}
                                                    labelId="demo-multiple-checkbox-label"
                                                    label="Sub Type"
                                                    id="demo-multiple-checkbox"
                                                    //multiple
                                                    fullWidth
                                                    value={subType}
                                                    onChange={(e) => {
                                                      const newSubType =
                                                        e.target.value;
                                                      setSubType(newSubType);
                                                      // Clear destinationAction if subType is Extension or Queue
                                                      if (
                                                        newSubType ===
                                                          "Extension" ||
                                                        newSubType === "Queue"
                                                      ) {
                                                        setDestinationAction(
                                                          []
                                                        );
                                                      }
                                                    }}
                                                  >
                                                    {sub_type.map((name) => (
                                                      <MenuItem
                                                        key={name}
                                                        value={name}
                                                      >
                                                        {name}
                                                      </MenuItem>
                                                    ))}
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
                                                        value={
                                                          destinationAction ||
                                                          []
                                                        } // Ensure the state is an array
                                                        onChange={(e) => {
                                                          setDestinationAction(
                                                            e.target.value
                                                          ); // Update state with selected values
                                                        }}
                                                        renderValue={(
                                                          selected
                                                        ) =>
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
                                                              />
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
                                                        style={{
                                                          textAlign: "left",
                                                        }}
                                                        // multiple
                                                        value={
                                                          destinationAction
                                                        }
                                                        onChange={(e) => {
                                                          setDestinationAction(
                                                            e.target.value
                                                          );
                                                        }}
                                                        MenuProps={MenuProps}
                                                        required
                                                      >
                                                        {queue.data?.map(
                                                          (item, index) => {
                                                            return (
                                                              <MenuItem
                                                                key={index}
                                                                value={item}
                                                              >
                                                                {item}
                                                              </MenuItem>
                                                            );
                                                          }
                                                        )}
                                                      </Select>
                                                    </FormControl>
                                                  </>
                                                ) : (
                                                  <></>
                                                )}
                                              </>
                                            ) : (
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
                                            )}
                                          </>
                                        );
                                      })}

                                      <br />

                                      <FormControl
                                        fullWidth
                                        style={{
                                          width: "100%",
                                          margin: "7px 0",
                                        }}
                                      >
                                        <InputLabel id="demo-simple-select-label">
                                          Status
                                        </InputLabel>
                                        <Select
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          label="Status"
                                          style={{ textAlign: "left" }}
                                          value={selectedValue}
                                          onChange={handleSelectChange}
                                          required
                                        >
                                          <MenuItem value={"t"}>
                                            Active
                                          </MenuItem>
                                          <MenuItem value={"f"}>
                                            Deactive
                                          </MenuItem>
                                        </Select>
                                      </FormControl>
                                      {validation.selectedValue && (
                                        <p
                                          className="mb-0"
                                          style={{
                                            color: "red",
                                            textAlign: "left",
                                          }}
                                        >
                                          {validation.selectedValue}
                                        </p>
                                      )}

                                      <br />
                                      <FormControl
                                        fullWidth
                                        style={{
                                          width: "100%",
                                          margin: "7px 0",
                                        }}
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
                                          <MenuItem value={"true"}>
                                            Yes
                                          </MenuItem>
                                          <MenuItem value={"false"}>
                                            No
                                          </MenuItem>
                                        </Select>
                                      </FormControl>
                                      {validation.recording && (
                                        <p
                                          className="mb-0"
                                          style={{
                                            color: "red",
                                            textAlign: "left",
                                          }}
                                        >
                                          {validation.recording}
                                        </p>
                                      )}

                                      <br />
                                      <TextField
                                        style={{
                                          width: "100%",
                                          margin: "7px 0",
                                        }}
                                        type="text"
                                        label="Carrier Name"
                                        variant="outlined"
                                        name="carrier_name"
                                        value={carrierName}
                                        onChange={(e) => {
                                          setCarrierName(e.target.value);
                                        }}
                                      />
                                      {validation.carrierName && (
                                        <p
                                          className="mb-0"
                                          style={{
                                            color: "red",
                                            textAlign: "left",
                                          }}
                                        >
                                          {validation.carrierName}
                                        </p>
                                      )}

                                      <br />

                                      <TextField
                                        style={{
                                          width: "100%",
                                          margin: "7px 0",
                                        }}
                                        type="text"
                                        label="Description"
                                        variant="outlined"
                                        name="destinationDescription"
                                        value={destinationDescription}
                                        onChange={(e) => {
                                          setDestinationDescription(
                                            e.target.value
                                          );
                                        }}
                                      />
                                      <br />
                                    </form>
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
                                </DialogActions>
                              </Dialog>
                              {/* -----   Add Campaigns Modal End   ----- */}

                              {/* -----   Edit Campaign Modal Start   ----- */}
                              <Dialog
                                open={edit}
                                onClose={handleEditClose}
                                sx={{
                                  textAlign: "center",
                                  borderRadius: "10px",
                                }}
                              >
                                <Box>
                                  <IconButton
                                    onClick={handleEditClose}
                                    sx={{
                                      float: "inline-end",
                                      display: "flex",
                                      justifyContent: "end",
                                      margin: "10px 10px 0px 0px",
                                    }}
                                  >
                                    <Close />
                                  </IconButton>
                                </Box>
                                <DialogTitle
                                  sx={{
                                    color: "#07285d",
                                    fontWeight: "600",
                                    width: "500px",
                                  }}
                                >
                                  Update Destination
                                </DialogTitle>

                                <DialogContent>
                                  <form>
                                    <Typography variant="body1">
                                      <form
                                        style={{
                                          textAlign: "center",
                                          height: "348px",
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
                                          type="number"
                                          label="Destination"
                                          variant="outlined"
                                          name="tfnNumber"
                                          value={parseInt(tfnNumber)}
                                          onChange={handleChange}
                                          padding={"0px 0 !important"}
                                        />

                                        <FormControl
                                          fullWidth
                                          style={{
                                            width: "100%",
                                            margin: "7px 0",
                                          }}
                                        >
                                          <InputLabel id="demo-simple-select-label">
                                            Reseller
                                          </InputLabel>

                                          <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Reseller"
                                            style={{ textAlign: "left" }}
                                            value={resellerId}
                                            onChange={(e) => {
                                              setResellerId(e.target.value);
                                            }}
                                            required
                                          >
                                            <MenuItem value="">none</MenuItem>
                                            {resellers?.map((item, index) => {
                                              return (
                                                <MenuItem
                                                  key={index}
                                                  value={item?.reseller_id}
                                                >
                                                  {item.username}
                                                </MenuItem>
                                              );
                                            })}
                                          </Select>
                                        </FormControl>

                                        {resellerId === "" ? (
                                          <>
                                            <FormControl
                                              fullWidth
                                              style={{
                                                width: "100%",
                                                margin: "7px 0",
                                              }}
                                            >
                                              <InputLabel id="demo-simple-select-label">
                                                UserName
                                              </InputLabel>

                                              <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="UserName"
                                                style={{ textAlign: "left" }}
                                                value={userId}
                                                onChange={(e) => {
                                                  setUserId(e.target.value);
                                                }}
                                              >
                                                <MenuItem value={""}>
                                                  none
                                                </MenuItem>
                                                {users?.map((item, index) => {
                                                  return (
                                                    <MenuItem
                                                      key={index}
                                                      value={item?.user_id}
                                                    >
                                                      {item.username}
                                                    </MenuItem>
                                                  );
                                                })}
                                              </Select>
                                            </FormControl>
                                            {validation.userId && (
                                              <p
                                                className="mb-0"
                                                style={{
                                                  color: "red",
                                                  textAlign: "left",
                                                }}
                                              >
                                                {validation.userId}
                                              </p>
                                            )}
                                          </>
                                        ) : (
                                          <>
                                            <FormControl
                                              fullWidth
                                              style={{
                                                width: "100%",
                                                margin: "7px 0",
                                              }}
                                            >
                                              <InputLabel id="demo-simple-select-label">
                                                UserName
                                              </InputLabel>

                                              <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="UserName"
                                                style={{ textAlign: "left" }}
                                                value={userId}
                                                onChange={(e) => {
                                                  setUserId(e.target.value);
                                                }}
                                              >
                                                <MenuItem value={""}>
                                                  none
                                                </MenuItem>
                                                {resellerUsers?.map(
                                                  (item, index) => {
                                                    return (
                                                      <MenuItem
                                                        key={index}
                                                        value={item?.user_id}
                                                      >
                                                        {item.username}
                                                      </MenuItem>
                                                    );
                                                  }
                                                )}
                                              </Select>
                                            </FormControl>
                                            {validation.userId && (
                                              <p
                                                className="mb-0"
                                                style={{
                                                  color: "red",
                                                  textAlign: "left",
                                                }}
                                              >
                                                {validation.userId}
                                              </p>
                                            )}
                                          </>
                                        )}

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
                                                  const newSubType =
                                                    e.target.value;
                                                  setSubType(newSubType);
                                                  // Clear destinationAction if subType is Extension or Queue
                                                  if (
                                                    newSubType ===
                                                      "Extension" ||
                                                    newSubType === "Queue"
                                                  ) {
                                                    setDestinationAction([]);
                                                  }
                                                }}
                                              >
                                                {sub_type.map((name) => (
                                                  <MenuItem
                                                    key={name}
                                                    value={name}
                                                  >
                                                    {name}
                                                  </MenuItem>
                                                ))}
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
                                                    value={
                                                      destinationAction || []
                                                    } // Ensure the state is an array
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
                                                    style={{
                                                      textAlign: "left",
                                                    }}
                                                    // multiple
                                                    value={destinationAction}
                                                    onChange={(e) => {
                                                      setDestinationAction(
                                                        e.target.value
                                                      );
                                                    }}
                                                    MenuProps={MenuProps}
                                                    required
                                                  >
                                                    {queue.data?.map(
                                                      (item, index) => {
                                                        return (
                                                          <MenuItem
                                                            key={index}
                                                            value={item}
                                                          >
                                                            {item}
                                                          </MenuItem>
                                                        );
                                                      }
                                                    )}
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
                                          style={{
                                            width: "100%",
                                            margin: "7px 0",
                                          }}
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
                                            <MenuItem value={"true"}>
                                              Yes
                                            </MenuItem>
                                            <MenuItem value={"false"}>
                                              No
                                            </MenuItem>
                                          </Select>
                                        </FormControl>

                                        <FormControl
                                          fullWidth
                                          style={{
                                            width: "100%",
                                            margin: "7px 0",
                                          }}
                                        >
                                          <InputLabel id="demo-simple-select-label">
                                            Status
                                          </InputLabel>
                                          <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Status"
                                            style={{ textAlign: "left" }}
                                            value={selectedValue}
                                            onChange={handleSelectChange}
                                            required
                                          >
                                            <MenuItem value={"t"}>
                                              Active
                                            </MenuItem>
                                            <MenuItem value={"f"}>
                                              Deactive
                                            </MenuItem>
                                          </Select>
                                        </FormControl>

                                        <br />

                                        <FormControl
                                          fullWidth
                                          style={{
                                            width: "100%",
                                            margin: "7px 0",
                                          }}
                                        >
                                          <InputLabel id="demo-simple-select-label">
                                            Suspend
                                          </InputLabel>
                                          <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Suspend"
                                            style={{ textAlign: "left" }}
                                            value={suspendValue}
                                            onChange={(e) =>
                                              setSuspendValue(e.target.value)
                                            }
                                            required
                                          >
                                            <MenuItem value={0}>
                                              Not Suspended
                                            </MenuItem>
                                            <MenuItem value={1}>
                                              Suspended
                                            </MenuItem>
                                          </Select>
                                        </FormControl>

                                        <br />

                                        <TextField
                                          style={{
                                            width: "100%",
                                            margin: "7px 0",
                                          }}
                                          type="text"
                                          label="Carrier Name"
                                          variant="outlined"
                                          name="carrier_name"
                                          value={carrierName}
                                          onChange={(e) => {
                                            setCarrierName(e.target.value);
                                          }}
                                          required
                                        />
                                        {validation.carrierName && (
                                          <p
                                            className="mb-0"
                                            style={{
                                              color: "red",
                                              textAlign: "left",
                                            }}
                                          >
                                            {validation.carrierName}
                                          </p>
                                        )}
                                        <br />

                                        <TextField
                                          style={{
                                            width: "100%",
                                            margin: "7px 0",
                                          }}
                                          type="text"
                                          label="Description"
                                          variant="outlined"
                                          name="destinationDescription"
                                          value={destinationDescription}
                                          onChange={(e) => {
                                            setDestinationDescription(
                                              e.target.value
                                            );
                                          }}
                                        />
                                        <br />
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
                                    onClick={handleEditClose}
                                    autoFocus
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    className="all_button_clr"
                                    sx={{
                                      fontSize: "16px !impotant",
                                      marginTop: "20px",
                                      marginLeft: "0px !important",
                                      padding: "10px 20px !important",
                                      textTransform: "capitalize !important",
                                    }}
                                    variant="contained"
                                    color="primary"
                                    onClick={handleUpdate}
                                  >
                                    Update
                                  </Button>
                                </DialogActions>
                              </Dialog>
                              {/* -----   Edit Campaign Modal End   ----- */}
                            </div>
                          </div>

                          <div className="d-flex justify-content-between">
                            <div className="d-flex justify-content-between">
                              <div>
                                <FormControl>
                                  {/* <FormLabel id="demo-row-radio-buttons-group-label">Live Calls</FormLabel> */}
                                  <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={radioValue} // Bind the selected value to state
                                    onChange={(e) => {
                                      setRadioValue(e.target.value);
                                      setLoader(true);
                                    }} // Handle change event
                                  >
                                    <FormControlLabel
                                      value=""
                                      control={<Radio />}
                                      label={`All(${
                                        radioValue === "true" ||
                                        radioValue === "false" ||
                                        radioValue === "1"
                                          ? 0
                                          : rows.length
                                      })`}
                                    />
                                    <FormControlLabel
                                      value="true"
                                      control={<Radio />}
                                      label={`Active(${
                                        radioValue === "" ||
                                        radioValue === "false" ||
                                        radioValue === "1"
                                          ? 0
                                          : rows.length
                                      })`}
                                    />
                                    <FormControlLabel
                                      value="false"
                                      control={<Radio />}
                                      label={`Deactive(${
                                        radioValue === "" ||
                                        radioValue === "true" ||
                                        radioValue === "1"
                                          ? 0
                                          : rows.length
                                      })`}
                                    />
                                    <FormControlLabel
                                      value={"1"}
                                      control={<Radio />}
                                      label={`Suspended(${
                                        radioValue === "" ||
                                        radioValue === "true" ||
                                        radioValue === "false"
                                          ? 0
                                          : rows.length
                                      })`}
                                    />
                                  </RadioGroup>
                                </FormControl>
                              </div>
                              <div>
                                <Button
                                  variant="contained"
                                  style={{
                                    fontSize: "15px",
                                    borderRadius: "5px",
                                    border: "none",
                                    color: "#fff",
                                    px: 4,
                                    background: selectedCallerData.length
                                      ? "red"
                                      : "orange",
                                    textTransform: "capitalize",
                                    height: "35px",
                                    width: "auto",
                                    minWidth: "90px",
                                    flexShrink: 0,
                                    display:
                                      selectedCallerData.length === 0
                                        ? "none"
                                        : "inline-flex",
                                    justifyContent: "space-evenly",
                                    alignItems: "center",
                                  }}
                                  className="all_button_clr"
                                  color="error"
                                  onClick={handleMessage}
                                  startIcon={getSuspendIcon()}
                                >
                                  {getToggleSuspendText()}
                                </Button>
                              </div>
                            </div>

                            <div>
                              <Box
                                sx={{
                                  width: "auto",
                                  display: { xs: "none", md: "block" },
                                }}
                              >
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
                                          onClick={() =>
                                            setSearchDestination("")
                                          } // Clears the input
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
                          </div>

                          {/* Suspend Confirmation Modal Start  */}
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
                              {"Suspend Confirmation"}
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText
                                id="alert-dialog-description"
                                sx={{ paddingBottom: "0px !important" }}
                              >
                                Are you sure you want to suspend ?
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
                                startIcon={<NoAccountsIcon />}
                              >
                                Suspend
                              </Button>
                            </DialogActions>
                          </Dialog>
                          {/* Suspend Confirmation Modal End  */}

                          <ThemeProvider theme={theme}>
                            <div style={{ height: "100%", width: "100%" }}>
                              <DataGrid
                                rows={filteredRows}
                                columns={columns}
                                checkboxSelection
                                disableRowSelectionOnClick
                                rowSelectionModel={selectedRows}
                                onRowSelectionModelChange={
                                  handleSelectionChange
                                }
                                getRowClassName={(params) =>
                                  isRowBordered(params)
                                    ? "borderedGreen"
                                    : "borderedRed"
                                }
                                components={{ Toolbar: GridToolbar }}
                                slots={{
                                  toolbar: CustomToolbar,
                                }}
                                autoHeight // Automatically adjust the height to fit all rows
                              />
                            </div>
                          </ThemeProvider>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          </Box>
        </div>
      </div>
    </>
  );
}

export default AdminNewDestination;
