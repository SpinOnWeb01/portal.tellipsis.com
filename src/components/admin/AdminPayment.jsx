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
  RadioGroup
} from "@mui/material";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import InfoIcon from '@mui/icons-material/Info';
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
import axios from 'axios';
import { getAdminPayment } from "../../redux/actions/adminPortal/adminPortal_paymentAction";

const drawerWidth = 240;

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
        marginBottom: '10px',
      },
    //    tooltip: {
    //     "&:hover": {
    //       backgroundColor: "red",
    //       color: "white",
    //     },
    //    backgroundColor: "blue",
    // },
    tooltip: {
      backgroundColor: '#0E397F', // Change default background color
      color: 'white',
      '&:hover': {
        backgroundColor: '#0E397F', // Change background color on hover
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

function AdminPayment({colorThem}) {
    const state = useSelector((state) => state);
  const token = JSON.parse(localStorage.getItem("admin"));
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [calllerIdNumbers, setCallerIdNumbers] = useState([])
  const [radioValue, setRadioValue] = useState("");


  useEffect(() => {
    dispatch(getAdminPayment(radioValue));
    dispatch(getAllUsers(""));
  }, [radioValue]);

  useEffect(()=>{
    if(userId !== ""){
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
      .catch((error) => {
      });
    }
  },[userId])

// =======table=======>
    const columns = [
      {
        field: "created_date",
        headerName: "Created",
        width: 160,
        headerAlign: "center",
        align: "center",
        headerClassName: "custom-header",
        renderCell: (params) => {
          if (params.value !== null) {
            const date = new Date(params.value);
            var day = date.getUTCDate();
            var month = date.getUTCMonth() + 1; // Month starts from 0
            var year = date.getUTCFullYear();
            var hours = date.getUTCHours();
            var minutes = date.getUTCMinutes();
            var seconds = date.getUTCSeconds();
  
            // Formatting single-digit day/month with leading zero if needed
            day = (day < 10 ? "0" : "") + day;
            month = (month < 10 ? "0" : "") + month;
  
            // Formatting single-digit hours/minutes/seconds with leading zero if needed
            hours = (hours < 10 ? "0" : "") + hours;
            minutes = (minutes < 10 ? "0" : "") + minutes;
            seconds = (seconds < 10 ? "0" : "") + seconds;
  
            var formattedDate =
              "<span style='color: blue'>" +
              day +
              "/" +
              month +
              "/" +
              year +
              "</span>" +
              " " +
              "<span style='color: green'>" +
              hours +
              ":" +
              minutes +
              ":" +
              seconds +
              "</span>";
  
            return (<><span style={{ color: "blue" }}>{day}/{month}/{year}</span>&nbsp;
              <span style={{ color: "green" }}>{hours}:{minutes}:{seconds}</span></>);
          }
        },
      },
  
      {
        field: "status",
        headerName: "Status",
        width: 150,
        headerClassName: "custom-header",
        headerAlign: "center",
        align: "center",
        renderCell: (params) => {
          return (
            <div className="d-flex justify-content-between align-items-center">
              {params.row.status === "success" ? (
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
                    Success
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
                    Failed
                  </div>
                </>
              )}
            </div>
          );
        },
      },
     
        {
            field: "username",
            headerName: "UserName",
            width: 130,
            headerClassName: "custom-header",
            headerAlign: "center",
            align: "center",
          },
        {
          field: "email",
          headerName: "Email",
          width: 200,
          headerClassName: "custom-header",
          headerAlign: "center",
          align: "center",
        },
        {
          field: "contact",
          headerName: "Contact",
          type: "number",
          width: 150,
          headerAlign: "center",
          align: "center",
          headerClassName: "custom-header",
          
        },
      
        {
          field: "order_id",
          headerName: "Order ID",
          headerClassName: "custom-header",
          headerAlign: "center",
          width: 100,
          align: "center",
        },
        {
          field: "payment_id",
          headerName: "Payment ID",
          headerClassName: "custom-header",
          headerAlign: "center",
          width: 150,
          align: "center",
        },
        {
            field: "amount",
            headerName: "Amount",
            headerClassName: "custom-header",
            headerAlign: "center",
            width: 150,
            align: "center",
          },
     
      ];
    
      const rows = useMemo(() => {
        const calculatedRows = [];
        state?.getAdminPayment?.payment &&
          state?.getAdminPayment?.payment?.forEach((item, index) => {
            calculatedRows.push({
              id: index + 1,
              username: item?.username,
              email:item?.email,
              contact:item?.contact,
              order_id: item.order_id,
              payment_id: item.payment_id,
              amount: item.amount,
              status: item.status,
              created_date: item.created_date
            });
          });
        return calculatedRows;
      }, [state?.getAdminPayment?.payment]);
    
      const num = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
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
                <div className="col-lg-12"
                >
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
                              <h3>Payment</h3>
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
         <FormControlLabel value="success" control={<Radio />} label="Success" />
        <FormControlLabel value="failed" control={<Radio />} label="Failed" />
        {/* <FormControlLabel value="s" control={<Radio />} label="Assign" />
        <FormControlLabel value="s" control={<Radio />} label="Unassign" /> */}
      </RadioGroup>
    </FormControl>
                        </div>

                          <ThemeProvider theme={theme}>
                          <div style={{ height: '100%', width: '100%' }}>
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

export default AdminPayment;