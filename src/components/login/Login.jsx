import React, { useState } from "react";
import "../../style.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/adminPortal/userAction";
import axios from "axios";
import { api } from "../../mockData";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location?.state?.data;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${api.dev}/api/login`,
        { username: email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const values = response?.data;

      if (values?.status === 200) {
        // Store user in localStorage based on role
        if (values.user_role === "Superadmin") {
          localStorage.setItem("admin", JSON.stringify(values));
          navigate("/admin_portal", { state: { data: redirect } });
        } else if (values.user_role === "Admin") {
          localStorage.setItem("admin", JSON.stringify(values));
          navigate("/admin_portal");
        } else if (values.user_role === "Reseller") {
          localStorage.setItem("admin", JSON.stringify(values));
          localStorage.setItem("reseller", JSON.stringify(values));
          navigate("/reseller_portal");
        } else {
          localStorage.setItem("current_user", values.user_name);
          localStorage.setItem(`user_${values.user_name}`, JSON.stringify(values));
          navigate("/manage_portal");
        }

        toast.success(values.message, { position: toast.POSITION.TOP_RIGHT, autoClose: 1500 });

        setEmail("");
        setPassword("");
        dispatch(login(values));
      } else {
        toast.error(values.message, { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 });
        setPassword(""); // clear only password on error
      }
    } catch (error) {
      const errMsg = error?.response?.data?.message || "Something went wrong!";
      toast.error(errMsg, { position: toast.POSITION.TOP_RIGHT, autoClose: 6000 });
      setPassword("");
    }
  };

  return (
    <section className="login-sec">
      <div className="container">
        <div className="row d-flex justify-content-start align-items-center m-auto">
          <div className="col-lg-6 col-md-6 col-12 d-flex justify-content-center align-items-center">
            <div className="login-logo">
              <Card className="login-box">
                <CardContent>
                  <Typography>
                    <img
                      src="../img/logo_white11.png"
                      className="img-fluid d-block mx-auto"
                      alt="login logo"
                      style={{ paddingBottom: "20px" }}
                    />
                  </Typography>

                  <form className="login_form" onSubmit={handleSubmit}>
                    <label style={{ color: "#fff", display: "block", paddingBottom: "3px", textAlign: "left", }}>
                      Username
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      name="email"
                      placeholder="Username"
                      autoComplete="email"
                      className="email custome_input"
                      style={{ width: "100%", background: "transparent" }}
                      required
                    />

                    <label
                      style={{
                        color: "#fff",
                        display: "block",
                        paddingBottom: "3px",
                        marginTop: "1rem",
                        textAlign: "left",
                      }}
                    >
                      Password
                    </label>
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      name="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      className="password custome_input"
                      style={{ width: "100%", background: "transparent" }}
                      required
                    />
                  </form>
                </CardContent>

                <CardActions className="d-flex justify-content-center">
                  <Button
                    type="submit"
                    className="all_button_clr"
                    style={{ display: "flex", justifyContent: "center", margin: 0 }}
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </CardActions>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
