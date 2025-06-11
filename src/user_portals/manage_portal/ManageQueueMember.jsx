import React, { useCallback, useEffect, useMemo, useState } from "react";
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
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  OutlinedInput,
  Checkbox,
  ListItemText,
  DialogContentText,
  Tooltip,
} from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import Backdrop from "@mui/material/Backdrop";
import { useDispatch, useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Close, Delete } from "@mui/icons-material";
import {
  createManageQueueMember,
  deleteManageQueueMember,
  getManageQueueMember,
} from "../../redux/actions/managePortal/managePortal_queueAction";
import DeleteIcon from "@mui/icons-material/Delete";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { api } from "../../mockData";
import axios from "axios";

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

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton/>
      <GridToolbarDensitySelector />
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

function ManageQueueMember() {
  const current_user = localStorage.getItem("current_user");
  const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [response, setResponse] = useState("");
  const [open, setOpen] = React.useState(false);
  const [queueName, setQueueName] = useState("");
  const [queue, setQueue] = useState([]);
  const [extension, setExtension] = useState([]);
  const [extensionNumber, setExtensionNumber] = useState([]);
  const [alertMessage, setAlertMessage] = useState(false);
  const [uniqueId, setUniqueId] = useState("");
  const [name, setName] = useState("");

  const handleAlertClose = () => {
    setUniqueId("")
    setAlertMessage(false);
  }
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setExtensionNumber([]);
    setExtension([]);
    setQueueName("");
    setQueue([]);
  };

  useEffect(() => {
    dispatch(getManageQueueMember());
  }, [response, dispatch]); // Empty dependency array ensures this effect runs once on mount

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = JSON.stringify({
      queue: queueName,
      extensions: extension,
    });

    dispatch(
      createManageQueueMember(
        data,
        setOpen,
        setResponse,
        setQueueName,
        setExtension
      )
    );
  };

  const handleMessage = useCallback((data) => {
    setName(data?.extension)
    setUniqueId(data?.uniqueid)
    setAlertMessage(true);
  }, [setName]); // Memoize event handler

  const handleDelete = useCallback(
    (id) => {
      dispatch(deleteManageQueueMember({ id: uniqueId }, setResponse, setUniqueId));
       setAlertMessage(false);
    },
    [uniqueId,dispatch, setResponse, setUniqueId]
  ); // Memoize event handler

  useEffect(() => {
    if (open === true) {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${api.dev}/api/getuserprofileextensions`,
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
          console.log("error", error);
        });

      let copo = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${api.dev}/api/getuserprofilequeues`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token} `,
        },
      };
      axios
        .request(copo)
        .then((response) => {
          setQueue(response?.data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [open, token.access_token]);

  const columns = [
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
    {
      field: "id",
      headerName: "Sr no",
      headerClassName: "custom-header",
      headerAlign: "center",
      width: 300,
      align: "center",
    },
    {
      field: "extension",
      headerName: "Extension",
      headerClassName: "custom-header",
      headerAlign: "center",
      width: 300,
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
      width: 300,
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
    state?.getManageQueueMember?.getQueueMember &&
      state?.getManageQueueMember?.getQueueMember?.forEach((item, index) => {
        calculatedRows.push({
          id: index + 1,
          extension: item?.extension,
          interface: item?.interface,
          queue: item?.queue,
          uniqueid: item?.id,
          user_id: item?.user_id,
        });
      });
    return calculatedRows;
  }, [state?.getManageQueueMember?.getQueueMember]);
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
                          <h3>Queue Member</h3>
                          {/* <p>
                            Quickly access information and tools related to your
                            account.
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
                                Add Queue Member
                              </Typography>
                              <form
                                style={{
                                  textAlign: "center",
                                  // height: "400px",
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
                                    label="Extension"
                                    id="demo-multiple-checkbox"
                                    multiple
                                    fullWidth
                                    value={extension}
                                    onChange={(e) => {
                                      setExtension(e.target.value);
                                    }}
                                    input={<OutlinedInput label="Extension" />}
                                    renderValue={(selected) =>
                                      selected.join(", ")
                                    }
                                    MenuProps={MenuProps}
                                  >
                                    {extensionNumber?.data?.map((name) => (
                                      <MenuItem key={name} value={name}>
                                        <Checkbox
                                          checked={extension.indexOf(name) > -1}
                                        />
                                        <ListItemText primary={name} />
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>

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

                      {/* <!--table---> */}
                      <ThemeProvider theme={theme}>
                        <div style={{ height: "100%", width: "100%" }}>
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

export default ManageQueueMember;
