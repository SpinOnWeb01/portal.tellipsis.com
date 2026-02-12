import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Close, Delete, Edit, PlayArrow } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  FormControl,
  IconButton,
  InputLabel,
  Modal,
  TextField,
  Typography,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  CircularProgress,
  Tooltip,
  InputAdornment,
  RadioGroup,
  FormLabel,
  Radio,
  FormControlLabel,
  Grid,
  useMediaQuery,
} from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import {
  DataGrid,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import "../../style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getAllUsers,
  register,
  getRoleUsers,
  updateUser,
  login,
  updateUserStaus,
} from "../../redux/actions/adminPortal/userAction";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@mui/styles";
import "../../Switcher.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Router from "../../routes/route";
import { api } from "../../mockData";
import PersonIcon from "@mui/icons-material/Person";
import { IconBase } from "react-icons/lib";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ALL_USERS_RESET } from "../../redux/constants/adminPortal/userConstants";
import { getAdminUsersList } from "../../redux/actions/adminPortal/adminPortal_listAction";

const drawerWidth = 240;

// =======modal-popup---->
const style = {
  padding: "20px !Important",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  // backgroundColor: "rgb(9, 56, 134)",
  // border: '2px solid #000',
  boxShadow: 24,
};

// ====table----->

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
  formControl: {
    "& .MuiInputBase-root": {
      color: "#666",
      borderColor: "transparent",
      borderWidth: "1px",
      borderStyle: "solid",
      height: "45px",
      minWidth: "120px",
      justifyContent: "center",
    },
    "& .MuiSelect-select.MuiSelect-select": {
      paddingRight: "0px",
    },
    "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
      top: "-4px !important",
    },
  },
  select: {
    width: "auto",
    fontSize: "12px",
    "&:focus": {
      backgroundColor: "transparent",
    },
  },
  selectIcon: {
    position: "relative",
    color: "#6EC177",
    fontSize: "14px",
  },
  paper: {
    borderRadius: 12,
    marginTop: 8,
  },
  // list: {
  //   paddingTop: 0,
  //   paddingBottom: 0,
  //   "& li": {
  //     fontWeight: 200,
  //     paddingTop: 8,
  //     paddingBottom: 8,
  //     fontSize: "12px",
  //   },
  //   "& li.Mui-selected": {
  //     color: "white",
  //     background: "#6EC177",
  //   },
  //   "& li.Mui-selected:hover": {
  //     background: "#6EC177",
  //   },
  // },
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

// ===========>
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const names = ["Redirect", "Manage", "Sip"];
const array = ["Manage"];
const permission = [
  {
    // dashboard: "Dashboard",
    // extensions: "Extensions",
    // did_tfn_number: "DID/TFN Number",
    // report: "Report",
    call_block: "Call Block",
    active_calls: "Live Calls",
    live_extension: "Live Extension",
    audit_logs: "Audit Logs",
    queue: "Queue",
    queue_member: "Queue Member",
    billing_history: "Billing History",
    recording: "Recording",
    moh: "MOH",
  },
];



const inpVal = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  role: "",
  limit: 0,
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

