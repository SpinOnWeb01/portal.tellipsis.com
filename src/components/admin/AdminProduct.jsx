import { Close, Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Fade,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Tooltip,
  Typography,
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
import InfoIcon from '@mui/icons-material/Info';
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
} from "../../redux/actions/adminPortal/adminPortal_callBlockAction";
import { createAdminProduct, getAdminProducts } from "../../redux/actions/adminPortal/adminPortal_productsAction";
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
    marginBottom: '10px',
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

function AdminProduct({ colorThem }) {
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [type, setType] = useState("");
  const [callBlockId, setCallBlockId] = useState("");
  const [response, setResponse] = useState("");
  const [isActive, setIsActive] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [price, setPrice] = useState("");
  const [alertMessage, setAlertMessage] = useState(false);
  const [name, setName] = useState("");
  const state = useSelector((state) => state);
  const handleOpen = () => setOpen(true);
  const classes = useStyles();

  const handleAlertClose = () => {
    setCallBlockId("")
    setAlertMessage(false);
  }

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllUsers(""));
  }, [response]);

  const handleClose = () => {
    setOpen(false);
    setCallBlockId("");
    setDescription("");
    setPrice("");
    setName("");
    setIsActive("");
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
    setPrice("");
    setName("");
  }, [setIsActive, setCallBlockId, setDescription, setDetails, setType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = JSON.stringify({
      price: price,
      description: description,
      name: name,
    });
    dispatch(
      createAdminProduct(
        data,
        setOpen,
        setResponse,
        setDescription,
        setName,
        setPrice
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

  const handleMessage = useCallback((data) => {
    setName(data?.details)
    setCallBlockId(data?.callBlockId)
    setAlertMessage(true);
  }, [setName]); // Memoize event handler

  const handleDelete = useCallback(
    (id) => {
      dispatch(deleteAdminCallBlock({ id: callBlockId }, setResponse, setCallBlockId));
      setAlertMessage(false);
    },
    [callBlockId, dispatch, setResponse, setCallBlockId]
  ); // Memoize event handler

  // =======table=======>
  const columns = [

    {
      field: "callBlockId",
      headerName: "Id",
      width: 250,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },

    {
      field: "name",
      headerName: "Name",
      width: 250,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "price",
      headerName: "Price",
      width: 200,
      headerAlign: "center",
      align: "center",
      headerClassName: "custom-header",
    },
    {
      field: "description",
      headerName: "Description",
      width: 250,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },

  ];

  const rows = useMemo(() => {
    const calculatedRows = [];
    state?.getAdminProducts?.products &&
      state?.getAdminProducts?.products.forEach((item, index) => {
        calculatedRows.push({
          id: index + 1,
          description: item?.description,
          price: item?.price,
          name: item?.name,
          callBlockId: item?.id,
        });
      });
    return calculatedRows;
  }, [state?.getAdminProducts?.products]);

  return (
    <>
      <div className={`App ${colorThem} `}>
        <div className="contant_box" style={{ height: "100vh" }}>
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
                          <h3>Product</h3>

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
                                Add Product
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
                                  label="Name"
                                  variant="outlined"
                                  padding={"0px 0 !important"}
                                  value={name}
                                  onChange={(e) => {
                                    setName(e.target.value);
                                  }}
                                />


                                <br />

                                <TextField
                                  style={{
                                    width: "100%",
                                    margin: " 5px 0 5px 0",
                                  }}
                                  type="text"
                                  label="Price"
                                  variant="outlined"
                                  padding={"0px 0 !important"}
                                  value={price}
                                  onChange={(e) => {
                                    setPrice(e.target.value);
                                  }}
                                />
                                <br />


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


                        <DialogContent sx={{ pt: "0", }}>
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
                        <div style={{ height: '100%', width: '100%' }}>
                          <DataGrid
                            rows={rows}
                            columns={columns}
                            headerClassName="custom-header"
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
                </div>
              </div>
            </div>
          </Box>
        </div >
      </div >
    </>
  );
}

export default AdminProduct;
