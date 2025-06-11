import { Close, Edit, Label } from "@mui/icons-material";
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
  ListItemIcon,
  Tooltip,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import AccessTimeIcon from "@mui/icons-material/AccessTime"; // Assuming AccessTimeIcon is imported
import Backdrop from "@mui/material/Backdrop";
import {
  DataGrid,
  GridToolbar,
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
  getAdminQueue,
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
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

function ResellerQueue({ colorThem }) {
  const token = JSON.parse(localStorage.getItem("reseller"));
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [extensionNumber, setExtensionNumber] = useState("");
  const [ringtimeout, setRingtimeout] = useState("");
  const [extensionId, setExtensionId] = useState("");
  const [member, setMember] = useState([]);
  const [userId, setUserId] = useState("");
  const [response, setResponse] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [numExtensions, setNumExtensions] = useState("");
  const [status, setStatus] = useState("");
  const [queueName, setQueueName] = useState("");
  const [values, setValues] = useState([]);
  const [moh, setMoh] = useState("");
  const [strategy, setStrategy] = useState("");
  const [username, setUsername] = useState("");
  const [validation, setValidation] = useState({
    queueName:"",
    ringtimeout:"",
  });
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setExtensionNumber("");
    setMember([]);
    setUserId("");
    setNumExtensions("");
    setStrategy("");
    setQueueName("");
    setMoh("");
    setRingtimeout("");
    setValidation({queueName:"",ringtimeout:"",userId:"",moh:""})
  };

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
    setExtensionNumber("");
    setUserId("");
    setNumExtensions("");
    setStatus("");
    setStrategy("");
    setQueueName("");
    setMoh("");
    setRingtimeout("")
  }, []);

  const handleButtonClick = useCallback((row) => {
    setOpenModal(true);
    setQueueName(row.name);
    setStrategy(row.strategy);
    setMember(row.password);
    setUsername(row.username);
    setUserId(row.user_id);
    setMoh(row.moh);
    setRingtimeout(row.ringtimeout)
  }, []); // Memoize event handler

  const checkValidation = useCallback(() => {
    let errors = { ...validation };
    let isValid = true;
 
    if (!queueName) {
      errors.queueName = "Field is required";
      isValid = false;
    } else {
      errors.queueName = "";
    }
    if (!ringtimeout) {
      errors.ringtimeout = "Field is required";
      isValid = false;
    } else {
      errors.ringtimeout = "";
    }
    if (!strategy) {
      errors.strategy = "Field is required";
      isValid = false;
    } else {
      errors.strategy = "";
    }
    if (!userId) {
      errors.userId = "Field is required";
      isValid = false;
    } else {
      errors.userId = "";
    }
    // if (!moh) {
    //   errors.moh = "Field is required";
    //   isValid = false;
    // } else {
    //   errors.moh = "";
    // }
    

    
    setValidation(errors);
    return isValid;
  }, [validation, queueName, ringtimeout,strategy,userId,moh]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = checkValidation();
    if (isValid) {
    let data = JSON.stringify({
      name: queueName,
      ringtimeout: ringtimeout,
      strategy: strategy,
      user_id: userId,
      moh: moh,
    });

    dispatch(
      createAdminQueue(data, setOpen, setResponse, setMember, setUserId, setMoh, setRingtimeout)
    );
  }
  };

  const handleUpdate = useCallback(
    (e) => {
      e.preventDefault();
      let data = JSON.stringify({
        name: queueName,
        ringtimeout: ringtimeout,
        strategy: strategy,
        user_id: JSON.stringify(userId),
        moh: moh,
      });
      dispatch(
        updateAdminQueue(
          data,
          setOpenModal,
          setResponse,
          setMember,
          setUserId,
          setMoh,
          setRingtimeout
        )
      );
    },
    [
      extensionId,
      member,
      userId,
      strategy,
      queueName,
      moh,
      ringtimeout,
      setOpenModal,
      setResponse,
      setMember,
      setUserId,
      setMoh,
      setRingtimeout
    ]
  );

  useEffect(() => {
    dispatch(getExtension());
    dispatch(getAllUsers(""));
    dispatch(getAdminQueue());
  }, [response]);

  const getMenuItemContent = (name) => {
    // Define content based on the strategy name
    switch (name) {
      case "ringall":
        return "Rings all agents at once, connecting the call to the first one who answers.";
      case "leastrecent":
        return "Sends the call to the agent who has been idle the longest.";
      case "fewestcalls":
        return "Sends the call to the agent who has handled the fewest calls.";
      case "random":
        return "Chooses an agent randomly to receive the call.";
      case "rrmemory":
        return "Remembers the last agent selected and starts the search for the next available agent from the next position.";
      case "linear":
        return "Distributes calls to agents in a predefined order, typically in rotation.";
      case "wrandom":
        return "Randomly selects an agent, with higher-weighted agents having a greater chance of selection.";
      case "rrordered":
        return "Distributes calls in a round-robin manner but considers agent priority or weight for ordering.";
      // Add cases for other strategy names as needed
      default:
        return name;
    }
  };

  useEffect(() => {
    if (userId !== "") {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${api.dev}/api/getusermoh?user_id=${userId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token} `,
        },
      };
      axios
        .request(config)
        .then((response) => {
          setValues(response?.data);
        })
        .catch((error) => {
        });
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
          </div>
        );
      },
    },
    {
      field: "username",
      headerName: "UserName",
      headerClassName: "custom-header",
      headerAlign: "center",
      width: 200,
      align: "center",
    },
    {
      field: "name",
      headerName: "Queue Name",
      headerClassName: "custom-header",
      headerAlign: "center",
      width: 200,
      align: "center",
    },
  
    {
      field: "strategy",
      headerName: "Strategy",
      headerClassName: "custom-header",
      headerAlign: "center",
      width: 200,
      align: "center",
    },

    {
      field: "ringtimeout",
      headerName: "Ringtimeout",
      headerClassName: "custom-header",
      headerAlign: "center",
      width: 150,
      align: "center",
    },

    {
      field: "moh",
      headerName: "Music On Hold",
      headerClassName: "custom-header",
      headerAlign: "center",
      width: 150,
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
  
  ];

  const rows = useMemo(() => {
    const calculatedRows = [];
    state?.getAdminQueue?.getQueue &&
      state?.getAdminQueue?.getQueue?.forEach((item, index) => {
        calculatedRows.push({
          id: index + 1,
          name: item?.name,
          strategy: item?.strategy,
          username: item?.username,
          user_id: item?.user_id,
          moh: item?.moh,
          ringtimeout: item?.ringtimeout
        });
      });
    return calculatedRows;
  }, [state?.getAdminQueue?.getQueue]);

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
                              <h3>Queue</h3>
                              {/* <p>
                              Use this to configure your Queue.
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
                                    Add Queue
                                  </Typography>
                                  <form
                                    style={{
                                      textAlign: "center",
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
                                      label="Queue Name"
                                      variant="outlined"
                                      padding={"0px 0 !important"}
                                      name="queueName"
                                      value={queueName}
                                      onChange={(e) =>
                                        setQueueName(e.target.value)
                                      }
                                    />
                                      {validation.queueName && (
                                      <p
                                        className="mb-0"
                                        style={{
                                          color: "red",
                                          textAlign: "left",
                                        }}
                                      >
                                        {validation.queueName}
                                      </p>
                                       )}
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
                                      label="Ring Timeout"
                                      variant="outlined"
                                      padding={"0px 0 !important"}
                                      name="ringtimeout"
                                      value={ringtimeout}
                                      onChange={(e) => {
                                        const numericValue =
                                        e.target.value.replace(
                                          /[^0-9]/g,
                                          ""
                                        );
                                        setRingtimeout(numericValue);
                                      }}
                                      inputProps={{
                                        inputMode: "numeric",
                                        // pattern: '[0-9]*',
                                      }}
                                    />
                                    {validation.ringtimeout && (
                                      <p
                                        className="mb-0"
                                        style={{
                                          color: "red",
                                          textAlign: "left",
                                        }}
                                      >
                                        {validation.ringtimeout}
                                      </p>
                                       )}

                                    <FormControl
                                      style={{ width: "100%", margin: "5px 0" }}
                                    >
                                      <InputLabel
                                        id="demo-multiple-checkbox-label"
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        {/* {strategy.length > 0 && <ListItemIcon><AccessTimeIcon /></ListItemIcon>} */}
                                        <span>Strategy</span>
                                      </InputLabel>
                                      <Select
                                        style={{ textAlign: "left" }}
                                        labelId="demo-multiple-checkbox-label"
                                        label="Strategy"
                                        id="demo-multiple-checkbox"
                                        fullWidth
                                        value={strategy}
                                        onChange={(e) => {
                                          setStrategy(e.target.value);
                                        }}
                                      >
                                        {array.map((name, index) => (
                                          <MenuItem key={index} value={name}>
                                            <Tooltip
                                              title={getMenuItemContent(name)}
                                              placement="right"
                                            >
                                              <span>{name}</span>
                                            </Tooltip>
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </FormControl>
                                    {validation.strategy && (
                                      <p
                                        className="mb-0"
                                        style={{
                                          color: "red",
                                          textAlign: "left",
                                        }}
                                      >
                                        {validation.strategy}
                                      </p>
                                       )}

                                  

                                    <br />

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
                                        {state?.allUsers?.users?.map(
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

                                    <br />
                                    <FormControl
                                      fullWidth
                                      style={{ width: "100%", margin: "7px 0" }}
                                    >
                                      <InputLabel id="demo-simple-select-label">
                                        Music On Hold
                                      </InputLabel>

                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Music On Hold"
                                        style={{ textAlign: "left" }}
                                        value={moh}
                                        onChange={(e) => {
                                          setMoh(e.target.value);
                                        }}
                                        required
                                      >
                                        {values?.data?.map((item, index) => {
                                          return (
                                            <MenuItem key={index} value={item}>
                                              {item}
                                            </MenuItem>
                                          );
                                        })}
                                      </Select>
                                    </FormControl>
                                    {validation.moh && (
                                      <p
                                        className="mb-0"
                                        style={{
                                          color: "red",
                                          textAlign: "left",
                                        }}
                                      >
                                        {validation.moh}
                                      </p>
                                       )}
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
                            <Box>
                              <IconButton
                                onClick={handleCloseModal}
                                sx={{
                                  float: "inline-end",
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
                                <img src="/img/mdl_icon.png" alt="user icon" />
                              </Box>
                              Edit
                            </DialogTitle>
                            <DialogContent>
                              <form>
                                {/* <SelectComponent handleClose={handleClose} /> */}
                                <Typography variant="body1">
                                  <br />
                                  <form
                                    style={{
                                      textAlign: "center",
                                      // height: "348px",
                                      height: "auto",
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
                                      label="Queue Name"
                                      variant="outlined"
                                      name="queueName"
                                      value={queueName}
                                      onChange={(e) =>
                                        setQueueName(e.target.value)
                                      }
                                      disabled
                                    />
                                    <br />
                                   

                                    <TextField
                                      style={{
                                        width: "100%",
                                        margin: " 5px 0 5px 0",
                                      }}
                                      type="text"
                                      label="Username"
                                      variant="outlined"
                                      padding={"0px 0 !important"}
                                      name="queueName"
                                      value={username}
                                      onChange={(e) => {
                                        setUsername(e.target.value);
                                      }}
                                      disabled
                                    />
                                    <br />

                                    <TextField
                                      style={{
                                        width: "100%",
                                        margin: " 5px 0 5px 0",
                                      }}
                                      type="text"
                                      label="Ring Timeout"
                                      variant="outlined"
                                      padding={"0px 0 !important"}
                                      name="ringtimeout"
                                      value={ringtimeout}
                                      onChange={(e) => {
                                        const numericValue =
                                        e.target.value.replace(
                                          /[^0-9]/g,
                                          ""
                                        );
                                        setRingtimeout(numericValue);
                                      }}
                                      inputProps={{
                                        inputMode: "numeric",
                                        // pattern: '[0-9]*',
                                      }}
                                    />

                                    <FormControl
                                      style={{
                                        width: "100%",
                                        margin: " 5px 0 5px 0",
                                      }}
                                    >
                                      <InputLabel id="demo-multiple-checkbox-label">
                                        Strategy
                                      </InputLabel>
                                      <Select
                                        style={{ textAlign: "left" }}
                                        labelId="demo-multiple-checkbox-label"
                                        label="Strategy"
                                        id="demo-multiple-checkbox"
                                        fullWidth
                                        value={strategy}
                                        onChange={(e) => {
                                          setStrategy(e.target.value);
                                        }}
                                      >
                                        {array.map((name, index) => (
                                          <MenuItem key={index} value={name}>
                                             <Tooltip
                                              title={getMenuItemContent(name)}
                                              placement="right"
                                            >
                                              <span>{name}</span>
                                            </Tooltip>
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </FormControl>

                                    <br />

                                    <FormControl
                                      fullWidth
                                      style={{ width: "100%", margin: "7px 0" }}
                                    >
                                      <InputLabel id="demo-simple-select-label">
                                        Music On Hold
                                      </InputLabel>

                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Music On Hold"
                                        style={{ textAlign: "left" }}
                                        value={moh}
                                        onChange={(e) => {
                                          setMoh(e.target.value);
                                        }}
                                        required
                                      >
                                        {values?.data?.map((item, index) => {
                                          return (
                                            <MenuItem key={index} value={item}>
                                              {item}
                                            </MenuItem>
                                          );
                                        })}
                                      </Select>
                                    </FormControl>
                                    <br />

                                    {/* <FormControl
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
                                        {state?.allUsers?.users?.map(
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
                                    </FormControl> */}
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
                                  // marginTop: "20px",
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
                                  // marginTop: "20px",
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
                          <ThemeProvider theme={theme}>
                          <div style={{ height: '100%', width: '100%' }}>
                                <DataGrid
                                  rows={rows}
                                  columns={columns}
                                  headerClassName="custom-header"
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

export default ResellerQueue;
