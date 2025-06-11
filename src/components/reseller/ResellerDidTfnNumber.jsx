import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Close, Delete, Edit, PlayArrow, Style } from "@mui/icons-material";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Fade,
  Modal,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  CircularProgress,
  Checkbox,
  OutlinedInput,
  ListItemText,
  Tooltip,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGrid, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import Backdrop from "@mui/material/Backdrop";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { getExtension } from "../../redux/actions/adminPortal/extensionAction";
import { makeStyles } from "@mui/styles";
import { api } from "../../mockData";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { getResellerRemainingMinutesList, getResellerUsersList } from "../../redux/actions/adminPortal/adminPortal_listAction";
import { createDestinationReseller, getDidReseller, updateAssignmentReseller, updateDestinationReseller } from "../../redux/actions/resellerPortal/resellerPortal_destinationAction";
import { getAllUsersReseller } from "../../redux/actions/resellerPortal/resellerPortal_usersAction";
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
// const names = ["Redirect", "Manage", "Sip"];
const names = ["Manage"];
const sub_type = ["Extension", "Queue"];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton/>
      <GridToolbarDensitySelector />
      <GridToolbarFilterButton/>
      <GridToolbarExport/>
    </GridToolbarContainer>
  );
};

function ResellerDidTfnNumber({ colorThem }) {
  const token = JSON.parse(localStorage.getItem("reseller"));
  const [selectedValue, setSelectedValue] = useState("t");
  const [suspendValue, setSuspendValue] = useState(0);
  const [subType, setSubType] = useState("");
  const [didId, setDidId] = useState("");
  const [serviceType, setServiceType] = useState(["Manage"]);
  const [destinationDescription, setDestinationDescription] = useState("");
  const [destinationAction, setDestinationAction] = useState([]);
  const [openimport, setOpenImport] = React.useState(false);
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
  const [userUuid, setUserUuid] = useState("");
  const [open, setOpen] = React.useState(false);
  const [response, setResponse] = useState("");
  const [edit, setEdit] = useState(false);
  const [tfnNumber, setTfnNumber] = useState("");
  const [userId, setUserId] = useState("");
  const [clientName, setClientName] = useState("");
  const [maxCall, setMaxCall] = useState("");
  const [deleteRow, setDeleteRow] = useState("");
  const [extension, setExtension] = useState("");
  const [record, setRecord] = useState("");
  const [recording, setRecording] = useState("");
  const [service, setService] = useState("");
  const [loader, setLoader] = useState(null);
  const [extensionNumber, setExtensionNumber] = useState([]);
  const [queueName, setQueueName] = useState("");
  const [queue, setQueue] = useState([]);
  const [carrierName, setCarrierName] = useState("");
  const [resellerId, setResellerId] = useState("");
  const [radioValue, setRadioValue] = useState("");
  const [users, setUsers] = useState([]);
  const [validation, setValidation] = useState({
    
    tfnNumber:"",
    userId: "",
    serviceType: "",
    recording:"",selectedValue:"",carrierName:""
  });

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("reseller"));
  const handleOpen = () => setOpen(true);
  const classes = useStyles();



  const handleClick = () => {
    window.open("/file/upload_destination_number.csv", "_blank");
  }


  const handleClose = () => {
    setOpen(false);
    setSelectedValue("");
    //setServiceType([]);
    setTfnNumber("");
    setClientName("");
    setMaxCall("");
    setDestinationAction([]);
    setUserUuid("");
    setDestinationDescription("");
    setRecording("");
    setExtensionNumber([]);
    setQueue([]);
    setQueueName("");
    setSubType("");
    setUserId("");
    setCarrierName("");
    setValidation({tfnNumber:"",userId:"",serviceType:"",recording:"",selectedValue:"",carrierName:""});
    setResellerId("")
  };

  const handleEditOpen = () => setEdit(true);

  const handleEditClose = () => {
    setEdit(false);
    setSelectedValue("");
    setTfnNumber("");
    setClientName("");
    setMaxCall("");
    setExtension("");
    setDestinationAction([]);
    setDestinationDescription("");
    setRecording("");
    setExtensionNumber([]);
    setQueue([]);
    setQueueName("");
    setSubType("");
    setUserId("");
    //setServiceType([]);
    setSuspendValue("");
    setCarrierName("");
    setValidation({tfnNumber:"",userId:"",serviceType:"",recording:"",selectedValue:"",carrierName:""});
    setResellerId("")
    
  };

  useEffect(() => {
    if (userId !== "") {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${api.dev}/api/getuserextensions?user_id=${userId}`,
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
    }

    if (userId !== "") {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${api.dev}/api/getuserqueues?user_id=${userId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token} `,
        },
      };
      axios
        .request(config)
        .then((response) => {
          setQueue(response?.data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [userId]);
  
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleChanges = (event) => {
    const {
      target: { value },
    } = event;
    setServiceType(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const checkValidation = useCallback(() => {
    let errors = { ...validation };
    let isValid = true;
 
    if (!tfnNumber) {
      errors.tfnNumber = "Field is required";
      isValid = false;
    } else {
      errors.tfnNumber = "";
    }

    // if (!userId) {
    //   errors.userId = "Field is required";
    //   isValid = false;
    // } else {
    //   errors.userId = "";
    // }
  //   if(service){
  //     isValid = true;
  //     errors.serviceType = "";
  //   }else{
  //   if (serviceType.length === 0 ) {
  //     errors.serviceType = "Field is required";
  //     isValid = false;
  //   } else {
  //     errors.serviceType = "";
  //   }
  // }

    // if (!selectedValue) {
    //   errors.selectedValue = "Field is required";
    //   isValid = false;
    // } else {
    //   errors.selectedValue = "";
    // }

    // if (!recording) {
    //   errors.recording = "Field is required";
    //   isValid = false;
    // } else {
    //   errors.recording = "";
    // }

    if (!carrierName) {
      errors.carrierName = "Field is required";
      isValid = false;
    } else {
      errors.carrierName = "";
    }
    
    setValidation(errors);
    return isValid;
  }, [validation, tfnNumber,userId, service, serviceType,recording,selectedValue,carrierName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = checkValidation();
      if (isValid) {
    let data = JSON.stringify({
      user_id: userId,
      reseller_id: resellerId,
      didnumber: tfnNumber,
      details: destinationAction,
      description: destinationDescription,
      is_active: selectedValue,
      service_type: serviceType[0].toUpperCase(),
      sub_type: subType.toUpperCase(),
      recording: recording.toString().charAt(0),
      carrier_name: carrierName
    });
    dispatch(createDestinationReseller(data, setOpen, setResponse));
  }
  };

  const handleDelete = (value) => {
    let data = JSON.stringify({
      tfn_number: value.tfn_number,
      user_uuid: user?.user_uuid,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://95.217.227.234:5000/deletetfn",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((res) => {
        if (res?.data?.message !== "") {
          toast.info(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          });
        }
        setDeleteRow(res?.data);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  
  
  const handleUpdateAssignment = useCallback((data) =>{
   
    //  if(data.user_id !== null){
    let form = JSON.stringify({  
      id: data.did_id,
      user_id: "None",
    });
      dispatch(updateAssignmentReseller(form, setResponse));
    
 // }
  },[]) 

  const handleEdit =
    (data) => {
      handleEditOpen();
      setTfnNumber(data?.tfn_number);
      setClientName(data?.user_uuid);
      setMaxCall(data?.max_call);
      setSelectedValue(data?.status === "Active" ? "t" : "f");
      setExtension(data?.extension);
      setDestinationAction(data?.details);
      setRecord(data?.record);
      setCarrierName(data?.carrier_name);
      setDestinationDescription(data?.description);
      setDidId(data?.did_id);
      setRecording(data?.recording.toString());
      setUserId(data.user_id);
      setResellerId(data?.reseller_id)
      setSubType(data?.sub_type.charAt(0) + data?.sub_type.slice(1).toLowerCase());
      setService(
        data?.service_type.charAt(0).toUpperCase() +
          data?.service_type.slice(1).toLowerCase()
      );
      
    };

    const handleUpdate = (e) => {
      e.preventDefault();
      const isValid = checkValidation();
      if (isValid) {
      let data = JSON.stringify({
        description: destinationDescription,
        is_active: selectedValue?.charAt(0),
        id: didId,
        user_id: userId,
        service_type: service?.toUpperCase(),
        sub_type: subType?.toUpperCase(),
        recording: recording?.charAt(0),
        details: destinationAction,
        is_suspended:suspendValue,
        carrier_name: carrierName
      });
  
      dispatch(updateDestinationReseller(data, setResponse, setEdit, setTfnNumber, setDestinationDescription, setSelectedValue, setUserId, setSubType, setRecording, setDestinationAction, setSuspendValue, setCarrierName));
    }
    };

  // ======import

  const handleOpenImport = () => setOpenImport(true);
  const handleCloseImport = () => setOpenImport(false);

  // =======import-end

  // import-csvfile

  // const fileReader = new FileReader();

  const handleOnChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  // const csvFileToArray = (string) => {
  //   const csvHeader = string
  //     .slice(0, string.indexOf("\n"))
  //     .split(",")
  //     .map((header) => header.trim());
  //   const csvRows = string
  //     .slice(string.indexOf("\n") + 1)
  //     .split("\n")
  //     .map((header) => header.trim());

  //   const array = csvRows.map((i) => {
  //     const values = i.split(",");
  //     const obj = csvHeader.reduce((object, header, index) => {
  //       object[header] = values[index];
  //       return object;
  //     }, {});
  //     return obj;
  //   });

  //   setArray(array);
  // };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      const token = JSON.parse(localStorage.getItem("admin"));
      try {
        const response = await axios.post(
          `${api.dev}/api/import_did_from_csv`,
          //formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token.access_token} `,
            },
          }
        );
        if (response.data.status === "200") {
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          });

          handleCloseImport();
          //   navigate("/"})
        } else {
          toast.error(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          });
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      console.warn("No file selected.");
    }
    // if (file) {
    //   fileReader.onload = function (event) {
    //     const text = event.target;
    //     console.log('text', text)
    //     csvFileToArray(text);
    //   };

    //   fileReader.readAsText(file);
    // }
  };

  //const headerKeys = Object.keys(Object.assign({}, ...array));
  const newArray = array.slice(0, -1);

  // import-csvfile-end

  useEffect(() => {
    dispatch(getDidReseller());
  }, [response, deleteRow]);
  useEffect(() => {
    dispatch(getExtension());
    dispatch(getAllUsersReseller(""));
    dispatch(getResellerUsersList());
    dispatch(getResellerRemainingMinutesList())
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "tfnNumber":
        const trimmedValue = value.trim();
        setTfnNumber(trimmedValue);
        break;
      case "clientName":
        setClientName(value);
        break;
      case "maxCall":
        const maxCall = value.trim();
        setMaxCall(maxCall);
        break;
      case "status":
        setSelectedValue(value);
        break;

      default:
        break;
    }
  };

  

  const isRowBordered = (params) => {
    const { row } = params;

    // Add your condition here, for example, adding border to rows where age is greater than 25
    return row.status === true;
  };

  useMemo(()=>{
    if(state?.getResellerUsersList?.userList){
    const usersArray = Object.keys(state?.getResellerUsersList?.userList)?.map(key => ({
      
      user_id: key,
      username: state?.getResellerUsersList?.userList[key]
      
    }));
    setUsers(usersArray);
  }
   },[state?.getResellerUsersList?.userList])
  const resellers = state?.allUsers?.users?.filter(
    (user) => user.role === "Reseller"
  );
  
  const columns = [
       
    {
      field: "action",
      headerName:"Action",
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      sortable: false,
      width: 50,
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            {/* <IconButton>
              <PlayArrow style={{ cursor: "pointer", color: "grey" }} />
            </IconButton> */}
           
            <IconButton onClick={() => handleEdit(params.row)}>
              <Edit
                index={params.row.id}
                style={{ cursor: "pointer", color: "#0e397f" }}
              />
            </IconButton>
           
            {/* <IconButton onClick={() => handleDelete(params.row)}>
              <Delete style={{ cursor: "pointer", color: "red" }} />
            </IconButton> */}
          </div>
        );
      },
    },
    {
      field: "tfn_number",
      headerName: "Destination",
      headerClassName: "custom-header",
      width: 120,
      headerAlign: "center",
      align: "center", 
      renderCell: (params) => {
        // Slice the first 5 digits of the tfn_number
        const truncatedNumber = params.row.tfn_number?.substring(0, 5);
        return (
          <div
            style={{
              fontWeight: "bold",
              color: "blue",
            }}
          >
            {truncatedNumber}
          </div>)}

    },
    {
      field: "username",
      headerName: "User",
      headerClassName: "custom-header",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    // {
    //   field: "total_call_duration",
    //   headerName: "Total Call Duration",
    //   headerClassName: "custom-header",
    //   width: 150,
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      field: "details",
      headerName: "Extension",
      headerClassName: "custom-header",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
   
    {
      field: "sub_type",
      headerName: "Sub Type",
      headerClassName: "custom-header",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            {params.row.sub_type === "EXTENSION" || params.row.sub_type === "Extension"  ? (
              <>
                <div
                  style={{
                    color: "white",
                    background: "cornflowerblue",
                    padding: "7px",
                    borderRadius: "5px",
                    fontSize: "12px",
                    textTransform: "capitalize",
                  }}
                >
                  {params.row.sub_type?.toString()?.toLowerCase()}
                </div>
              </>
            ) : (
             <></>
            )}
            {params.row.sub_type === "QUEUE" || params.row.sub_type === "Queue" ? (<>
                <div
                  style={{
                    color: "white",
                    background: "blueviolet",
                    padding: "7px",
                    borderRadius: "5px",
                    fontSize: "12px",
                    textTransform: "capitalize",
                  }}
                >
                  {params.row.sub_type?.toString()?.toLowerCase()}
                </div>
              </>):(<></>)}
          </div>
        );
      },
    },

    {
      field: "service_type",
      headerName: "Service",
      headerClassName: "custom-header",
      width: 80,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "Assignment",
      headerName: "Assignment",
      width: 90,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center" >
            {params.row.Assignment === "Assign" ? (
              <>
                <div
                  style={{
                    color: "white",
                    background: "rgb(122 5 119)",
                    padding: "7px",
                    borderRadius: "5px",
                    fontSize: "12px",
                    textTransform: "capitalize",
                    // textDecoration: "underline",
                     cursor: "pointer",
                  }}
                  onClick={() => handleEdit(params.row)}
                >
                  Assign
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    color: "white",
                    cursor: "pointer",
                    textDecoration: "underline",
                    background: "#f5c61d",
                    padding: "7px",
                    borderRadius: "5px",
                    fontSize: "12px",
                    textTransform: "capitalize",
                  }}
                  onClick={()=>handleUpdateAssignment(params.row)}
                >
                  Unassign
                </div>
              </>
            )}
          </div>
        );
      },
    },

    {
      field: "recording",
      headerName: "Recording",
      headerClassName: "custom-header",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            {params.row.recording === false ? (
              <>
                <div
                  style={{
                    color: "white",
                    background: "red",
                    padding: "7px",
                    borderRadius: "5px",
                    fontSize: "12px",
                    textTransform: "capitalize",
                  }}
                >
                  {params.row.recording.toString().toLowerCase()}
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    color: "white",
                    background: "green",
                    padding: "7px",
                    borderRadius: "5px",
                    fontSize: "12px",
                    textTransform: "capitalize",
                  }}
                >
                  {params.row.recording.toString().toLowerCase()}
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
      headerClassName: "custom-header",
      width: 150,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "carrier_name",
      headerName: "Carrier Name",
      headerClassName: "custom-header",
      width: 100,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "created_date",
      headerName: "Create Date",
      headerClassName: "custom-header",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const valueFormatter = (params) => {
          const date = new Date(params.value);
          return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
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
    
    // {
    //   field: "created_date",
    //   headerName: "Create Date",
    //   headerClassName: "custom-header",
    //   width: 100,
    //   headerAlign: "center",
    //   align: "center",
    //   renderCell: (params) => {
    //     return (
    //       <div className="d-flex justify-content-between align-items-center">
    //         <p
    //           style={{
    //             fontWeight: "500",
    //             color: "green",
    //             margin: "0",
    //             textTransform: "capitalize",
    //           }}
    //         >
    //           valueFormatter: (params) => {
    //     const date = new Date(params.value);
    //     return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    //   },
    //         </p>
    //       </div>
    //     );
    //   },
     
    // },
    {
      field: "updated_date",
      headerName: "Update Date",
      headerClassName: "custom-header",
      width: 100,
      headerAlign: "center",
      align: "center",

      renderCell: (params) => {
        const valueFormatter = (params) => {
          const date = new Date(params.value);
          return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        
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

      valueFormatter: (params) => {
       
      },
    },

    
    {
      field: "status",
      headerName: "Status",
      width: 80,
      headerClassName: "custom-header",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="d-flex justify-content-between align-items-center">
            {params.row.status === "Active" ? (
              <>
                <div
                  style={{
                    color: "green",
                    //background: "green",
                    padding: "7px",
                    borderRadius: "5px",
                    fontSize: "15px",
                    textTransform: "capitalize",
                    fontWeight: "600",
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
                    //   background: "red",
                    padding: "7px",
                    borderRadius: "5px",
                    fontSize: "15px",
                    textTransform: "capitalize",
                    fontWeight: "600",
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
  const rows = useMemo(() => {
    const calculatedRows = [];
    state?.allDidReseller?.alldid &&
      state?.allDidReseller?.alldid?.forEach((item, index) => {
        calculatedRows.push({
          id: index + 1,
          //client_name: item?.client_name,
          did_id: item?.id,
          tfn_number: item?.didnumber,
          // max_call: item?.max_call,
          username: item?.username,
          record: item?.destination_record,
          service_type: item?.service_type,
          created_date: item?.created_date,
          updated_date: item?.updated_date,
          extension: item?.destination_actions,
          status: item?.is_active,
          details: item?.details,
          description: item?.description,
          recording: item.recording,
          user_id: item.user_id,
          reseller_id: item.reseller_id,
          reseller_name: item.reseller_name,
          sub_type: item.sub_type,
          carrier_name: item.carrier_name,
          total_call_duration: item.total_call_duration,
          Assignment: item.Assignment
        });
      });
    return calculatedRows;
  }, [state?.allDidReseller?.alldid]);

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
                              <h3>Destination</h3>
                              {/* <p>
                                Inbound destinations are the DID/DDI, DNIS or
                                Alias for inbound calls.
                              </p> */}
                            </div>

                            {state?.getResellerRemainingMinutes?.remainingMinutes?.remaining_dides ? (<>
                            <div  style={{margin:'auto'}} className="billing_minute">
<div style={{color:"white", padding:"8px", fontSize:"20px"}}>Remaining DIDs: <span style={{color:'rgb(78 255 8)'}}>{state?.getResellerRemainingMinutes?.remainingMinutes?.remaining_dides}</span></div>
</div></>) : (<>
  <div  style={{margin:'auto'}} className="billing_minute">
<div style={{color:"white", padding:"8px", fontSize:"20px"}}>Remaining DIDs: <span style={{color:'rgb(78 255 8)'}}>{0}</span></div>
</div></>)}

                            <div style={{ display: "flex",alignItems:'center',position:"relative",top:'0',}}>


                              {/* import */}
                              {user?.user_role === "Reseller"? (<></>):(<> 
                              <Typography onClick={handleClick} target="_blank" className="hover-content" style={{ cursor: "pointer"}}>
                                  <IconButton>
                                    <FileDownloadIcon/> 
                                  </IconButton>
                                </Typography>
     
                             
                              <div className="n-ppost" style={{paddingRight:'20px'}}>Sample</div>
                               <img className="n-ppost-name" 
                               src="https://i.ibb.co/rMkhnrd/sample2.png" alt="Image" />
                               
                              <div>
                                <IconButton
                                  className="all_button_clr"
                                  onClick={handleOpenImport}
                                >
                                  Import <ImportExportIcon />
                                </IconButton>
                              </div></>)}

                              <Modal
                                open={openimport}
                                onClose={handleCloseImport}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                              >
                                <Fade in={openimport} className="bg_imagess">
                                  <Box
                                    sx={style}
                                    borderRadius={"10px"}
                                    textAlign={"center"}
                                  >
                                    <IconButton
                                      onClick={handleCloseImport}
                                      sx={{ float: "inline-end" }}
                                    >
                                      <Close />
                                    </IconButton>
                                    <br />
                                    <br />
                                    <img
                                      src="/img/import-icon.png"
                                      alt="import"
                                      style={{ borderRadius: "30px" }}
                                    />

                                    <form
                                      style={{
                                        textAlign: "center",
                                        height: "auto",
                                        overflow: "auto",
                                        paddingTop: "10px",
                                        padding: "20px",
                                      }}
                                    >
                                      <Typography
                                        id="transition-modal-title"
                                        variant="h6"
                                        component="h2"
                                        color={"#092b5f"}
                                        fontSize={"18px"}
                                        fontWeight={"600"}
                                      >
                                        Import File
                                      </Typography>

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
                                          textTransform:
                                            "capitalize !important",
                                        }}
                                        onClick={handleCloseImport}
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
                                          textTransform:
                                            "capitalize !important",
                                        }}
                                        //onClick={handleSubmit}
                                        onClick={(e) => {
                                          handleOnSubmit(e);
                                        }}
                                      >
                                        Submit
                                      </Button>
                                    </form>
                                  </Box>
                                </Fade>
                              </Modal>
                              {/* import-end */}

                              {/* ==Add-modal== */}

                              {user?.user_role === "Reseller"? (<></>):(<> <div>
                                <IconButton
                                  className="all_button_clr"
                                  onClick={handleOpen}
                                >
                                  Add <AddOutlinedIcon />
                                </IconButton>
                              </div></>)}

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
                                <Fade in={open} className="bg_imagess">
                                  <Box
                                    sx={style}
                                    borderRadius={"10px"}
                                    textAlign={"center"}
                                  >
                                    <IconButton
                                      onClick={handleClose}
                                      sx={{ float: "inline-end" }}
                                    >
                                      <Close />
                                    </IconButton>
                                    <br />
                                    <br />
                                    <img src="/img/admin-did-icon.png" />
                                    <Typography
                                      id="transition-modal-title"
                                      variant="h6"
                                      component="h2"
                                      color={"#092b5f"}
                                      fontSize={"18px"}
                                      fontWeight={"600"}
                                    >
                                      Add DID
                                    </Typography>

                                    <form
                                      style={{
                                        textAlign: "center",
                                        height: "348px",
                                        overflow: "auto",
                                        paddingTop: "10px",
                                        padding: "20px",
                                      }}
                                    >
                                      <TextField
                                        style={{
                                          width: "100%",
                                          margin: "7px 0",
                                        }}
                                        type="text"
                                        label="Destination"
                                        variant="outlined"
                                        name="tfnNumber"
                                        value={tfnNumber}
                                        onChange={(e) => {
                                          const numericValue =
                                            e.target.value.replace(
                                              /[^0-9]/g,
                                              ""
                                            );
                                          setTfnNumber(numericValue);
                                        }}
                                        
                                        inputProps={{
                                          inputMode: "numeric",
                                          // pattern: '[0-9]*',
                                        }}
                                      />
                                       {validation.tfnNumber && (
                                      <p
                                        className="mb-0"
                                        style={{
                                          color: "red",
                                          textAlign: "left",
                                        }}
                                      >
                                        {validation.tfnNumber}
                                      </p>
                                       )}

                                      <br />

                                      <FormControl
                                        fullWidth
                                        style={{
                                          width: "100%",
                                          margin: "7px 0",
                                        }}
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
                                          
                                        >
                                          {users?.map(
                                            (item, index) => {
                                              return (
                                                <MenuItem
                                                  key={index}
                                                  value={item?.user_id}
                                                >
                                                  {item.username}
                                                </MenuItem>
                                              );
                                            }
                                          )}
                                        </Select>
                                      </FormControl>
                                      {validation.userId && (
                                      <p
                                        className="mb-0"
                                        style={{
                                          color: "red",
                                          textAlign: "left",
                                        }}
                                      >
                                        {validation.userId}
                                      </p>
                                       )}

                                      <br />

                                      <FormControl
                              fullWidth
                              style={{ width: "100%", margin: "7px 0" }}
                              className={classes.formControl}
                            >
                              <InputLabel id="demo-simple-select-label">
                                Reseller 
                              </InputLabel>

                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Reseller"
                                style={{ textAlign: "left" }}
                                value={resellerId}
                                onChange={(e) => {
                                  setResellerId(e.target.value);
                                }}
                                required
                              >
                                {resellers?.map((item, index) => {
                                  return (
                                    <MenuItem
                                      key={index}
                                      value={item?.reseller_id}
                                    >
                                      {item.username}
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
                                          Services
                                        </InputLabel>
                                        <Select
                                          style={{ textAlign: "left" }}
                                          labelId="demo-multiple-checkbox-label"
                                          label="Services"
                                          id="demo-multiple-checkbox"
                                          multiple
                                          fullWidth
                                          value={serviceType}
                                          onChange={handleChanges}
                                          input={
                                            <OutlinedInput label="Services" />
                                          }
                                          renderValue={(selected) =>
                                            selected.join(", ")
                                          }
                                          MenuProps={MenuProps}
                                          disabled={true}
                                        >
                                          {names.map((name) => (
                                            <MenuItem key={name} value={name}>
                                              <Checkbox
                                                checked={
                                                  serviceType.indexOf(name) > -1
                                                }
                                              />
                                              <ListItemText primary={name} />
                                            </MenuItem>
                                          ))}
                                        </Select>
                                      </FormControl>
                                      {validation.serviceType && (
                                      <p
                                        className="mb-0"
                                        style={{
                                          color: "red",
                                          textAlign: "left",
                                        }}
                                      >
                                        {validation.serviceType}
                                      </p>
                                       )}

                                      {serviceType.map((item, index) => {
                                        return (
                                          <>
                                            {item === "Manage" ? (
                                              <>
                                                {" "}
                                                <br />
                                                <FormControl
                                                  style={{
                                                    width: "100%",
                                                    margin: " 5px 0 5px 0",
                                                  }}
                                                >
                                                  <InputLabel id="demo-multiple-checkbox-label">
                                                    Type
                                                  </InputLabel>
                                                  <Select
                                                    style={{
                                                      textAlign: "left",
                                                    }}
                                                    labelId="demo-multiple-checkbox-label"
                                                    label="Sub Type"
                                                    id="demo-multiple-checkbox"
                                                    //multiple
                                                    fullWidth
                                                    value={subType}
                                                    onChange={(e) => {
                                                      const newSubType = e.target.value;
                                                      setSubType(newSubType);
                                                      // Clear destinationAction if subType is Extension or Queue
                                                      if (newSubType === "Extension" || newSubType === "Queue") {
                                                        setDestinationAction([]);
                                                      }
                                                    }}
                                                    // input={
                                                    //   <OutlinedInput label="Sub Type" />
                                                    // }
                                                    // renderValue={(selected) =>
                                                    //   selected.join(", ")
                                                    // }
                                                    // MenuProps={MenuProps}
                                                  >
                                                    {sub_type.map((name) => (
                                                      <MenuItem
                                                        key={name}
                                                        value={name}
                                                      >
                                                        {/* <Checkbox
                                                checked={
                                                  serviceType.indexOf(name) > -1
                                                }
                                              />
                                              <ListItemText primary={name} /> */}
                                                        {name}
                                                      </MenuItem>
                                                    ))}
                                                  </Select>
                                                </FormControl>
                                                {subType === "Extension" ? (
                                                  <>
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
                                                        style={{
                                                          textAlign: "left",
                                                        }}
                                                        labelId="demo-multiple-checkbox-label"
                                                        label="Extension"
                                                        id="demo-multiple-checkbox"
                                                        //multiple
                                                        fullWidth
                                                        value={
                                                          destinationAction
                                                        }
                                                        onChange={(e) => {
                                                          setDestinationAction(
                                                            e.target.value
                                                          );
                                                        }}
                                                        // input={
                                                        //   <OutlinedInput label="Extension" />
                                                        // }
                                                        // renderValue={(
                                                        //   selected
                                                        // ) =>
                                                        //   selected.join(", ")
                                                        // }
                                                        MenuProps={MenuProps}
                                                      >
                                                        {extensionNumber?.data?.map(
                                                          (name) => (
                                                            <MenuItem
                                                              key={name}
                                                              value={name}
                                                            >
                                                              {/* <Checkbox
                                                                checked={
                                                                  destinationAction.indexOf(
                                                                    name
                                                                  ) > -1
                                                                }
                                                              />
                                                              <ListItemText
                                                                primary={name}
                                                              /> */}
                                                              {name}
                                                            </MenuItem>
                                                          )
                                                        )}
                                                      </Select>
                                                    </FormControl>
                                                  </>
                                                ) : (
                                                  <></>
                                                )}
                                                {subType === "Queue" ? (
                                                  <>
                                                    {" "}
                                                    <FormControl
                                                      fullWidth
                                                      style={{
                                                        width: "100%",
                                                        margin: "7px 0",
                                                      }}
                                                    >
                                                      <InputLabel id="demo-simple-select-label">
                                                        Queue
                                                      </InputLabel>

                                                      <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        label="Queue"
                                                        style={{
                                                          textAlign: "left",
                                                        }}
                                                       // multiple
                                                        value={
                                                          destinationAction
                                                        }
                                                        onChange={(e) => {
                                                          setDestinationAction(
                                                            e.target.value
                                                          );
                                                        }}
                                                        // input={
                                                        //   <OutlinedInput label="Extension" />
                                                        // }
                                                        // renderValue={(
                                                        //   selected
                                                        // ) =>
                                                        //   selected.join(", ")
                                                        // }
                                                        MenuProps={MenuProps}
                                                        required
                                                      >
                                                        {queue.data?.map(
                                                          (item, index) => {
                                                            return (
                                                              <MenuItem
                                                                key={index}
                                                                value={item}
                                                              >
                                                                {/* <Checkbox
                                            checked={
                                              destinationAction.indexOf(item) > -1
                                            }
                                          /> */}
                                                                {/* <ListItemText
                                                                  primary={item}
                                                                /> */}
                                                                {item}
                                                              </MenuItem>
                                                            );
                                                          }
                                                        )}
                                                      </Select>
                                                    </FormControl>
                                                  </>
                                                ) : (
                                                  <></>
                                                )}
                                              </>
                                            ) : (
                                              <></>
                                            )}
                                          </>
                                        );
                                      })}

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
                                          style={{ textAlign: "left" }}
                                          value={selectedValue}
                                          onChange={handleSelectChange}
                                          required
                                        >
                                          <MenuItem value={"t"}>
                                            Active
                                          </MenuItem>
                                          <MenuItem value={"f"}>
                                            Deactive
                                          </MenuItem>
                                        </Select>
                                      </FormControl>
                                      {validation.selectedValue && (
                                      <p
                                        className="mb-0"
                                        style={{
                                          color: "red",
                                          textAlign: "left",
                                        }}
                                      >
                                        {validation.selectedValue}
                                      </p>
                                       )}


                                      {/* <br />

                                  <FormControl
                                    fullWidth
                                    style={{ width: "100%", margin: "7px 0" }}
                                  >
                                    <InputLabel id="demo-simple-select-label">
                                      Record
                                    </InputLabel>
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      label="Status"
                                      style={{ textAlign: "left" }}
                                      value={destinationRecord}
                                      onChange={(e) => {
                                        setDestinationRecord(e.target.value);
                                      }}
                                      required
                                    >
                                      <MenuItem value={"true"}>True</MenuItem>
                                      <MenuItem value={"false"}>False</MenuItem>
                                    </Select>
                                  </FormControl>*/}

                                      <br />
                                      <FormControl
                                        fullWidth
                                        style={{
                                          width: "100%",
                                          margin: "7px 0",
                                        }}
                                      >
                                        <InputLabel id="demo-simple-select-label">
                                          Recording
                                        </InputLabel>
                                        <Select
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          label="Recording"
                                          style={{ textAlign: "left" }}
                                          value={recording}
                                          onChange={(e) => {
                                            setRecording(e.target.value);
                                          }}
                                          required
                                        >
                                          <MenuItem value={"true"}>
                                            Yes
                                          </MenuItem>
                                          <MenuItem value={"false"}>
                                            No
                                          </MenuItem>
                                        </Select>
                                      </FormControl>
                                      {validation.recording && (
                                      <p
                                        className="mb-0"
                                        style={{
                                          color: "red",
                                          textAlign: "left",
                                        }}
                                      >
                                        {validation.recording}
                                      </p>
                                       )}

                                      <br />
                                      <TextField
                                        style={{
                                          width: "100%",
                                          margin: "7px 0",
                                        }}
                                        type="text"
                                        label="Carrier Name"
                                        variant="outlined"
                                        name="carrier_name"
                                        value={carrierName}
                                        onChange={(e) => {
                                          setCarrierName(
                                            e.target.value
                                          );
                                        }}
                                        
                                      />
                                       {validation.carrierName && (
                                      <p
                                        className="mb-0"
                                        style={{
                                          color: "red",
                                          textAlign: "left",
                                        }}
                                      >
                                        {validation.carrierName}
                                      </p>
                                       )}

                                       <br/>

                                      <TextField
                                        style={{
                                          width: "100%",
                                          margin: "7px 0",
                                        }}
                                        type="text"
                                        label="Description"
                                        variant="outlined"
                                        name="destinationDescription"
                                        value={destinationDescription}
                                        onChange={(e) => {
                                          setDestinationDescription(
                                            e.target.value
                                          );
                                        }}
                                        
                                      />
                                      <br />
                                     

                                    </form>
                                    
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
                                          textTransform:
                                            "capitalize !important",
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
                                          textTransform:
                                            "capitalize !important",
                                        }}
                                        onClick={handleSubmit}
                                      >
                                        save
                                      </Button>
                                  </Box>
                                </Fade>
                              </Modal>
                              {/* -----   Add Campaigns Modal End   ----- */}
                            </div>
                          </div>

                          {/* <div className="row">
                          <Box m="0px 0 0 0" height="50vh">
                            <DataGrid
                              rows={mockDataTeam}
                              columns={columns}
                              headerClassName="custom-header"
                            />
                          </Box>
                        </div> */}

                          {/* {loader === null ? (
                        <>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              width: "90%",
                              marginTop: "9rem !important",
                            }}
                          >
                            <CircularProgress />
                          </Box>
                        </>
                      ) : (
                        <> */}



                          <ThemeProvider theme={theme}>
      <div style={{ height: '100%', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowClassName={(params) =>
            isRowBordered(params) ? 'borderedGreen' : 'borderedRed'
          }
          components={{ Toolbar: GridToolbar }}
          slots={{
            toolbar: CustomToolbar,
          }}
          autoHeight // Automatically adjust the height to fit all rows
        />
      </div>
    </ThemeProvider>
                          {/* </>
                      )} */}

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
                            <Fade in={edit} className="bg_imagess">
                              <Box
                                sx={style}
                                borderRadius="10px"
                                textAlign="center"
                              >
                                <IconButton
                                  onClick={handleEditClose}
                                  sx={{ float: "inline-end" }}
                                >
                                  <Close />
                                </IconButton>
                                <br />
                                <br/>
                                <Typography
                                  id="transition-modal-title"
                                  variant="h6"
                                  component="h2"
                                  color={"#092b5f"}
                                  fontSize={"18px"}
                                  fontWeight={"600"}
                                  marginBottom={"16px"}
                                >
                                  Update Destination
                                </Typography>
                                <Typography
                                  id="transition-modal-description"
                                  sx={{ mt: 2 }}
                                ></Typography>
                                <form
                                  style={{
                                    textAlign: "center",
                                    overflow: "auto",
                                    height: "348px",
                                    padding: "20px",
                                  }}
                                >
                                  <TextField
                                    style={{
                                      width: "100%",
                                      margin: " 5px 0 5px 0",
                                    }}
                                    type="number"
                                    label="Destination"
                                    variant="outlined"
                                    name="tfnNumber"
                                    value={parseInt(tfnNumber.substring(0, 5))}
                                    onChange={handleChange}
                                    padding={"0px 0 !important"}
                                    disabled
                                  />

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
                                      <MenuItem value="None">none</MenuItem>
                                      {users?.map(
                                        (item, index) => {
                                          return (
                                            <MenuItem
                                              key={index}
                                              value={item?.user_id}
                                            >
                                              {item.username}
                                            </MenuItem>
                                          );
                                        }
                                      )}
                                    </Select>
                                  </FormControl>

                                  {/* <br />

                              <FormControl
                                fullWidth
                                style={{ width: "100%", margin: "7px 0" }}
                              >
                                <InputLabel id="demo-simple-select-label">
                                  
                                   Extension
                                </InputLabel>

                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  label="Extension"
                                  style={{ textAlign: "left" }}
                                  value={destinationAction}
                                  onChange={(e) => {
                                    setDestinationAction(e.target.value);
                                  }}
                                  required
                                >
                                  {state?.allExtension?.allextension?.map(
                                    (item, index) => {
                                      return (
                                        <MenuItem
                                          key={index}
                                          value={item?.extension}
                                        >
                                          {item?.extension}
                                        </MenuItem>
                                      );
                                    }
                                  )}
                                </Select>
                              </FormControl>
                              <br />

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
                                  value={userUuid}
                                  onChange={(e) => {
                                    setUserUuid(e.target.value);
                                  }}
                                  required
                                >
                                  {state?.allUsers?.users?.map(
                                    (item, index) => {
                                      return (
                                        <MenuItem
                                          key={index}
                                          value={item?.user_uuid}
                                        >
                                          {item.username}
                                        </MenuItem>
                                      );
                                    }
                                  )}
                                </Select>
                              </FormControl> */}

                                  <br />

                                  <FormControl
                                    style={{
                                      width: "100%",
                                      margin: " 5px 0 5px 0",
                                    }}
                                  >
                                    <InputLabel id="demo-multiple-checkbox-label">
                                      Services
                                    </InputLabel>
                                    <Select
                                      style={{ textAlign: "left" }}
                                      labelId="demo-multiple-checkbox-label"
                                      label="Services"
                                      id="demo-multiple-checkbox"
                                      //multiple
                                      fullWidth
                                      value={service}
                                      onChange={(e) => {
                                        setService(e.target.value);
                                      }}
                                      // input={
                                      //   <OutlinedInput label="Services" />
                                      // }
                                      // renderValue={(selected) =>
                                      //   selected.join(", ")
                                      // }
                                      // MenuProps={MenuProps}
                                    >
                                      {names.map((name) => (
                                        <MenuItem key={name} value={name}>
                                          {/* <Checkbox
                                                checked={
                                                  serviceType.indexOf(name) > -1
                                                }
                                              />
                                              <ListItemText primary={name} /> */}
                                          {name}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>

                                  {service === "Manage" ? (
                                    <>
                                      {" "}
                                      <br />
                                      <FormControl
                                        style={{
                                          width: "100%",
                                          margin: " 5px 0 5px 0",
                                        }}
                                      >
                                        <InputLabel id="demo-multiple-checkbox-label">
                                          Sub Type
                                        </InputLabel>
                                        <Select
                                          style={{ textAlign: "left" }}
                                          labelId="demo-multiple-checkbox-label"
                                          label="Sub Type"
                                          id="demo-multiple-checkbox"
                                          //multiple
                                          fullWidth
                                          value={subType}
                                          onChange={(e) => {
                                            const newSubType = e.target.value;
                                            setSubType(newSubType);
                                            // Clear destinationAction if subType is Extension or Queue
                                            if (newSubType === "Extension" || newSubType === "Queue") {
                                              setDestinationAction([]);
                                            }
                                          }}
                                          // input={
                                          //   <OutlinedInput label="Sub Type" />
                                          // }
                                          // renderValue={(selected) =>
                                          //   selected.join(", ")
                                          // }
                                          // MenuProps={MenuProps}
                                        >
                                          {sub_type.map((name) => (
                                            <MenuItem key={name} value={name}>
                                              {/* <Checkbox
                                                checked={
                                                  serviceType.indexOf(name) > -1
                                                }
                                              />
                                              <ListItemText primary={name} /> */}
                                              {name}
                                            </MenuItem>
                                          ))}
                                        </Select>
                                      </FormControl>
                                      {subType === "Extension" ? (
                                        <>
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
                                            //  multiple
                                              fullWidth
                                              value={destinationAction}
                                              onChange={(e) => {
                                                setDestinationAction(
                                                  e.target.value
                                                );
                                              }}
                                              // input={
                                              //   <OutlinedInput label="Extension" />
                                              // }
                                              // renderValue={(selected) =>
                                              //   selected.join(", ")
                                              // }
                                              MenuProps={MenuProps}
                                            >
                                              {extensionNumber?.data?.map(
                                                (name) => (
                                                  <MenuItem
                                                    key={name}
                                                    value={name}
                                                  >
                                                    {/* <Checkbox
                                                      checked={
                                                        destinationAction.indexOf(
                                                          name
                                                        ) > -1
                                                      }
                                                    />
                                                    <ListItemText
                                                      primary={name}
                                                    /> */}
                                                    {name}
                                                  </MenuItem>
                                                )
                                              )}
                                            </Select>
                                          </FormControl>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                      {subType === "Queue" ? (
                                        <>
                                          {" "}
                                          <FormControl
                                            fullWidth
                                            style={{
                                              width: "100%",
                                              margin: "7px 0",
                                            }}
                                          >
                                            <InputLabel id="demo-simple-select-label">
                                              Queue
                                            </InputLabel>

                                            <Select
                                              labelId="demo-simple-select-label"
                                              id="demo-simple-select"
                                              label="Queue"
                                              style={{ textAlign: "left" }}
                                             // multiple
                                              value={destinationAction}
                                              onChange={(e) => {
                                                setDestinationAction(
                                                  e.target.value
                                                );
                                              }}
                                              // input={
                                              //   <OutlinedInput label="Extension" />
                                              // }
                                              // renderValue={(selected) =>
                                              //   selected.join(", ")
                                              // }
                                              MenuProps={MenuProps}
                                              required
                                            >
                                              {queue.data?.map(
                                                (item, index) => {
                                                  return (
                                                    <MenuItem
                                                      key={index}
                                                      value={item}
                                                    >
                                                      {/* <Checkbox
                                            checked={
                                              destinationAction.indexOf(item) > -1
                                            }
                                          /> */}
                                                      {/* <ListItemText
                                                        primary={item}
                                                      /> */}
                                                      {item}
                                                    </MenuItem>
                                                  );
                                                }
                                              )}
                                            </Select>
                                          </FormControl>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </>
                                  ) : (
                                    <></>
                                  )}

                                  <br />
                                  <FormControl
                                    fullWidth
                                    style={{ width: "100%", margin: "7px 0" }}
                                  >
                                    <InputLabel id="demo-simple-select-label">
                                      Recording
                                    </InputLabel>
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      label="Recording"
                                      style={{ textAlign: "left" }}
                                      value={recording}
                                      onChange={(e) => {
                                        setRecording(e.target.value);
                                      }}
                                      required
                                    >
                                      <MenuItem value={"true"}>Yes</MenuItem>
                                      <MenuItem value={"false"}>No</MenuItem>
                                    </Select>
                                  </FormControl>
                                  {/* <br />

                              

                              <FormControl
                                fullWidth
                                style={{ width: "100%", margin: "7px 0" }}
                              >
                                <InputLabel id="demo-simple-select-label">
                                Record
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  label="Record"
                                  style={{ textAlign: "left" }}
                                  value={destinationRecord}
                                  onChange={(e) => {
                                    setDestinationRecord(e.target.value);
                                  }}
                                  required
                                >
                                  <MenuItem value={"true"}>True</MenuItem>
                                  <MenuItem value={"false"}>False</MenuItem>
                                </Select>
                              </FormControl> */}

                                  {/* <br />

                              <FormControl
                                fullWidth
                                style={{ width: "100%", margin: "7px 0" }}
                              >
                                {serviceType === "" ? (
                                  <InputLabel id="demo-simple-select-label">
                                    {service}
                                  </InputLabel>
                                ) : (
                                  <InputLabel id="demo-simple-select-label">
                                    Service
                                  </InputLabel>
                                )}

                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  label="Status"
                                  style={{ textAlign: "left" }}
                                  value={serviceType}
                                  onChange={(e) => {
                                    setServiceType(e.target.value);
                                  }}
                                  required
                                >
                                  <MenuItem value={"REDIRECT"}>
                                    REDIRECT
                                  </MenuItem>
                                  <MenuItem value={"MANAGE"}>MANAGE</MenuItem>
                                  <MenuItem value={"SIP"}>SIP</MenuItem>
                                </Select>
                              </FormControl> */}
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
                                          style={{ textAlign: "left" }}
                                          value={selectedValue}
                                          onChange={handleSelectChange}
                                          required
                                        >
                                          <MenuItem value={"t"}>
                                            Active
                                          </MenuItem>
                                          <MenuItem value={"f"}>
                                            Deactive
                                          </MenuItem>
                                        </Select>
                                      </FormControl>

                                  <br />

                                  <FormControl
                                        fullWidth
                                        style={{
                                          width: "100%",
                                          margin: "7px 0",
                                        }}
                                      >
                                        <InputLabel id="demo-simple-select-label">
                                        Suspend
                                        </InputLabel>
                                        <Select
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          label="Suspend"
                                          style={{ textAlign: "left" }}
                                          value={suspendValue}
                                          onChange={(e)=> setSuspendValue(e.target.value)}
                                          required
                                        >
                                          <MenuItem value={0}>
                                          Not Suspended
                                          </MenuItem>
                                          <MenuItem value={1}>
                                            Suspended
                                          </MenuItem>
                                        </Select>
                                      </FormControl>

                                  <br />

                                  <TextField
                                        style={{
                                          width: "100%",
                                          margin: "7px 0",
                                        }}
                                        type="text"
                                        label="Carrier Name"
                                        variant="outlined"
                                        name="carrier_name"
                                        value={carrierName}
                                        onChange={(e) => {
                                          setCarrierName(
                                            e.target.value
                                          );
                                        }}
                                        required
                                      />
                                       {validation.carrierName && (
                                      <p
                                        className="mb-0"
                                        style={{
                                          color: "red",
                                          textAlign: "left",
                                        }}
                                      >
                                        {validation.carrierName}
                                      </p>
                                       )}
                                      <br />

                                  <TextField
                                    style={{ width: "100%", margin: "7px 0" }}
                                    type="text"
                                    label="Description"
                                    variant="outlined"
                                    name="destinationDescription"
                                    value={destinationDescription}
                                    onChange={(e) => {
                                      setDestinationDescription(e.target.value);
                                    }}
                                  />
                                  <br />
                                 

                                  
                                </form>
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
                              onClick={handleEditClose}
                              autoFocus
                            >
                              Cancel
                            </Button>
                            <Button
                                    className="all_button_clr"
                                    sx={{
                                      fontSize: "16px !impotant",
                                      marginTop: "20px",
                                      marginLeft: "0px !important",
                                      padding: "10px 20px !important",
                                      textTransform: "capitalize !important",
                                    }}
                                    variant="contained"
                                    color="primary"
                                    onClick={handleUpdate}
                                  >
                                    Update
                                  </Button>
                              </Box>
                            </Fade>
                          </Modal>
                          {/* -----   Edit Campaign Modal End   ----- */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>

</div>
              </div>
            </div>
          </Box>
        </div>
      </div>
    </>
  );
}

export default ResellerDidTfnNumber;
