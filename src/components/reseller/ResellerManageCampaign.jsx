import React, { useState } from "react";
import { Close, Delete, Edit, Visibility,} from "@mui/icons-material";
import { Backdrop, Box, Button, Fade, FormControl, IconButton, InputLabel, Modal, TextField, Typography, Select, MenuItem} from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { DataGrid } from '@mui/x-data-grid';
import KeyIcon from '@mui/icons-material/Key';
import "../../style.css";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import "../../Switcher.scss";
const drawerWidth = 240;

// =======modal-popup---->
const style = {
  padding:"20px !Important",
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





const columns = [
  { field: 'id', headerName: 'ID', width: 70 , headerClassName:"custom-header",
  
},
  { field: 'firstName', headerName: 'First name', width: 150, headerClassName:"custom-header",
  
},
  { field: 'lastName', headerName: 'Last name', width: 150, headerClassName:"custom-header" },
  { field: 'firstName', headerName: 'First name', width: 150, headerClassName:"custom-header" },
  { field: 'lastName', headerName: 'Last name', width: 150, headerClassName:"custom-header" },
  { field: 'firstName', headerName: 'First name', width: 150, headerClassName:"custom-header" },
  { field: 'age', headerName: 'Age', type: 'number', width: 90, headerClassName:"custom-header"},
  { field: 'fullName', headerName: 'Full name', width: 150, headerClassName:"custom-header",
    valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35,

},
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
];


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




function ResellerManageCampaign({colorThem}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const navigate = () => useNavigate();



  // -------------------
  const [buyerOpen, setBuyerOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [strategy, setStrategy] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const handleAddBuyerOpen = ()=> setBuyerOpen(true);
  const handleAddBuyerClose = () => setBuyerOpen(false);
  const handleEditCampaignOpen = () => setEdit(true);
  const handleEditCampaignClose = () => setEdit(false);

// ------------->
const handleChange = (event) =>{
  const { name, value } = event.target;
  switch (name) {
    case 'campaignName':
      setCampaignName(value);
      break;
    case 'strategy':
      setStrategy(value);
      break;
    case 'status':
      setStatus(value);
      break;
    case 'description':
      setDescription(value);
      break;
    default:
      break;
  }

}

const handleEdit = (data)=>{
  handleEditCampaignOpen();
  setCampaignName(data?.campaign_name);
  setStrategy(data?.strategy);
  setStatus(data?.status);
  setDescription(data?.description)
}

const handleView = () =>{
  navigate("/admin_portal/viewbuyer")
}

const columns = [
  {
    field: "campaign_name",
    headerName: "Campaign Name",
    headerClassName: "custom-header",
    headerAlign: "center",
    flex:1,
    align: "center",
  },
  {
    field: "strategy",
    headerName: "Strategy",
    flex: 1,
    //cellClassName: "name-column--cell",
    //headerClassName: 'super-app-theme--header'
    headerClassName: "custom-header",
    // editable: true,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "status",
    headerName: "Status",
    type: "number",
    flex: 1,
    headerAlign: "center",
    align: "center",
    headerClassName: "custom-header",
    renderCell: (params) => {
      return (
        <div className="d-flex justify-content-between align-items-center">
          {params.row.status === "True" ? (
            <>
              <div style={{ color: "white", background:"green", padding:"7px", borderRadius:"5px", fontSize:"12px" , textTransform:"capitalize"}}>{params.row.status.toString().toLowerCase()}</div>
            </>
          ) : (
            <>
              <div style={{color: "white", background:"red", padding:"7px", borderRadius:"5px", fontSize:"12px" , textTransform:"capitalize" }}>{params.row.status.toString().toLowerCase()}</div>
            </>
          )}
        </div>
      );
    },
    
  //   renderCell: (params) => {
  //     return (
  //         <div className="d-flex justify-content-between align-items-center" >
  //           {params.row.status === "True" ?(<><div style={{ color: "green"}}>{params.row.status}</div></>):(<>
  //             <div style={{ color: "False"}}>{params.row.status}</div></>)}
              
  //          </div>
  //     );
  //  }
  },
  {
    field: "description",
    headerName: "Description",
    flex: 1,
    headerClassName: "custom-header",
    headerAlign: "center",
    align: "center",
  },

  {
    field: "add_buyer",
    headerName: "Add Buyer",
    flex: 1,
    headerClassName: "custom-header",
    headerAlign: "center",
    align: "center",
    renderCell: (params) => {
      return (
          <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer"}} onClick={handleAddBuyerOpen}>
              {params.row.add_buyer}
           </div>
      );
   }
  },
  {
      field: "view_buyer",
      headerName: "View Buyer",
      flex: 1,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      sortable: false,
      width: 140,
      renderCell: (params) => {
          return (
              <div className="d-flex justify-content-between align-items-center"  >
                  <IconButton><Visibility style={{ cursor: "pointer",color:"grey" }} onClick={handleView}/></IconButton>
                  <IconButton onClick={()=>handleEdit(params.row)}><Edit index={params.row.id}  style={{ cursor: "pointer" ,color:"#092a5f" }}/></IconButton>
                  <IconButton><Delete style={{ cursor: "pointer" ,color:"red" }}/></IconButton>   
               </div>
          );
       }
    },
];

const mockDataTeam = [
  {
    id: 1,
    campaign_name: "Test",
    strategy: "Sequence",
    description: "Description",
    add_buyer: "Add Buyer",
    view_buyer: "admin",
    status: "True",
  },
            



];
// ------------->


const classes = useStyles();

// Function to determine whether a row should have the bordered style
const isRowBordered = (params) => {
  const { row } = params;

  // Add your condition here, for example, adding border to rows where age is greater than 25
  return row.status === "True";
};
  
  return (
    <>
     <div className={`App ${colorThem} `}>

<div className="contant_box">
      <Box className="right_sidebox" component="main" sx={{flexGrow: 1, p: 3,  width: { sm: `calc(100% - ${drawerWidth}px)` },}}>
       
        
       {/* ========== */}
       <div className="container-fluid">
           <div className="row">
             <div className="col-lg-12">
                 <div className="tab-content" id="pills-tabContent">
                   <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                       <div className="cntnt_title" style={{display:"flex",justifyContent:"space-between",alignItems:"end"}}>
                        <div>
                          <h3>Campaign</h3>
                          {/* <p>A ring group is a set of destinations that can be called with a ring strategy. </p> */}
                        </div>
                        {/* ==Add-modal== */}
                        <div> 
                         <IconButton className="all_button_clr" onClick={handleOpen}>
                           Add <AddOutlinedIcon />
                         </IconButton>
                        </div>
                         {/* -----   Add Campaigns Modal Start   ----- */}
                    
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
                         <Fade in={open}>
                           <Box sx={style} borderRadius={"10px"} textAlign={'center'} >
                           <IconButton onClick={handleClose} sx={{float:"inline-end"}}>
                       <Close />
                   </IconButton>
                   <br/>
                             <Typography
                               id="transition-modal-title"
                               variant="h6"
                               component="h2"
                               color={'#092b5f'}
                               fontSize={'18px'}
                               fontWeight={'600'}
                               
                             >
                               Add Campaign
                             </Typography>
                             <Typography
                               id="transition-modal-description"
                               sx={{ mt: 2 }}
                               fontSize={'16px'}
                               color={'#000'}
                               paddingBottom={'10px'}
                             >
                             
                             </Typography>
                               

                           
     
       
       <form style={{ textAlign: "center",height:"400px", overflow:"auto", paddingTop:'10px', padding:'20px', }}>

<TextField
style={{width: "100%",
margin:"7px 0"}}
type="text"
label="Campaign Name"
variant="outlined"
/>
<br />
<TextField
style={{width: "100%",
margin:"7px 0"}}
type="text"
label="Extension"
variant="outlined"
/>
<br />
<Typography style={{display:'flex', justifyContent:'space-between', alignItems: 'center'}}>
<FormControl fullWidth style={{ width: "80%", margin:"7px 0" }}>
       <InputLabel id="demo-simple-select-label">User List</InputLabel>
       <Select
         labelId="demo-simple-select-label"
         id="demo-simple-select"
         label="User List"
         style={{textAlign:'left'}}
         
       >
         <MenuItem value={10}>1</MenuItem>
         <MenuItem value={20}>2</MenuItem>
         <MenuItem value={30}>3</MenuItem>
       </Select>
     </FormControl> 
     
     <IconButton className="all_button_clr" style={{width: '55px', height: '55px', margin: '0px !important', }} onClick={handleOpen}>
    ADD 
   </IconButton>
   </Typography>
   
   
<TextField
style={{width: "100%", 
margin:"7px 0"}}
type="text"
label="Description"
variant="outlined"
/>

<br />

<Button variant="contained" className="all_button_clr" color="primary" sx={{fontSize: '16px !impotant', background:'linear-gradient(180deg, #0E397F 0%, #001E50 100%) !important',marginTop:'20px', padding: '10px 20px !important', textTransform: 'capitalize !important'}}
onClick={handleClose}>
 Cancel
</Button>
<Button variant="contained" className="all_button_clr" color="primary" 
sx={{fontSize: '16px !impotant',background:'#092b5f',marginTop:'20px', padding: '10px 20px !important', textTransform: 'capitalize !important',}}
>
 save
</Button>
</form>
                            
                           </Box>
                         </Fade>
                       </Modal>
                    {/* -----   Add Campaigns Modal End   ----- */}


                       </div>
                   </div>
                 </div>
                 
            
{/* 
             <Box>
             <div style={{ height: 400, width: '100%' }}>
     <DataGrid rows={rows} columns={columns}
     
       // pageSizeOptions={[5, 10]}
       // checkboxSelection
       headerClassName="custom-header"
     />
   </div>
             </Box> */}

            
                        <Box m="0px 0 0 0" height="50vh" >
                            <DataGrid
                             class="tbl_innr_box"
                              rows={mockDataTeam}
                              columns={columns}
        
                              headerClassName="custom-header"
                              getRowClassName={(params) =>
                    isRowBordered(params)
                      ? classes.borderedGreen
                      : classes.borderedRed
                  }
                             
                            />
                          </Box>


                              {/* -----   Add Buyer Modal Start   ----- */}
                        <Modal
                          aria-labelledby="transition-modal-title"
                          aria-describedby="transition-modal-description"
                          open={buyerOpen}
                         
                          closeAfterTransition
                          slots={{ backdrop: Backdrop }}
                          slotProps={{
                            backdrop: {
                              timeout: 500,
                            },
                          }}
                          borderRadius={'10px'}>
                          <Fade in={buyerOpen}>
                            <Box sx={style} borderRadius={'10px'}>
                            <IconButton onClick={handleAddBuyerClose} sx={{float:"inline-end", borderRadius: "10px;"}}>
                        <Close />
                    </IconButton>
                    <br/>
                              <Typography
                                id="transition-modal-title"
                                variant="h6"
                                component="h2"
                                color={'#092b5f'}
                                fontSize={'18px'}
                                fontWeight={'600'}
                                textAlign={'center'}
                                

                              >
                                Add Buyer
                              </Typography>
                              <Typography
                                id="transition-modal-description"
                                sx={{ mt: 2 }}
                                fontSize={'16px'}
                                color={'#000'}
                                paddingBottom={'10px'}
                                textAlign={'center'}
                                

                              >
                               {/* A ring group is a set of destinations that can be called with a ring strategy. */}
                              </Typography>
                              <form style={{ textAlign: "center" }}>
                                <TextField
                                  style={{     width: "100%",
                                    margin:" 5px 0 5px 0" }}
                                  type="text"
                                  label="Name"
                                  variant="outlined"
                                />
                                <br />
                                <TextField
                                  style={{width: "100%",
                                  margin:" 5px 0 5px 0"}}
                                  type="text"
                                  label="DID/TFN Number"
                                  variant="outlined"
                                />
                                <br />
                                <TextField
                                  style={{     width: "100%",
                                    margin:" 5px 0 5px 0" }}
                                  type="text"
                                  label="Weightage"
                                  variant="outlined"
                                />
                                <br />
                                <TextField
                                  style={{     width: "100%",
                                    margin:" 5px 0 5px 0" }}
                                  type="text"
                                  label="Ringing Timeout"
                                  variant="outlined"
                                />
                                <br />
                                <TextField
                                  style={{     width: "100%",
                                    margin:" 5px 0 5px 0" }}
                                  type="text"
                                  label="Max Calls In A Day"
                                  variant="outlined"
                                />
                                <br />
                                <TextField
                                  style={{     width: "100%",
                                    margin:" 5px 0 5px 0" }}
                                  type="text"
                                  label="No CC (Concurrent Call)"
                                  variant="outlined"
                                />
                                <br />

                                <Button variant="contained" color="primary" className="all_button_clr" sx={{background:'#092b5f',marginTop:'20px'}}>
                                  save
                                </Button>
                              </form>
                            </Box>
                          </Fade>
                        </Modal>
                     {/* -----   Add Buyer Modal End   ----- */}
                      {/* ----------------------------------------------
                     ----------------------------------------------
                     ----------------------------------------------
                     ---------------------------------------------- */}
                     {/* -----   Edit Campaign Modal Start   ----- */}
                     <Modal
                          aria-labelledby="transition-modal-title"
                          aria-describedby="transition-modal-description"
                          open={edit}
                         
                         
                          closeAfterTransition
                          slots={{ backdrop: Backdrop }}
                          slotProps={{
                            backdrop: {
                              timeout: 500,
                            },
                          }}
                        >
                          <Fade in={edit}  className="bg_imagess">
                            <Box sx={style} borderRadius={'10px'}>
                            <IconButton onClick={handleEditCampaignClose} sx={{float:"inline-end"}}>
                        <Close />
                    </IconButton>
                    <br/>
                              <Typography
                               id="transition-modal-title"
                               variant="h6"
                               component="h2"
                               color={'#092b5f'}
                               fontSize={'18px'}
                               fontWeight={'600'}
                               textAlign={'center'}
                              >
                                Update Campaign
                              </Typography>
                              <Typography
                                id="transition-modal-description"
                                sx={{ mt: 2 }}
                              >
                              
                              </Typography>
                              <form style={{ textAlign: "center" }}>
                                <TextField
                                  style={{     width: "100%",
                                    margin:" 5px 0 5px 0" }}
                                  type="text"
                                  label="Campaign Name"
                                  variant="outlined"
                                  name="campaignName"
                                  value={campaignName}
                                  onChange={handleChange}
                                />
                                <br />
                                <TextField
                                  style={{     width: "100%",
                                    margin:" 5px 0 5px 0" }}
                                  type="text"
                                  label="Description"
                                  variant="outlined"
                                  name="description"
                                  value={description}
                                  onChange={handleChange}
                                />
                                <br />
                               

                                <Button variant="contained" className="all_button_clr" color="primary">
                                  Update
                                </Button>
                              </form>
                            </Box>
                          </Fade>
                        </Modal>
                     {/* -----   Edit Campaign Modal End   ----- */}
                  
                     </div>  
           </div>
         </div>

       {/* ========== */}



     </Box>
     </div>
     </div>
    </>
  )
}

export default ResellerManageCampaign;