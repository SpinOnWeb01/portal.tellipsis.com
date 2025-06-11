import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  IconButton,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { DataGrid, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from "@mui/x-data-grid";
import React, { useMemo, useState } from "react";
import { Close, Edit } from "@mui/icons-material";
import Backdrop from "@mui/material/Backdrop";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { getManageRecording } from "../../redux/actions/managePortal/managePortal_recordingAction";
import { api } from "../../mockData";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
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
      <GridToolbarColumnsButton/>
      <GridToolbarDensitySelector />
      <GridToolbarFilterButton/>
    </GridToolbarContainer>
  );
}

function ManageRecording() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const current_user = localStorage.getItem("current_user");
    const data = localStorage.getItem(`user_${current_user}`)
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [response, setResponse] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  const handleButtonClick = useCallback((row) => {
    setOpenModal(true);
    setFile(row.file);
    setFileName(row.name);
    setId(row.recordingId);
  }, []); // Memoize event handler

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      const current_user = localStorage.getItem("current_user");
    const token = localStorage.getItem(`user_${current_user}`)
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", name);

      // dispatch(createAdminRecording(formData, setResponse, setUserId, setName));
      try {
        const response = await axios.post(
          `${api.dev}/api/userrecording`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${JSON.parse(token).access_token} `,
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

  const handleUpdate = useCallback(
    async (e) => {
      e.preventDefault();
      if (file) {
        const current_user = localStorage.getItem("current_user");
    const token = localStorage.getItem(`user_${current_user}`)
        const formData = new FormData();
        formData.append("file", file);
        formData.append("id", id);

        // dispatch(createAdminRecording(formData, setResponse, setUserId, setName));
        try {
          const response = await axios.put(
            `${api.dev}/api/userrecording`,
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

  const handleOnChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  useEffect(() => {
    dispatch(getManageRecording());
  }, [response]); // Empty dependency array ensures this effect runs once on mount

  const columns = [
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
            <Tooltip>
              {/* <IconButton
              //</Tooltip>onClick={() => handleButtonClick(params.row)}
              >
                <PlayCircleIcon
                  style={{ cursor: "pointer", color: "#0e397f" }}
                />
              </IconButton> */}
              <audio controls style={{padding:"12px"}}>
            <source src={`${api.dev}/api/getuserrecording/${params.row.recordingId}`} type="audio/wav"/>
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
      width: 200,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "created_date",
      headerName: "Created Date",
      width: 200,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const valueFormatter = (params) => {
          const date = new Date(params.value);
          return `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`;
        };

        return (
          <div className="d-flex justify-content-between align-items-center">
            <p
              style={{
                fontWeight: "400",
                color: "blue",
                margin: "0",
                textTransform: "capitalize",
              }}
            >
              {valueFormatter(params)}
            </p>
          </div>
        );
      },
    },
    {
      field: "updated_date",
      headerName: "Updated Date",
      width: 200,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
      renderCell: (params) => {
        const valueFormatter = (params) => {
          const date = new Date(params.value);
          return `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`;
        };

        return (
          <div className="d-flex justify-content-between align-items-center">
            <p
              style={{
                fontWeight: "400",
                color: "brown",
                margin: "0",
                textTransform: "capitalize",
              }}
            >
              {valueFormatter(params)}
            </p>
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
          <div className="d-flex justify-content-between align-items-center"></div>
        );
      },
    },
  ];

  const rows = useMemo(() => {
    const calculatedRows = [];
    state?.getManageRecording?.getRecording &&
      state?.getManageRecording?.getRecording?.forEach((item, index) => {
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
  }, [state?.getManageRecording?.getRecording]);
  return (
    <>
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
                          <h3>Recording</h3>
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
                                Add Recording
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
                                    margin: "7px 0",
                                    textAlign: "center !important",
                                  }}
                                  type={"file"}
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
                      {/* <!--table---> */}
                      <ThemeProvider theme={theme}>
                      <div style={{ height: '100%', width: '100%' }}>
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
                      {/* -----   Edit Recording Modal Start   ----- */}
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
                          Edit Recording
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
                      {/* -----   Edit Recording Modal End   ----- */}
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
    </>
  );
}

export default ManageRecording;
