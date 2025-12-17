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
import { updateDestination } from "../../../../redux/actions/adminPortal/destinationAction";
import DestinationForm from "./DestinationForm";
import { validateIpWithPort } from "../utils/validation";

const EditDestinationModal = React.memo(({
  edit,
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
}) => {
  const dispatch = useDispatch();

  const {
    tfnNumber,
    userId,
    recording,
    selectedValue,
    carrierName,
    resellerId,
    subType,
    destinationAction,
    destinationDescription,
    ipAddress,
    service,
    suspendValue,
    didId,
  } = stateReducer;

  const checkValidation = useCallback(() => {
    const errors = {};
    let isValid = true;

    if (!tfnNumber) {
      errors.tfnNumber = "Field is required";
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

  const handleUpdate = useCallback((e) => {
    e.preventDefault();
    const isValid = checkValidation();
    if (isValid && error === "") {
      const data = JSON.stringify({
        description: destinationDescription,
        is_active: selectedValue?.charAt(0),
        id: didId,
        user_id: userId,
        service_type: service?.toUpperCase(),
        sub_type: subType?.toUpperCase(),
        recording: recording?.charAt(0),
        details: Array.isArray(destinationAction) ? destinationAction.join(",") : destinationAction,
        is_suspended: suspendValue,
        carrier_name: carrierName,
        reseller_id: resellerId,
        didnumber: tfnNumber,
        ip_address: ipAddress,
      });

      dispatch(
        updateDestination(
          data,
          (response) => setField('response', response),
          onClose
        )
      );
    }
  }, [
    checkValidation, error, destinationDescription, selectedValue, didId, userId,
    service, subType, recording, destinationAction, suspendValue, carrierName,
    resellerId, tfnNumber, ipAddress, dispatch, setField, onClose
  ]);

  if (!edit) return null;

  return (
    <Dialog open={edit} onClose={onClose} sx={{ textAlign: "center", borderRadius: "0px" }} className="custom_dialog_box_did">

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
          Update Destination
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
      {/* <Box>
        <IconButton 
          onClick={onClose} 
          sx={{ 
            float: "inline-end", 
            display: "flex", 
            justifyContent: "end", 
            margin: "10px 10px 0px 0px" 
          }}
        >
          <Close />
        </IconButton>
      </Box>
      <DialogTitle sx={{ color: "#07285d", fontWeight: "600", width: "500px" }}>
        Update Destination
      </DialogTitle> */}
      <DialogContent sx={{ paddingTop: "0px", paddingBottom: "0px" }}>
        <DestinationForm
          mode="edit"
          handleUpdate={handleUpdate}
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

export default EditDestinationModal;