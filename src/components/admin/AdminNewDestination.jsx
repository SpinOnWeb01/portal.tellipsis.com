import React, { useCallback, useEffect, useMemo, useReducer } from "react";
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
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  GridToolbarExport,
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
import HowToRegIcon from "@mui/icons-material/HowToReg";
import {
  getAdminResellersList,
  getAdminUsersList,
} from "../../redux/actions/adminPortal/adminPortal_listAction";
import { ip } from "@form-validation/validator-ip";
import { GET_DID_SUCCESS } from "../../redux/constants/adminPortal/destinationConstants";

// Constants
const DRAWER_WIDTH = 240;
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MENU_PROPS = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const SERVICE_TYPES = ["Manage", "IP"];
const SUB_TYPES = ["Extension", "Queue"];

// Reducer for state management
const initialState = {
  selectedValue: "t",
  suspendValue: 0,
  subType: "",
  didId: "",
  serviceType: [],
  destinationDescription: "",
  destinationAction: [],
  openimport: false,
  file: null,
  open: false,
  response: null,
  edit: false,
  tfnNumber: "",
  userId: "",
  deleteRow: "",
  recording: "",
  service: "",
  resellerUsersData: [],
  extensionNumber: [],
  queue: [],
  carrierName: "",
  resellerId: "",
  ipAddress: "",
  error: "",
  resellerUsers: [],
  users: [],
  resellers: [],
  radioValue: "true",
  searchDestination: "",
  selectedRows: [],
  alertMessage: false,
  loader: true,
  validation: {
    tfnNumber: "",
    userId: "",
    serviceType: "",
    recording: "",
    selectedValue: "",
    carrierName: "",
    ipAddress: "",
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value
      };
    case 'SET_NESTED_FIELD':
      return {
        ...state,
        [action.parent]: {
          ...state[action.parent],
          [action.field]: action.value
        }
      };
    case 'RESET_FORM':
      return {
        ...initialState,
        radioValue: state.radioValue,
        loader: state.loader,
        users: state.users,
        resellers: state.resellers,
        resellerUsers: state.resellerUsers,
      };
    case 'SET_EDIT_DATA':
      return {
        ...state,
        ...action.payload
      };
    case 'SET_MULTIPLE':
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}

// Styles
const useStyles = makeStyles({
  borderedGreen: {
    borderLeft: "3px solid green",
    boxShadow: "2px -1px 4px -3px #686868",
    margin: "4px 4px 1px 4px !important",
  },
  borderedRed: {
    borderLeft: "3px solid red",
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
            minHeight: "auto",
          },
        },
      },
      defaultProps: {
        density: "compact",
      },
    },
  },
});

// Modal style
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

// Custom Toolbar Component
const CustomToolbar = React.memo(() => (
  <GridToolbarContainer>
    <GridToolbarColumnsButton />
    <GridToolbarDensitySelector />
    <GridToolbarFilterButton />
    <GridToolbarExport />
  </GridToolbarContainer>
));

// Custom Hooks
const useDestinationData = (token, userId, resellerId) => {
  const [extensionNumber, setExtensionNumber] = React.useState([]);
  const [queue, setQueue] = React.useState([]);
  const [resellerUsersData, setResellerUsersData] = React.useState([]);

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const [extensionsResponse, queuesResponse] = await Promise.all([
            axios.get(`${api.dev}/api/getuserextensions?user_id=${userId}`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.access_token}`,
              },
            }),
            axios.get(`${api.dev}/api/getuserqueues?user_id=${userId}`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.access_token}`,
              },
            }),
          ]);
          setExtensionNumber(extensionsResponse?.data || []);
          setQueue(queuesResponse?.data || []);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [userId, token]);

  useEffect(() => {
    if (resellerId && resellerId !== "None") {
      const fetchResellerUsers = async () => {
        try {
          const response = await axios.get(
            `${api.dev}/api/getreselleruserlist?reseller_id=${resellerId}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.access_token}`,
              },
            }
          );
          setResellerUsersData(response?.data?.data || []);
        } catch (error) {
          console.error("Error fetching reseller users:", error);
        }
      };
      fetchResellerUsers();
    }
  }, [resellerId, token]);

  return { extensionNumber, queue, resellerUsersData };
};

