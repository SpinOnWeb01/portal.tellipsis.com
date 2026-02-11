import { Box, ThemeProvider, Tooltip, createTheme, } from '@mui/material';
import React, { useEffect, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import { DataGrid, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid';
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Backdrop from "@mui/material/Backdrop";
import { useDispatch, useSelector } from "react-redux";

// import { makeStyles } from "@mui/styles";
import {
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
  } from "@mui/material";
import { Close } from '@mui/icons-material';

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
const drawerWidth = 240;
// const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 500,
//     bgcolor: "background.paper",
//     // border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
//   };

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
      <GridToolbarColumnsButton/>
      <GridToolbarDensitySelector />
      <GridToolbarFilterButton/>
    </GridToolbarContainer>
  );
};


function AdminRecording({colorThem}) {
    const state = useSelector((state) => state);
    const handleOpen = () => setOpen(true);
    const dispatch = useDispatch();
    const [extensionNumber, setExtensionNumber] = useState("");
    const [extensionId, setExtensionId] = useState("");
    const [file, setFile] = useState();
    const [password, setPassword] = useState("");
    const [userId, setUserId] = useState("");
    const [response, setResponse] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [numExtensions, setNumExtensions] = useState("");
    const [status, setStatus] = useState("");
    const [callerId, setCallerId] = useState("");

    const classes = useStyles();
   
    
    const handleClose = () => {
        setOpen(false);
        setExtensionNumber("");
        setPassword("");
        setUserId("");
        setNumExtensions("");
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        let data = JSON.stringify({
          num_extensions:numExtensions,
          user_id: userId,
          
        });
    
        dispatch(
          
        );
      };

      const handleOnChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
      };

    const mockDataTeam =[{
      id: 1,
      name:"lalit"
    }]

      const columns = [
        {
          field: "created_date",
          headerName: "Created Date",
          width: 170,
          headerClassName: "custom-header",
          headerAlign: "center",
          align: "center",
        },
        {
          field: "file",
          headerName: "File",
          width: 160,
          headerClassName: "custom-header",
          headerAlign: "center",
          align: "center",
        },
        {
          field: "id",
          headerName: "ID",
          headerClassName: "custom-header",
          headerAlign: "center",
          align: "center",
          width: 120,
        },
        {
          field: "name",
          headerName: "Name",
          width: 200,
          headerClassName: "custom-header",
          headerAlign: "center",
          align: "center",
        },
        {
          field: "updated_date",
          headerName: "Updated Date",
          width: 150,
          headerAlign: "center",
          align: "center",
          headerClassName: "custom-header",
        },
    
        {
          field: "username",
          headerName: "UserName",
          width: 200,
          headerClassName: "custom-header",
          headerAlign: "center",
          align: "center",
        },
       
      ];


      const isRowBordered = (params) => {
        // const { row } = params;
        // // Add your condition here, for example, adding border to rows where age is greater than 25
        // return row.status === "Ok";
      };

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
                          <div
                            className="cntnt_title"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "end",
                            }}
                          >
                            <div>
                              <h3>Recording</h3>
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
                                    Add Recording
                                  </Typography>
                                  <form
                                    style={{
                                      textAlign: "center",
                                      textAlign: "center",
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
                                   
                                     <TextField
                                      style={{
                                        width: "100%",
                                        margin: " 5px 0 5px 0",
                                      }}
                                      type="text"
                                      label="name"
                                      variant="outlined"
                                      padding={"0px 0 !important"}
                                      name="extensionNumber"
                                    //   value={extensionNumber}
                                    //   onChange={(e) => {
                                    //     setExtensionNumber(e.target.value);
                                    //   }}
                                    />
                                     <br />

                                
<input
  style={{
    //width: "100%",
    margin: "7px 0",
    textAlign: "center !important",
  }}
  type={"file"}
  // id={"csvFileInput"}
  // accept={".csv"}
  onChange={handleOnChange}
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
                 
                 <div className="row">
                 <ThemeProvider theme={theme}>
                 <Box className="tbl_container">
                     <DataGrid
                       // checkboxSelection
                       className="tbl_innr_box"
                       rows={mockDataTeam}
                       columns={columns}
                       headerClassName="custom-header"
                       getRowClassName={(params) =>
                         isRowBordered(params)
                           ? classes.borderedGreen
                           : classes.borderedRed
                       }
                       components={{ Toolbar: GridToolbar }}
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
       </Box>
     </div>
   </div>
 </>
  )
}

export default AdminRecording;