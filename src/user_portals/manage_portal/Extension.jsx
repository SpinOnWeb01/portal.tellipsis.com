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
import {
  DataGrid,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import React, { useMemo, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Close, Delete, Edit } from "@mui/icons-material";
import Backdrop from "@mui/material/Backdrop";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import {
  createManageExtension,
  deleteManageExtension,
  getManageExtension,
  updateManageExtension,
} from "../../redux/actions/managePortal/managePortal_extensionAction";
import { useNavigate } from "react-router-dom";
import { api } from "../../mockData";
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

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarDensitySelector />
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

function Extension() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [extensionNumber, setExtensionNumber] = useState("");
  const [extensionId, setExtensionId] = useState("");
  const [password, setPassword] = useState("");
  const [callerId, setCallerId] = useState("");
  const [userId, setUserId] = useState("");
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [showPasswordMap, setShowPasswordMap] = useState({});
  const [calllerIdNumbers, setCallerIdNumbers] = useState([]);
  const [alertMessage, setAlertMessage] = useState(false);
  const [error, setError] = useState("");
  const [borderColor, setBorderColor] = useState("");
  const [name, setName] = useState("");

  const handleShowPassword = (rowId) => {
    setShowPasswordMap((prevMap) => ({
      ...prevMap,
      [rowId]: !prevMap[rowId],
    }));
  };
  const current_user = localStorage.getItem("current_user");
  const token = JSON.parse(localStorage.getItem(`user_${current_user}`));

  const handleOpen = () => setOpen(true);

  const handleAlertClose = () => {
    setExtensionId("");
    setAlertMessage(false);
  };

  const handleClose = () => {
    setOpen(false);
    setExtensionNumber("");
    setPassword("");
    setUserId("");
  };

  const handleEdit = (data) => {
    setOpenModal(true);
    setPassword(data?.password);
    setExtensionId(data?.extension_id);
    setCallerId(data?.callerid);
    setExtensionNumber(data?.extension);
    setStatus(data.active);
    setDescription(data.description);
    setError(""); // Reset error when switching users
    setBorderColor(""); // Reset border color when switching users
  };
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
        "Password must include at least one special character(!@#$%^&*)"
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

  const handleChange = (event) => {
    setCallerId(event.target.value);
  };

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
    setExtensionNumber("");
    setPassword("");
    setUserId("");
    setCallerId("");
  }, []);

  const handleMessage = useCallback(
    (data) => {
      setName(data?.extension);
      setExtensionId(data?.extension_id);
      setAlertMessage(true);
    },
    [setName]
  ); // Memoize event handler

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = JSON.stringify({
      num_extensions: extensionNumber,
    });
    dispatch(
      createManageExtension(
        data,
        setOpen,
        setResponse,
        setExtensionNumber,
        setPassword
      )
    );
  };

  const handleUpdate = useCallback(
    (e) => {
      if(error === ""){
      e.preventDefault();
      let data = JSON.stringify({
        extension_id: extensionId,
        extension: extensionNumber,
        password: password,
        active: status,
        description: description,
        caller_id: callerId,
      });
      dispatch(
        updateManageExtension(data, setOpenModal, setResponse, setPassword)
      );
    }
    },
    [
      extensionId,
      password,
      userId,
      callerId,
      description,
      status,
      extensionNumber,
      setOpenModal,
      setResponse,
      setPassword,
    ]
  );

  const handleDelete = useCallback(
    (id) => {
      dispatch(
        deleteManageExtension(
          { extension_id: extensionId },
          setResponse,
          setExtensionId
        )
      );
      setAlertMessage(false);
    },
    [extensionId, dispatch, setResponse, setExtensionId]
  ); // Memoize event handler

  useEffect(() => {
    dispatch(getManageExtension());
  }, [response]);

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${api.dev}/api/get_user_profile_did`,
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
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  // =======table=======>
  const columns = [
    {
      field: "edit",
      headerName: "Action",
      width: 130,
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
      headerName: "Extensions",
      width: 130,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "password",
      headerName: "Password",
      type: "number",
      width: 250,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      renderCell: (params) => (
        <>
          <input
            type={showPasswordMap[params.id] ? "text" : "password"}
            value={params.row.password}
            readOnly
            style={{ border: "none", width: "100%" }}
          />
          <IconButton
            edge="end"
            onClick={() => handleShowPassword(params.id)}
            style={{ fontSize: "20px" }}
          >
            {showPasswordMap[params.id] ? <FaEye /> : <FaEyeSlash />}
          </IconButton>
        </>
      ),
    },
    {
      field: "username",
      headerName: "UserName",
      width: 250,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "callerid",
      headerName: "Caller ID",
      headerClassName: "custom-header",
      headerAlign: "center",
      width: 250,
      align: "center",
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
    state?.allManageExtension?.allmanageextension &&
      state?.allManageExtension?.allmanageextension.forEach((item, index) => {
        calculatedRows.push({
          id: index + 1,
          extension: item?.extension,
          password: item?.password,
          username: item?.username,
          extension_id: item?.id,
          callerid: item?.callerid,
          active: item?.active,
          extensions_limit: item.extensions_limit,
          description: item.description,
        });
      });
    return calculatedRows;
  }, [state?.allManageExtension?.allmanageextension]);

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
                        <h3>Extensions</h3>
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
                              Add Extension
                            </Typography>
                            <form
                              style={{
                                textAlign: "center",
                                textAlign: "center",
                                // height: "400px",
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
                                label="Range"
                                variant="outlined"
                                padding={"0px 0 !important"}
                                name="extensionNumber"
                                value={extensionNumber}
                                onChange={(e) => {
                                  setExtensionNumber(e.target.value);
                                }}
                              />
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
                    {/* <!--table---> */}
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
                    {/* edit-modal */}

                    <Dialog
                      open={openModal} //onClose={handleCloseModal}
                    >
                      <Box>
                        <br />
                        <IconButton
                          className="close_icon"
                          onClick={handleCloseModal}
                          sx={{ float: "inline-end" }}
                        >
                          <Close />
                        </IconButton>
                      </Box>

                      <DialogTitle
                        sx={{
                          color: "#07285d",
                          fontWeight: "600",
                          width: "500px",
                          textAlign: "center",
                        }}
                        className="extension_title"
                      >
                        Edit Extension
                      </DialogTitle>

                      <DialogContent>
                        <Typography variant="body1">
                          <br />
                          <form
                            style={{
                              textAlign: "center",
                              // height: "200px",
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
                              label="Extension"
                              variant="outlined"
                              name="userName"
                              value={extensionNumber}
                              onChange={(e) =>
                                setExtensionNumber(e.target.value)
                              }
                              // disabled
                            />

                            <br />
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
                                <MenuItem value={"true"}>Enable</MenuItem>
                                <MenuItem value={"false"}>Disable</MenuItem>
                              </Select>
                            </FormControl>
                            <br />
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
                                {calllerIdNumbers?.data?.map((item, index) => {
                                  return (
                                    <MenuItem key={index} value={item}>
                                      {item}
                                    </MenuItem>
                                  );
                                })}
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
                              padding={"0px 0 !important"}
                              name="description"
                              value={description}
                              onChange={(e) => {
                                setDescription(e.target.value);
                              }}
                            />
                          </form>
                        </Typography>
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
                    {/* -----   Edit Campaign Modal End   ----- */}
                    {/* <!--table-end--> */}
                  </div>
                  {/* <!--role-content--> */}
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-profile"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Extension;
