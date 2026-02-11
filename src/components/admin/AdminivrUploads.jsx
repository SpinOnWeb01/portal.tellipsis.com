import { Box, ListItemText, ThemeProvider, Tooltip, createTheme } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { makeStyles } from "@mui/styles";
import { DataGrid, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from "@mui/x-data-grid";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Backdrop from "@mui/material/Backdrop";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircleFilled';
import {api} from '../../mockData'
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
import { getAllUsers } from "../../redux/actions/adminPortal/userAction";
import {
  createAdminRecording,
  getAdminRecording,
} from "../../redux/actions/adminPortal/adminPortal_recordingAction";
import { toast } from "react-toastify";
import { Close, Delete, Edit, PlayArrow } from "@mui/icons-material";
import axios from "axios";

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

function AdminivrUploads({ colorThem }) {
  const state = useSelector((state) => state);
  const handleOpen = () => setOpen(true);
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [userId, setUserId] = useState("");
  const [id, setId] = useState("");
  const [response, setResponse] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleTogglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
    setUserId("");
    setName("");
  };
  // ======Edite-------->
  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
    setId("");
  }, [setOpenModal, setId]);
  // ======End-Edite-------->

  const handleUpdate = useCallback(
    async (e) => {
      e.preventDefault();
      if (file) {
        const token = JSON.parse(localStorage.getItem("admin"));
        const formData = new FormData();
        formData.append("file", file);
        formData.append("id", id);

        // dispatch(createAdminRecording(formData, setResponse, setUserId, setName));
        try {
          const response = await axios.put(
            `${api.dev}/api/recording`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token.access_token} `,
              },
            }
          );
          if (response.data.status === 200) {
            toast.success(response.data.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1500,
            });
            handleCloseModal();
            setResponse(response);
            //   navigate("/"})
          } else {
            toast.error(response.data.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1500,
            });
          }
        } catch (error) {
          toast.error(error?.response?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2500,
          });
        }
      } else {
        console.warn("No file selected.");
      }
    },
    [file, id, handleCloseModal, setResponse]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      const token = JSON.parse(localStorage.getItem("admin"));
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", name);
      formData.append("user_id", userId);

      // dispatch(createAdminRecording(formData, setResponse, setUserId, setName));
      try {
        const response = await axios.post(
          `${api.dev}/api/recording`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token.access_token} `,
            },
          }
        );
        if (response.data.status === 200) {
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          });
          handleClose();
          setResponse(response);
          //   navigate("/"})
        } else {
          toast.error(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          });
        }
      } catch (error) {
        toast.error(error?.response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
        });
      }
    } else {
      console.warn("No file selected.");
    }
  };

  const handleOnChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleButtonClick = useCallback((row) => {
    setOpenModal(true);
    setFile(row.file);
    setFileName(row.name);
    setId(row.recordingId);
  }, []); // Memoize event handler

  const columns = [
    {
      field: "username",
      headerName: "UserName",
      width: 200,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Announcement Recordings",
      width: 200,
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
    // {
    //   field: "id",
    //   headerName: "ID",
    //   headerClassName: "custom-header",
    //   headerAlign: "center",
    //   align: "center",
    //   width: 120,
    // },

    {
      field: "created_date",
      headerName: "Created Date",
      width: 170,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        if (params.value !== null) {
          const date = new Date(params.value);
          var day = date.getUTCDate();
          var month = date.getUTCMonth() + 1; // Month starts from 0
          var year = date.getUTCFullYear();
       

          // Formatting single-digit day/month with leading zero if needed
          day = (day < 10 ? "0" : "") + day;
          month = (month < 10 ? "0" : "") + month;

          // Formatting single-digit hours/minutes/seconds with leading zero if needed
       
          var formattedDate =
            day +
            "/" +
            month +
            "/" +
            year +
            " " ;
          return (<><span style={{color:"blue"}}>{day}/{month}/{year}</span></>);
        }
      },
    },
    {
      field: "updated_date",
      headerName: "Updated Date",
      width: 150,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      renderCell: (params) => {
        if (params.value !== null) {
          const date = new Date(params.value);
          var day = date.getUTCDate();
          var month = date.getUTCMonth() + 1; // Month starts from 0
          var year = date.getUTCFullYear();
       

          // Formatting single-digit day/month with leading zero if needed
          day = (day < 10 ? "0" : "") + day;
          month = (month < 10 ? "0" : "") + month;

          // Formatting single-digit hours/minutes/seconds with leading zero if needed
       
          var formattedDate =
            day +
            "/" +
            month +
            "/" +
            year +
            " " ;
          return (<><span style={{color:"brown"}}>{day}/{month}/{year}</span></>);
        }
      },
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      sortable: false,
      width: 350,
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            {/* <IconButton>
                <PlayArrow style={{ cursor: "pointer", color: "grey" }} />
              </IconButton> */}
              <Tooltip title="Edit" disableInteractive interactive>
            <IconButton onClick={() => handleButtonClick(params.row)}>
              <Edit
                //onClick={() => handleOpen(params.row)}

                index={params.row.id}
                style={{ cursor: "pointer", color: "#0e397f" }}
              />
            </IconButton>
            </Tooltip>
      <Tooltip title={isPlaying ? "Pause" : "Play"}>
        {/* <IconButton onClick={handleTogglePlay}>
          {isPlaying ? (
            <PauseCircleIcon style={{ cursor: "pointer", color: "#0e397f" }} />
          ) : (
            <PlayCircleIcon style={{ cursor: "pointer", color: "#0e397f" }} />
          )}
        </IconButton> */}
          <audio controls style={{padding:"12px"}}>
            <source src={`${api.dev}/api/getrecording/${params.row.recordingId}`} type="audio/wav"/>
            </audio>
      </Tooltip>
    
            {/* <IconButton onClick={() => handleMessage(params?.row?.username)}>
                <Delete style={{ cursor: "pointer", color: "red" }} />
              </IconButton> */}
          </div>
        );
      },
    },
    {
      field: "barging",
      headerName: "",
      width: 120,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
          
          </div>
        );
      },
    },
  ];

  const isRowBordered = (params) => {
    // const { row } = params;
    // // Add your condition here, for example, adding border to rows where age is greater than 25
    // return row.status === "Ok";
  };

  useEffect(() => {
    dispatch(getAllUsers("t"));
    //   if(state?.allUsers?.error === 401){
    //  localStorage.removeItem("admin");
    //       navigate("/");
    //   }
    dispatch(getAdminRecording());
  }, [response]);

  const mockDataTeam = useMemo(() => {
    const calculatedRows = [];
    state?.getAdminRecording?.getRecording &&
      state?.getAdminRecording?.getRecording?.forEach((item, index) => {
        const createdDate = new Date(item.created_date).toISOString();
        const updatedDate = new Date(item.updated_date).toISOString();
        calculatedRows.push({
          id: index + 1,
          created_date: createdDate,
          file: item?.file,
          name: item?.name,
          updated_date: updatedDate,
          username: item?.username,
          recordingId: item?.id,
        });
      });
    return calculatedRows;
  }, [state?.getAdminRecording?.getRecording]);

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
                        <h3>Recordings</h3>
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
                                        <MenuItem key={index} value={item?.id}>
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
                                name="name"
                                value={name}
                                onChange={(e) => {
                                  setName(e.target.value);
                                }}
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

                      {/* ==Edite-modal== */}

                      <Dialog
                        open={openModal}
                        onClose={handleCloseModal}
                        sx={{ textAlign: "center" }}
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
                                  label="File Name"
                                  value={file}
                                  onChange={(e) => setFileName(e.target.value)}
                                  disabled
                                />
                                <br />
                                <input
                                  style={{
                                    //width: "100%",
                                    margin: "7px 0",
                                    textAlign: "center !important",
                                  }}
                                  type={"file"}
                                  onChange={handleOnChange}
                                />
                                <br />

                                <br />
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
                    </div>

                    <div className="row">
                      <ThemeProvider theme={theme}>
                      <div style={{ height: '100%', width: '100%' }}>
                          <DataGrid
                            // checkboxSelection
                            rows={mockDataTeam}
                            columns={columns}
                            headerClassName="custom-header"
                            //  getRowClassName={(params) =>
                            //    isRowBordered(params)
                            //      ? classes.borderedGreen
                            //      : classes.borderedRed
                            //  }
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
          </Box>
        </div>
      </div>
    </>
  );
}

export default AdminivrUploads;
