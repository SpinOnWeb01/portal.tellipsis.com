import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Close, Edit } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
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
  Tooltip,
  InputAdornment,
  RadioGroup,
  FormLabel,
  Radio,
  FormControlLabel,
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
import { ALL_USERS_RESET } from "../../redux/constants/adminPortal/userConstants";
import {deleteUserReseller, getAllUsersReseller, getRoleUsersReseller, registerReseller, updateUserReseller } from "../../redux/actions/resellerPortal/resellerPortal_usersAction";

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
      <GridToolbarColumnsButton/>
      <GridToolbarDensitySelector />
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

function ResellerUser({ colorThem }) {
  const token = JSON.parse(localStorage.getItem("reseller"));
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("reseller"));
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
  const [roleId, setRoleId] = useState(user.user_role === "Reseller" ? 4 :"");
  const [inputValues, setInputValues] = useState(inpVal);
  const [response, setResponse] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [serviceType, setServiceType] = useState(user.user_role === "Reseller" ? ['Manage'] : []);
  const [service, setService] = useState([]);
  const [status, setStatus] = useState("");
  const [reseller, setReseller] = useState(user.user_role === "Reseller" ? user.uid :"");
  const [uId, setUId] = useState(0);
  const [extension, setExtension] = useState("");
  const [attempts, setAttempts] = useState("");
  const [extensionNumber, setExtensionNumber] = useState([]);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [radioValue, setRadioValue] = useState("t");

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setValidation("");
    setInputValues("");
    setUserActive("");
    setRoleId(user.user_role === "Reseller" ? 4 :"");
    setExtension("");
  };

  const handleAlertClose = () => setAlertMessage(false);

  const dispatch = useDispatch();

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
  }, [
    setInputValues,
    setService,
    setStatus,
    setUId,
    setRoleId,
    setExtension,
    setShowPassword,
    setReseller,
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
  
  useEffect(() => {
    dispatch(getAllUsersReseller(radioValue));
    dispatch(getRoleUsersReseller());
  }, [radioValue, response]);

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
    const emailCond = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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
          
          role_id: roleId,
          is_active: userActive,
          service_type: serviceType,
          reseller_id: reseller,
        };
        dispatch(registerReseller(request, setOpen, setInputValues, setResponse));
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
        role_id: roleId,
        is_active: status.charAt(0),
        service_type: service,
        extension: extension,
        attempts: attempts,
        password: password,
        reseller_id: reseller,
      };
      dispatch(updateUserReseller(request, setOpenModal, setResponse));
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
      setOpenModal,
      setInputValues,
      setService,
      setStatus,
      setUId,
      setResponse,
    ]
  );

  const handleDelete = useCallback(() => {
    dispatch(deleteUserReseller({ username: name }, setResponse));
    setAlertMessage(false);
  }, [dispatch, name, setResponse]); // Memoize event handler

  const handleView = (data) => {
    navigate(Router.RESELLER_VIEW, { state: { data: data } });
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
                    index={params.row.id}
                    style={{ cursor: "pointer", color: "#0e397f" }}
                  />
                </IconButton>
              </>
            )}
          </div>
        );
      },
    },
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
    {
      field: "did_count",
      headerName: "No. of TFN",
      width: 100,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "subscriber_count",
      headerName: "No. of Extension",
      width: 150,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "role",
      headerName: "Role",
      width: 100,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            {params.row.role === "Superadmin" ? (
              <>
                <div
                  style={{
                    color: "black",
                    background: "#F5C6CB",
                    padding: "7px",
                    borderRadius: "5px",
                    fontSize: "12px",
                    textTransform: "capitalize",
                  }}
                >
                  {params.row.role}
                </div>
              </>
            ) : (
              <></>
            )}
            {params.row.role === "Admin" ? (
              <>
                <div
                  style={{
                    color: "black",
                    background: "#D6D8DB",
                    padding: "7px",
                    borderRadius: "5px",
                    fontSize: "12px",
                    textTransform: "capitalize",
                  }}
                >
                  {params.row.role}
                </div>
              </>
            ) : (
              <></>
            )}
            {params.row.role === "Reseller" ? (
              <>
                <div
                  style={{
                    color: "black",
                    background: "#C3E6CB",
                    padding: "7px",
                    borderRadius: "5px",
                    fontSize: "12px",
                    textTransform: "capitalize",
                  }}
                >
                  {params.row.role}
                </div>
              </>
            ) : (
              <></>
            )}
            {params.row.role === "User" ? (
              <>
                <div
                  style={{
                    color: "black",
                    background: "#B8DAFF",
                    padding: "7px",
                    borderRadius: "5px",
                    fontSize: "12px",
                    textTransform: "capitalize",
                  }}
                >
                  {params.row.role}
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
      field: "extensions_limit",
      headerName: "Ext Limit",
      width: 100,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
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
    {
      field: "extension",
      headerName: "Extension",
      headerClassName: "custom-header",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            {params.row.status === "t" ? (
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
                  Active
                </div>
              </>
            ) : (
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
                  Deactive
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
    if (state?.allUsers?.error  && state?.allUsers?.users.length === 0) {
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
          did_count:item.did_count,
          subscriber_count: item.subscriber_count
        });
      });
    return calculatedRows;
  }, [state?.allUsers?.users]);

  return (
    <>
      <div className={`App ${colorThem} `} >
        <div className="contant_box" >
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
              <Box>
                <IconButton
                  onClick={handleCloseModal}
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
                sx={{ color: "#07285d", fontWeight: "600", width: "500px" }}
              >
                <Box>
                  {" "}
                  <img src="/img/mdl_icon.png" alt="user icon" />
                </Box>
                User Edit
              </DialogTitle>
              <DialogContent>
                <form>
                  {/* <SelectComponent handleClose={handleClose} /> */}
                  <Typography variant="body1">
                    <form
                      style={{
                        textAlign: "center",
                        height: "348px",
                        // overflow: "auto",
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
                        label="User Name"
                        variant="outlined"
                        name="userName"
                        value={`${inputValues?.userName}(${inputValues?.email})`}
                        onChange={handleChange}
                        disabled
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccountCircle />
                            </InputAdornment>
                          ),
                        }}
                      />

                      <br />
                      <TextField
                        style={{
                          width: "100%",
                          margin: " 5px 0 5px 0",
                        }}
                        type="text"
                        label="Email Id"
                        variant="outlined"
                        name="email"
                        value={inputValues?.email}
                        onChange={handleChange}
                        disabled
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <MailIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <br />

                      <TextField
                        style={{
                          width: "100%",
                          margin: " 5px 0 5px 0",
                        }}
                        type={showPassword ? "text" : "password"}
                        label="Change Password"
                        variant="outlined"
                        name="password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              sx={{ cursor: "pointer" }}
                              onClick={handlePasswordVisibility}
                            >
                              {showPassword ? (
                                <VisibilityIcon />
                              ) : (
                                <VisibilityOffIcon />
                              )}
                            </InputAdornment>
                          ),
                        }}
                      />

                      {user.user_role === "Reseller" ? (
                        <>
                          <FormControl
                            fullWidth
                            style={{ width: "100%", margin: "7px 0" }}
                          >
                            <InputLabel id="demo-simple-select-label">
                              Role
                            </InputLabel>

                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              label="Role"
                              style={{ textAlign: "left" }}
                              defaultValue={roleId}
                              onChange={(e) => {
                                setRoleId(e.target.value);
                              }}
                              disabled={true}
                            >
                              {state?.roles?.users?.map((item, index) => {
                                return (
                                  <MenuItem key={index} value={item?.id}>
                                    <label
                                      style={{
                                        margin: "0px",
                                        padding: "0px",
                                        textTransform: "capitalize",
                                      }}
                                    >
                                      {item?.name.toString().toLowerCase()}
                                    </label>
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </>
                      ) : (
                        <>
                          <FormControl
                            fullWidth
                            style={{ width: "100%", margin: "7px 0" }}
                          >
                            <InputLabel id="demo-simple-select-label">
                              Role
                            </InputLabel>

                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              label="Role"
                              style={{ textAlign: "left" }}
                              defaultValue={roleId}
                              onChange={(e) => {
                                setRoleId(e.target.value);
                              }}
                            >
                              {state?.roles?.users?.map((item, index) => {
                                return (
                                  <MenuItem key={index} value={item?.id}>
                                    <label
                                      style={{
                                        margin: "0px",
                                        padding: "0px",
                                        textTransform: "capitalize",
                                      }}
                                    >
                                      {item?.name.toString().toLowerCase()}
                                    </label>
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </>
                      )}

                      {/* <TextField
                        style={{
                          width: "100%",
                          margin: " 5px 0 5px 0",
                        }}
                        type="text"
                        label="Role"
                        name="role"
                        value={inputValues?.role}
                        onChange={handleChange}
                      /> */}

                      {/* <FormControl
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
                          multiple
                          fullWidth
                          value={service}
                          onChange={(e) => {
                            setService(e.target.value);
                          }}
                          input={<OutlinedInput label="Services" />}
                          renderValue={(selected) => selected.join(", ")}
                          MenuProps={MenuProps}
                        >
                          {array?.map((name) => (
                            <MenuItem key={name} value={name}>
                              <Checkbox checked={service?.indexOf(name) > -1} />

                              <ListItemText primary={name} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl> */}
                      <br />

                      {/* <FormControl
                        fullWidth
                        style={{ width: "100%", margin: "7px 0" }}
                      >
                        <InputLabel id="demo-simple-select-label">
                          Status
                        </InputLabel>

                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Status"
                          style={{ textAlign: "left" }}
                          value={status}
                          onChange={(e) => {
                            setStatus(e.target.value);
                          }}
                        >
                          
                          <MenuItem value={"t"}>Active</MenuItem>
                          <MenuItem value={"f"}>Deactive</MenuItem>
                          <MenuItem value={"s"}>Suspend</MenuItem>
                          
                        </Select>
                      </FormControl>
                      <br /> */}
                   
                        <TextField
                        style={{
                          width: "100%",
                          margin: " 5px 0 5px 0",
                        }}
                        type="text"
                        label="Extension Limit"
                        variant="outlined"
                        name="limit"
                        value={inputValues?.limit}
                        onChange={handleChange}
                      />
                      <br />

                      <FormControl
                        style={{
                          width: "100%",
                          margin: " 5px 0 5px 0",
                        }}
                      >
                        <InputLabel id="demo-multiple-checkbox-label">
                          Extension
                        </InputLabel>
                        <Select
                          style={{ textAlign: "left" }}
                          labelId="demo-multiple-checkbox-label"
                          label="Extension"
                          id="demo-multiple-checkbox"
                          value={extension}
                          onChange={(e) => {
                            setExtension(e.target.value);
                          }}
                          // input={
                          //   <OutlinedInput label="Extension" />
                          // }
                          // renderValue={(selected) =>
                          //   selected.join(", ")
                          // }
                          MenuProps={MenuProps}
                        >
                          {extensionNumber?.data?.map((name) => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <br />
                      {user.user_role === "Reseller" ? (<></>) : (<>  <FormControl
                        style={{
                          width: "100%",
                          margin: " 5px 0 5px 0",
                        }}
                      >
                        <InputLabel id="demo-multiple-checkbox-label">
                          Account
                        </InputLabel>
                        <Select
                          style={{ textAlign: "left" }}
                          labelId="demo-multiple-checkbox-label"
                          label="Extension"
                          id="demo-multiple-checkbox"
                          value={attempts}
                          onChange={(e) => {
                            setAttempts(e.target.value);
                          }}
                          // input={
                          //   <OutlinedInput label="Extension" />
                          // }
                          // renderValue={(selected) =>
                          //   selected.join(", ")
                          // }
                          MenuProps={MenuProps}
                        >
                          <MenuItem value={4}>Unlocked</MenuItem>
                          <MenuItem value={0}>Locked</MenuItem>
                        </Select>
                      </FormControl></>)}
                      <br />
                      {user.user_role === "Reseller" ? (<></>) : (<><FormControl
                        style={{
                          width: "100%",
                          margin: " 5px 0 5px 0",
                        }}
                      >
                        <InputLabel id="demo-multiple-checkbox-label">
                          Reseller
                        </InputLabel>
                        <Select
                          style={{ textAlign: "left" }}
                          labelId="demo-multiple-checkbox-label"
                          label="Reseller"
                          id="demo-multiple-checkbox"
                          fullWidth
                          value={reseller}
                          onChange={(e) => {
                            setReseller(e.target.value);
                          }}
                          // input={
                          //   <OutlinedInput label="Reseller" />
                          // }
                          // renderValue={(selected) =>
                          //   selected.join(", ")
                          // }
                          // MenuProps={MenuProps}
                        >
                          {state?.allUsers?.users?.map((name, index) => {
                            if (name?.role === "Reseller") {
                              return (
                                <MenuItem key={index} value={name?.id}>
                                  {name.username}
                                </MenuItem>
                              );
                            }
                            // {name?.role === "Reseller" ? (
                            //   <MenuItem key={index} value={name.username}>
                            //   {name.username}
                            //  </MenuItem>
                            // ) : (<></>)}
                          })}
                        </Select>
                      </FormControl></>)}
                      
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
                              borderRadius={"10px"}
                              textAlign={"center"}
                            >
                              <IconButton
                                onClick={handleClose}
                                sx={{ float: "inline-end" }}
                              >
                                <Close />
                              </IconButton>
                              <br />
                              <br />
                              <img src="/img/mdl_icon.png" alt="user icon" />
                              <Typography
                                id="transition-modal-title"
                                variant="h6"
                                component="h2"
                                color={"#092b5f"}
                                fontSize={"18px"}
                                fontWeight={"600"}
                              >
                                Add User
                              </Typography>
                              <Typography
                                id="transition-modal-description"
                                sx={{ mt: 2 }}
                                fontSize={"16px"}
                                color={"#000"}
                                paddingBottom={"10px"}
                              ></Typography>

                              <form>
                                {/* <SelectComponent handleClose={handleClose} /> */}
                                <Typography variant="body1">
                                  <form
                                    style={{
                                      textAlign: "center",
                                      height: "348px",
                                      overflow: "auto",
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
                                      label="User Name"
                                      variant="outlined"
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
                                      <p
                                        className="mb-0"
                                        style={{
                                          color: "red",
                                          textAlign: "left",
                                        }}
                                      >
                                        {validation.userName}
                                      </p>
                                    )}
                                    <br />
                                    <TextField
                                      style={{
                                        width: "100%",
                                        margin: " 5px 0 5px 0",
                                      }}
                                      type="text"
                                      label="Email Id"
                                      variant="outlined"
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
                                      <p
                                        className="mb-0"
                                        style={{
                                          color: "red",
                                          textAlign: "left",
                                        }}
                                      >
                                        {validation.email}
                                      </p>
                                    )}
                                    <br />
                                    <TextField
                                      style={{
                                        width: "100%",
                                        margin: " 5px 0 5px 0",
                                      }}
                                      type="password"
                                      label="Password"
                                      variant="outlined"
                                      name="password"
                                      value={inputValues?.password}
                                      onChange={handleChange}
                                    />
                                    {validation.password && (
                                      <p
                                        className="mb-0"
                                        style={{
                                          color: "red",
                                          textAlign: "left",
                                        }}
                                      >
                                        {validation.password}
                                      </p>
                                    )}
                                    <br />

                                    <TextField
                                      style={{
                                        width: "100%",
                                        margin: " 5px 0 5px 0",
                                      }}
                                      type="password"
                                      label="Confirm Password"
                                      variant="outlined"
                                      name="confirmPassword"
                                      value={inputValues?.confirmPassword}
                                      onChange={handleChange}
                                    />
                                    {validation.confirmPassword && (
                                      <p
                                        className="mb-0"
                                        style={{
                                          color: "red",
                                          textAlign: "left",
                                        }}
                                      >
                                        {validation.confirmPassword}
                                      </p>
                                    )}
                                    <br />
                                    {user.user_role === "Reseller" ?(<></>):(<>
                                      <FormControl
                                      fullWidth
                                      style={{ width: "100%", margin: "7px 0" }}
                                    >
                                      <InputLabel id="demo-simple-select-label">
                                        Role
                                      </InputLabel>

                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Role"
                                        style={{ textAlign: "left" }}
                                        value={roleId}
                                        onChange={(e) => {
                                          setRoleId(e.target.value);
                                        }}
                                        required
                                      >
                                        {state?.roles?.users?.map(
                                          (item, index) => {
                                            // Filter out "Superadmin" role if the logged-in user is also a "Superadmin"
                                            if (
                                              user.user_role === "Superadmin" &&
                                              item.name === "Superadmin"
                                            ) {
                                              return null; // Skip rendering this MenuItem
                                            } else if (
                                              user.user_role === "Admin" &&
                                              (item.name === "Superadmin" ||
                                                item.name === "Admin")
                                            ) {
                                              return null;
                                            } else if (
                                              user.user_role === "Reseller" &&
                                              (item.name === "Reseller" ||
                                                item.name === "Superadmin" ||
                                                item.name === "Admin")
                                            ) {
                                              return null;
                                            } else {
                                              // Render other roles
                                              return (
                                                <MenuItem
                                                  key={index}
                                                  value={item?.id}
                                                >
                                                  <label
                                                    style={{
                                                      margin: "0px",
                                                      padding: "0px",
                                                      textTransform:
                                                        "capitalize",
                                                    }}
                                                  >
                                                    {item?.name
                                                      .toString()
                                                      .toLowerCase()}
                                                  </label>
                                                </MenuItem>
                                              );
                                            }
                                          }
                                        )}
                                      </Select>
                                    </FormControl>

                                    {validation.role && (
                                      <p
                                        className="mb-0"
                                        style={{
                                          color: "red",
                                          textAlign: "left",
                                        }}
                                      >
                                        {validation.role}
                                      </p>
                                    )}

                                    <br /></>)}

                                  

                                    <FormControl
                                      fullWidth
                                      style={{ width: "100%", margin: "7px 0" }}
                                    >
                                      <InputLabel id="demo-simple-select-label">
                                        Status
                                      </InputLabel>

                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Status"
                                        style={{ textAlign: "left" }}
                                        value={userActive}
                                        onChange={(e) => {
                                          setUserActive(e.target.value);
                                        }}
                                      >
                                        <MenuItem value={"t"}>Active</MenuItem>
                                        <MenuItem value={"f"}>
                                          Deactive
                                        </MenuItem>
                                        <MenuItem value={"s"}>
                                        Suspend
                                        </MenuItem>
                                      </Select>
                                    </FormControl>
                                    {validation.status && (
                                      <p
                                        className="mb-0"
                                        style={{
                                          color: "red",
                                          textAlign: "left",
                                        }}
                                      >
                                        {validation.status}
                                      </p>
                                    )}
                                    <br />
                                    {user.user_role === "Reseller" ?(<></>):(<>
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
                                        multiple
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
                                    {validation.service && (
                                      <p
                                        className="mb-0"
                                        style={{
                                          color: "red",
                                          textAlign: "left",
                                        }}
                                      >
                                        {validation.service}
                                      </p>
                                    )}
                                    <br />
                                    </>)}
                                    <TextField
                                      style={{
                                        width: "100%",
                                        margin: " 5px 0 5px 0",
                                      }}
                                      type="text"
                                      label="Extension Limit"
                                      variant="outlined"
                                      name="limit"
                                      value={inputValues?.limit}
                                      onChange={handleChange}
                                    />
                                    <br />
                                    {user.user_role === "Reseller" ?(<></>):(<>
                                    {roleId === 4 ? (
                                      <>
                                        <FormControl
                                          style={{
                                            width: "100%",
                                            margin: " 5px 0 5px 0",
                                          }}
                                        >
                                          <InputLabel id="demo-multiple-checkbox-label">
                                            Reseller
                                          </InputLabel>
                                          <Select
                                            style={{ textAlign: "left" }}
                                            labelId="demo-multiple-checkbox-label"
                                            label="Reseller"
                                            id="demo-multiple-checkbox"
                                            fullWidth
                                            value={reseller}
                                            onChange={(e) => {
                                              setReseller(e.target.value);
                                            }}
                                            // input={
                                            //   <OutlinedInput label="Reseller" />
                                            // }
                                            // renderValue={(selected) =>
                                            //   selected.join(", ")
                                            // }
                                            // MenuProps={MenuProps}
                                          >
                                            {state?.allUsers?.users?.map(
                                              (name, index) => {
                                                if (name?.role === "Reseller") {
                                                  return (
                                                    <MenuItem
                                                      key={index}
                                                      value={name?.id}
                                                    >
                                                      {name.username}
                                                    </MenuItem>
                                                  );
                                                }
                                                // {name?.role === "Reseller" ? (
                                                //   <MenuItem key={index} value={name.username}>
                                                //   {name.username}
                                                //  </MenuItem>
                                                // ) : (<></>)}
                                              }
                                            )}
                                          </Select>
                                        </FormControl>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                    </>)}

                                    <br />

                                    {/* <TextField
                        style={{
                          width: "100%",
                          margin: " 5px 0 5px 0",
                        }}
                        type="text"
                        label="Extension"
                        variant="outlined"
                        name="extension"
                        value={extension}
                        onChange={(e)=>setExtension(e.target.value)}
                      />
                      <br /> */}
                                  </form>
                                </Typography>

                                <DialogActions
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    // paddingBottom: "20px",
                                  }}
                                >
                                  <Button
                                    variant="contained"
                                    //className="all_button_clr"
                                    color="primary"
                                    sx={{
                                      fontSize: "16px !impotant",
                                      background:
                                        "linear-gradient(180deg, #0E397F 0%, #001E50 100%) !important",
                                      // marginTop: "20px",
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

                                      marginLeft: "10px !important",
                                      padding: "10px 20px !important",
                                      textTransform: "capitalize !important",
                                    }}
                                    onClick={handleSubmit}
                                  >
                                    save
                                  </Button>
                                </DialogActions>
                              </form>
                            </Box>
                          </Fade>
                        </Modal>

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
       onChange={(e)=>setRadioValue(e.target.value)} // Handle change event
      >
         <FormControlLabel value="" control={<Radio />} label="All" />
        <FormControlLabel value="t" control={<Radio />} label="Active" />
        <FormControlLabel value="f" control={<Radio />} label="Deactivated" />
        <FormControlLabel value="s" control={<Radio />} label="Suspended" />
      </RadioGroup>
    </FormControl>
</div>
                {/* <div className="radio_box">
                <RadioGroup name="use-radio-group" defaultValue="first">
      <MyFormControlLabel value="first" label="First" control={<Radio />} />
      <MyFormControlLabel value="second" label="Second" control={<Radio />} />
    </RadioGroup>
                </div> */}
                {/* {state?.allUsers?.loading === true ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "90%",
                    marginTop: "9rem !important",
                  }}
                >
                  <CircularProgress />
                </Box>
              </>
            ) : (
              <> */}
                <ThemeProvider theme={theme}>
                <div style={{ height: '100%', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          // getRowClassName={(params) =>
          //   isRowBordered(params) ? 'borderedGreen' : 'borderedRed'
          // }
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

export default ResellerUser;