const useUsersAndResellers = (state, resellerUsersData) => {
  return useMemo(() => {
    const users = state?.getAdminUsersList?.userList
      ? Object.keys(state.getAdminUsersList.userList).map((key) => ({
          user_id: key,
          username: state.getAdminUsersList.userList[key],
        }))
      : [];

    const resellers = state?.getAdminResellersList?.resellerList
      ? Object.keys(state.getAdminResellersList.resellerList).map((key) => ({
          reseller_id: key,
          username: state.getAdminResellersList.resellerList[key],
        }))
      : [];

    const resellerUsers = resellerUsersData
      ? Object.keys(resellerUsersData).map((key) => ({
          user_id: key,
          username: resellerUsersData[key],
        }))
      : [];

    return { users, resellers, resellerUsers };
  }, [state?.getAdminUsersList?.userList, state?.getAdminResellersList?.resellerList, resellerUsersData]);
};

// Validation functions
const validateIpWithPort = (value) => {
  const [ipPart, portPart] = value.split(":");

  const ipValidationResult = ip().validate({
    value: ipPart,
    options: {
      ipv4: true,
      ipv6: false,
      message: "Invalid IP address",
    },
  });

  if (!ipValidationResult.valid) {
    return {
      valid: false,
      message: ipValidationResult.message || "Invalid IP address",
    };
  }

  if (portPart) {
    const portNumber = parseInt(portPart, 10);
    if (isNaN(portNumber) || portNumber < 0 || portNumber > 65535) {
      return {
        valid: false,
        message: "Invalid port number. Must be between 0 and 65535.",
      };
    }
  }

  return { valid: true };
};

