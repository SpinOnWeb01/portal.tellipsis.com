import React, { useEffect, useRef, useState } from "react";
import "../../style.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { withStyles } from "@material-ui/styles";
import { toast } from "react-toastify";
import { DialogActions, DialogTitle } from "@mui/material";
import { api } from "../../mockData";
const CssTextField = withStyles({
  root: {
    "& label": {
      color: "white",
    },
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  },
  input: {
    color: "red", // Set default text color to white
  },
})(TextField);

function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const current_user = localStorage.getItem("current_user");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem(`user_${current_user}`)));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const buttonRef = useRef(null);
  const location = useLocation();
  const redirect = location?.state?.data;

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = JSON.stringify({
      username: username,
      old_password: oldPassword,
      new_password: newPassword,
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${api.dev}/api/changepassword`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        const values = response?.data;
        if (values.status === 200) {
          toast.success(values.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          });
          //   navigate("/"})
        } else {
          toast.error(values.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      buttonRef.current.click();
    }
  };

  return (
    <section className="forget-sec">
      <div className="container">
        <div className="row d-flex justify-content-start align-items-cente m-auto">
          <div className="col-lg-6 col-md-6 col-12 d-flex justify-content-center align-items-center">
            <div className="">
              <div className="login-logo forget_logo">
                <Card className="login-box" sx={{padding:"13px 25px"}}>
                
                    <Typography>
                      <img
                        src={`../img/logo_white11.png`}
                        className="img-fluid d-block mx-auto"
                        alt={"login logo"}
                      />
                    </Typography>
                    <DialogTitle sx={{ color: "#fff", fontWeight: "600" }}>
                      Change Password
                    </DialogTitle>
                    <form className="login_form" onKeyDown={handleKeyPress}>
                      <CssTextField
                        id="outlined-password-input"
                        value={username}
                        variant="outlined"
                        style={{ width: "100%", margin: "0px" }}
                        required
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                        label="Username"
                        className="username"
                        name="username"
                        type="text"
                        autoComplete="current-password"
                        margin="normal"
                        inputProps={{ style: { color: "white" } }}
                        onFocus={handleFocus}
                      />

                      <CssTextField
                        id="outlined-password-input"
                        value={oldPassword}
                        variant="outlined"
                        style={{ width: "100%", margin: "30px 0" }}
                        required
                        onChange={(e) => {
                          setOldPassword(e.target.value);
                        }}
                        label="Old Password"
                        className="oldPassword"
                        name="oldPassword"
                        type="text"
                        autoComplete="current-password"
                        margin="normal"
                        inputProps={{
                          style: { color: "white", WebkitTextSecurity: "disc" },
                        }}
                        onFocus={handleFocus}
                      />

                      <CssTextField
                        id="outlined-password-input"
                        value={newPassword}
                        variant="outlined"
                        style={{ width: "100%", margin: "0px" }}
                        required
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                        }}
                        label="New Password"
                        className="password"
                        name="newPassword"
                        type="text"
                        autoComplete="current-password"
                        margin="normal"
                        inputProps={{
                          style: { color: "white", WebkitTextSecurity: "disc" },
                        }}
                        onFocus={handleFocus}
                      />
                    </form>
                

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
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      Back
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
                      Submit
                    </Button>
                  </DialogActions>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