function User({ colorThem }) {
  const token = JSON.parse(localStorage.getItem("admin"));
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("admin"));
  const [validation, setValidation] = useState({
    userName: "",
    // lastname: "",
    email: "",
    // mobile: "",
    password: "",
    confirmPassword: "",
    status: "",
    role: "",
    service: "",
  });

  const [userActive, setUserActive] = React.useState("");
  const [roleId, setRoleId] = useState(user.user_role === "Reseller" ? 4 : "");
  const [inputValues, setInputValues] = useState(inpVal);
  const [response, setResponse] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [serviceType, setServiceType] = useState(
    user.user_role === "Reseller" ? ["Manage"] : ["Manage"]
  );
  const [service, setService] = useState([]);
  const [status, setStatus] = useState("");
  const [reseller, setReseller] = useState(
    user.user_role === "Reseller" ? user.uid : ""
  );
  const [uId, setUId] = useState(0);
  const [extension, setExtension] = useState("");
  const [attempts, setAttempts] = useState("");
  const [extensionNumber, setExtensionNumber] = useState([]);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [radioValue, setRadioValue] = useState("t");
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [address, setAddress] = useState("");
  const [value, setValue] = useState("t");

  const handleSelectionChange = (selection) => {
    setSelectedRows(selection);
  };

  const handlePermissionChange = (event) => {
    const value = event.target.value;
    setSelectedPermissions(value);
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setValidation("");
    setInputValues("");
    setUserActive("");
    setRoleId(user.user_role === "Reseller" ? 4 : "");
    setExtension("");
    setReseller("");
    setSelectedPermissions([]);
    setAddress("");
  };

  const handleAlertClose = () => setAlertMessage(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers(radioValue));
    dispatch(getRoleUsers());
  }, [radioValue, response]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };
  // ========Edit-button---->
  const [openModal, setOpenModal] = useState(false);

  const handleButtonClick = useCallback(
    (row) => {
      setInputValues({
        userName: row.username,
        email: row.email,
        role: row.role,
        limit: row.extensions_limit,
      });
      setRoleId(row?.role_id);
      setSelectedPermissions(row?.feature);
      setOpenModal(true);
      setStatus(row.status.toString());
      setUId(row.user_id);
      if (row?.service_type !== undefined && row?.service_type !== null) {
        let array = row?.service_type?.split(",");
        setService(array);
      } else {
        setService([]);
      }
      setExtension(row.extension);
      if (row.attempts <= 3) {
        setAttempts(4);
      } else {
        setAttempts(0);
      }
      setPassword(row.password);
      setReseller(row.reseller_id);
      setAddress(row.address);
    },
    [setService]
  ); // Memoize event handler

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
    setInputValues({ userName: "", email: "", role: "", limit: "" });
    setService([]);
    setStatus("");
    setUId("");
    setRoleId("");
    setExtension("");
    setShowPassword(false);
    setReseller("");
    setSelectedPermissions([]);
    setAddress("");
  }, [
    setInputValues,
    setService,
    setStatus,
    setUId,
    setRoleId,
    setExtension,
    setShowPassword,
    setReseller,
    setSelectedPermissions,
    setAddress
  ]);

  // =============Edit-btton-end--->

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
    //first Name validation
    if (!inputValues.userName) {
      errors.userName = "User name is required";
      isValid = false;
    } else {
      errors.userName = "";
    }

    if (!userActive) {
      errors.status = "Field is required";
      isValid = false;
    } else {
      errors.status = "";
    }
    if (!roleId) {
      errors.role = "Role is required";
      isValid = false;
    } else {
      errors.role = "";
    }

    if (serviceType.length === 0) {
      errors.service = "Service is required";
      isValid = false;
    } else {
      errors.service = "";
    }

    // //last Name validation
    // if (!values.lastname) {
    //   errors.lastname = "Last name is required";
    //   isValid = false;
    // } else {
    //   errors.lastname = "";
    // }

    // email validation
    // eslint-disable-next-line
    const emailCond = /^[\w.-]+@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!inputValues.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!inputValues.email.match(emailCond)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    } else {
      errors.email = "";
    }

    // //mobile number validation
    // const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    // if (!values.mobile) {
    //   errors.mobile = "mobile no. is requird";
    //   isValid = false;
    // } else if (!values.mobile.match(re)) {

    //   errors.mobile = "Number must be equal to 10 digit";
    //   isValid = false;
    // } else {
    //   errors.mobile = "";
    // }

    //password validation
    const cond1 = "/^(?=.*[a-z]).{6,20}$/";
    const cond2 = "/^(?=.*[A-Z]).{6,20}$/";
    const cond3 = "/^(?=.*[0-9]).{6,20}$/";
    const password = inputValues.password;
    if (!password) {
      errors.password = "password is required";
      isValid = false;
    } else if (password.length < 6) {
      errors.password = "Password must be longer than 6 characters";
      isValid = false;
    } else if (password.length >= 20) {
      errors.password = "Password must shorter than 20 characters";
      isValid = false;
    }
    // else if (!password.match(cond1)) {
    //   errors.password = "Password must contain at least one lowercase";
    // } else if (!password.match(cond2)) {
    //   errors.password = "Password must contain at least one capital letter";
    // } else if (!password.match(cond3)) {
    //   errors.password = "Password must contain at least a number";
    // }
    else {
      errors.password = "";
    }
    //matchPassword validation
    if (!inputValues.confirmPassword) {
      errors.confirmPassword = "Password confirmation is required";
      isValid = false;
    } else if (inputValues.confirmPassword !== inputValues.password) {
      errors.confirmPassword = "Password does not match";
      isValid = false;
    } else {
      errors.confirmPassword = "";
    }

    setValidation(errors);
    return isValid;
  }, [validation, inputValues, userActive]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const isValid = checkValidation();
      if (isValid) {
        const request = {
          username: inputValues?.userName,
          emailid: inputValues?.email,
          password: inputValues?.password,
          extensions_limit: inputValues?.limit,
          address: address,
          role_id: roleId,
          is_active: userActive,
          service_type: serviceType,
          reseller_id: reseller,
          // extension: extension
          feature: selectedPermissions,
        };
        dispatch(register(request, setOpen, setInputValues, setResponse));
      }
    },
    [
      checkValidation,
      inputValues,
      setOpen,
      setInputValues,
      setResponse,
      roleId,
      userActive,
      reseller,
      extension,
      address,
      serviceType,
      selectedPermissions,
    ]
  ); // Memoize event handler
  const handleUpdate = useCallback(
    (e) => {
      e.preventDefault();
      const request = {
        user_id: uId,
        username: inputValues?.userName,
        emailid: inputValues?.email,
        extensions_limit: JSON.parse(inputValues?.limit),
        address: address,
        role_id: roleId,
        is_active: status.charAt(0),
        service_type: service,
        extension: extension,
        attempts: attempts,
        password: password,
        reseller_id: reseller,
        feature: selectedPermissions,
      };
      dispatch(updateUser(request, setOpenModal, setResponse));
    },
    [
      inputValues,
      roleId,
      service,
      status,
      uId,
      extension,
      password,
      reseller,
      address,
      selectedPermissions,
      setOpenModal,
      setInputValues,
      setService,
      setStatus,
      setUId,
      setResponse,
    ]
  );

  const handleMessage = useCallback((data) => {
    setName(data);
    setAlertMessage(true);
  }, []); // Memoize event handler

  const handleDelete = useCallback(() => {
    dispatch(deleteUser({ username: name }, setResponse));
    setAlertMessage(false);
  }, [dispatch, name, setResponse]); // Memoize event handler

  const handleView = (data) => {
    navigate(Router.ADMIN_VIEW, { state: { data: data } });
  };

  const handleReset = () => {
    setInputValues({ userName: "", email: "", role: "", limit: "" });
    setService([]);
    setStatus("");
    setUId("");
    setRoleId("");
    setExtension("");
    setUserActive("");
  };

  const classes = useStyles();

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
    classes: {
      list: classes.list,
      paper: classes.paper,
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "center",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "center",
    },
    getContentAnchorEl: null,
  };

  // Function to determine whether a row should have the bordered style
  const isRowBordered = (params) => {
    const { row } = params;

    // Add your condition here, for example, adding border to rows where age is greater than 25
    return row.status === true;
  };

  function openPrivateWindow(url) {
    // Attempt to open a new window with private browsing features
    const newWindow = window.open(url, "_blank", "private,fullscreen=yes");
    if (newWindow) {
      newWindow.focus();
    } else {
      // If opening in private mode is not supported or blocked, fallback to regular window
      window.open(url, "_blank");
    }
  }

  const handleLogin = (data) => {
    const value = JSON.stringify({
      username: data.username,
      password: data.password,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${api.dev}/api/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: value,
    };

    axios
      .request(config)
      .then((response) => {
        const values = response?.data;
        if (values?.status === 200) {
          // if(redirect === "redirect"){
          //   navigate("/dashboard");
          // } else if(redirect === "manage") {
          //   navigate("/manage");
          // }
          // else if(redirect === "sip") {
          //   navigate("/sip");
          // }
          if (values.user_role === "Superadmin") {
            localStorage.setItem("admin", JSON.stringify(values));
            window.open("/admin_portal");
          } else if (values.user_role === "Admin") {
            localStorage.setItem("admin", JSON.stringify(values));
            window.open("/admin_portal");
          } else if (values.user_role === "Reseller") {
            localStorage.setItem("reseller", JSON.stringify(values));
            window.open("/reseller_portal");
          } else if (values.user_role !== "Superadmin" && values.user_role !== "Admin" && values.user_role !== "Reseller") {
            localStorage.setItem(
              `user_${values.user_name}`,
              JSON.stringify(values)
            );
            localStorage.setItem("current_user", values.user_name);
            window.open("/manage_portal");
          }
          dispatch(login(values));
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        });
      });
  };
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  function stringToColor(string) {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += ("00" + value.toString(16)).slice(-2);
    }
    return color;
  }

  const baseColumns = [
    //-----Login------
    {
      field: "login",
      headerName: "User Signin",
      width: 80,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            <Button
              // variant="outlined"
              sx={{
                ":hover": {
                  bgcolor: "warning.main",
                  color: "white",
                },
                padding: "2px",
                textTransform: "capitalize",
                fontSize: "14px",
                color: "warning.main",
                borderColor: "info.main",
                border: "1px solid #ed6c02",
              }}
              onClick={(e) => {
                handleLogin(params.row);
              }}
            >
              Login
            </Button>
          </div>
        );
      },
    },
    //-----Action-----
    {
      field: "action",
      headerName: "Action",
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      sortable: false,
      width: 60,
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            {/* <IconButton>
              <PlayArrow style={{ cursor: "pointer", color: "grey" }} />
            </IconButton> */}
            {user.user_role === "Reseller" ? (
              <>
                {" "}
                <IconButton onClick={() => handleButtonClick(params.row)}>
                  <Edit
                    index={params.row.id}
                    style={{ cursor: "pointer", color: "#0e397f" }}
                  />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton onClick={() => handleButtonClick(params.row)}>
                  <Edit
                    //onClick={() => handleOpen(params.row)}

                    index={params.row.id}
                    style={{ cursor: "pointer", color: "#0e397f" }}
                  />
                </IconButton>
              </>
            )}

            {/* <IconButton onClick={() => handleMessage(params?.row?.username)}>
              <Delete style={{ cursor: "pointer", color: "red" }} />
            </IconButton> */}
          </div>
        );
      },
    },
    //-----User Name----
    {
      field: "username",
      headerName: "User Name",
      width: 150,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "left",
      renderCell: (params) => {
        return (
          <div className=" user_bdr d-flex justify-content-between align-items-center">
            <Tooltip title="view" disableInteractive interactive>
              <Box
                className="user_img"
                onClick={() => handleView(params.row.user_id)}
                sx={{ cursor: "pointer" }}
              >
                {/* <img src="/img/tbl_user_icon.png" alt="user icon" /> */}
                <IconBase
                  style={{
                    fontSize: "20px",
                    color: "blue",
                    marginRight: "5px",
                  }}
                >
                  <PersonIcon />
                </IconBase>
                {params.row.username}
              </Box>
            </Tooltip>
          </div>
        );
      },
    },
    //-----No. of TFN----
    {
      field: "did_count",
      headerName: "No. of TFN",
      width: 80,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
    //-----No. of Extension-----
    {
      field: "subscriber_count",
      headerName: "No. of Extension",
      width: 110,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className=" user_bdr d-flex justify-content-between align-items-center">
            <span>{params.row.subscriber_count}/{params.row.extensions_limit}</span>
          </div>
        );
      },
    },
    //------R.Minutes-------
    {
      field: "remaining_minutes",
      headerName: "R.Minutes",
      width: 80,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
    //-----Billing Type-----
    {
      field: "billing_type",
      headerName: "Billing Type",
      width: 110,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
    //-----Reseller--------
    {
      field: "reseller_id",
      headerName: "Reseller",
      width: 100,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className=" user_bdr d-flex justify-content-between align-items-center">
            {state?.allUsers?.users?.map((name, index) => {
              if (name?.role === "Reseller") {
                return (
                  <span key={index}>
                    {name?.id === params?.row?.reseller_id ? (
                      <>{name?.username}</>
                    ) : (
                      <></>
                    )}
                  </span>
                );
              }
            })}
          </div>
        );
      },
    },

    {
      field: "email",
      headerName: "Email",
      width: 250,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className=" user_bdr d-flex justify-content-between align-items-center">
            <Tooltip  title={`Address: ${params.row.address}`} style={{fontSize: '0.875rem'}} disableInteractive interactive>
              <span>{params.row.email}</span>
            </Tooltip>
            </div>)
      }
    },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 80,
    //   headerClassName: "custom-header",
    //   headerAlign: "center",
    //   align: "center",
    //   renderCell: (params) => {
    //     return (
    //       <div className="d-flex justify-content-between align-items-center">
    //         {params.row.status === "t" ? (
    //           <>
    //             <div
    //               style={{
    //                 color: "white",
    //                 background: "green",
    //                 padding: "7px",
    //                 borderRadius: "5px",
    //                 fontSize: "12px",
    //                 textTransform: "capitalize",
    //               }}
    //             >
    //               Active
    //             </div>
    //           </>
    //         ) : (
    //           <>
    //             <div
    //               style={{
    //                 color: "white",
    //                 background: "red",
    //                 padding: "7px",
    //                 borderRadius: "5px",
    //                 fontSize: "12px",
    //                 textTransform: "capitalize",
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
    {
      field: "role",
      headerName: "Role",
      width: isXs ? 80 : 100,
      minWidth: 80,
      maxWidth: 100,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{
            fontSize: "calc(0.6rem + 0.2vw)",
            fontWeight: "bold",
            color: "white !important",
          }}
        >
          Role
        </Typography>
      ),
      renderCell: (params) => {
        const role = params.row.role;

        // Predefined colors for main roles
        const roleColors = {
          Superadmin: "F5C6CB",
          Admin: "#D6D8DB",
          Reseller: "#C3E6CB",
        };

        // If role not in predefined, generate dynamic color
        const bgColor = roleColors[role] || stringToColor(role); // Generate color for dynamic roles

        return (
          <div className="d-flex justify-content-between align-items-center">
            <div
              className="role_box"
              style={{
                color: "black",
                background: bgColor,
                padding: isMobile ? "5px" : "7px",
                borderRadius: "5px",
                fontSize: "calc(0.6rem + 0.2vw)",
                textTransform: "capitalize",
              }}
            >
              {role}
            </div>
          </div>
        );
      },
    },
    // {
    //   field: "cc",
    //   headerName: "Live Calls",
    //   width: 100,
    //   headerClassName: "custom-header",
    //   headerAlign: "center",
    //   align: "center",
    // },
    
    //-----Date------
    {
      field: "created_date",
      headerName: "Date",
      headerClassName: "custom-header",
      width: 100,
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
    //-----Extension------
    {
      field: "extension",
      headerName: "Extension",
      headerClassName: "custom-header",
      width: 100,
      headerAlign: "center",
      align: "center",
    },

    // {
    //   field: "service_type",
    //   headerName: "Services",
    //   width: 180,
    //   headerClassName: "custom-header",
    //   headerAlign: "center",
    //   align: "center",
    // },

    // {
    //   field: "documents",
    //   headerName: "Documents",
    //   headerClassName: "custom-header",
    //   headerAlign: "center",
    //   align: "center",
    //   sortable: false,
    //   width: 150,
    //   renderCell: (params) => {
    //     return (
    //       <div className="d-flex justify-content-between align-items-center">
    //         <Button
    //           className="document_btn"
    //           type="button"
    //           onClick={()=>handleView(params.row.user_id)}
    //         >
    //           View
    //         </Button>
    //       </div>
    //     );
    //   },
    // },
    {
      field: "attempts",
      headerName: "Account",
      width: 100,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            {params.row.attempts >= 3 ? (
              <>
                <div
                  style={{
                    color: "white",
                    background: "red",
                    padding: "7px",
                    borderRadius: "5px",
                    fontSize: "12px",
                    textTransform: "capitalize",
                  }}
                >
                  Locked
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    color: "white",
                    background: "green",
                    padding: "7px",
                    borderRadius: "5px",
                    fontSize: "12px",
                    textTransform: "capitalize",
                  }}
                >
                  Unlocked
                </div>
              </>
            )}
          </div>
        );
      },
    },
    
    {
      field: "status_changed_by",
      headerName: "Changed By",
      width: 180,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            {state?.roles?.users?.map((name, index) => {
              return (
                <div key={index}>
                  {name.id === params.row.status_role_id ? (
                    <>
                      <span>
                        {params.row.status_changed_by}({name.name})
                      </span>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
          </div>
        );
      },
    },
  ];

  const suspendDateColumn = {
  //-----Suspend Date-------
      field: "suspended_at",
      headerName: "Sus Date",
      width: 100,
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
              <span style={{ color: "blue" }}>
                {day}/{month}/{year}
              </span>
            </>
          );
        }
      },
  }

  const statusColumn = {
  field: "status",
  headerName: "Status",
  width: 140,
  headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
  renderCell: (params) => (
   <span
  className={`badge ${
    params.row.status === "t"
      ? "bg-success"
      : params.row.status === "f"
      ? "bg-danger"
      : params.row.status === "s"
      ? "bg-warning"
      : "bg-secondary"
  }`}
  style={{
    color: params.row.status === "s" ? "#000" : "#fff",
    padding: "7px 10px",
    borderRadius: "5px",
    fontSize: "12px",
    textTransform: "capitalize",
    fontWeight: 400,
  }}
>
  {params.row.status === "t"
    ? "Active"
    : params.row.status === "f"
    ? "Deactivated"
    : params.row.status === "s"
    ? "Suspended"
    : "Unknown"}
</span>

  ),
};

  const columns = useMemo(() => {
  if (radioValue === "") {
    // Sirf "All" par status column add karo
    return [...baseColumns, statusColumn];
  }

  if (radioValue === "s") {
    // Sirf "All" par status column add karo
    return [...baseColumns, suspendDateColumn];
  }
  return baseColumns; // baaki sab par status hide
}, [radioValue, baseColumns]);

  useEffect(() => {
    if (uId !== "") {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${api.dev}/api/getuserextensions?user_id=${uId}`,
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
  }, [uId]);

  useEffect(() => {
    // Display error toast only if an error occurred and it hasn't been displayed yet
    if (state?.allUsers?.error) {
      toast.error(state.allUsers.error, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
      });
      // Dispatch action to reset state
      dispatch({ type: ALL_USERS_RESET });
    }

    // Navigate to login page after state reset and error toast display
    if (state?.allUsers?.error && state?.allUsers?.users.length === 0) {
      //   localStorage.removeItem("theme-color");
      //   localStorage.removeItem("admin");
      //  // Immediate redirect to login page
      //  window.location.replace("/login");
    }
  }, [state?.allUsers?.error, state?.allUsers?.users.length, dispatch]);

  const rows = useMemo(() => {
    const calculatedRows = [];
    state?.allUsers?.users &&
      state?.allUsers?.users?.forEach((item, index) => {
        const createdDate = new Date(item.created_date).toISOString();
        calculatedRows.push({
          id: index + 1,
          user_id: item.id,
          email: item.email,
          service_type: item.service_type,
          name: item.name,
          phone: item.phone,
          cc: item.cc,
          role: item.role,
          role_id: item.role_id,
          status: item.is_active,
          username: item.username,
          password: item.password,
          created_date: createdDate,
          extensions_limit: item.extensions_limit,
          extension: item.extension,
          attempts: item.attempts,
          reseller_id: item.reseller_id,
          status_changed_by: item.status_changed_by,
          status_role_id: item.status_role_id,
          did_count: item.did_count,
          subscriber_count: item.subscriber_count,
          feature: item.feature,
          address: item.address,
          billing_type: item.billing_type,
          remaining_minutes: item.remaining_minutes,
          suspended_at: item?.suspended_at
        });
      });
    return calculatedRows;
  }, [state?.allUsers?.users]);

  const selectedCallerDataSet = new Set(); // Using Set to avoid duplicates

  selectedRows.forEach((id) => {
    const selectedRow = rows.find((row) => row.id === id);
    if (selectedRow) {
      selectedCallerDataSet.add(selectedRow.user_id); // Add only did_id
    }
  });

  const selectedCallerData = Array.from(selectedCallerDataSet); // Convert to comma-separated string

  const handleUpdateStatus = useCallback(() => {
    const request = {
      id: selectedCallerData,
      is_active: value,
    };
    dispatch(updateUserStaus(request, setResponse, setSelectedRows));
  }, [selectedCallerData, value, dispatch, setResponse, setSelectedRows]); // Memoize event handler

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
            <Dialog
              open={openModal}
              onClose={handleCloseModal}
              sx={{ textAlign: "center", borderRadius: "10px" }}
            >
              
             

                 <Box sx={{
                                     display: "flex",
                                     paddingTop: "10px",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}>
                                    
                                <Typography
                                  sx={{
                                    color: "#07285d",
                                    margin: "0 auto",
                                    fontSize: "20px",
                                    fontWeight: "600",
                                    width: "auto",
                                    textAlign: "center",
                                 
   
                                                                 

                                  }}
                                  className="extension_title"
                                >
                                  User Edit
                                </Typography>
                                  <IconButton
                                    className="close_icon"
                                    onClick={handleCloseModal}
                                    sx={{ float: "inline-end" }}
                                  >
                                    <Close />
                                  </IconButton>
                                  
                                </Box>
                             

                                <DialogContent sx={{pt: "0", pb: "0",}}>
               
                  <form
  style={{
    textAlign: "center",
    paddingTop: "10px",
   
    width: "100%",
  }}
>
  <Grid container spacing={1}>

    {/* USERNAME */}
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="User Name"
        name="userName"
        value={inputValues?.userName}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
    </Grid>

    {/* EMAIL */}
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Email Id"
        name="email"
        value={inputValues?.email}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MailIcon />
            </InputAdornment>
          ),
        }}
      />
    </Grid>

    {/* PASSWORD */}
    <Grid item xs={12} md={6}>
      <TextField
        fullWidth
        type={showPassword ? "text" : "password"}
        label="Change Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment
              position="start"
              sx={{ cursor: "pointer" }}
              onClick={handlePasswordVisibility}
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </InputAdornment>
          ),
        }}
      />
    </Grid>

    {/* ROLE */}
    <Grid item xs={12} md={6}>
      <FormControl fullWidth>
        <InputLabel>Role</InputLabel>
        <Select
        style={{textAlign: "left",}}
          label="Role"
          value={roleId}
          onChange={(e) => setRoleId(e.target.value)}
          disabled={user.user_role === "Reseller"}
        >
          {state?.roles?.users?.map((item, index) => (
            <MenuItem key={index} value={item?.id}>
              {item?.name.toLowerCase()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>

    {/* STATUS */}
    <Grid item xs={12} md={6}>
      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
        style={{textAlign: "left",}}
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value={"t"}>Active</MenuItem>
          <MenuItem value={"f"}>Deactive</MenuItem>
          <MenuItem value={"s"}>Suspend</MenuItem>
        </Select>
      </FormControl>
    </Grid>

    {/* LIMIT */}
    <Grid item xs={12} md={6}>
      <TextField
      
        fullWidth
        label="Extension Limit"
        name="limit"
        value={inputValues?.limit}
        onChange={handleChange}
        disabled={user.user_role === "Reseller"}
      />
    </Grid>

    {/* EXTENSION */}
    <Grid item xs={12} md={6}>
      <FormControl fullWidth>
        <InputLabel>Extension</InputLabel>
        <Select
        style={{textAlign: "left",}}
          label="Extension"
          value={extension}
          onChange={(e) => setExtension(e.target.value)}
          MenuProps={MenuProps}
        >
          {extensionNumber?.data?.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>

    {/* ACCOUNT */}
    {user.user_role !== "Reseller" && (
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel>Account</InputLabel>
          <Select
          style={{textAlign: "left",}}
            value={attempts}
            onChange={(e) => setAttempts(e.target.value)}
            input={<OutlinedInput label="Account" />}
          >
            <MenuItem value={4}>Unlocked</MenuItem>
            <MenuItem value={0}>Locked</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    )}

    {/* RESELLER */}
    {user.user_role !== "Reseller" && (
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel>Reseller</InputLabel>
          <Select
          style={{textAlign: "left",}}
            value={reseller}
            onChange={(e) => setReseller(e.target.value)}
            input={<OutlinedInput label="Reseller" />}
          >
            {state?.allUsers?.users?.map((name, index) => {
              if (name?.role === "Reseller") {
                return (
                  <MenuItem key={index} value={name?.id}>
                    {name.username}
                  </MenuItem>
                );
              }
            })}
          </Select>
        </FormControl>
      </Grid>
    )}

    {/* PERMISSION */}
    <Grid item xs={12} md={6}>
      <FormControl fullWidth>
        <InputLabel>Enable Feature</InputLabel>
        <Select
        style={{textAlign: "left",}}
          multiple
          value={selectedPermissions}
          onChange={handlePermissionChange}
          input={<OutlinedInput label="Enable Feature" />}
          renderValue={(selected) =>
            selected.map((key) => permission[0][key]).join(", ")
          }
        >
          {Object.entries(permission[0]).map(([key, value]) => (
            <MenuItem key={key} value={key}>
              <Checkbox checked={selectedPermissions.indexOf(key) > -1} />
              <ListItemText primary={value} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>

    {/* ADDRESS */}
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Address"
        multiline
        rows={1.6}
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
    </Grid>

  </Grid>
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
                    marginTop: "10px",
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
                    marginTop: "10px",
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

            {/* ========== */}

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
            {/* ========== */}
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="pills-home"
                      role="tabpanel"
                      aria-labelledby="pills-home-tab"
                    >
                      <div
                        className="cntnt_title"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "end",
                        }}
                      >
                        <div>
                          <h3>User</h3>

                          {/* <p>Add, edit, delete, and search users.</p> */}
                        </div>
                        {/*====================== Add-Button ============================ */}
                        {user.user_role === "Reseller" ? (
                          <>
                            <IconButton
                              className="all_button_clr"
                              onClick={handleOpen}
                            >
                              Add <AddOutlinedIcon />
                            </IconButton>
                          </>
                        ) : (
                          <>
                            <IconButton
                              className="all_button_clr"
                              onClick={handleOpen}
                            >
                              Add <AddOutlinedIcon />
                            </IconButton>
                          </>
                        )}

                        {/* -----   Add User Modal Start   ----- */}

                        {/* ============Start========== */}
                        <Dialog
                        className="custom_dailog_box_user"
                          open={open}
                          onClose={handleClose}
                          sx={{ textAlign: "center", borderRadius: "10px" }}
                        >                        

                               <Box sx={{
                                     display: "flex",
                                     paddingTop: "10px",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}>
                                    
                                <Typography
                                  sx={{
                                    color: "#07285d",
                                    margin: "0 auto",
                                    fontSize: "20px",
                                    fontWeight: "600",
                                    width: "auto",
                                    textAlign: "center",
                                 
   
                                                                 

                                  }}
                                  className="extension_title"
                                >
                                  Add User
                                </Typography>
                                  <IconButton
                                    className="close_icon"
                                    onClick={handleClose}
                                    sx={{ float: "inline-end" }}
                                  >
                                    <Close />
                                  </IconButton>
                                  
                                </Box>
                             

                                <DialogContent sx={{pt: "0",}}>
                           
                               <form
  style={{
    textAlign: "center",
    paddingTop: "10px",
    width: "100%",
  }}
>
  <Grid container spacing={1}>

    {/* USERNAME */}
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="User Name"
        name="userName"
        value={inputValues?.userName}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
      {validation.userName && (
        <p style={{ color: "red", textAlign: "left", margin: 0 }}>
          {validation.userName}
        </p>
      )}
    </Grid>

    {/* EMAIL */}
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Email Id"
        name="email"
        value={inputValues?.email}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MailIcon />
            </InputAdornment>
          ),
        }}
      />
      {validation.email && (
        <p style={{ color: "red", textAlign: "left", margin: 0 }}>
          {validation.email}
        </p>
      )}
    </Grid>

    {/* PASSWORD */}
    <Grid item xs={12}>
      <TextField
        fullWidth
        type="password"
        label="Password"
        name="password"
        value={inputValues?.password}
        onChange={handleChange}
      />
    </Grid>

    {/* CONFIRM PASSWORD */}
    <Grid item xs={12}>
      <TextField
        fullWidth
        type="password"
        label="Confirm Password"
        name="confirmPassword"
        value={inputValues?.confirmPassword}
        onChange={handleChange}
      />
    </Grid>

    {/* ROLE */}
    {user.user_role !== "Reseller" && (
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel>Role</InputLabel>
          <Select
          style={{textAlign: "left",}}
            label="Role"
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
          >
            {state?.roles?.users?.map((item, index) => {
              if (
                user.user_role === "Superadmin" &&
                item.name === "Superadmin"
              )
                return null;

              if (
                user.user_role === "Admin" &&
                (item.name === "Superadmin" || item.name === "Admin")
              )
                return null;

              if (
                user.user_role === "Reseller" &&
                (item.name === "Reseller" ||
                  item.name === "Superadmin" ||
                  item.name === "Admin")
              )
                return null;

              return (
                <MenuItem key={index} value={item?.id}>
                  {item?.name.toLowerCase()}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
    </Grid>
    )}

    {/* STATUS */}
    <Grid item xs={12} md={6}>
      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
        style={{textAlign: "left",}}
          label="Status"
          value={userActive}
          onChange={(e) => setUserActive(e.target.value)}
        >
          <MenuItem value={"t"}>Active</MenuItem>
          <MenuItem value={"f"}>Deactive</MenuItem>
          <MenuItem value={"s"}>Suspend</MenuItem>
        </Select>
      </FormControl>
    </Grid>

    {/* LIMIT */}
    <Grid item xs={12} md={6}>
      <TextField
        fullWidth
        label="Extension Limit"
        name="limit"
        value={inputValues?.limit}
        onChange={handleChange}
      />
    </Grid>

    {/* RESELLER */}
    {roleId === 4 && (
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Reseller</InputLabel>
          <Select
          style={{textAlign: "left",}}
            label="Reseller"
            value={reseller}
            onChange={(e) => setReseller(e.target.value)}
          >
            {state?.allUsers?.users?.map((name, index) => {
              if (name?.role === "Reseller") {
                return (
                  <MenuItem key={index} value={name?.id}>
                    {name.username}
                  </MenuItem>
                );
              }
            })}
          </Select>
        </FormControl>
      </Grid>
    )}

    {/* PERMISSIONS */}
    <Grid item xs={12} md={6}>
      <FormControl fullWidth>
        <InputLabel>Enable Feature</InputLabel>
        <Select
        style={{textAlign: "left",}}
          multiple
          value={selectedPermissions}
          onChange={handlePermissionChange}
          input={<OutlinedInput label="Enable Feature" />}
          renderValue={(selected) =>
            selected.map((key) => permission[0][key]).join(", ")
          }
        >
          {Object.entries(permission[0]).map(([key, value]) => (
            <MenuItem key={key} value={key}>
              <Checkbox checked={selectedPermissions.indexOf(key) > -1} />
              <ListItemText primary={value} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>

    {/* ADDRESS */}
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Address"
        multiline
        rows={2}
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
    </Grid>

  </Grid>
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
                              onClick={handleClose}
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
                              onClick={handleSubmit}
                            >
                              save
                            </Button>
                          </DialogActions>
                        </Dialog>
                        {/* ============End======== */}

                        {/* -----   Add User Modal End   ----- */}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <FormControl>
                    {/* <FormLabel id="demo-row-radio-buttons-group-label">Live Calls</FormLabel> */}
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={radioValue} // Bind the selected value to state
                      onChange={(e) => setRadioValue(e.target.value)} // Handle change event
                    >
                      <FormControlLabel
                        value=""
                        control={<Radio />}
                        label="All"
                      />
                      <FormControlLabel
                        value="t"
                        control={<Radio />}
                        label="Active"
                      />
                      <FormControlLabel
                        value="f"
                        control={<Radio />}
                        label="Deactivated"
                      />
                      <FormControlLabel
                        value="s"
                        control={<Radio />}
                        label="Suspended"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>

                <Grid container>
                  <Grid xs={12} sm={12} md={4}>
                    <Box sx={{ display: selectedRows[0] ? "block" : "none" }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box sx={{ flexGrow: 1, mr: 2 }}>
                          <Select
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            fullWidth
                            sx={{
                              mb: 1,
                              height: "35px", // Match button height
                            }}
                          >
                            <MenuItem value="t">Active</MenuItem>
                            <MenuItem value="f">Deactivated</MenuItem>
                            <MenuItem value="s">Suspended</MenuItem>
                            {/* <MenuItem value="r">Renewal</MenuItem>
                            <MenuItem value="n">Not Renewal</MenuItem> */}
                          </Select>
                        </Box>

                        <Box>
                          <IconButton
                            className="all_button_clr"
                            sx={{
                              position: "relative",
                              top: "-5px",
                              fontSize: "15px",
                              borderRadius: "5px",
                              color: "#fff",
                              px: 4,
                              textTransform: "capitalize",
                              height: "35px",
                              width: "90px",
                              minWidth: "90px",
                              display: "inline-flex",
                              justifyContent: "center",
                              alignItems: "center",
                              backgroundColor: "primary.main", // Add proper color
                              "&:hover": {
                                backgroundColor: "primary.dark", // Add hover effect
                              },
                            }}
                            onClick={handleUpdateStatus}
                          >
                            Submit
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>

                <ThemeProvider theme={theme}>
                  <div style={{ height: "100%", width: "100%" }}>
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      checkboxSelection
                      disableRowSelectionOnClick
                      rowSelectionModel={selectedRows}
                      onRowSelectionModelChange={handleSelectionChange}
                      components={{ Toolbar: GridToolbar }}
                      slots={{
                        toolbar: CustomToolbar,
                      }}
                      autoHeight // Automatically adjust the height to fit all rows
                    />
                  </div>
                </ThemeProvider>

                {/* </>
            )} */}
              </div>
            </div>

            {/* ========== */}
          </Box>
        </div>
      </div>
    </>
  );
}

export default User;
