import { Close, Delete, Edit, Label } from "@mui/icons-material";
import {
  Box,
  Button,
  Fade,
  FormControl,
  IconButton,
  InputLabel,
  Modal,
  MenuItem,
  Select,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  DialogContentText,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import DeleteIcon from "@mui/icons-material/Delete";
import Backdrop from "@mui/material/Backdrop";
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
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import InfoIcon from "@mui/icons-material/Info";
import {
  getExtension,
  createExtension,
  updateExtension,
  deleteAdminExtension,
} from "../../redux/actions/adminPortal/extensionAction";
import { makeStyles } from "@mui/styles";
import "../../Switcher.scss";
import { getAllUsers } from "../../redux/actions/adminPortal/userAction";
import { api } from "../../mockData";
import axios from "axios";

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
  //    tooltip: {
  //     "&:hover": {
  //       backgroundColor: "red",
  //       color: "white",
  //     },
  //    backgroundColor: "blue",
  // },
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
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function AdminExtension({ colorThem }) {
  const state = useSelector((state) => state);
  const token = JSON.parse(localStorage.getItem("admin"));
  const dispatch = useDispatch();
  const classes = useStyles();
  const [extensionNumber, setExtensionNumber] = useState("");
  const [outgoing, setOutgoing] = useState("t");
  const [extensionLimit, setExtensionLimit] = useState("");
  const [extensionId, setExtensionId] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [response, setResponse] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [numExtensions, setNumExtensions] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [callerId, setCallerId] = useState("");
  const [calllerIdNumbers, setCallerIdNumbers] = useState([]);
  const [showPasswordMap, setShowPasswordMap] = useState({});
  const [alertMessage, setAlertMessage] = useState(false);
  const [name, setName] = useState("");

  const [error, setError] = useState("");
  const [borderColor, setBorderColor] = useState("");
  const [radioValue, setRadioValue] = useState("");
  const [validation, setValidation] = useState({
    extensionNumber: "",
    userName: "",
  });

  const handleAlertClose = () => {
    setExtensionId("");
    setAlertMessage(false);
  };

  const handleShowPassword = (rowId) => {
    setShowPasswordMap((prevMap) => ({
      ...prevMap,
      [rowId]: !prevMap[rowId],
    }));
  };
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setExtensionNumber("");
    setPassword("");
    setUserId("");
    setNumExtensions("");
    setValidation({ extensionNumber: "", userName: "" });
    setOutgoing("t");
  };

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
    setExtensionNumber("");
    setExtensionLimit("");
    setPassword("");
    setUserId("");
    setNumExtensions("");
    setStatus("");
    setOutgoing("t");
  }, []);

  const handleButtonClick = useCallback((row) => {
    setOpenModal(true);
    setExtensionNumber(row.extension);
    setExtensionLimit(row.extensions_limit);
    setPassword(row.password);
    setUserId(row.user_id);
    setExtensionId(row.extension_id);
    setCallerId(row.callerid);
    setStatus(row.active);
    setDescription(row.description);
    setOutgoing(row.outgoing === true ? "t" : "f");
    setError(""); // Reset error when switching users
    setBorderColor(""); // Reset border color when switching users
  }, []); // Memoize event handler

  const checkValidation = useCallback(() => {
    let errors = { ...validation };
    let isValid = true;

    if (!extensionNumber) {
      errors.extensionNumber = "Field is required";
      isValid = false;
    } else {
      errors.extensionNumber = "";
    }

    if (!userId) {
      errors.userName = "Field is required";
      isValid = false;
    } else {
      errors.userName = "";
    }

    setValidation(errors);
    return isValid;
  }, [validation, extensionNumber, userId]);

  const validatePassword = (password) => {
    const lengthValid = password.length >= 14;
    const specialCharValid = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasAlphabet = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const noWhitespace = !/\s/.test(password); // Check for spaces

    if (!hasAlphabet) {
      setError("Password must include at least one letter (A-Z, a-z)");
      setBorderColor("red");
    } else if (!hasNumber) {
      setError("Password must include at least one number (0-9)");
      setBorderColor("red");
    } else if (!specialCharValid) {
      setError(
        "Password must include at least one special character(!@#$%^&*)",
      );
      setBorderColor("red");
    } else if (!noWhitespace) {
      setError("Password cannot contain spaces");
      setBorderColor("red");
    } else if (!lengthValid) {
      setError("Password must be at least 14 characters long");
      setBorderColor("red");
    } else {
      setError("");
      setBorderColor(""); // Reset to normal when valid
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = checkValidation();
    if (isValid) {
      let data = JSON.stringify({
        num_extensions: extensionNumber,
        user_id: userId,
        description: description,
        outbound: outgoing,
      });

      dispatch(createExtension(data, handleClose, setResponse));
    }
  };

  const handleUpdate = useCallback(
    (e) => {
      e.preventDefault();
      if (error === "") {
        let data = JSON.stringify({
          extension_id: extensionId,
          extension: extensionNumber,
          password: password,
          user_id: userId,
          active: status,
          description: description,
          caller_id: callerId,
          outbound: outgoing,
        });
        dispatch(updateExtension(data, handleCloseModal, setResponse));
      }
    },
    [
      extensionId,
      password,
      extensionNumber,
      userId,
      status,
      description,
      callerId,
      outgoing,
      handleCloseModal,
      setResponse,
    ],
  );
  const handleMessage = useCallback(
    (data) => {
      setName(data?.extension);
      setExtensionId(data?.extension_id);
      setAlertMessage(true);
    },
    [setName],
  ); // Memoize event handler

  const handleDelete = useCallback(
    (id) => {
      dispatch(
        deleteAdminExtension(
          { extension_id: extensionId },
          setResponse,
          setExtensionId,
        ),
      );
      setAlertMessage(false);
    },
    [extensionId, dispatch, setResponse, setExtensionId],
  ); // Memoize event handler

  useEffect(() => {
    dispatch(getExtension(radioValue));
    dispatch(getAllUsers("t"));
  }, [radioValue, response]);

  useEffect(() => {
    if (userId !== "") {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${api.dev}/api/get_user_did?user_id=${userId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token} `,
        },
      };
      axios
        .request(config)
        .then((response) => {
          setCallerIdNumbers(response?.data);
        })
        .catch((error) => {});
    }
  }, [userId]);

  const columns = [
    {
      field: "action",
      headerName: "Action",
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      sortable: false,
      width: 150,
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            <Tooltip title="Edit">
              <IconButton onClick={() => handleButtonClick(params.row)}>
                <Edit
                  index={params.row.id}
                  style={{ cursor: "pointer", color: "#0e397f" }}
                />
              </IconButton>
            </Tooltip>
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
      field: "extension",
      headerName: "Extension",
      headerClassName: "custom-header",
      headerAlign: "center",
      width: 150,
      align: "center",
    },

    {
      field: "password",
      headerName: "Password",
      headerClassName: "custom-header",
      headerAlign: "center",
      width: 200,
      align: "center",
      renderCell: (params) => (
        <>
          <input
            className="dark-mode-color"
            type={showPasswordMap[params.id] ? "text" : "password"}
            value={params.row.password}
            readOnly
            style={{ border: "none", width: "100%", color: "#000 !important" }}
          />
          <IconButton
            edge="end"
            onClick={() => handleShowPassword(params.id)}
            style={{ fontSize: "20px" }}
          >
            {token.user_role === "Reseller" ? (
              <></>
            ) : (
              <>{showPasswordMap[params.id] ? <FaEye /> : <FaEyeSlash />}</>
            )}
          </IconButton>
        </>
      ),
    },
    {
      field: "username",
      headerName: "UserName",
      headerClassName: "custom-header",
      headerAlign: "center",
      width: 150,
      align: "center",
    },
    {
      field: "callerid",
      headerName: "Caller ID",
      headerClassName: "custom-header",
      headerAlign: "center",
      width: 200,
      align: "center",
    },
    {
      field: "outgoing",
      headerName: "Outbound",
      headerClassName: "custom-header",
      headerAlign: "center",
      width: 150,
      align: "center",
      renderCell: (params) => {
        return (
          <>
            <span>
              {params.row.outgoing === true ? (
                <div style={{ color: "green" }}>Yes</div>
              ) : (
                <div style={{ color: "red" }}>No</div>
              )}
            </span>
          </>
        );
      },
    },
    {
      field: "description",
      headerName: "Description",
      headerClassName: "custom-header",
      headerAlign: "center",
      width: 150,
      align: "center",
    },
    {
      field: "active",
      headerName: "Status",
      width: 150,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            {params.row.active === true ? (
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
  ];

  const rows = useMemo(() => {
    const calculatedRows = [];
    state?.allExtension?.allextension &&
      state?.allExtension?.allextension?.forEach((item, index) => {
        calculatedRows.push({
          id: index + 1,
          extension: item?.extension,
          password: item?.password,
          username: item?.username,
          user_id: item?.user_id,
          extension_id: item?.id,
          callerid: item?.callerid,
          active: item?.active,
          extensions_limit: item.extensions_limit,
          description: item.description,
          outgoing: item.outbound,
        });
      });
    return calculatedRows;
  }, [state?.allExtension?.allextension]);

  const num = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];

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
                              <h3>Extension</h3>
                              {/* <p>
                              Use this to configure your SIP extensions.
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
                              <Fade in={open} className="bg_imagess pt-4">
                                <Box
                                  sx={style}
                                  borderRadius="10px"
                                  textAlign="center"
                                >
                                  <IconButton
                                    className="close_icon pt-0"
                                    onClick={handleClose}
                                    sx={{ float: "inline-end" }}
                                  >
                                    <Close />
                                  </IconButton>

                                  <Typography
                                    id="transition-modal-title"
                                    variant="h6"
                                    component="h2"
                                    color={"#092b5f"}
                                    fontSize={"18px"}
                                    fontWeight={"600"}
                                    marginBottom={"16px"}
                                  >
                                    Add Extension
                                  </Typography>
                                  <form
                                    style={{
                                      textAlign: "center",
                                      textAlign: "center",
                                      // height: "400px",
                                      height: "auto",
                                      overflow: "auto",
                                      paddingTop: "10px",
                                      padding: "5px",
                                    }}
                                  >
                                    <FormControl
                                      fullWidth
                                      style={{ width: "100%", margin: "7px 0" }}
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
                                        required
                                      >
                                        {state?.allUsers?.users
                                          ?.filter(
                                            (item) =>
                                              item.role !== "Superadmin" &&
                                              item.role !== "Admin",
                                          )
                                          ?.map((item, index) => {
                                            return (
                                              <MenuItem
                                                key={index}
                                                value={item?.id}
                                              >
                                                {item.username}
                                              </MenuItem>
                                            );
                                          })}
                                      </Select>
                                    </FormControl>
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
                                      label="Number of extensions"
                                      variant="outlined"
                                      padding={"0px 0 !important"}
                                      name="extensionNumber"
                                      value={extensionNumber}
                                      onChange={(e) => {
                                        const numericValue =
                                          e.target.value.replace(/[^0-9]/g, "");
                                        setExtensionNumber(numericValue);
                                      }}
                                      inputProps={{
                                        inputMode: "numeric",
                                        // pattern: '[0-9]*',
                                      }}
                                    />
                                    {validation.extensionNumber && (
                                      <p
                                        className="mb-0"
                                        style={{
                                          color: "red",
                                          textAlign: "left",
                                        }}
                                      >
                                        {validation.extensionNumber}
                                      </p>
                                    )}
                                    {/* <Typography style={{display:'flex', justifyContent:'space-between', alignItems: 'center'}}>
<FormControl fullWidth style={{ width: "100%", margin:"7px 0" }}>
       <InputLabel id="demo-simple-select-label">Range</InputLabel>
       <Select
         labelId="demo-simple-select-label"
         id="demo-simple-select"
         label="Range"
         style={{textAlign:'left'}}
         value={numExtensions}
         onChange={(e)=>{setNumExtensions(e.target.value)}}
       >
        {num.map((item, index)=>{

return <MenuItem key={index} value={item}>{item}</MenuItem>
        })}
       </Select>
     </FormControl> 
     
   
   </Typography> */}

                                    <InputLabel
                                      style={{
                                        textAlign: "left",
                                        fontSize: "12px",
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <Tooltip
                                        style={{ color: "#fff" }}
                                        title="By choosing a username, the available extensions continue to expand."
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
                                      By choosing a username, the available
                                      extensions continue to expand.
                                    </InputLabel>

                                    <TextField
                                      style={{
                                        width: "100%",
                                        margin: " 5px 0 5px 0",
                                      }}
                                      type="text"
                                      label="Description"
                                      variant="outlined"
                                      padding={"0px 0 !important"}
                                      name="description"
                                      value={description}
                                      onChange={(e) => {
                                        setDescription(e.target.value);
                                      }}
                                    />

                                    <br />

                                    <FormControl
                                      fullWidth
                                      style={{ width: "100%", margin: "7px 0" }}
                                    >
                                      <InputLabel id="demo-simple-select-label">
                                        Outbound
                                      </InputLabel>

                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Outbound"
                                        style={{ textAlign: "left" }}
                                        value={outgoing}
                                        onChange={(e) => {
                                          setOutgoing(e.target.value);
                                        }}
                                        required
                                      >
                                        <MenuItem value={"t"}>Yes</MenuItem>
                                        <MenuItem value={"f"}>No</MenuItem>
                                      </Select>
                                    </FormControl>

                                    {/* <TextField
                                      style={{
                                        width: "100%",
                                        margin: " 5px 0 5px 0",
                                      }}
                                      type="text"
                                      label="Caller Id"
                                      variant="outlined"
                                      padding={"0px 0 !important"}
                                      name="password"
                                      value={callerId}
                                      onChange={(e) => {
                                        setCallerId(e.target.value);
                                      }}
                                    />

                                    <br /> */}

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

                          {/* edit-modal */}
                          <Dialog
                            open={openModal}
                            onClose={handleCloseModal}
                            sx={{ textAlign: "center" }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                paddingTop: "10px",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
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
                                Edit
                              </Typography>
                              <IconButton
                                className="close_icon"
                                onClick={handleCloseModal}
                                sx={{ float: "inline-end" }}
                              >
                                <Close />
                              </IconButton>
                            </Box>

                            <DialogContent sx={{ pt: "0" }}>
                              <form>
                                {/* <SelectComponent handleClose={handleClose} /> */}
                                <Typography variant="body1">
                                  {/* <br /> */}
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
                                    <FormControl
                                      fullWidth
                                      style={{ width: "100%", margin: "7px 0" }}
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
                                        required
                                      >
                                        {state?.allUsers?.users
                                          ?.filter(
                                            (item) =>
                                              item.role !== "Superadmin" &&
                                              item.role !== "Admin",
                                          )
                                          ?.map((item, index) => {
                                            return (
                                              <MenuItem
                                                key={index}
                                                value={item?.id}
                                              >
                                                {item.username}
                                              </MenuItem>
                                            );
                                          })}
                                      </Select>
                                    </FormControl>
                                    <TextField
                                      style={{
                                        width: "100%",
                                        margin: "5px 0 5px 0",
                                      }}
                                      type="text"
                                      label="Password"
                                      variant="outlined"
                                      name="password"
                                      value={password}
                                      onChange={(e) => {
                                        const value = e.target.value;
                                        setPassword(value);
                                        validatePassword(value);
                                      }}
                                      error={!!error}
                                      helperText={error}
                                      InputProps={{
                                        style: {
                                          borderColor: borderColor,
                                        },
                                      }}
                                    />

                                    <br />

                                    <TextField
                                      style={{
                                        width: "100%",
                                        margin: " 5px 0 5px 0",
                                      }}
                                      type="text"
                                      label="Extension"
                                      variant="outlined"
                                      name="userName"
                                      value={extensionNumber}
                                      onChange={(e) =>
                                        setExtensionNumber(e.target.value)
                                      }
                                    />
                                    <br />
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
                                        value={status}
                                        onChange={(e) => {
                                          setStatus(e.target.value);
                                        }}
                                        required
                                      >
                                        <MenuItem value={"true"}>
                                          Enable
                                        </MenuItem>
                                        <MenuItem value={"false"}>
                                          Disable
                                        </MenuItem>
                                      </Select>
                                    </FormControl>

                                    {/* <TextField
                                      style={{
                                        width: "100%",
                                        margin: " 5px 0 5px 0",
                                      }}
                                      type="text"
                                      label="Extension Limit"
                                      variant="outlined"
                                      value={extensionLimit}
                                      onChange={(e) =>
                                        setExtensionLimit(e.target.value)
                                      }
                                      disabled
                                    />
                                     <br /> */}

                                    <FormControl
                                      fullWidth
                                      style={{ margin: " 5px 0 5px 0" }}
                                    >
                                      <InputLabel id="demo-simple-select-label">
                                        Caller Id
                                      </InputLabel>

                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Caller Id"
                                        style={{ textAlign: "left" }}
                                        value={callerId}
                                        onChange={(e) => {
                                          setCallerId(e.target.value);
                                        }}
                                        required
                                      >
                                        {calllerIdNumbers?.data?.map(
                                          (item, index) => {
                                            return (
                                              <MenuItem
                                                key={index}
                                                value={item}
                                              >
                                                {item}
                                              </MenuItem>
                                            );
                                          },
                                        )}
                                      </Select>
                                    </FormControl>

                                    <TextField
                                      style={{
                                        width: "100%",
                                        margin: " 5px 0 5px 0",
                                      }}
                                      type="text"
                                      label="Description"
                                      variant="outlined"
                                      padding={"0px 0 !important"}
                                      name="description"
                                      value={description}
                                      onChange={(e) => {
                                        setDescription(e.target.value);
                                      }}
                                    />

                                    <br />

                                    <FormControl
                                      fullWidth
                                      style={{ width: "100%", margin: "7px 0" }}
                                    >
                                      <InputLabel id="demo-simple-select-label">
                                        Outbound
                                      </InputLabel>

                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Outbound"
                                        style={{ textAlign: "left" }}
                                        value={outgoing}
                                        onChange={(e) => {
                                          setOutgoing(e.target.value);
                                        }}
                                        required
                                      >
                                        <MenuItem value={"t"}>Yes</MenuItem>
                                        <MenuItem value={"f"}>No</MenuItem>
                                      </Select>
                                    </FormControl>
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
                                  value="true"
                                  control={<Radio />}
                                  label="Active"
                                />
                                <FormControlLabel
                                  value="false"
                                  control={<Radio />}
                                  label="Deactive"
                                />
                                {/* <FormControlLabel value="s" control={<Radio />} label="Assign" />
        <FormControlLabel value="s" control={<Radio />} label="Unassign" /> */}
                              </RadioGroup>
                            </FormControl>
                          </div>

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

export default AdminExtension;