// Main Component
function AdminNewDestination({ colorThem }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("admin"));
  const user = JSON.parse(localStorage.getItem("admin"));
  const state = useSelector((state) => state);
  
  const [stateReducer, dispatchReducer] = React.useReducer(reducer, initialState);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));

  // Destructure state for easier access
  const {
    selectedValue,
    suspendValue,
    subType,
    didId,
    serviceType,
    destinationDescription,
    destinationAction,
    openimport,
    file,
    open,
    response,
    edit,
    tfnNumber,
    userId,
    recording,
    service,
    carrierName,
    resellerId,
    ipAddress,
    error,
    radioValue,
    searchDestination,
    selectedRows,
    alertMessage,
    loader,
    validation,
  } = stateReducer;

  // Custom hooks for data fetching
  const { extensionNumber, queue, resellerUsersData } = useDestinationData(token, userId, resellerId);
  const { users, resellers, resellerUsers } = useUsersAndResellers(state, resellerUsersData);

  // Action creators
  const setField = useCallback((field, value) => {
    dispatchReducer({ type: 'SET_FIELD', field, value });
  }, []);

  const setNestedField = useCallback((parent, field, value) => {
    dispatchReducer({ type: 'SET_NESTED_FIELD', parent, field, value });
  }, []);

  const resetForm = useCallback(() => {
    dispatchReducer({ type: 'RESET_FORM' });
  }, []);

  const setMultipleFields = useCallback((payload) => {
    dispatchReducer({ type: 'SET_MULTIPLE', payload });
  }, []);

  // Event handlers
  const handleOpen = useCallback(() => setField('open', true), [setField]);
  const handleClose = useCallback(() => resetForm(), [resetForm]);

  const handleEditOpen = useCallback(() => setField('edit', true), [setField]);
  const handleEditClose = useCallback(() => resetForm(), [resetForm]);

  const handleOpenImport = useCallback(() => setField('openimport', true), [setField]);
  const handleCloseImport = useCallback(() => setField('openimport', false), [setField]);

  const handleClick = useCallback(() => {
    window.open("/file/upload_destination_number.csv", "_blank");
  }, []);

  const handleSelectionChange = useCallback((selection) => {
    setField('selectedRows', selection);
  }, [setField]);

  const handleAlertClose = useCallback(() => {
    setField('alertMessage', false);
  }, [setField]);

  const handleIpChange = useCallback((e) => {
    const newValue = e.target.value;
    setField('ipAddress', newValue);

    const validationResult = validateIpWithPort(newValue);
    setField('error', validationResult.valid ? "" : validationResult.message);
  }, [setField]);

  const handleSelectChange = useCallback((event) => {
    setField('selectedValue', event.target.value);
  }, [setField]);

  const handleServiceTypeChange = useCallback((event) => {
    const value = event.target.value;
    setField('serviceType', typeof value === "string" ? value.split(",") : value);
  }, [setField]);

  const handleEdit = useCallback((data) => {
    const stringArray = data?.details
      ?.replace(/[{}]/g, "")
      ?.split(",")
      ?.map((item) => item.trim().replace(/'/g, "")) || [];

    const editData = {
      edit: true,
      tfnNumber: data?.tfn_number || "",
      selectedValue: data?.is_active === "Active" ? "t" : "f",
      destinationAction: stringArray,
      carrierName: data?.carrier_name || "",
      destinationDescription: data?.description || "",
      didId: data?.did_id || "",
      recording: data?.recording?.toString() || "",
      userId: data.user_id || "",
      service: data?.service_type === "IP" 
        ? data?.service_type 
        : data?.service_type?.charAt(0).toUpperCase() + data?.service_type?.slice(1).toLowerCase() || "",
      ipAddress: data?.service_type === "IP" ? data.details : "",
      resellerId: data?.reseller_id === null ? "" : data?.reseller_id,
      subType: data?.sub_type?.charAt(0) + data?.sub_type?.slice(1).toLowerCase() || "",
      suspendValue: data?.is_suspended || 0,
    };

    dispatchReducer({ type: 'SET_EDIT_DATA', payload: editData });
  }, []);

  const checkValidation = useCallback(() => {
    const errors = {};
    let isValid = true;

    if (!tfnNumber) {
      errors.tfnNumber = "Field is required";
      isValid = false;
    }

    if (!carrierName) {
      errors.carrierName = "Field is required";
      isValid = false;
    }

    setMultipleFields({ validation: errors });
    return isValid;
  }, [tfnNumber, carrierName, setMultipleFields]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const isValid = checkValidation();
    if (isValid && error === "") {
      const data = JSON.stringify({
        user_id: userId,
        reseller_id: resellerId,
        didnumber: tfnNumber,
        details: Array.isArray(destinationAction) ? destinationAction.join(",") : destinationAction,
        description: destinationDescription,
        is_active: selectedValue,
        service_type: serviceType[0]?.toUpperCase() || "",
        sub_type: subType.toUpperCase(),
        recording: recording.toString().charAt(0),
        carrier_name: carrierName,
        ip_address: ipAddress,
      });

      dispatch(createDestination(data, () => setField('open', false), setField.bind(null, 'response')));
    }
  }, [
    checkValidation, error, userId, resellerId, tfnNumber, destinationAction,
    destinationDescription, selectedValue, serviceType, subType, recording,
    carrierName, ipAddress, dispatch, setField
  ]);

  const handleUpdate = useCallback((e) => {
    e.preventDefault();
    const isValid = checkValidation();
    if (isValid && error === "") {
      const data = JSON.stringify({
        description: destinationDescription,
        is_active: selectedValue?.charAt(0),
        id: didId,
        user_id: userId,
        service_type: service?.toUpperCase(),
        sub_type: subType?.toUpperCase(),
        recording: recording?.charAt(0),
        details: Array.isArray(destinationAction) ? destinationAction.join(",") : destinationAction,
        is_suspended: suspendValue,
        carrier_name: carrierName,
        reseller_id: resellerId,
        didnumber: tfnNumber,
        ip_address: ipAddress,
      });

      dispatch(
        updateDestination(
          data,
          setField.bind(null, 'response'),
          () => setField('edit', false),
          resetForm
        )
      );
    }
  }, [
    checkValidation, error, destinationDescription, selectedValue, didId, userId,
    service, subType, recording, destinationAction, suspendValue, carrierName,
    resellerId, tfnNumber, ipAddress, dispatch, setField, resetForm
  ]);

  const handleOnChange = useCallback((event) => {
    setField('file', event.target.files[0]);
  }, [setField]);

  const handleOnSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!file) {
      toast.warn("Please select a file to upload.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${api.dev}/api/import_did_from_csv`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token.access_token}`,
        },
      });

      if (response.data.status === 200) {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        });
        setField('response', response);
        handleCloseImport();
      } else {
        toast.error(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        });
      }
    } catch (error) {
      const errorMessage = error.response
        ? `Error: ${error.response.status} - ${error.response.data.message}`
        : error.request
        ? "No response from server. Please try again later."
        : "An error occurred while setting up the request.";

      toast.error(errorMessage, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });
    }
  }, [file, token, setField, handleCloseImport]);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    if (name === "tfnNumber") {
      setField('tfnNumber', value.trim().replace(/[^0-9]/g, ""));
    } else if (name === "status") {
      setField('selectedValue', value);
    }
  }, [setField]);

  // DataGrid configuration
  const columns = useMemo(() => [
    {
      field: "action",
      headerName: "Action",
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      sortable: false,
      width: 50,
      renderCell: (params) => (
        user.user_role !== "Reseller" && (
          <IconButton onClick={() => handleEdit(params.row)}>
            <Edit style={{ cursor: "pointer", color: "#0e397f" }} />
          </IconButton>
        )
      ),
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
        const subType = params.row.sub_type?.toString()?.toLowerCase();
        const isExtension = subType === "extension";
        const isQueue = subType === "queue";
        
        if (!isExtension && !isQueue) return null;

        return (
          <div
            style={{
              color: "white",
              background: isExtension ? "cornflowerblue" : "blueviolet",
              padding: "7px",
              borderRadius: "5px",
              fontSize: "12px",
              textTransform: "capitalize",
            }}
          >
            {subType}
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
    {
      field: "recording",
      headerName: "Recording",
      headerClassName: "custom-header",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div
          style={{
            color: params.row.recording ? "green" : "red",
            padding: "7px",
            borderRadius: "5px",
            fontSize: "12px",
            textTransform: "capitalize",
          }}
        >
          {params.row.recording ? "Yes" : "No"}
        </div>
      ),
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
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      },
    },
    {
      field: "updated_date",
      headerName: "Update Date",
      headerClassName: "custom-header",
      width: 100,
      headerAlign: "center",
      align: "center",
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      },
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
        const key = `${String(is_active)}_${String(is_suspended)}`;
        
        const labelMap = {
          1: { label: "Suspend", color: "orange" },
          Active_0: { label: "Active", color: "green" },
          Deactive_1: { label: "Suspend", color: "orange" },
          Deactive_0: { label: "Deactive", color: "red" },
        };

        const { label, color } = labelMap[key] || { label: "Suspend", color: "orange" };

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
  ], [isMobile, isXs, user.user_role, handleEdit]);

  const rows = useMemo(() => {
    return state?.allDid?.alldid?.map((item, index) => ({
      id: index + 1,
      did_id: item?.id,
      tfn_number: item?.didnumber,
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
    })) || [];
  }, [state?.allDid?.alldid]);

  const filteredRows = useMemo(() => 
    rows.filter((row) =>
      row.tfn_number?.toLowerCase().includes(searchDestination.toLowerCase())
    ),
    [rows, searchDestination]
  );

  const selectedCallerData = useMemo(() => {
    const selectedSet = new Set();
    selectedRows.forEach((id) => {
      const selectedRow = filteredRows.find((row) => row.id === id);
      if (selectedRow) {
        selectedSet.add(selectedRow.did_id);
      }
    });
    return Array.from(selectedSet);
  }, [selectedRows, filteredRows]);

  const handleMessage = useCallback(() => {
    setField('alertMessage', true);
  }, [setField]);

  const handleDelete = useCallback(() => {
    const firstSelectedRow = filteredRows.find((row) => row.id === selectedRows[0]);
    const isSuspendedStatus = firstSelectedRow?.is_suspended === 1 ? 0 : 1;

    dispatch(
      suspendDestination(
        JSON.stringify({
          ids: selectedCallerData,
          is_suspended: isSuspendedStatus,
        }),
        setField.bind(null, 'response')
      )
    );

    setField('alertMessage', false);
    setField('selectedRows', []);
  }, [dispatch, setField, selectedRows, filteredRows, selectedCallerData]);

  const getToggleSuspendText = useCallback(() => {
    const firstSelectedRow = filteredRows.find((row) => row.id === selectedRows[0]);
    return firstSelectedRow?.is_suspended === 1 ? "Un-Suspend" : "Suspend";
  }, [filteredRows, selectedRows]);

  const getSuspendIcon = useCallback(() => {
    const firstSelectedRow = filteredRows.find((row) => row.id === selectedRows[0]);
    return firstSelectedRow?.is_suspended === 1 ? <HowToRegIcon /> : <NoAccountsIcon />;
  }, [filteredRows, selectedRows]);

  // Effects
  useEffect(() => {
    dispatch(getDid(radioValue, (loader) => setField('loader', loader)));
    dispatch({ type: GET_DID_SUCCESS, payload: [] });
  }, [radioValue, dispatch, setField]);

  useEffect(() => {
    dispatch(getExtension(""));
    dispatch(getAllUsers(""));
    dispatch(getAdminUsersList());
    dispatch(getAdminResellersList());
  }, [dispatch]);

  const isRowBordered = useCallback((params) => params.row.status === true, []);

  // Modal Components
  const AddDestinationModal = React.memo(({ open, onClose, onSubmit }) => (
    <Dialog open={open} onClose={onClose} sx={{ textAlign: "center", borderRadius: "10px" }}>
      <Box>
        <IconButton onClick={onClose} sx={{ float: "inline-end", display: "flex", justifyContent: "end", margin: "10px 10px 0px 0px" }}>
          <Close />
        </IconButton>
      </Box>
      <DialogTitle sx={{ color: "#07285d", fontWeight: "600", width: "500px" }}>
        <Box><img src="/img/admin-did-icon.png" alt="user icon" /></Box>
        Add DID
      </DialogTitle>
      <DialogContent>
        <DestinationForm 
          mode="add"
          onSubmit={onSubmit}
          onClose={onClose}
          state={stateReducer}
          setField={setField}
          setNestedField={setNestedField}
          users={users}
          resellers={resellers}
          resellerUsers={resellerUsers}
          extensionNumber={extensionNumber}
          queue={queue}
          validation={validation}
          error={error}
          handleIpChange={handleIpChange}
        />
      </DialogContent>
    </Dialog>
  ));

  const EditDestinationModal = React.memo(({ edit, onClose, onSubmit }) => (
    <Dialog open={edit} onClose={onClose} sx={{ textAlign: "center", borderRadius: "10px" }}>
      <Box>
        <IconButton onClick={onClose} sx={{ float: "inline-end", display: "flex", justifyContent: "end", margin: "10px 10px 0px 0px" }}>
          <Close />
        </IconButton>
      </Box>
      <DialogTitle sx={{ color: "#07285d", fontWeight: "600", width: "500px" }}>
        Update Destination
      </DialogTitle>
      <DialogContent>
        <DestinationForm 
          mode="edit"
          onSubmit={onSubmit}
          onClose={onClose}
          state={stateReducer}
          setField={setField}
          setNestedField={setNestedField}
          users={users}
          resellers={resellers}
          resellerUsers={resellerUsers}
          extensionNumber={extensionNumber}
          queue={queue}
          validation={validation}
          error={error}
          handleIpChange={handleIpChange}
        />
      </DialogContent>
    </Dialog>
  ));

  return (
    <div className={`App ${colorThem}`}>
      <div className="contant_box">
        <Box
          className="right_sidebox mobile_top_pddng"
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          }}
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="tab-content" id="pills-tabContent">
                  <div className="tab-pane fade show active" id="pills-home" role="tabpanel">
                    <div className="">
                      <div className="cntnt_title" style={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}>
                        <div>
                          <h3>Destination</h3>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", position: "relative", top: "0" }}>
                          {user.user_role !== "Reseller" && (
                            <>
                              <Typography onClick={handleClick} className="hover-content" style={{ cursor: "pointer" }}>
                                <IconButton><FileDownloadIcon /></IconButton>
                              </Typography>
                              <div className="n-ppost" style={{ paddingRight: "20px" }}>Sample</div>
                              <img className="n-ppost-name" src="https://i.ibb.co/rMkhnrd/sample2.png" alt="Sample" />
                              <div>
                                <IconButton className="all_button_clr" onClick={handleOpenImport}>
                                  Import <ImportExportIcon />
                                </IconButton>
                              </div>
                              <div>
                                <IconButton className="all_button_clr" onClick={handleOpen}>
                                  Add <AddOutlinedIcon />
                                </IconButton>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="d-flex justify-content-between">
                        <div className="d-flex justify-content-between">
                          <div>
                            <FormControl>
                              <RadioGroup
                                row
                                value={radioValue}
                                onChange={(e) => {
                                  setField('radioValue', e.target.value);
                                  setField('loader', true);
                                }}
                              >
                                <FormControlLabel value="" control={<Radio />} label={`All(${radioValue === "true" || radioValue === "false" || radioValue === "1" ? 0 : rows.length})`} />
                                <FormControlLabel value="true" control={<Radio />} label={`Active(${radioValue === "" || radioValue === "false" || radioValue === "1" ? 0 : rows.length})`} />
                                <FormControlLabel value="false" control={<Radio />} label={`Deactive(${radioValue === "" || radioValue === "true" || radioValue === "1" ? 0 : rows.length})`} />
                                <FormControlLabel value="1" control={<Radio />} label={`Suspended(${radioValue === "" || radioValue === "true" || radioValue === "false" ? 0 : rows.length})`} />
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
                                background: selectedCallerData.length ? "red" : "orange",
                                textTransform: "capitalize",
                                height: "35px",
                                width: "auto",
                                minWidth: "90px",
                                display: selectedCallerData.length === 0 ? "none" : "inline-flex",
                                justifyContent: "space-evenly",
                                alignItems: "center",
                              }}
                              className="all_button_clr"
                              onClick={handleMessage}
                              startIcon={getSuspendIcon()}
                            >
                              {getToggleSuspendText()}
                            </Button>
                          </div>
                        </div>

                        <div>
                          <Box sx={{ width: "auto", display: { xs: "none", md: "block" } }}>
                            <TextField
                              size="small"
                              fullWidth
                              variant="outlined"
                              placeholder="Search destination numbers..."
                              value={searchDestination}
                              onChange={(e) => setField('searchDestination', e.target.value)}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <SearchIcon fontSize="small" />
                                  </InputAdornment>
                                ),
                                endAdornment: searchDestination && (
                                  <InputAdornment position="end">
                                    <IconButton
                                      edge="end"
                                      size="small"
                                      sx={{ mr: -1 }}
                                      onClick={() => setField('searchDestination', "")}
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

                      {/* Modals */}
                      <AddDestinationModal open={open} onClose={handleClose} onSubmit={handleSubmit} />
                      <EditDestinationModal edit={edit} onClose={handleEditClose} onSubmit={handleUpdate} />

                      {/* Import Modal */}
                      <Modal open={openimport} onClose={handleCloseImport}>
                        <Fade in={openimport} className="bg_imagess">
                          <Box sx={modalStyle} borderRadius={"10px"} textAlign={"center"}>
                            <IconButton onClick={handleCloseImport} sx={{ float: "inline-end" }}>
                              <Close />
                            </IconButton>
                            <br /><br />
                            <img src="/img/import-icon.png" alt="import" style={{ borderRadius: "30px" }} />
                            <form style={{ textAlign: "center", height: "auto", overflow: "auto", paddingTop: "10px", padding: "20px" }}>
                              <Typography variant="h6" component="h2" color={"#092b5f"} fontSize={"18px"} fontWeight={"600"}>
                                Import File
                              </Typography>
                              <br />
                              <input
                                style={{ margin: "7px 0", textAlign: "center !important" }}
                                type={"file"}
                                onChange={handleOnChange}
                              />
                              <br /><br />
                              <Button
                                variant="contained"
                                className="all_button_clr"
                                sx={{
                                  fontSize: "16px !important",
                                  background: "linear-gradient(180deg, #0E397F 0%, #001E50 100%) !important",
                                  marginTop: "20px",
                                  padding: "10px 20px !important",
                                  textTransform: "capitalize !important",
                                }}
                                onClick={handleCloseImport}
                              >
                                Cancel
                              </Button>
                              <Button
                                variant="contained"
                                className="all_button_clr"
                                sx={{
                                  fontSize: "16px !important",
                                  background: "#092b5f",
                                  marginTop: "20px",
                                  padding: "10px 20px !important",
                                  textTransform: "capitalize !important",
                                }}
                                onClick={handleOnSubmit}
                              >
                                Submit
                              </Button>
                            </form>
                          </Box>
                        </Fade>
                      </Modal>

                      {/* Suspend Confirmation Modal */}
                      <Dialog
                        open={alertMessage}
                        onClose={handleAlertClose}
                        sx={{ textAlign: "center" }}
                      >
                        <DialogTitle className="modal_heading" sx={{ color: "#133325", fontWeight: "600" }}>
                          {"Suspend Confirmation"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText sx={{ paddingBottom: "0px !important" }}>
                            Are you sure you want to suspend ?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions sx={{ display: "flex", justifyContent: "center", paddingBottom: "20px" }}>
                          <Button
                            variant="contained"
                            sx={{
                              fontSize: "16px !important",
                              background: "linear-gradient(180deg, #0E397F 0%, #001E50 100%) !important",
                              marginTop: "20px",
                              marginLeft: "0px !important",
                              padding: "10px 20px !important",
                              textTransform: "capitalize !important",
                            }}
                            className="all_button_clr"
                            onClick={handleAlertClose}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="contained"
                            sx={{
                              fontSize: "16px !important",
                              marginTop: "20px",
                              padding: "10px 20px !important",
                              textTransform: "capitalize !important",
                              marginLeft: "0px !important",
                              marginRight: "0px !important",
                            }}
                            className="all_button_clr"
                            onClick={handleDelete}
                            startIcon={<NoAccountsIcon />}
                          >
                            Suspend
                          </Button>
                        </DialogActions>
                      </Dialog>

                      <ThemeProvider theme={theme}>
                        <div style={{ height: "100%", width: "100%" }}>
                          <DataGrid
                            rows={filteredRows}
                            columns={columns}
                            checkboxSelection
                            disableRowSelectionOnClick
                            rowSelectionModel={selectedRows}
                            onRowSelectionModelChange={handleSelectionChange}
                            getRowClassName={(params) => isRowBordered(params) ? "borderedGreen" : "borderedRed"}
                            components={{ Toolbar: CustomToolbar }}
                            slots={{ toolbar: CustomToolbar }}
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
        </Box>
      </div>
    </div>
  );
}

