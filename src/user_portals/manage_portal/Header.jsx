import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../../src/style.css";

import "../manage_portal/style.css";
import { toast } from "react-toastify";
import axios from "axios";
import { api } from "../../mockData";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import { Dropdown } from "react-bootstrap";
// import LiveCall from "./LiveCall";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Popover,
  List,
  ListItem,
  Modal,
  Popper,
  TextField,
  Toolbar,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import CallIcon from "@mui/icons-material/Call";
import { Close } from "@mui/icons-material";
import { getManageBilling } from "../../redux/actions/managePortal/managePortal_billingAction";
import { getManageProfileExtension } from "../../redux/actions/managePortal/managePortal_extensionAction";
import LiveCall from "../../pages/LiveCall";
import socketIOClient from "socket.io-client";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Header() {
  const [hendalpss, setHendlePss] = useState();

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const current_user = localStorage.getItem("current_user");
  const user = JSON.parse(localStorage.getItem(`user_${current_user}`));
  const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [extension, setExtension] = useState("");
  const [openmodal, setOpen] = React.useState(false);
  const [number, setNumber] = useState(0);
  const [indiaTime, setIndiaTime] = useState("");
  const [usaTime, setUsaTime] = useState("");
  const handleOpen = () => {
    setOpen(true);
    setAnchorEl(null);
  };
  const handleClose = () => {
    setOpen(false);
    setExtension("");
    setNewPassword("");
    setCnfPassword("");
  };
  const handlePopoverClose = () => setAnchorEl(null);
  const handlePopoverToggle = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  // modal=end====>

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const socket = socketIOClient(`${api.dev}`);

    // Get the current user information from localStorage
    const current_user = localStorage.getItem("current_user");
    const user = JSON.parse(localStorage.getItem(`user_${current_user}`));

    // Listen for events from the server
    socket.on("call_details", (data) => {
      // Handle the received data (e.g., update state, trigger a re-fetch)
      if (data?.data !== undefined) {
        // Filter the data based on UserId matching user.uid
        const filteredData = Object.keys(data?.data)
          .map((key) => {
            try {
              const parsedValue = JSON.parse(data?.data[key]); // Parse JSON string
              return {
                id: key, // Add the key as 'id'
                ...parsedValue, // Spread the parsed object
              };
            } catch (error) {
              console.error(`Failed to parse JSON for key: ${key}`, error);
              return null; // Return null or handle error as needed
            }
          })
          .filter(Boolean) // Filter out any null entries
          .filter((row) => row.UserId === user.uid); // Filter rows where UserId matches userId.uid

        // Get the count of filtered objects
        const newDataCount = filteredData.length;
        setNumber(newDataCount);
      }
    });

    return () => {
      // Disconnect the socket when the component unmounts
      socket.disconnect();
    };
  }, []); // Empty dependency array ensures this effect runs once on mount

  const logout = async () => {
    const config = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.access_token} `,
    };
    const { data } = await axios.post(
      `${api.dev}/api/logout`,
      {},
      {
        headers: config,
      },
    );
    if (data?.status === 200) {
      toast.info(data?.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });
      localStorage.removeItem(`user_${current_user}`);
      localStorage.removeItem("current_user");
      localStorage.removeItem("selectedTab");
      navigate("/");
    }
  };

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${api.dev}/api/userbillingresource`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.access_token} `,
      },
    };
    axios
      .request(config)
      .then((response) => {
        setData(response?.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  useEffect(() => {
    dispatch(getManageBilling());
    dispatch(getManageProfileExtension());
  }, []); // Empty dependency array ensures this effect runs once on mount

  useEffect(() => {
    const updateTime = () => {
      const india = new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      const usa = new Date().toLocaleString("en-US", {
        timeZone: "America/New_York", // EST / EDT auto handle
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      setIndiaTime(india);
      setUsaTime(usa);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleUpdate = async () => {
    let data = JSON.stringify({
      new_password: newPassword,
      confirm_password: cnfPassword,
      extension: extension,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`,
      },
    };

    try {
      const val = await axios.put(
        `${api.dev}/api/changeprofilepassword`,
        data,
        config,
      );
      if (val?.data?.status === 200) {
        toast.success(val?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        });
        handleClose();
      } else {
        toast.error(val?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} className="manage_boxx">
        <Box className="manage_mobile_logo d-lg-none d-md-none d-sm-block d-block">
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            className="d-flex align-items-center justify-content-center"
          >
            <a href="/manage_portal" className="mobile_logo_center">
              <img
                src="/img/logo-4-edit-1.png"
                alt="Manage Logo"
                className="img-fluid d-block logo_image"
                style={{ cursor: "pointer" }}
              />
            </a>
          </Typography>
        </Box>
        <AppBar position="static" className="manage_top_header">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              className="d-flex align-items-center"
            >
              <a href="/manage_portal">
                <img
                  src="/img/logo-4-edit-1.png"
                  alt="Manage Logo"
                  className="img-fluid d-block logo_image d-lg-block d-md-block d-sm-none d-none"
                  style={{ cursor: "pointer" }}
                />
              </a>
            </Typography>

            <div className="manage_rgiht_bdr d-flex align-items-center">
              <div className="dshbrd_hdr_icon">
                <div className="d-flex gap-2 align-items-center">
                  <Box
                    sx={{
                      alignItems: "center",
                      gap: 1,
                      display: "flex",
                      flexWrap: { xs: "wrap", sm: "nowrap" },
                      width: "min-content",
                    }}
                   >
                    {/* IST */}
                    <Typography
                      sx={{
                        fontSize: { xs: "11px", sm: "13px" },
                        fontWeight: 600,
                        color: "#0f172a",
                        background: "#e0f2fe",
                        px: { xs: 1, sm: 1.5 },
                        py: 0.4,
                        borderRadius: "6px",
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Box
                        component="span"
                        sx={{ display: { xs: "none", sm: "inline" } }}
                      >
                        IST:
                      </Box>
                      <Box
                        component="span"
                        sx={{ display: { xs: "inline", sm: "none" } }}
                      >
                        IST
                      </Box>
                      &nbsp;{indiaTime}
                    </Typography>

                    {/* EST */}
                    <Typography
                      sx={{
                        fontSize: { xs: "11px", sm: "13px" },
                        fontWeight: 600,
                        color: "#1e293b",
                        background: "#fff7ed",
                        px: { xs: 1, sm: 1.5 },
                        py: 0.4,
                        borderRadius: "6px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Box
                        component="span"
                        sx={{ display: { xs: "none", sm: "inline" } }}
                      >
                        EST:
                      </Box>
                      <Box
                        component="span"
                        sx={{ display: { xs: "inline", sm: "none" } }}
                      >
                        EST
                      </Box>
                      &nbsp;{usaTime}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      width: "min-content",
                      flexWrap: { xs: "wrap", sm: "nowrap" },
                    }}
                  >
                    {/* US Minutes */}
                    <Typography
                      sx={{
                        fontSize: { xs: "11px", sm: "14px" },
                        fontWeight: 600,
                        color: "#000",
                        display: "flex",
                        alignItems: "center",

                        whiteSpace: "nowrap",
                        background: { xs: "#f8fafc", sm: "transparent" },
                        px: { xs: 1, sm: 0 },
                        py: { xs: 0.3, sm: 0 },
                        borderRadius: "6px",
                      }}
                    >
                      <Box
                        component="span"
                        sx={{ display: { xs: "none", sm: "inline" } }}
                      >
                        US Minute:
                      </Box>
                      <Box
                        component="span"
                        sx={{ display: { xs: "inline", sm: "none" } }}
                      >
                        Min:
                      </Box>
                      &nbsp;
                      {data?.data?.map((item, index) => (
                        <span key={index}>
                          {user.billing_type === "Postpaid"
                            ? "∞"
                            : item.remaining_minutes}
                        </span>
                      ))}
                    </Typography>

                    {/* Live Call */}
                    <IconButton
                      className="manage_call"
                      sx={{
                        px: { xs: 1, sm: 1.5 },
                        py: 0.4,
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        background: { xs: "#transparent", sm: "transparent" },
                      }}
                    >
                      <CallIcon sx={{ color: "#07285d", fontSize: "18px" }} />
                      <span
                        className="livecalnow"
                        style={{
                          fontSize: "12px",
                          fontWeight: 700,
                        }}
                      >
                        {number}
                      </span>

                      <Typography
                        sx={{
                          fontSize: "13px",
                          fontWeight: 600,
                          display: { xs: "none", sm: "inline" },
                        }}
                      >
                        Live
                      </Typography>
                    </IconButton>
                  </Box>
                </div>
              </div>

              <ul className="hdr_profile">
                <li
                  className="popover-button"
                  variant="contained"
                  //onMouseLeave={handlePopoverClose}
                  onClick={handleOpen}
                  type="button"
                >
                  {/* Add a class to the image element */}
                  <img
                    src="/img/nav_author.jpg"
                    className="img-fluid d-block rounded-circle"
                    alt="profile"
                  />
                  <div className="profile_name">
                    <b>{user?.user_name} </b>
                  </div>

                  <Popper
                    className="user_box"
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    style={{ zIndex: "999", position: "absolute" }}
                  >
                    <Box
                      className="user_innr_box"
                      sx={{ border: 1, p: 1, bgcolor: "background.paper" }}
                    >
                      <Box>
                        <Typography variant="h5">
                          <img
                            src="/img/nav_author.jpg"
                            className="img-fluid d-block user_rounded-circle"
                            alt="profile"
                          />
                          {user?.user_name}
                        </Typography>
                      </Box>

                      <List className="user_list">
                        <ListItem>
                          <Typography
                            className="user_button"
                            onClick={handleOpen}
                          >
                            Change Password
                          </Typography>
                        </ListItem>
                      </List>
                    </Box>
                  </Popper>
                </li>
              </ul>
              {/* modal */}
              <Dialog
                open={openmodal}
                onClose={handleClose}
                aria-labelledby="profile-dialog-title"
                aria-describedby="profile-dialog-description"
                maxWidth="sm"
                fullWidth
              >
                <DialogTitle id="profile-dialog-title">
                  Profile
                  <IconButton
                    onClick={handleClose}
                    sx={{ position: "absolute", right: 8, top: 8 }}
                  >
                    <Close />
                  </IconButton>
                </DialogTitle>

                <DialogContent dividers>
                  <TextField
                    fullWidth
                    margin="dense"
                    type="text"
                    label="New Password"
                    variant="outlined"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    margin="dense"
                    type="text"
                    label="Confirm Password"
                    variant="outlined"
                    value={cnfPassword}
                    onChange={(e) => setCnfPassword(e.target.value)}
                  />
                  <FormControl fullWidth margin="dense">
                    <InputLabel>Extension</InputLabel>
                    <Select
                      value={extension}
                      onChange={(e) => setExtension(e.target.value)}
                      label="Extension"
                    >
                      {state?.getManageProfileExtension?.getManageProfileExtension.map(
                        (item, index) => (
                          <MenuItem key={index} value={item}>
                            {item}
                          </MenuItem>
                        ),
                      )}
                    </Select>
                  </FormControl>
                </DialogContent>

                <DialogActions>
                  <Button onClick={handleClose} color="secondary">
                    Cancel
                  </Button>
                  <Button
                    onClick={handleUpdate}
                    color="primary"
                    variant="contained"
                  >
                    Save
                  </Button>
                </DialogActions>
              </Dialog>
              {/* modal-end */}

              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                style={{ paddingRight: "0" }}
                onClick={logout}
                sx={{
                  paddingRight: 0,
                  position: { xs: "absolute", md: "relative" },
                  bottom: { xs: "60px", md: "auto" },
                  right: { xs: "20px", md: "auto" },
                  zIndex: 1300,
                }}
              >
                <LogoutIcon className="call_icon " />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {/* <!--navbar-sec--> */}
        <Navbar />
      </Box>
    </>
  );
}

export default Header;
