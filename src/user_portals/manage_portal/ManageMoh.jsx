import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import {
  Box,
  Button,
  Checkbox,
  Fade,
  FormControl,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";
import { Close, Edit } from "@mui/icons-material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DataGrid,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import Backdrop from "@mui/material/Backdrop";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ThemeProvider } from "@emotion/react";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { api } from "../../mockData";
import {
  createManageMoh,
  getManageMoh,
  updateManageMoh,
} from "../../redux/actions/managePortal/managePortal_mohAction";

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
      <GridToolbarColumnsButton />
      <GridToolbarDensitySelector />
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

function ManageMoh() {
  const current_user = localStorage.getItem("current_user");
  const token = localStorage.getItem(`user_${current_user}`);
  const [userId, setUserId] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [values, setValues] = useState([]);
  const [recordings, setRecordings] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [response, setResponse] = useState("");
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setUserId("");
    setRecordings([]);
    setName("");
    setValues([]);
  };

  // ======Edite-------->
  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
    setId("");
    setName("");
    setRecordings([]);
    setUserId("");
    setValues([]);
  }, [setOpenModal, setId, setName, setRecordings, setValues]);
  // ======End-Edite-------->

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = JSON.stringify({
      name: name,
      recordings: recordings,
    });
    dispatch(
      createManageMoh(
        data,
        setOpen,
        setResponse,
        setName,
        setUserId,
        setRecordings,
        setValues,
      ),
    );
  };

  const handleButtonClick = useCallback((row) => {
    setOpenModal(true);
    setUserId(row?.user_id);
    setName(row?.name); // Generate numeric IDs for playlist_entries
    // const numericEntries = row?.playlist_entries.map((entry, index) => index + 1);
    // setRecordings(numericEntries);
  }, []); // Memoize event handler

  const handleUpdate = (e) => {
    e.preventDefault();
    let data = JSON.stringify({
      name: name,
      recordings: recordings,
    });
    dispatch(
      updateManageMoh(
        data,
        setOpenModal,
        setResponse,
        setName,
        setUserId,
        setRecordings,
        setValues,
      ),
    );
  };

  useEffect(() => {
    dispatch(getManageMoh());
  }, [response]);

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${api.dev}/api/getuserprofilerecordings`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(token).access_token} `,
      },
    };
    axios
      .request(config)
      .then((response) => {
        setValues(response?.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [open, openModal]);

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
      width: 200,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
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
      field: "playlist_entries",
      headerName: "Playlist",
      // width: 550,
      flex: 1,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <span>
          {params.value &&
            params.value.map((entry, index) => (
              <span key={index}>
                {entry}
                {index < params.value.length - 1 && ", "}
              </span>
            ))}
        </span>
      ),
    },
  ];

  const rows = useMemo(() => {
    const calculatedRows = [];
    state?.getManageMoh?.getMoh &&
      state?.getManageMoh?.getMoh?.forEach((item, index) => {
        calculatedRows.push({
          id: index + 1,
          name: item.name,
          playlist_entries: item.playlist_entries,
          user_id: item.user_id,
          mohId: item.id,
          username: item.username,
        });
      });
    return calculatedRows;
  }, [state?.getManageMoh?.getMoh]);
  return (
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
                        <h3>Music On Hold</h3>
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
                              className="close-icon pt-0"
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
                              Add Music On Hold
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
                              <FormControl
                                style={{
                                  width: "100%",
                                  margin: " 5px 0 5px 0",
                                }}
                              >
                                <InputLabel id="demo-multiple-checkbox-label">
                                  Recordings
                                </InputLabel>
                                <Select
                                  style={{ textAlign: "left" }}
                                  labelId="demo-multiple-checkbox-label"
                                  label="Recordings"
                                  id="demo-multiple-checkbox"
                                  multiple
                                  fullWidth
                                  value={recordings}
                                  onChange={(e) => {
                                    setRecordings(e.target.value);
                                  }}
                                  input={<OutlinedInput label="Recordings" />}
                                  renderValue={(selected) =>
                                    selected
                                      .map(
                                        (value) =>
                                          values?.data.find(
                                            ([num, name]) => num === value,
                                          )[1],
                                      )
                                      .join(", ")
                                  }
                                  MenuProps={MenuProps}
                                >
                                  {values?.data?.map(([num, name]) => (
                                    <MenuItem key={name} value={num}>
                                      <Checkbox
                                        checked={recordings.includes(num)}
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
                    {/* -----   Edit Recording Modal Start   ----- */}
                    <Dialog
                      open={openModal} //onClose={handleCloseModal}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          paddingTop: "10px",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
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
                          Edit Music on Hold
                        </Typography>
                        <IconButton
                          className="close_icon"
                          onClick={handleCloseModal}
                          sx={{ float: "inline-end" }}
                        >
                          <Close />
                        </IconButton>
                      </Box>

                      <DialogContent sx={{ pt: "0" }}>
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
                              type="text"
                              label="Name"
                              variant="outlined"
                              padding={"0px 0 !important"}
                              name="name"
                              value={name}
                              onChange={(e) => {
                                setName(e.target.value);
                              }}
                            />
                            <br />
                            <FormControl
                              style={{
                                width: "100%",
                                margin: " 5px 0 5px 0",
                              }}
                            >
                              <InputLabel id="demo-multiple-checkbox-label">
                                Recordings
                              </InputLabel>
                              <Select
                                style={{ textAlign: "left" }}
                                labelId="demo-multiple-checkbox-label"
                                label="Recordings"
                                id="demo-multiple-checkbox"
                                multiple
                                fullWidth
                                value={recordings}
                                onChange={(e) => {
                                  setRecordings(e.target.value);
                                }}
                                input={<OutlinedInput label="Recordings" />}
                                renderValue={(selected) =>
                                  selected
                                    .map(
                                      (value) =>
                                        values?.data.find(
                                          ([num, name]) => num === value,
                                        )[1],
                                    )
                                    .join(", ")
                                }
                                MenuProps={MenuProps}
                              >
                                {values?.data?.map(([num, name]) => (
                                  <MenuItem key={name} value={num}>
                                    <Checkbox
                                      checked={recordings.includes(num)}
                                    />
                                    <ListItemText primary={name} />
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
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
  );
}

export default ManageMoh;
