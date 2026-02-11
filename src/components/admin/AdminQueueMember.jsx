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
  OutlinedInput,
  Checkbox,
  ListItemText,
  Tooltip,
  DialogContentText,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  getExtension,
  createExtension,
  updateExtension,
} from "../../redux/actions/adminPortal/extensionAction";
import { makeStyles } from "@mui/styles";
import "../../Switcher.scss";
import { getAllUsers } from "../../redux/actions/adminPortal/userAction";
import {
  createAdminQueue,
  createAdminQueueMember,
  deleteAdminQueueMember,
  getAdminQueue,
  getAdminQueueMember,
  updateAdminQueue,
} from "../../redux/actions/adminPortal/adminPortal_queueAction";
import axios from "axios";
import { api } from "../../mockData";

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

const array = [
  "ringall",
  "leastrecent",
  "fewestcalls",
  "random",
  "rrmemory",
  "linear",
  "wrandom",
  "rrordered",
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton/>
      <GridToolbarDensitySelector />
      <GridToolbarFilterButton/>
    </GridToolbarContainer>
  );
}

function AdminQueueMember({ colorThem }) {
  const token = JSON.parse(localStorage.getItem("admin"));
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [extensionNumber, setExtensionNumber] = useState([]);
  const [extensionId, setExtensionId] = useState("");
  const [member, setMember] = useState([]);
  const [userId, setUserId] = useState("");
  const [response, setResponse] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [extension, setExtension] = useState([]);
  const [status, setStatus] = useState("");
  const [queueName, setQueueName] = useState("");
  const [queue, setQueue] = useState([]);
  const [exstn, setExstn] = useState("");
  const [interfase, setInterfase] = useState("");
  const [strategy, setStrategy] = useState("");
  const [validation, setValidation] = useState({
    userId:"",
    
  });
  const [alertMessage, setAlertMessage] = useState(false);
  const [uniqueId, setUniqueId] = useState("");
  const [name, setName] = useState("");

  const handleAlertClose = () => {
    setUniqueId("")
    setAlertMessage(false);
  }

  const handleOpen = () => setOpen(true);

  // Function to determine whether a row should have the bordered style
  const isRowBordered = (params) => {
    const { row } = params;

    // Add your condition here, for example, adding border to rows where age is greater than 25
    return row.disposition === "Ok";
  };

  const handleClose = () => {
    setOpen(false);
    setExtensionNumber([]);
    setExtension([]);
    setUserId("");
    setInterfase("");
    setExstn("");
    setStrategy("");
    setQueueName("");
    setQueue([]);
    setValidation({userId:""})
  };

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
    setExtensionNumber([]);
    setUserId("");
    setInterfase("");
    setExstn("");
    setStatus("");
    setStrategy("");
    setQueueName("");
    setExtension([]);
    setQueue([]);
  }, []);

  const handleButtonClick = useCallback((row) => {
    setOpenModal(true);
    setQueueName(row.queue);
    setExstn(row.extension);
    setInterfase(row.interface);
    setUserId(row.user_id);
  }, []); // Memoize event handler

  const checkValidation = useCallback(() => {
    let errors = { ...validation };
    let isValid = true;
 
    if (!userId) {
      errors.userId = "Field is required";
      isValid = false;
    } else {
      errors.userId = "";
    }
    // if (!queueName) {
    //   errors.queueName = "Field is required";
    //   isValid = false;
    // } else {
    //   errors.queueName = "";
    // }
    // if (!extension) {
    //   errors.extension = "Field is required";
    //   isValid = false;
    // } else {
    //   errors.extension = "";
    // }
    
    setValidation(errors);
    return isValid;
  }, [validation,userId,extension,queueName ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = checkValidation();
    if (isValid) {
    let data = JSON.stringify({
      queue: queueName,
      extensions: extension,
      user_id: userId,
    });

    dispatch(
      createAdminQueueMember(data, setOpen, setResponse, setMember, setUserId)
    );
  }
  };

  const handleUpdate = useCallback(
    (e) => {
      e.preventDefault();
      let data = JSON.stringify({
        name: queueName,
        strategy: strategy,
        user_id: userId,
      });
      // dispatch(
      //   updateAdminQueue(data, setOpenModal, setResponse, setMember, setUserId)
      // );
    },
    [
      extensionId,
      member,
      userId,
      setOpenModal,
      setResponse,
      setMember,
      setUserId,
    ]
  );

  const handleMessage = useCallback((data) => {
    setName(data?.extension)
    setUniqueId(data?.uniqueid)
    setAlertMessage(true);
  }, [setName]); // Memoize event handler

  const handleDelete = useCallback(
    (id) => {
      dispatch(deleteAdminQueueMember({ uniqueid: uniqueId }, setResponse, setUniqueId));
       setAlertMessage(false);
    },
    [uniqueId,dispatch, setResponse, setUniqueId]
  ); // Memoize event handler

  useEffect(() => {
    dispatch(getExtension());
    dispatch(getAllUsers("t"));
    dispatch(getAdminQueueMember());
  }, [response]);

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
        });
    }
  }, [userId]);

  const columns = [
    {
      field: "id",
      headerName: "Sr no",
      headerClassName: "custom-header",
      headerAlign: "center",
      width: 120,
      align: "center",
    },
    {
      field: "extension",
      headerName: "Extension",
      headerClassName: "custom-header",
      headerAlign: "center",
      width: 150,
      align: "center",
    },
    // {
    //   field: "interface",
    //   headerName: "Interface",
    //   headerClassName: "custom-header",
    //   headerAlign: "center",
    //   width: 280,
    //   align: "center",
    // },
    {
      field: "queue",
      headerName: "Queue",
      headerClassName: "custom-header",
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
    // {
    //     field: "member",
    //     headerName: "Member/Extension",
    //     headerClassName: "custom-header",
    //     headerAlign: "center",
    //     width: 280,
    //     align: "center",
    //   },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      sortable: false,
      width: 200,
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            {/* <IconButton onClick={() => handleButtonClick(params.row)}>
              <Edit
                index={params.row.uniqueid}
                style={{ cursor: "pointer", color: "#0e397f" }}
              />
            </IconButton> */}
            <Tooltip title="delete" disableInteractive interactive>
            <IconButton onClick={() => handleMessage(params?.row)}>
              <Delete style={{ cursor: "pointer", color: "red" }} />
            </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const rows = useMemo(() => {
    const calculatedRows = [];
    state?.getAdminQueueMember?.getQueueMember &&
      state?.getAdminQueueMember?.getQueueMember?.forEach((item, index) => {
        calculatedRows.push({
          id: index + 1,
          extension: item?.extension,
          interface: item?.interface,
          queue: item?.queue,
          uniqueid: item?.uniqueid,
          user_id: item?.user_id,
          username: item?.username
        });
      });
    return calculatedRows;
  }, [state?.getAdminQueueMember?.getQueueMember]);
  return (
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
                            <h3>Queue Member</h3>
                            {/* <p>Use this to configure your Queue.</p> */}
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
                                  Add Queue Member
                                </Typography>
                                <form
                                  style={{
                                    textAlign: "center",
                                    textAlign: "center",
                                    // height: "348px",
                                    height: "auto",
                                    // overflow: "auto",
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
                                      {state?.allUsers?.users?.filter(
    (item) =>
      item.role !== "Superadmin" && item.role !== "Admin"
  )?.map(
                                        (item, index) => {
                                          return (
                                            <MenuItem
                                              key={index}
                                              value={item?.id}
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

                                  <FormControl
                                    fullWidth
                                    style={{ width: "100%", margin: "7px 0" }}
                                  >
                                    <InputLabel id="demo-simple-select-label">
                                      Queue
                                    </InputLabel>

                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      label="Queue"
                                      style={{ textAlign: "left" }}
                                      value={queueName}
                                      onChange={(e) =>
                                        setQueueName(e.target.value)
                                      }
                                      required
                                    >
                                      {queue.data?.map((item, index) => {
                                        return (
                                          <MenuItem key={index} value={item}>
                                            {item}
                                          </MenuItem>
                                        );
                                      })}
                                    </Select>
                                  </FormControl>
                                  {/* {validation.queueName && (
                                      <p
                                        className="mb-0"
                                        style={{
                                          color: "red",
                                          textAlign: "left",
                                        }}
                                      >
                                        {validation.queueName}
                                      </p>
                                       )} */}
                                  
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
                                      label="Services"
                                      id="demo-multiple-checkbox"
                                      multiple
                                      fullWidth
                                      value={extension}
                                      onChange={(e) => {
                                        setExtension(e.target.value);
                                      }}
                                      input={<OutlinedInput label="Services" />}
                                      renderValue={(selected) =>
                                        selected.join(", ")
                                      }
                                      MenuProps={MenuProps}
                                    >
                                      {extensionNumber?.data?.map((name) => (
                                        <MenuItem key={name} value={name}>
                                          <Checkbox
                                            checked={
                                              extension.indexOf(name) > -1
                                            }
                                          />
                                          <ListItemText primary={name} />
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>

                                  {/* {validation.extension && (
                                      <p
                                        className="mb-0"
                                        style={{
                                          color: "red",
                                          textAlign: "left",
                                        }}
                                      >
                                        {validation.extension}
                                      </p>
                                       )} */}

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
                                                         
                            
                                                            <DialogContent sx={{pt: "0",}}>
                            <form>
                              {/* <SelectComponent handleClose={handleClose} /> */}
                              <Typography variant="body1">
                              
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
                                    label="Queue Name"
                                    variant="outlined"
                                    name="queue"
                                    value={queueName}
                                    onChange={(e) =>
                                      setQueueName(e.target.value)
                                    }
                                    disabled
                                  />

                                  <TextField
                                    style={{
                                      width: "100%",
                                      margin: " 5px 0 5px 0",
                                    }}
                                    type="text"
                                    label="Extension"
                                    variant="outlined"
                                    name="queue"
                                    value={exstn}
                                    onChange={(e) => setExstn(e.target.value)}
                                  />

                                  <TextField
                                    style={{
                                      width: "100%",
                                      margin: " 5px 0 5px 0",
                                    }}
                                    type="text"
                                    label="Interface"
                                    variant="outlined"
                                    name="queue"
                                    value={interfase}
                                    onChange={(e) =>
                                      setInterfase(e.target.value)
                                    }
                                  />
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
                        <Box className="tbl_container">
                              <DataGrid
                               className="tbl_innr_box"
                                rows={rows}
                                columns={columns}
                                headerClassName="custom-header"
                                slots={{
                                  toolbar: CustomToolbar,
                                }}
                                autoHeight
                              />
                            </Box>
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
  );
}

export default AdminQueueMember;
