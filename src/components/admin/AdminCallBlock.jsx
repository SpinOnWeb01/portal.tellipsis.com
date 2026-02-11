import { Close, Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Fade,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import InfoIcon from "@mui/icons-material/Info";
import { useDispatch, useSelector } from "react-redux";
import { createManageExtension } from "../../redux/actions/managePortal/managePortal_extensionAction";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import {
  createManageCallBlock,
  deleteManageCallBlock,
  getManageCallBlock,
  updateManageCallBlock,
} from "../../redux/actions/managePortal/managePortal_callBlockAction";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@mui/styles";
import { getAllUsers } from "../../redux/actions/adminPortal/userAction";
import {
  createAdminCallBlock,
  deleteAdminCallBlock,
  getAdminCallBlock,
  updateAdminCallBlock,
  updateCallBlockStaus,
} from "../../redux/actions/adminPortal/adminPortal_callBlockAction";
import BlockIcon from "@mui/icons-material/Block";
import CheckIcon from "@mui/icons-material/Check";
const drawerWidth = 240;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  // backgroundColor: "rgb(9, 56, 134)",
  // border: '2px solid #000',
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
      },
    },
  },
});

const useStyles = makeStyles({
  spacedRow: {
    // Adjust spacing here, e.g., margin, padding, etc.
    marginBottom: "10px",
  },
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
  formControl: {
    "& .MuiInputBase-root": {
      color: "#666",
      borderColor: "transparent",
      borderWidth: "1px",
      borderStyle: "solid",
      height: "45px",
      minWidth: "120px",
      justifyContent: "center",
    },
    "& .MuiSelect-select.MuiSelect-select": {
      paddingRight: "0px",
    },
    "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
      top: "-4px",
    },
  },
  select: {
    width: "auto",
    fontSize: "12px",
    "&:focus": {
      backgroundColor: "transparent",
    },
  },
  selectIcon: {
    position: "relative",
    color: "#6EC177",
    fontSize: "14px",
  },
  paper: {
    borderRadius: 12,
    marginTop: 8,
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
    "& li": {
      fontWeight: 200,
      paddingTop: 8,
      paddingBottom: 8,
      fontSize: "12px",
    },
    "& li.Mui-selected": {
      color: "white",
      background: "#6EC177",
    },
    "& li.Mui-selected:hover": {
      background: "#6EC177",
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

function AdminCallBlock({ colorThem }) {
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [type, setType] = useState("");
  const [callBlockId, setCallBlockId] = useState("");
  const [response, setResponse] = useState("");
  const [isActive, setIsActive] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [userId, setUserId] = useState("");
  const [alertMessage, setAlertMessage] = useState(false);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(100);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const state = useSelector((state) => state);
  const handleOpen = () => setOpen(true);
  const classes = useStyles();

  const handleAlertClose = () => {
    setCallBlockId("");
    setSelectedRows([]);
    setAlertMessage(false);
  };

  useEffect(() => {
    dispatch(getAdminCallBlock());
    dispatch(getAllUsers("t"));
  }, [response]);

  const handleClose = () => {
    setOpen(false);
    setCallBlockId("");
    setDescription("");
    setDetails("");
    setType("");
    setIsActive("");
    setUserId("");
  };

  // =========modal

  const handleButtonClick = useCallback(
    (row) => {
      setOpenModal(true);
      setCallBlockId(row.callBlockId);
      setIsActive(row.is_active);
      setDescription(row.description);
      setDetails(row.details);
      setType(row.type);
    },
    [setIsActive, setCallBlockId, setDescription, setDetails, setType]
  ); // Memoize event handler

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
    setIsActive("");
    setCallBlockId("");
    setDescription("");
    setDetails("");
    setType("");
  }, [setIsActive, setCallBlockId, setDescription, setDetails, setType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = JSON.stringify({
      user_id: userId,
      details: details,
      description: description,
      type: type,
      is_active: isActive,
    });
    dispatch(
      createAdminCallBlock(
        data,
        setOpen,
        setResponse,
        setDescription,
        setDetails,
        setType,
        setIsActive,
        setUserId
      )
    );
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    let data = JSON.stringify({
      id: callBlockId,
      details: details,
      description: description,
      type: type,
      is_active: isActive?.toString()?.charAt(0),
    });
    dispatch(
      updateAdminCallBlock(
        data,
        setOpenModal,
        setResponse,
        setDescription,
        setDetails,
        setType,
        setIsActive
      )
    );
  };

  const handleMessage = useCallback(
    (data) => {
      setName(data?.details);
      setValue(data);
      setCallBlockId(data?.callBlockId);
      setAlertMessage(true);
    },
    [setName, setValue]
  ); // Memoize event handler

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isXs = useMediaQuery(theme.breakpoints.only("xs")); // < 600px
  const isSm = useMediaQuery(theme.breakpoints.only("sm")); // 600px - 900px
  const isMd = useMediaQuery(theme.breakpoints.only("md")); // 900px - 1200px
  const isSmallScreen = useMediaQuery(theme.breakpoints.between("sm"));

  // =======table=======>
  const columns = [
    {
      field: "edit",
      headerName: "Action",
      headerClassName: "custom-header",
      headerAlign: "start",
      align: "start",
      width: isXs ? 90 : 120,
      minWidth: 90,
      maxWidth: 120,
      renderHeader: () => (
        <Typography
          variant="body2"
          sx={{
            fontSize: "calc(0.6rem + 0.2vw)",
            fontWeight: "bold",
            color: "white !important",
          }}
        >
          Action
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            <Tooltip title="edit" disableInteractive interactive>
              <IconButton
                onClick={() => handleButtonClick(params.row)}
                style={{
                  color: "#42765f",
                  fontSize: isMobile ? "10px" : "16px",
                }}
              >
                <Edit index={params.row.id} />
              </IconButton>
            </Tooltip>
            <Tooltip title="delete" disableInteractive interactive>
              <IconButton onClick={() => handleMessage(params?.row)}>
                <Delete
                  style={{
                    cursor: "pointer",
                    color: "red",
                    fontSize: isMobile ? "16px" : "22px",
                  }}
                />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
    {
      field: "username",
      headerName: "User Name",
      width: isXs ? 90 : 140,
      minWidth: 90,
      maxWidth: 140,
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
          User name
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <span
            style={{
              textTransform: "capitalize",
              fontSize: "calc(0.6rem + 0.2vw)",
            }}
          >
            {params.row.username}
          </span>
        );
      },
    },
    {
      field: "details",
      headerName: "Caller ID Number",
      width: isXs ? 110 : 150,
      minWidth: 110,
      maxWidth: 150,
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
          {isSmallScreen ? "Caller ID" : "Caller ID Number"}
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
      field: "type",
      headerName: "Type",
      width: isXs ? 80 : 140,
      minWidth: 80,
      maxWidth: 140,
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
          Type
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
      field: "is_active",
      headerName: "Status",
      width: isXs ? 80 : 140,
      minWidth: 80,
      maxWidth: 140,
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
            {params.row.is_active === true ? (
              <>
                <div
                  style={{
                    color: "green",
                    //  background: "green",
                    padding: isMobile ? "5px" : "7px",
                    borderRadius: "5px",
                    //  fontSize: "12px",
                    textTransform: "capitalize",
                    fontSize: "calc(0.6rem + 0.2vw)",
                  }}
                >
                  Active
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    color: "red",
                    // background: "red",
                    padding: isMobile ? "5px" : "7px",
                    //  borderRadius: "5px",
                    // fontSize: "12px",
                    textTransform: "capitalize",
                    fontSize: "calc(0.6rem + 0.2vw)",
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
    {
      field: "description",
      headerName: "Description",
      width: isXs ? 80 : 140,
      minWidth: 80,
      maxWidth: 140,
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
          Description
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <span
            style={{
              textTransform: "capitalize",
              fontSize: "calc(0.6rem + 0.2vw)",
            }}
          >
            {params.row.description}
          </span>
        );
      },
    },
  ];

  const rows = useMemo(() => {
    const calculatedRows = [];
    state?.getAdminCallBlock?.getCallBlock?.data &&
      state?.getAdminCallBlock?.getCallBlock?.data.forEach((item, index) => {
        calculatedRows.push({
          id: index + 1,
          description: item?.description,
          details: item?.details,
          is_active: item?.is_active,
          type: item?.type,
          username: item?.username,
          callBlockId: item?.id,
        });
      });
    return calculatedRows;
  }, [state?.getAdminCallBlock?.getCallBlock?.data]);

  // ✅ Filter Rows
  const filteredRows = useMemo(() => {
    if (!search) return rows;
    return rows.filter((row) =>
      row.username?.toLowerCase().includes(search.toLowerCase())
    );
  }, [rows, search]);

  // ✅ Pagination Logic
  const totalPages = Math.ceil(filteredRows.length / pageSize);
  const currentRows = filteredRows.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );
  const currentPageRowIds = currentRows.map((row) => row.callBlockId);

  // ✅ Handle Checkbox Selection
  const handleSelectionChange = (newSelection) => {
    setLoading(true);
    setTimeout(() => {
      const updated = new Set(selectedRows);
      currentPageRowIds.forEach((id) => updated.delete(id)); // Clear previous page selection
      newSelection.forEach((id) => updated.add(id)); // Add new selection
      setSelectedRows(updated);
      setLoading(false);
    }, 50);
  };

  // ✅ Get Current Page Selected
  const getCurrentPageSelected = () => {
    if (selectedRows instanceof Set) {
      return currentPageRowIds.filter((id) => selectedRows.has(id));
    } else if (Array.isArray(selectedRows)) {
      return currentPageRowIds.filter((id) => selectedRows.includes(id));
    }
    return [];
  };

  // ✅ Select All on Current Page
  const handleSelectAllOnPage = () => {
    const updated = new Set(selectedRows);
    currentPageRowIds.forEach((id) => updated.add(id));
    setSelectedRows(updated);
  };

  // ✅ Clear Selection on Current Page
  const handleClearSelectionOnPage = () => {
    const updated = new Set(selectedRows);
    currentPageRowIds.forEach((id) => updated.delete(id));
    setSelectedRows(updated);
    //setSearch(""); // Clear search when clearing selection
  };

  // ✅ Pagination Handlers
  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };
  const handlePrevious = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };
  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(0);
  };

  // ✅ Selected Caller IDs
  const selectedCallerIds = Array.from(selectedRows);

  const handleDelete = useCallback(() => {
    const request = {
      ids: selectedCallerIds,
      is_active: value,
    };
    if (value === "true" || value === "false") {
      dispatch(updateCallBlockStaus(request, setResponse, setSelectedRows));
      setAlertMessage(false);
    } else {
      dispatch(
        deleteAdminCallBlock({ id: callBlockId }, setResponse, setCallBlockId)
      );
      setAlertMessage(false);
    }
  }, [
    callBlockId,
    selectedCallerIds,
    value,
    dispatch,
    setResponse,
    setCallBlockId,
    setSelectedRows,
  ]); // Memoize event handler

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
                          <h3>Call Block</h3>
                          {/* <p>
                          Quickly access information and tools related to your
                          account.
                        </p> */}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "end",
                          }}
                        >
                          <Box
                            sx={{
                              display: selectedCallerIds[0] ? "block" : "none",
                            }}
                          >
                            <IconButton
                              className="all_button_clr"
                              onClick={() => handleMessage("true")}
                              sx={{
                                background: "green !important",
                                fontSize: "15px",
                                borderRadius: "5px",
                                border: "none",
                                color: "#fff",
                                px: 4,
                                textTransform: "capitalize",
                                height: "35px",
                                width: "90px",
                                alignItems: "center",
                                position: "relative",
                                right: isMobile ? "5px" : "-15px",
                                textAlign: "center", // Add this line
                              }}
                            >
                              Active
                            </IconButton>
                            <IconButton
                              onClick={() => handleMessage("false")}
                              className="filter_block_btn"
                              style={{
                                height: "35px",
                                width: "90px",
                                px: 4,
                                marginLeft: "10px",
                                background: selectedRows.length
                                  ? "red"
                                  : "grey",
                              }}
                              disabled={selectedRows.length === 0}
                            >
                              Deactive
                            </IconButton>
                          </Box>
                          <Box>
                            <IconButton
                              className="all_button_clr"
                              onClick={handleOpen}
                              sx={{
                                fontSize: "15px",
                                borderRadius: "5px",
                                border: "none",
                                color: "#fff",
                                px: 4,
                                textTransform: "capitalize",
                                height: "35px",
                                width: "90px",
                                minWidth: "90px",
                                flexShrink: 0,
                                display: "inline-flex",
                                justifyContent: "space-evenly",
                                alignItems: "center",
                                position: "relative",
                              }}
                            >
                              Add
                              <AddOutlinedIcon />
                            </IconButton>
                          </Box>
                        </div>

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
                                Add Call Block
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
                                <FormControl
                                  fullWidth
                                  style={{ margin: " 5px 0 5px 0" }}
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

                                <FormControl
                                  fullWidth
                                  style={{ margin: " 5px 0 5px 0" }}
                                >
                                  <InputLabel id="demo-simple-select-label">
                                    Type select box
                                  </InputLabel>
                                  <Select
                                    style={{ textAlign: "left" }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Type select box"
                                    value={type}
                                    onChange={(e) => {
                                      setType(e.target.value);
                                    }}
                                  >
                                    <MenuItem value={"CallerID"}>
                                      CallerID
                                    </MenuItem>

                                    <MenuItem value={"AreaCode"}>
                                      AreaCode
                                    </MenuItem>
                                  </Select>
                                </FormControl>
                                <br />

                                <TextField
                                  style={{
                                    width: "100%",
                                    margin: " 5px 0 5px 0",
                                  }}
                                  type="text"
                                  label="Caller ID Number"
                                  variant="outlined"
                                  padding={"0px 0 !important"}
                                  value={details}
                                  onChange={(e) => {
                                    setDetails(e.target.value);
                                  }}
                                />
                                <InputLabel
                                  style={{
                                    textAlign: "left",
                                    fontSize: "14px",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Tooltip
                                    style={{ color: "#fff" }}
                                    title="Sample CallerID Format +13456232323 / Sample Areacode +13"
                                    classes={{ tooltip: classes.tooltip }}
                                  >
                                    <InfoIcon
                                      style={{
                                        fontSize: "18px",
                                        color: "#0E397F",
                                      }}
                                    />
                                    &nbsp;
                                  </Tooltip>
                                  Sample CallerID Format +13456232323 / Sample
                                  Areacode +13{" "}
                                </InputLabel>
                                <br />

                                <FormControl
                                  fullWidth
                                  style={{ margin: " 5px 0 5px 0" }}
                                >
                                  <InputLabel id="demo-simple-select-label">
                                    Status
                                  </InputLabel>
                                  <Select
                                    style={{ textAlign: "left" }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // value={age}
                                    label="Status"
                                    value={isActive}
                                    onChange={(e) => {
                                      setIsActive(e.target.value);
                                    }}
                                  >
                                    <MenuItem value={"true"}>Active</MenuItem>
                                    <MenuItem value={"false"}>
                                      Deactive
                                    </MenuItem>
                                  </Select>
                                </FormControl>
                                <TextField
                                  style={{
                                    width: "100%",
                                    margin: " 5px 0 5px 0",
                                  }}
                                  type="description"
                                  label="Description"
                                  variant="outlined"
                                  padding={"0px 0 !important"}
                                  value={description}
                                  onChange={(e) => {
                                    setDescription(e.target.value);
                                  }}
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

                      {/* edit */}
                      <Dialog
                        open={openModal}
                        //onClose={handleCloseModal}
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
                                  textAlign: "center",
                                  // height: "400px",
                                  overflow: "auto",
                                  paddingTop: "10px",
                                  padding: "5px",
                                }}
                              >
                                <FormControl
                                  fullWidth
                                  style={{ margin: " 5px 0 5px 0" }}
                                >
                                  <InputLabel id="demo-simple-select-label">
                                    Type select box
                                  </InputLabel>
                                  <Select
                                    style={{ textAlign: "left" }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Type select box"
                                    value={type}
                                    onChange={(e) => {
                                      setType(e.target.value);
                                    }}
                                  >
                                    <MenuItem value={"CallerID"}>
                                      CallerID
                                    </MenuItem>
                                    <MenuItem value={"AreaCode"}>
                                      AreaCode
                                    </MenuItem>
                                  </Select>
                                </FormControl>
                                <br />

                                <TextField
                                  style={{
                                    width: "100%",
                                    margin: " 5px 0 5px 0",
                                  }}
                                  type="text"
                                  label="Caller ID Number"
                                  variant="outlined"
                                  padding={"0px 0 !important"}
                                  value={details}
                                  onChange={(e) => {
                                    setDetails(e.target.value);
                                  }}
                                />
                                <br />

                                <FormControl
                                  fullWidth
                                  style={{ margin: " 5px 0 5px 0" }}
                                >
                                  <InputLabel id="demo-simple-select-label">
                                    Status
                                  </InputLabel>
                                  <Select
                                    style={{ textAlign: "left" }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // value={age}
                                    label="Status"
                                    value={isActive}
                                    onChange={(e) => {
                                      setIsActive(e.target.value);
                                    }}
                                  >
                                    <MenuItem value={"true"}>Active</MenuItem>
                                    <MenuItem value={"false"}>
                                      Deactive
                                    </MenuItem>
                                  </Select>
                                </FormControl>
                                <TextField
                                  style={{
                                    width: "100%",
                                    margin: " 5px 0 5px 0",
                                  }}
                                  type="description"
                                  label="Description"
                                  variant="outlined"
                                  padding={"0px 0 !important"}
                                  value={description}
                                  onChange={(e) => {
                                    setDescription(e.target.value);
                                  }}
                                />

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
                      {/* edit-end */}

                      {/* Alert Box Confirmation Modal Start  */}
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
                          sx={{ color: "#133325", fontWeight: "600" }}
                        >
                          {value === "true"
                            ? "Active Confirmation"
                            : value === "false"
                            ? "Deactive"
                            : "Delete Confirmation"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText
                            id="alert-dialog-description"
                            sx={{ paddingBottom: "0px !important" }}
                          >
                            Are you sure you want to{" "}
                            {value === "true"
                              ? "active"
                              : value === "false"
                              ? "deactive"
                              : "delete "}{" "}
                            {name} ?
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
                              background:
                                value === "true"
                                  ? "green !important"
                                  : value === "false"
                                  ? "red !important"
                                  : "#f44336 !important",
                              padding: "10px 20px !important",
                              textTransform: "capitalize !important",
                              marginLeft: "0px !important",
                              marginRight: "0px !important",
                            }}
                            className="all_button_clr"
                            color="error"
                            onClick={handleDelete}
                            startIcon={
                              value === "true" ? (
                                <CheckIcon />
                              ) : value === "false" ? (
                                <BlockIcon />
                              ) : (
                                <DeleteIcon />
                              )
                            }
                          >
                            {value === "true"
                              ? "Active"
                              : value === "false"
                              ? "Deactive"
                              : "Delete"}
                          </Button>
                        </DialogActions>
                      </Dialog>
                      {/* Alert Box Confirmation Modal End  */}

                      {/* <!--table---> */}
                      <Box sx={{ width: "100%" }}>
                        {/* 🔍 Toolbar */}
                        <Grid container spacing={2} sx={{ mb: 2 }}>
                          {/* Search Field */}
                          <Grid item xs={12} md={5}>
                            <TextField
                              label="Search User Name"
                              size="small"
                              value={search}
                              onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(0);
                              }}
                              fullWidth
                            />
                          </Grid>

                          {/* Action Buttons and Pagination */}
                          <Grid item xs={12} md={7}>
                            <Grid container spacing={1}>
                              {/* Page Size Dropdown */}
                              <Grid item xs={12} sm={12} md={2}>
                                <Select
                                  size="small"
                                  value={pageSize}
                                  onChange={handlePageSizeChange}
                                  fullWidth
                                >
                                  <MenuItem value={100}>100</MenuItem>
                                  <MenuItem value={500}>500</MenuItem>
                                  <MenuItem value={1000}>1000</MenuItem>
                                </Select>
                              </Grid>

                              {/* Select All */}
                              <Grid item xs={12} sm={12} md={2}>
                                <Button
                                  variant="outlined"
                                  onClick={handleSelectAllOnPage}
                                  fullWidth
                                  sx={{
                                    fontSize: isMobile ? "15px" : "10px",
                                    height: "40px",
                                    alignItems: "center",
                                    textAlign: "center",
                                  }}
                                >
                                  Select All
                                </Button>
                              </Grid>

                              {/* Clear */}
                              <Grid item xs={12} sm={12} md={2}>
                                <Button
                                  variant="outlined"
                                  onClick={handleClearSelectionOnPage}
                                  fullWidth
                                  sx={{
                                    fontSize: isMobile ? "15px" : "10px",
                                    height: "40px",
                                    alignItems: "center",
                                    textAlign: "center",
                                  }}
                                >
                                  Clear
                                </Button>
                              </Grid>

                              {/* Previous */}
                              <Grid item xs={12} sm={12} md={2}>
                                <Button
                                  variant="contained"
                                  onClick={handlePrevious}
                                  disabled={currentPage === 0}
                                  fullWidth
                                  sx={{
                                    fontSize: isMobile ? "15px" : "10px",
                                    height: "40px",
                                    alignItems: "center",
                                    textAlign: "center",
                                  }}
                                >
                                  Previous
                                </Button>
                              </Grid>

                              {/* Next */}
                              <Grid item xs={12} sm={12} md={2}>
                                <Button
                                  variant="contained"
                                  onClick={handleNext}
                                  disabled={currentPage >= totalPages - 1}
                                  fullWidth
                                  sx={{
                                    fontSize: isMobile ? "15px" : "10px",
                                    height: "40px",
                                    alignItems: "center",
                                    textAlign: "center",
                                  }}
                                >
                                  Next
                                </Button>
                              </Grid>

                              {/* Page Info */}
                              <Grid item xs={12} sm={12} md={2}>
                                <Typography
                                  sx={{ whiteSpace: "nowrap", pt: 1 }}
                                >
                                  Page {currentPage + 1} of {totalPages}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>

                        {/* ✅ DataGrid */}
                        <DataGrid
                          rows={currentRows}
                          columns={columns}
                          checkboxSelection
                          disableRowSelectionOnClick
                          getRowId={(row) => row.callBlockId} // 👈 This is key
                          rowSelectionModel={getCurrentPageSelected()}
                          onRowSelectionModelChange={handleSelectionChange}
                          density="compact"
                          autoHeight
                        />

                        {/* 🔄 Loader */}
                        <Backdrop
                          sx={{
                            color: "#fff",
                            zIndex: (theme) => theme.zIndex.drawer + 1,
                          }}
                          open={loading}
                        >
                          <CircularProgress color="inherit" />
                        </Backdrop>
                      </Box>

                      {/* <!--table-end--> */}
                    </div>
                    {/* <!--role-content--> */}
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

export default AdminCallBlock;
