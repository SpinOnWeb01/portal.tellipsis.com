import React, { useCallback, useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Tooltip,
  Typography,tooltipClasses 
} from "@mui/material";
import { styled } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import { DataGrid, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from "@mui/x-data-grid";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Backdrop from "@mui/material/Backdrop";
import { useDispatch, useSelector } from "react-redux";
import { Close, Delete, Edit } from "@mui/icons-material";
import {
  createAdminAcl,
  deleteAdminAcl,
  getAdminAcl,
  updateAdminAcl,
} from "../../redux/actions/adminPortal/adminPortal_aclAction";
import DeleteIcon from "@mui/icons-material/Delete";

const drawerWidth = 240;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
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
        exportButton: true,
      },
    },
  },
});

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
  tooltip: {
    backgroundColor: '#0E397F', // Change default background color
    color: 'white',
    '&:hover': {
      backgroundColor: '#0E397F', // Change background color on hover
      
    },

  },
  menuItem: {
    '&:hover': {
      backgroundColor: 'red !important', // change this to your desired hover color
    },
  },
});

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover, // Change this if you also want the MenuItem to have a different hover color
  },
}));

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#0c367a', // Change this to your desired red color
  },
}));

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton/>
      <GridToolbarDensitySelector />
      <GridToolbarFilterButton/>
    </GridToolbarContainer>
  );
};

