import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { Close, Delete, Edit, PlayArrow, Style } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Fade,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import '../../Switcher.scss';
import axios from "axios";
// import React from 'react'
const drawerWidth = 240;
const current_user = localStorage.getItem("current_user");
const user = JSON.parse(localStorage.getItem(`user_${current_user}`));
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

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 52,
  height: 31,
  padding: 0,
  borderRadius: "33px",
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 27,
    height: 27,
    // right: '0px',
    // position: 'relative',
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

function ResellerManageAddBuyer({colorThem}) {
  const navigate = useNavigate();
  const [response, setResponse] = useState("");
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [didNumber, setDidNumber] = useState("");
  const [clientName, setClientName] = useState("");
  const [didList, setDidList] = useState([]);
  const [deleteRow, setDeleteRow] = useState("");
  const [loader, setLoader] = useState(null);
  const handleAddBuyerOpen = () => setOpen(true);
  const handleAddBuyerClose = () => {
    setOpen(false);
    setSelectedValue("");
    setDidNumber("");
    setClientName("");
  };
  const handleEditrOpen = () => setEdit(true);
  const handleEditClose = () => {
    setEdit(false);
    setSelectedValue("");
    setDidNumber("");
    setClientName("");
  };
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = JSON.stringify({
      destination_uuid:"64404d80-affb-5bbd-bdae-a1b122cda14c",
      client_name: clientName,
      user_uuid: user?.user_uuid,
      status: selectedValue,
      destination_number:"1800009890",
      destination_actions:"1101",
      service_type:"Manage",
      destination_description:"This is testing a message"
    });

    // let config = {
    //   method: "post",
    //   maxBodyLength: Infinity,
    //   url: "http://95.217.227.234:5000/createdid",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: data,
    // };

    // axios
    //   .request(config)
    //   .then((res) => {
    //     if (res?.data?.message !== "") {
    //       toast.success(res.data.message, {
    //         position: toast.POSITION.TOP_RIGHT,
    //         autoClose: 1500,
    //       });

    //       setResponse(res?.data);
    //       setSelectedValue("");
    //       setDidNumber("");
    //       setClientName("");
    //     }
    //     handleAddBuyerClose();
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const handleDelete = (value) => {
    let data = JSON.stringify({
      did: value.did,
      user_uuid: user?.user_uuid,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://95.217.227.234:5000/deletedid",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((res) => {
        if (res?.data?.message !== "") {
          toast.info(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          });
        }
        setDeleteRow(res?.data);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    let data = JSON.stringify({
      did: didNumber,
      client_name: clientName,
      user_uuid: user?.user_uuid,
      status: selectedValue,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://95.217.227.234:5000/updatedid",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((res) => {
        if (res?.data?.message !== "") {
          toast.info(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          });
        }
        handleEditClose();
        setSelectedValue("");
        setDidNumber("");
        setClientName("");
        setResponse(res?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "didNumber":
        const trimmedValue = value.trim();
        setDidNumber(trimmedValue);
        break;
      case "clientName":
        setClientName(value);
        break;
      case "status":
        setSelectedValue(value);
        break;

      default:
        break;
    }
  };

  const handleEdit = (data) => {
    handleEditrOpen();
    setDidNumber(data?.did);
    setClientName(data?.client_name);
    setSelectedValue(data?.status);
  };

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://95.217.227.234:5000/alldids?user_uuid=${user?.user_uuid}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        setDidList(response?.data?.alldids);
        setLoader(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [response, deleteRow]);

  const columns = [
    {
      field: "did",
      headerName: "Did Number",
      headerClassName: "custom-header",
      headerAlign: "center",
      flex: 1,
      align: "center",
    },
    {
      field: "client_name",
      headerName: "Client Name",
      flex: 1,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },

    {
      field: "status",
      headerName: "Status",
      type: "number",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      renderCell: (params) => {
        return (
          <>
            {params.row.status === "Active" ? (
              <>
                <div
                  className="d-flex justify-content-between align-items-center"
                  style={{
                    color: "green",
                    border: "1px solid green",
                    padding: "10px 15px",
                    borderRadius: "5px",
                  }}
                >
                  {params.row.status}
                </div>
              </>
            ) : (
              <>
                <div
                  className="d-flex justify-content-between align-items-center"
                  style={{
                    color: "red",
                    border: "1px solid red",
                    padding: "10px 15px",
                    borderRadius: "5px",
                  }}
                >
                  {params.row.status}
                </div>
              </>
            )}
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      sortable: false,
      width: 140,
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            <IconButton>
              <PlayArrow style={{ cursor: "pointer", color: "grey" }} />
            </IconButton>
            <IconButton>
              <Edit
                onClick={() => handleEdit(params.row)}
                index={params.row.id}
                style={{ cursor: "pointer", color: "darkcyan" }}
              />
            </IconButton>
            <IconButton onClick={() => handleDelete(params.row)}>
              <Delete style={{ cursor: "pointer", color: "red" }} />
            </IconButton>
          </div>
        );
      },
    },
  ];

  const rows = [];
  didList &&
    didList?.forEach((item, index) => {
      rows.push({
        id: index + 1,
        client_name: item?.client_name,
        did: item?.did,
        status: item?.status,
        action: item?.did,
      });
    });

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
                      {/* <div className="cntnt_title"> */}
                      <div
                        className="cntnt_title"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <h3 style={{ margin: "0px" }}>Buyer View</h3>

                        <FormGroup
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: "30px",
                          }}
                        >
                          <Stack
                            direction="row"
                            spacing={1}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Typography style={{ fontSize: "15px" }}>
                              All
                            </Typography>
                            <FormControlLabel
                              control={<IOSSwitch defaultChecked />}
                            />
                            <Typography style={{ fontSize: "15px" }}>
                              Active
                            </Typography>
                          </Stack>
                        </FormGroup>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "end",
                          marginBottom: "40px",
                        }}
                      >
                        <p style={{ fontSize: "17px", color: "#000" }}>
                          <b className="fnt_bld"> abc:</b> 180123456778
                        </p>

                        <div>
                          <IconButton
                          className="all_button_clr"
                            style={{
                              padding: "10px",
                              fontSize: "15px",
                              borderRadius: "5px",
                              border: "none",
                              backgroundColor: "rgb(9, 56, 134)",
                              color: "#fff",
                              marginLeft: "auto",
                              marginRight: "30px",
                            }}
                            onClick={() =>
                              navigate("/admin_portal/manage_campaign")
                            }
                          >
                            <ArrowBackIcon style={{ fontSize: "24px" }} />
                            {/* Back */}
                          </IconButton>

                          <IconButton
                          className="all_button_clr"
                            style={{
                              padding: "10px",
                              fontSize: "15px",
                              borderRadius: "5px",
                              border: "none",
                              backgroundColor: "rgb(9, 56, 134)",
                              color: "#fff",
                              marginLeft: "auto",
                              marginRight: "30px",
                            }}
                            onClick={handleAddBuyerOpen}
                          >
                            Add Buyer
                            <AddOutlinedIcon />
                          </IconButton>
                        </div>
                      </div>
                      {/* </div> */}
                      {/* -----   Add Buyer Modal Start   ----- */}

                      <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={open}
                        closeAfterTransition
                        slots={{ Backdrop: Backdrop }}
                        slotProps={{
                          backdrop: {
                            timeout: 500,
                          },
                        }}
                      >
                        <Fade in={open}>
                          <Box
                            sx={style}
                            borderRadius={"10px"}
                            textAlign={"center"}
                          >
                            <IconButton
                              onClick={handleAddBuyerClose}
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
                            >
                              Add Buyer
                            </Typography>
                            <Typography
                              id="transition-modal-description"
                              sx={{ mt: 2 }}
                              fontSize={"16px"}
                              color={"#000"}
                              paddingBottom={"10px"}
                            >
                              {/* A ring group is a set of destinations that can
                                be called with a ring strategy. */}
                            </Typography>
                            <form style={{ textAlign: "center" }}>
                              <TextField
                                style={{
                                  width: "100%",
                                  margin: " 5px 0 5px 0",
                                }}
                                type="text"
                                label="Client Name"
                                variant="outlined"
                                name="clientName"
                                value={clientName}
                                onChange={(e) => {
                                  setClientName(e.target.value);
                                }}
                              />
                              <br />
                              <TextField
                                style={{
                                  width: "100%",
                                  margin: " 5px 0 5px 0",
                                }}
                                type="number"
                                label="DID/TFN Number"
                                variant="outlined"
                                name="didNumber"
                                value={didNumber}
                                onChange={(e) => {
                                  setDidNumber(e.target.value);
                                }}
                              />
                              {/* <br />
                                <TextField
                                  style={{
                                    width: "100%",
                                    margin: " 5px 0 5px 0",
                                  }}
                                  type="text"
                                  label="Weightage"
                                  variant="outlined"
                                /> 
                                <br />
                                <TextField
                                  style={{
                                    width: "100%",
                                    margin: " 5px 0 5px 0",
                                  }}
                                  type="text"
                                  label="Ringing Timeout"
                                  variant="outlined"
                                />*/}
                              {/* <br />
                              <TextField
                                style={{
                                  width: "100%",
                                  margin: " 5px 0 5px 0",
                                }}
                                type="text"
                                label="Max Calls In A Day"
                                variant="outlined"
                                name="clientName"
                                value={clientName}
                                onChange={(e)=>{set(e.target.value)}}
                              /> */}
                              <br />
                              {/* <TextField
                                  style={{
                                    width: "100%",
                                    margin: " 5px 0 5px 0",
                                  }}
                                  type="text"
                                  label="No CC (Concurrent Call)"
                                  variant="outlined"
                                />
                                <br /> */}

                              <FormControl
                                fullWidth
                                style={{ margin: " 5px 0 5px 0" }}
                              >
                                <InputLabel id="demo-simple-select-label">
                                  Status
                                </InputLabel>
                                <Select
                                  style={{ textAlign: "left" }}
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  // value={age}
                                  label="Status"
                                  value={selectedValue}
                                  onChange={handleSelectChange}
                                >
                                  <MenuItem value={"Active"}>Active</MenuItem>
                                  <MenuItem value={"Deactive"}>
                                    Deactive
                                  </MenuItem>
                                </Select>
                              </FormControl>

                              <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                  background: "#092b5f",
                                  marginTop: "20px",
                                }}
                                onClick={handleSubmit}
                              >
                                Save
                              </Button>
                            </form>
                          </Box>
                        </Fade>
                      </Modal>
                      {/* -----   Add Buyer Modal End   ----- */}

                      {/* -----   Edit Modal Start   ----- */}

                      <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={edit}
                        closeAfterTransition
                        slots={{ Backdrop: Backdrop }}
                        slotProps={{
                          backdrop: {
                            timeout: 500,
                          },
                        }}
                      >
                        <Fade in={edit}>
                          <Box
                            sx={style}
                            borderRadius={"10px"}
                            textAlign={"center"}
                          >
                            <IconButton
                              onClick={handleEditClose}
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
                            >
                              Update Buyer
                            </Typography>
                            <Typography
                              id="transition-modal-description"
                              sx={{ mt: 2 }}
                              fontSize={"16px"}
                              color={"#000"}
                              paddingBottom={"10px"}
                            >
                              {/* A ring group is a set of destinations that can
                                be called with a ring strategy. */}
                            </Typography>
                            <form style={{ textAlign: "center" }}>
                              <TextField
                                style={{
                                  width: "100%",
                                  margin: " 5px 0 5px 0",
                                }}
                                type="text"
                                label="Client Name"
                                variant="outlined"
                                name="clientName"
                                value={clientName}
                                onChange={handleChange}
                              />
                              <br />
                              <TextField
                                style={{
                                  width: "100%",
                                  margin: " 5px 0 5px 0",
                                }}
                                type="text"
                                label="DID/TFN Number"
                                variant="outlined"
                                name="didNumber"
                                value={parseInt(didNumber)}
                                onChange={handleChange}
                              />
                              {/* <br />
                                <TextField
                                  style={{
                                    width: "100%",
                                    margin: " 5px 0 5px 0",
                                  }}
                                  type="text"
                                  label="Weightage"
                                  variant="outlined"
                                /> 
                                <br />
                                <TextField
                                  style={{
                                    width: "100%",
                                    margin: " 5px 0 5px 0",
                                  }}
                                  type="text"
                                  label="Ringing Timeout"
                                  variant="outlined"
                                />*/}
                              {/* <br />
                              <TextField
                                style={{
                                  width: "100%",
                                  margin: " 5px 0 5px 0",
                                }}
                                type="text"
                                label="Max Calls In A Day"
                                variant="outlined"
                              /> */}
                              <br />
                              {/* <TextField
                                  style={{
                                    width: "100%",
                                    margin: " 5px 0 5px 0",
                                  }}
                                  type="text"
                                  label="No CC (Concurrent Call)"
                                  variant="outlined"
                                />
                                <br /> */}
                              {/* 
                              <FormControl
                                fullWidth
                                style={{ margin: " 5px 0 5px 0" }}
                              >
                                <InputLabel id="demo-simple-select-label">
                                  Status
                                </InputLabel>
                                <Select
                                  style={{ textAlign: "left" }}
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  // value={age}
                                  label="Status"
                                >
                                  <MenuItem value={10}>Active</MenuItem>
                                  <MenuItem value={20}>Deactive</MenuItem>
                                </Select>
                              </FormControl> */}

                              <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                  background: "#092b5f",
                                  marginTop: "20px",
                                }}
                                onClick={handleUpdate}
                              >
                                Update
                              </Button>
                            </form>
                          </Box>
                        </Fade>
                      </Modal>
                      {/* -----   Edit Modal End   ----- */}
                      {loader === null ? (
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
                        <>
                          <div className="row">
                            <Box m="0px 0 0 0" height="75vh">
                              <DataGrid
                                rows={rows}
                                columns={columns}
                                headerClassName="custom-header"
                                autoHeight
                              />
                            </Box>
                          </div>
                        </>
                      )}
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

export default ResellerManageAddBuyer;
