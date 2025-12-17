import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import { suspendDestination } from "../../../../redux/actions/adminPortal/destinationAction";

const SuspendConfirmationModal = React.memo(({
  alertMessage,
  onClose,
  selectedCallerData,
  selectedRows,
  filteredRows,
  setField,
  dispatch,
}) => {

  const handleDelete = useCallback(() => {
    const firstSelectedRow = filteredRows.find((row) => row.id === selectedRows[0]);
    const isSuspendedStatus = firstSelectedRow?.is_suspended === 1 ? 0 : 1;

    dispatch(
      suspendDestination(
        JSON.stringify({
          ids: selectedCallerData,
          is_suspended: isSuspendedStatus,
        }),
        (response) => setField('response', response)
      )
    );

    onClose();
    setField('selectedRows', []);
  }, [dispatch, setField, selectedRows, filteredRows, selectedCallerData, onClose]);

  if (!alertMessage) return null;

  return (
    <Dialog
      open={alertMessage}
      onClose={onClose}
      sx={{ textAlign: "center" }}
    >
      <DialogTitle 
        className="modal_heading" 
        sx={{ color: "#133325", fontWeight: "600" }}
      >
        {"Suspend Confirmation"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ paddingBottom: "0px !important" }}>
          Are you sure you want to suspend ?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ 
        display: "flex", 
        justifyContent: "center", 
        paddingBottom: "20px" 
      }}>
        <Button
          variant="contained"
          sx={{
            fontSize: "16px !important",
            background: "linear-gradient(180deg, #0E397F 0%, #001E50 100%) !important",
            marginTop: "20px",
            marginLeft: "0px !important",
            padding: "10px 20px !important",
            textTransform: "capitalize !important",
          }}
          className="all_button_clr"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{
            fontSize: "16px !important",
            marginTop: "20px",
            padding: "10px 20px !important",
            textTransform: "capitalize !important",
            marginLeft: "0px !important",
            marginRight: "0px !important",
          }}
          className="all_button_clr"
          onClick={handleDelete}
          startIcon={<NoAccountsIcon />}
        >
          Suspend
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default SuspendConfirmationModal;