// Destination Form Component
const DestinationForm = React.memo(({
  mode,
  onSubmit,
  onClose,
  state,
  setField,
  setNestedField,
  users,
  resellers,
  resellerUsers,
  extensionNumber,
  queue,
  validation,
  error,
  handleIpChange,
}) => {
  const {
    tfnNumber,
    userId,
    serviceType,
    recording,
    selectedValue,
    carrierName,
    resellerId,
    subType,
    destinationAction,
    destinationDescription,
    ipAddress,
    service,
    suspendValue,
  } = state;

  return (
    <form>
      <div style={{ textAlign: "center", height: "348px", paddingTop: "10px", padding: "5px", width: "auto", overflow: "auto" }}>
        <TextField
          style={{ width: "100%", margin: "7px 0" }}
          type="text"
          label="Destination"
          variant="outlined"
          value={tfnNumber}
          onChange={(e) => {
            const numericValue = e.target.value.replace(/[^0-9]/g, "");
            setField('tfnNumber', numericValue);
          }}
          inputProps={{ inputMode: "numeric" }}
        />
        {validation.tfnNumber && (
          <p className="mb-0" style={{ color: "red", textAlign: "left" }}>
            {validation.tfnNumber}
          </p>
        )}

        <FormControl fullWidth style={{ width: "100%", margin: "7px 0" }}>
          <InputLabel>Reseller</InputLabel>
          <Select
            label="Reseller"
            style={{ textAlign: "left" }}
            value={resellerId}
            onChange={(e) => setField('resellerId', e.target.value)}
          >
            <MenuItem value="">none</MenuItem>
            {resellers?.map((item) => (
              <MenuItem key={item.reseller_id} value={item.reseller_id}>
                {item.username}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth style={{ width: "100%", margin: "7px 0" }}>
          <InputLabel>UserName</InputLabel>
          <Select
            label="UserName"
            style={{ textAlign: "left" }}
            value={userId}
            onChange={(e) => setField('userId', e.target.value)}
          >
            <MenuItem value="">none</MenuItem>
            {(resellerId ? resellerUsers : users)?.map((item) => (
              <MenuItem key={item.user_id} value={item.user_id}>
                {item.username}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {mode === "add" ? (
          <FormControl style={{ width: "100%", margin: "5px 0" }}>
            <InputLabel>Services</InputLabel>
            <Select
              label="Services"
              style={{ textAlign: "left" }}
              multiple
              value={serviceType}
              onChange={(e) => setField('serviceType', typeof e.target.value === "string" ? e.target.value.split(",") : e.target.value)}
              input={<OutlinedInput label="Services" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MENU_PROPS}
            >
              {SERVICE_TYPES.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={serviceType.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <FormControl style={{ width: "100%", margin: "5px 0" }}>
            <InputLabel>Services</InputLabel>
            <Select
              label="Services"
              style={{ textAlign: "left" }}
              value={service}
              onChange={(e) => setField('service', e.target.value)}
            >
              {SERVICE_TYPES.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {(mode === "add" ? serviceType[0] === "Manage" : service === "Manage") && (
          <>
            <FormControl style={{ width: "100%", margin: "5px 0" }}>
              <InputLabel>Type</InputLabel>
              <Select
                label="Sub Type"
                style={{ textAlign: "left" }}
                value={subType}
                onChange={(e) => {
                  const newSubType = e.target.value;
                  setField('subType', newSubType);
                  if (newSubType === "Extension" || newSubType === "Queue") {
                    setField('destinationAction', []);
                  }
                }}
              >
                {SUB_TYPES.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {subType === "Extension" && (
              <FormControl style={{ width: "100%", margin: "5px 0" }}>
                <InputLabel>Extension</InputLabel>
                <Select
                  label="Extension"
                  style={{ textAlign: "left" }}
                  multiple
                  value={destinationAction || []}
                  onChange={(e) => setField('destinationAction', e.target.value)}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MENU_PROPS}
                >
                  {extensionNumber?.data?.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={destinationAction.includes(name)} />
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {subType === "Queue" && (
              <FormControl fullWidth style={{ width: "100%", margin: "7px 0" }}>
                <InputLabel>Queue</InputLabel>
                <Select
                  label="Queue"
                  style={{ textAlign: "left" }}
                  value={destinationAction}
                  onChange={(e) => setField('destinationAction', e.target.value)}
                  MenuProps={MENU_PROPS}
                >
                  {queue.data?.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </>
        )}

        {(mode === "add" ? serviceType[0] === "IP" : service === "IP") && (
          <TextField
            style={{ width: "100%", margin: "7px 0" }}
            type="text"
            label="IP Address"
            variant="outlined"
            value={ipAddress}
            onChange={handleIpChange}
            error={Boolean(error)}
          />
        )}

        <FormControl fullWidth style={{ width: "100%", margin: "7px 0" }}>
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            style={{ textAlign: "left" }}
            value={selectedValue}
            onChange={(e) => setField('selectedValue', e.target.value)}
          >
            <MenuItem value="t">Active</MenuItem>
            <MenuItem value="f">Deactive</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth style={{ width: "100%", margin: "7px 0" }}>
          <InputLabel>Recording</InputLabel>
          <Select
            label="Recording"
            style={{ textAlign: "left" }}
            value={recording}
            onChange={(e) => setField('recording', e.target.value)}
          >
            <MenuItem value="true">Yes</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </Select>
        </FormControl>

        {mode === "edit" && (
          <FormControl fullWidth style={{ width: "100%", margin: "7px 0" }}>
            <InputLabel>Suspend</InputLabel>
            <Select
              label="Suspend"
              style={{ textAlign: "left" }}
              value={suspendValue}
              onChange={(e) => setField('suspendValue', e.target.value)}
            >
              <MenuItem value={0}>Not Suspended</MenuItem>
              <MenuItem value={1}>Suspended</MenuItem>
            </Select>
          </FormControl>
        )}

        <TextField
          style={{ width: "100%", margin: "7px 0" }}
          type="text"
          label="Carrier Name"
          variant="outlined"
          value={carrierName}
          onChange={(e) => setField('carrierName', e.target.value)}
        />
        {validation.carrierName && (
          <p className="mb-0" style={{ color: "red", textAlign: "left" }}>
            {validation.carrierName}
          </p>
        )}

        <TextField
          style={{ width: "100%", margin: "7px 0" }}
          type="text"
          label="Description"
          variant="outlined"
          value={destinationDescription}
          onChange={(e) => setField('destinationDescription', e.target.value)}
        />
      </div>

      <DialogActions sx={{ display: "flex", justifyContent: "center", paddingBottom: "20px" }}>
        <Button
          variant="contained"
          className="all_button_clr"
          sx={{
            fontSize: "16px !important",
            background: "linear-gradient(180deg, #0E397F 0%, #001E50 100%) !important",
            marginTop: "20px",
            padding: "10px 20px !important",
            textTransform: "capitalize !important",
          }}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          className="all_button_clr"
          sx={{
            fontSize: "16px !important",
            background: "#092b5f",
            marginTop: "20px",
            padding: "10px 20px !important",
            textTransform: "capitalize !important",
          }}
          onClick={onSubmit}
        >
          {mode === "add" ? "Save" : "Update"}
        </Button>
      </DialogActions>
    </form>
  );
});

export default React.memo(AdminNewDestination);