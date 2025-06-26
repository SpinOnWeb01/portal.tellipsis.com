import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Close, Delete, Edit, Visibility } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  FormControl,
  IconButton,
  InputLabel,
  Modal,
  TextField,
  Typography,
  Select,
  MenuItem,
  createTheme,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  DataGrid,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import "../../style.css";
import { json, useNavigate } from "react-router-dom";
import { makeStyles, ThemeProvider } from "@mui/styles";
import "../../Switcher.scss";
import { useDispatch, useSelector } from "react-redux";
import { StyledDataGrid } from "../../pages/CustomDataGrid";
import { createAdminRoles, getAdminRoles, updateAdminRoles } from "../../redux/actions/adminPortal/adminPortal_rolesAction";
const drawerWidth = 240;

// =======modal-popup---->
const style = {
  padding: "20px !Important",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  // backgroundColor: "rgb(9, 56, 134)",
  // border: '2px solid #000',
  boxShadow: 24,
};

// ====table----->

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
      {/* <GridToolbarExport /> */}
    </GridToolbarContainer>
  );
}

function AdminRoles({ colorThem }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [roleId, setRoleId] = useState("");
  const [status, setStatus] = useState("true");
  const [description, setDescription] = useState("");
  const [response, setResponse] = useState("");
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setRoleName("");
    setRoleId("");
    setDescription("");
    setStatus("true");
  };
  const handleEditCampaignOpen = () => setEdit(true);
  const handleEditCampaignClose = () => {
    setEdit(false);
    setRoleName("");
    setStatus("true");
    setDescription("");
    setRoleId("");
  };

  useEffect(() => {
    dispatch(getAdminRoles());
  }, [dispatch, response]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "roleName":
        setRoleName(value);
        break;
      case "status":
        setStatus(value);
        break;
      case "description":
        setDescription(value);
        break;
      default:
        break;
    }
  };

  const handleEdit = (data) => {
    handleEditCampaignOpen();
    setRoleName(data?.name);
    setRoleId(data?.role_id);
    setStatus(data?.status === true ? "true" : "false");
    setDescription(data?.description);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const request = {
      name: roleName,
      is_active: status,
      description: description,
    };
    dispatch(createAdminRoles(request, handleClose, setResponse));
  };
  const handleUpdate = () => {
    const request = {
      role_id: roleId,
      name: roleName,
      is_active: status,
      description: description,
    };
    dispatch(
      updateAdminRoles(request, handleEditCampaignClose, setResponse)
    );
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));

  const columns = [
    {
      field: "view_buyer",
      headerName: "Action",
      headerClassName: "custom-header",
      headerAlign: "start",
      align: "start",
      sortable: false,
      width: isXs ? 80 : 80,
      minWidth: 80,
      maxWidth: 80,
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.2vw)", fontWeight: "bold",color:"white !important" }}
        >
          Action
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            <Tooltip title="Edit" disableInteractive interactive>
              <IconButton onClick={() => handleEdit(params.row)}>
                <Edit
                  index={params.row.id}
                  style={{
                    cursor: "pointer",
                    color: "#42765f",
                    fontSize: isMobile ? "12px" : "18px",
                  }}
                />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      headerClassName: "custom-header",
      headerAlign: "start",
      align: "start",
      width: isXs ? 100 : 140,
      minWidth: 100,
      maxWidth: 140,
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.2vw)", fontWeight: "bold",color:"white !important" }}
        >
          Name
        </Typography>
      ),
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.2vw)" }} // Match header size or set your own
        >
          {params.value}
        </Typography>
      ),
    },
    
    {
      field: "description",
      headerName: "Description",
      headerClassName: "custom-header",
      headerAlign: "start",
      align: "start",
      width: isXs ? 200 : 260,
      minWidth: 200,
      maxWidth: 260,
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{ fontSize: "calc(0.6rem + 0.2vw)", fontWeight: "bold",color:"white !important" }}
        >
          Description
        </Typography>
      ),
      renderCell: (params) => (
        <span
          style={{
            textTransform: "capitalize",
            fontSize: "calc(0.6rem + 0.2vw)",
          }}
        >
          {params.row.description}
        </span>
      ),
    },
    {
          field: "status",
          headerName: "Status",
          width: isXs ? 100 : 100,
          minWidth: 70,
          maxWidth: 100,
          headerClassName: "custom-header",
          headerAlign: "left",
          align: "left",
          renderHeader: () => (
            <Typography
              variant="body2"
              sx={{
                fontSize: "calc(0.6rem + 0.2vw)",
                fontWeight: "bold",
                color: "white !important",
              }}
            >
              Status
            </Typography>
          ),
          renderCell: (params) => {
            return (
              <div className="d-flex justify-content-between align-items-center">
                {params.row.status === true ? (
                  <>
                    <div
                      style={{
                        color: "white",
                        background: "green",
                        padding: isMobile ? "5px" : "7px",
                        borderRadius: "5px",
                        fontSize: "calc(0.6rem + 0.2vw)",
                        textTransform: "capitalize",
                        textAlign: "center",
                      }}
                    >
                      active
                    </div>
                  </>
                ):(
                  <>
                    <div
                      style={{
                        color: "white",
                        background: "red",
                        padding: isMobile ? "5px" : "7px",
                        borderRadius: "5px",
                        fontSize: "calc(0.6rem + 0.2vw)",
                        textTransform: "capitalize",
                      }}
                    >
                      Deactive
                    </div>
                  </>
                )}
              </div>
            );
          },
        },
  ];

  const mockDataTeam = useMemo(() => {
    const calculatedRows = [];
    state?.getAdminRoles?.roles &&
      state?.getAdminRoles?.roles.forEach((item, index) => {
        calculatedRows.push({
          id: index + 1,
          name: item?.name,
          description: item?.description,
          status: item?.is_active,
          role_id: item?.id,
        });
      });
    return calculatedRows;
  }, [state?.getAdminRoles?.roles]);

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
            {/* ========== */}
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="pills-home"
                      role="tabpanel"
                      aria-labelledby="pills-home-tab"
                    >
                      <div
                        className="cntnt_title"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "end",
                        }}
                      >
                        <div>
                          <h3
                            style={{
                              margin: "0px",
                              color: "#f5751D",
                              fontWeight: "500",
                              fontSize: "2rem",
                            }}
                          >
                            Roles
                          </h3>
                          {/* <p>A ring group is a set of destinations that can be called with a ring strategy. </p> */}
                        </div>
                        {/* ==Add-modal== */}
                        <div>
                          <IconButton
                          size="small"
                            className="all_button_clr"
                            onClick={handleOpen}
                            aria-label="Add Campaign"
                            sx={{
                              // You can add custom styles here if needed
                              // For example:
                              color: "primary.main",
                              "&:hover": {
                                backgroundColor: "action.hover",
                              },
                            }}
                          >
                            Add Role <AddOutlinedIcon sx={{ ml: 1 }} />
                          </IconButton>
                        </div>

                        {/* -----   Add Role Modal Start   ----- */}

                        <Dialog
                          open={open}
                          onClose={handleClose}
                          sx={{ textAlign: "center" }}
                        >
                          <Box>
                            <IconButton
                              onClick={handleClose}
                              sx={{
                                float: "inline-end",
                                display: "flex",
                                justifyContent: "end",
                                margin: "10px 10px 0px 0px",
                              }}
                            >
                              <Close />
                            </IconButton>
                          </Box>
                          <DialogTitle
                            className="modal_heading"
                            sx={{
                              color: "#133325",
                              fontWeight: "600",
                              width: "500px",
                            }}
                          >
                            Add Role
                          </DialogTitle>
                          <DialogContent>
                            <form>
                              <form
                                style={{
                                  textAlign: "center",
                                  // height: "348px",
                                  height: "230px",
                                  // overflow: "auto",
                                  paddingTop: "10px",
                                  padding: "5px",
                                  width: "auto",
                                }}
                              >
                                <TextField
                                  style={{ width: "100%", margin: "7px 0" }}
                                  type="text"
                                  label="Name"
                                  variant="outlined"
                                  value={roleName}
                                  onChange={(e) => {
                                    setRoleName(e.target.value);
                                  }}
                                />
                                
                                 <br />                               
                                <FormControl
                                  fullWidth
                                  style={{
                                    width: "100%",
                                    margin: "7px 0",
                                  }}
                                >
                                  <InputLabel id="demo-simple-select-label">
                                    Status
                                  </InputLabel>

                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Status"
                                    helperText="Select the language."
                                    style={{ textAlign: "left" }}
                                    value={status}
                                    onChange={(e) => {
                                      setStatus(e.target.value);
                                    }}
                                  >
                                    <MenuItem value={"true"}>Active</MenuItem>
                                    <MenuItem value={"false"}>Deactive</MenuItem>
                                  </Select>
                                </FormControl>
                                <br />
                                <TextField
                                  style={{ width: "100%", margin: "7px 0" }}
                                  type="text"
                                  label="Description"
                                  variant="outlined"
                                  value={description}
                                  onChange={(e) =>
                                    setDescription(e.target.value)
                                  }
                                />
                              </form>
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
                          </DialogActions>
                        </Dialog>

                        {/* -----   Add Role Modal End   ----- */}
                      </div>
                    </div>
                  </div>
                  {/* ----------------------------------------------
                     ----------------------------------------------
                     ----------------------------------------------
                     ---------------------------------------------- */}

                  {/* -----   Edit Role Modal Start   ----- */}
                  <Dialog
                    open={edit}
                    onClose={handleEditCampaignClose}
                    sx={{ textAlign: "center" }}
                  >
                    <Box>
                      <IconButton
                        onClick={handleEditCampaignClose}
                        sx={{
                          float: "inline-end",
                          display: "flex",
                          justifyContent: "end",
                          margin: "10px 10px 0px 0px",
                        }}
                      >
                        <Close />
                      </IconButton>
                    </Box>
                    <DialogTitle
                      className="modal_heading"
                      sx={{
                        color: "#133325",
                        fontWeight: "600",
                        width: "500px",
                      }}
                    >
                      Update Role
                    </DialogTitle>
                    <DialogContent>
                      <form>
                        <form
                          style={{
                            textAlign: "center",
                            // height: "348px",
                            height: "200px",
                            // overflow: "auto",
                            paddingTop: "10px",
                            padding: "5px",
                            width: "auto",
                          }}
                        >
                          <TextField
                            style={{ width: "100%", margin: " 5px 0 5px 0" }}
                            type="text"
                            label="Name"
                            variant="outlined"
                            name="roleName"
                            value={roleName}
                            onChange={handleChange}
                          />
                          <br />
                          <FormControl
                            fullWidth
                            style={{
                              width: "100%",
                              margin: "7px 0",
                            }}
                          >
                            <InputLabel id="demo-simple-select-label">
                              Status
                            </InputLabel>

                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              label="Status"
                              helperText="Select the language."
                              style={{ textAlign: "left" }}
                              value={status}
                              onChange={(e) => {
                                setStatus(e.target.value);
                              }}
                            >
                              <MenuItem value={"true"}>Active</MenuItem>
                              <MenuItem value={"false"}>Deactive</MenuItem>
                            </Select>
                          </FormControl>
                          <TextField
                            style={{ width: "100%", margin: " 5px 0 5px 0" }}
                            type="text"
                            label="Description"
                            variant="outlined"
                            name="description"
                            value={description}
                            onChange={handleChange}
                          />
                        </form>
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
                        className="all_button_clr mt-3"
                        color="primary"
                        onClick={handleUpdate}
                      >
                        Update
                      </Button>
                    </DialogActions>
                  </Dialog>
                  {/* -----   Edit Campaign Modal End   ----- */}
                </div>
              </div>
            </div>

            {/* ========== */}

            <ThemeProvider theme={theme}>
              <div style={{ height: "100%", width: "100%" }}>
                <StyledDataGrid
                  rows={mockDataTeam}
                  columns={columns}
                  density="compact"
                  // getRowClassName={(params) =>
                  //   isRowBordered(params)
                  //     ? "borderedGreen"
                  //     : "borderedRed"
                  // }
                  components={{ Toolbar: GridToolbar }}
                  slots={{
                    toolbar: CustomToolbar,
                  }}
                  autoHeight // Automatically adjust the height to fit all rows
                />
              </div>
            </ThemeProvider>
          </Box>
        </div>
      </div>
    </>
  );
}

export default AdminRoles;