function AdminACL({ colorThem }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [response, setResponse] = useState("");
  const classes = useStyles();
  const handleOpen = () => setOpen(true);
  const [grp, setGrp] = useState("");
  const [mask, setMask] = useState("");
  const [port, setPort] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [details, setDetails] = useState("");
  const [aclId, setAclId] = useState("");
  const [alertMessage, setAlertMessage] = useState(false);
  const [name, setName] = useState("");

  const handleAlertClose = () => {
    setAclId("")
    setAlertMessage(false);
  }

  const group = [
    { grp: "ASTERISK SERVERS", id: 1 },
    { grp: "INBOUND CARRIERS", id: 2 },
    // { grp: "WHITELISTED IPS", id: 3 },
    { grp: "BLACKLISTED IPS", id: 4 },
  ];
  const getMenuItemContent = (name) => {
    switch (name) {
      case "ASTERISK SERVERS":
        return "List of Asterisk server IP's that has access permissions.";
      case "INBOUND CARRIERS":
        return "List of Inbound Carrier server IP's that has access permissions.";
      // case "WHITELISTED IPS":
      //   return "Server IPs which are allowed.";
        case "BLACKLISTED IPS":
        return "Server IPs which are blocked.";
      default:
        return name;
    }
  };

  
  useEffect(() => {
    dispatch(getAdminAcl());
  }, [response]);

  const handleMessage = useCallback((data) => {
    setName(data?.ip_addr)
    setAclId(data?.aclId)
    setAlertMessage(true);
  }, [setName]); // Memoize event handler

  const handleDelete = useCallback(
    (id) => {
      dispatch(deleteAdminAcl({id: aclId }, setResponse, setAclId));
       setAlertMessage(false);
    },
    [aclId,dispatch, setResponse, setAclId]
  ); // Memoize event handler

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = JSON.stringify({
      grp: grp,
      ip_addr: ipAddress,
      mask: mask,
      port: port,
      tag: details,
    });
    dispatch(createAdminAcl(data, setOpen, setResponse));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    let data = JSON.stringify({
      id:aclId,
      grp: grp,
      ip_addr: ipAddress,
      mask: mask,
      port: port,
      tag: details,
    });
    dispatch(updateAdminAcl(data, setOpenModal, setResponse));
  };

  const handleClose = () => {
    setOpen(false);
    setGrp("");
    setIpAddress("");
    setMask("");
    setDetails("");
    setPort("");
  };

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
    setGrp("");
    setIpAddress("");
    setMask("");
    setDetails("");
    setPort("");
    setAclId("")
  }, []);

  const handleButtonClick = useCallback((row) => {
    setOpenModal(true);
    setGrp(row.grp);
    setIpAddress(row.ip_addr);
    setMask(row.mask);
    setDetails(row.tag);
    setPort(row.port);
    setAclId(row.aclId);
  }, []); // Memoize event handler

  const columns = [
    {
      field: "groupName",
      headerName: "GROUP NAME",
      width: 330,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            {params.row.groupName === 1 ? (
              <>
                <span>ASTERISK SERVERS</span>
              </>
            ) : (
              <></>
            )}
            {params.row.groupName === 2 ? (
              <>
                <span>INBOUND CARIERS</span>
              </>
            ) : (
              <></>
            )}
            {params.row.groupName === 3 ? (
              <>
                <span>WHITELISTED IPS</span>
              </>
            ) : (
              <></>
            )}
            {params.row.groupName === 4 ? (
              <>
                <span>BLACKLISTED IPS</span>
              </>
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      field: "ip_addr",
      headerName: "IP ADDRESS",
      headerClassName: "custom-header",
      width: 180,
      headerAlign: "center",
      align: "center",
      cellClassName: "super-app-theme--cell",
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            <p
              style={{
                fontWeight: "500",
                color: "blue",
                margin: "0",
                textTransform: "capitalize",
              }}
            >
              {params?.row?.ip_addr}
            </p>
          </div>
        );
      },
    },
    {
      field: "tag",
      headerName: "DESCRIPTION",
      width: 150,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },

    {
      field: "grp",
      headerName: "GROUP",
      width: 80,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "mask",
      headerName: "MASK",
      width: 80,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "port",
      headerName: "PORT",
      width: 80,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "action",
      headerName: "ACTION",
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      sortable: false,
      width: 130,
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            {/* <Tooltip title="Edit">
              <IconButton onClick={() => handleButtonClick(params.row)}>
                <Edit
                  index={params.row.id}
                  style={{ cursor: "pointer", color: "#0e397f" }}
                />
              </IconButton>
            </Tooltip> */}
             <Tooltip title="delete" disableInteractive interactive>
            <IconButton onClick={() => handleMessage(params?.row)}>
              <Delete style={{ cursor: "pointer", color: "red" }} />
            </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  // Function to determine whether a row should have the bordered style
  const isRowBordered = (params) => {
    const { row } = params;

    // Add your condition here, for example, adding border to rows where age is greater than 25
    return row.disposition === "ANSWERED";
  };

  const rows = [];
  state?.getAdminAcl?.acl &&
    state?.getAdminAcl?.acl?.forEach((item, index) => {
      rows.push({
        id: index + 1,
        ip_addr: item.ip_addr,
        groupName: item.grp,
        grp: item.grp,
        port: item.port,
        mask: item.mask,
        tag: item.tag,
        aclId: item.id
      });
    });

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
                            <h3>Access Control List</h3>
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
                                  Add ACL
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
                                  <TextField
                                    style={{
                                      width: "100%",
                                      margin: " 5px 0 5px 0",
                                    }}
                                    type="text"
                                    label="IP Address"
                                    variant="outlined"
                                    name="ipAddress"
                                    value={ipAddress}
                                    onChange={(e) =>
                                      setIpAddress(e.target.value)
                                    }
                                  />
                                     {/* <InputLabel style={{textAlign:'left', fontSize: '14px',display:'flex',alignItems:'center'}}>
                                      <Tooltip style={{color:'#fff'}} title="test" classes={{ tooltip: classes.tooltip }}>
                                        <InfoIcon style={{fontSize:"18px",color:"#0E397F"}} />&nbsp;
                                        </Tooltip >
                                      </InputLabel> */}
                                  <TextField
                                    style={{
                                      width: "100%",
                                      margin: " 5px 0 5px 0",
                                    }}
                                    type="text"
                                    label="Mask"
                                    variant="outlined"
                                    name="mask"
                                    value={mask}
                                    onChange={(e) => setMask(e.target.value)}
                                  />
                                  <br />
                                  <TextField
                                    style={{
                                      width: "100%",
                                      margin: " 5px 0 5px 0",
                                    }}
                                    type="text"
                                    label="Port"
                                    variant="outlined"
                                    name="port"
                                    value={port}
                                    onChange={(e) => setPort(e.target.value)}
                                  />
                                  <br />

                                  {/* <FormControl
                                    fullWidth
                                    style={{ width: "100%", margin: "7px 0" }}
                                  >
                                    <InputLabel id="demo-simple-select-label">
                                      Group Name
                                    </InputLabel>
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      label="Group Name"
                                      style={{ textAlign: "left" }}
                                      value={grp}
                                      onChange={(e) => {
                                        setGrp(e.target.value);
                                      }}
                                    >
                                      {group.map((item, index) => (
                                        <MenuItem key={index} value={item?.id}>
                                          {item.grp}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                  <InputLabel style={{textAlign:'left', fontSize: '14px',display:'flex',alignItems:'center'}}>
                                      <Tooltip style={{color:'#fff'}} title="test" classes={{ tooltip: classes.tooltip }}>
                                        <InfoIcon style={{fontSize:"18px",color:"#0E397F"}} />&nbsp;
                                        </Tooltip >
                                      </InputLabel> */}

<FormControl
                                      style={{ width: "100%", margin: "5px 0" }}
                                    >
                                      <InputLabel
                                        id="demo-multiple-checkbox-label"
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        {/* {strategy.length > 0 && <ListItemIcon><AccessTimeIcon /></ListItemIcon>} */}
                                        <span>Group Name</span>
                                      </InputLabel>
                                      <Select
                                        style={{ textAlign: "left" }}
                                        labelId="demo-multiple-checkbox-label"
                                        label="Group Name"
                                        id="demo-multiple-checkbox"
                                        fullWidth
                                        value={grp}
                                        onChange={(e) => {
                                          setGrp(e.target.value);
                                        }}
                                      >
                                        {group.map((item, index) => (
                                          <StyledMenuItem key={index} value={item?.id}>
                                            <CustomTooltip 
                                              title={getMenuItemContent(item.grp)}
                                              placement="right"
                                            >
                                              <span>{item.grp}</span>
                                            </CustomTooltip >
                                          </StyledMenuItem>
                                        ))}
                                      </Select>
                                    </FormControl>

                                  <TextField
                                    style={{
                                      width: "100%",
                                      margin: " 5px 0 5px 0",
                                    }}
                                    id="outlined-multiline-static"
                                    label="Description"
                                    multiline
                                    //rows={4}
                                    defaultValue="Description"
                                    value={details}
                                    onChange={(e) => {
                                      setDetails(e.target.value);
                                    }}
                                  />

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

                        {/* edit-modal */}
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
                               
                                <form
                                  style={{
                                    textAlign: "center",
                                    height: "200px",
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
                                    label="IP Address"
                                    variant="outlined"
                                    name="ipAddress"
                                    value={ipAddress}
                                    onChange={(e) =>
                                      setIpAddress(e.target.value)
                                    }
                                  />
                                     <InputLabel style={{textAlign:'left', fontSize: '14px',display:'flex',alignItems:'center'}}>
                                      <Tooltip style={{color:'#fff'}} title="test" classes={{ tooltip: classes.tooltip }}>
                                        <InfoIcon style={{fontSize:"18px",color:"#0E397F"}} />&nbsp;
                                        </Tooltip >
                                      </InputLabel>
                                  <TextField
                                    style={{
                                      width: "100%",
                                      margin: " 5px 0 5px 0",
                                    }}
                                    type="text"
                                    label="Mask"
                                    variant="outlined"
                                    name="mask"
                                    value={mask}
                                    onChange={(e) => setMask(e.target.value)}
                                  />
                                  <br />
                                  <TextField
                                    style={{
                                      width: "100%",
                                      margin: " 5px 0 5px 0",
                                    }}
                                    type="text"
                                    label="Port"
                                    variant="outlined"
                                    name="port"
                                    value={port}
                                    onChange={(e) => setPort(e.target.value)}
                                  />
                                  <br />

                                  <FormControl
                                    fullWidth
                                    style={{ width: "100%", margin: "7px 0" }}
                                  >
                                    <InputLabel id="demo-simple-select-label">
                                      Group Name
                                    </InputLabel>
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      label="Group Name"
                                      style={{ textAlign: "left" }}
                                      value={grp}
                                      onChange={(e) => {
                                        setGrp(e.target.value);
                                      }}
                                    >
                                      {group.map((item, index) => (
                                        <MenuItem key={index} value={item?.id}>
                                          {item.grp}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>

                                  <InputLabel style={{textAlign:'left', fontSize: '14px',display:'flex',alignItems:'center'}}>
                                      <Tooltip style={{color:'#fff'}} title="test" classes={{ tooltip: classes.tooltip }}>
                                        <InfoIcon style={{fontSize:"18px",color:"#0E397F"}} />&nbsp;
                                        </Tooltip >
                                      </InputLabel>

                                  <TextField
                                    style={{
                                      width: "100%",
                                      margin: " 5px 0 5px 0",
                                    }}
                                    id="outlined-multiline-static"
                                    label="Description"
                                    multiline
                                    rows={4}
                                    defaultValue="Description"
                                    value={details}
                                    onChange={(e) => {
                                      setDetails(e.target.value);
                                    }}
                                  />
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
                        {/* end-edit-modal*/}

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
                      </div>
                      <ThemeProvider theme={theme}>
                      <div style={{ height: '100%', width: '100%' }}>
                          <DataGrid
                            rows={rows}
                            columns={columns}
                           // headerClassName="custom-header"
                            // getRowClassName={(params) =>
                            //   isRowBordered(params)
                            //     ? classes.borderedGreen
                            //     : classes.borderedRed
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
          </Box>
        </div>
      </div>
    </>
  );
}

export default AdminACL;
