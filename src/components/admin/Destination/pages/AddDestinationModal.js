import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { createDestination } from "../../../../redux/actions/adminPortal/destinationAction";
import DestinationForm from "./DestinationForm";
import { validateIpWithPort, validateTfnNumber } from "../utils/validation";

const AddDestinationModal = React.memo(({
  open,
  onClose,
  stateReducer,
  setField,
  users,
  resellers,
  resellerUsers,
  extensionNumber,
  queue,
  validation,
  error,
  setResponse,
}) => {
  const dispatch = useDispatch();

  const {
    tfnNumber,
    userId,
    serviceType,
    recording,
    selectedValue,
    carrierName,
    resellerId,
    subType,
    destinationAction,
    destinationDescription,
    ipAddress,
  } = stateReducer;

  const checkValidation = useCallback(() => {
    const errors = {};
    let isValid = true;

    const tfnValidation = validateTfnNumber(tfnNumber);
    if (!tfnValidation.valid) {
    errors.tfnNumber = tfnValidation.message;
    isValid = false;
  }

    if (!carrierName) {
      errors.carrierName = "Field is required";
      isValid = false;
    }

    setField('validation', errors);
    return isValid;
  }, [tfnNumber, carrierName, setField]);

  const handleIpChange = useCallback((e) => {
    const newValue = e.target.value;
    setField('ipAddress', newValue);

    const validationResult = validateIpWithPort(newValue);
    setField('error', validationResult.valid ? "" : validationResult.message);
  }, [setField]);

    const cleanDetails = (value) => {
  if (!value) return "";

  if (Array.isArray(value)) {
    return value.join(",").replace(/^,*/, "");
  }

  return value.replace(/^,*/, "");
};

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const isValid = checkValidation();
    if (isValid && error === "") {
      const cleanedDetails = cleanDetails(destinationAction);
      const data = JSON.stringify({
        user_id: userId,
        reseller_id: resellerId,
        didnumber: tfnNumber,
        details: cleanedDetails,
        description: destinationDescription,
        is_active: selectedValue,
        service_type: serviceType[0]?.toUpperCase() || "",
        sub_type: subType.toUpperCase(),
        recording: recording.toString().charAt(0),
        carrier_name: carrierName,
        ip_address: ipAddress,
      });

      dispatch(createDestination(data, onClose, setResponse));
    }
  }, [
    checkValidation, error, userId, resellerId, tfnNumber, destinationAction,
    destinationDescription, selectedValue, serviceType, subType, recording,
    carrierName, ipAddress, dispatch, onClose, setField
  ]);

  if (!open) return null;

  return (
    <Dialog open={open} onClose={onClose} sx={{ textAlign: "center", borderRadius: "0px" }} className="custom_dialog_box_did">
      {/* <Box>
      <DialogTitle sx={{ color: "#07285d", fontWeight: "600", width: "500px" }}>
        
        Add DID
      </DialogTitle>
        <IconButton 
          onClick={onClose} 
          sx={{ 
            float: "inline-end", 
            display: "flex", 
            justifyContent: "end", 
            margin: "7px 7px 0px 0px" 
          }}
        >
          <Close />
        </IconButton>
      </Box> */}
      <Box
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: "500px"
  }}
>
  <Typography
    
    sx={{
      color: "#07285d",
      fontWeight: 600,
      FontSize: "20px!important",
      marginTop: "6px",
      textAlign: "center",
      padding: "10px!important"
    }}
  >
    Add DID
  </Typography>

  <IconButton
    onClick={onClose}
    sx={{
      position: "absolute",
      right: 8,
      top: 8
    }}
  >
    <Close />
  </IconButton>
</Box>

  
      <DialogContent sx={{ paddingTop: "0px", paddingBottom: "0px" }}>
        <DestinationForm
          mode="add"
          handleSubmit={handleSubmit}
          onClose={onClose}
          state={stateReducer}
          setField={setField}
          users={users}
          resellers={resellers}
          resellerUsers={resellerUsers}
          extensionNumber={extensionNumber}
          queue={queue}
          validation={validation}
          error={error}
          handleIpChange={handleIpChange}
        />
      </DialogContent>


    </Dialog>
  );
});

export default AddDestinationModal;