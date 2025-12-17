import React, { useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Modal,
  Fade,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { api } from "../../../../mockData";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ImportModal = React.memo(({ openimport, onClose, file, setField, token }) => {

  const handleOnChange = useCallback((event) => {
    setField('file', event.target.files[0]);
  }, [setField]);

  const handleOnSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!file) {
      toast.warn("Please select a file to upload.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${api.dev}/api/import_did_from_csv`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token.access_token}`,
        },
      });

      if (response.data.status === 200) {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        });
        setField('response', response);
        onClose();
      } else {
        toast.error(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        });
      }
    } catch (error) {
      const errorMessage = error.response
        ? `Error: ${error.response.status} - ${error.response.data.message}`
        : error.request
        ? "No response from server. Please try again later."
        : "An error occurred while setting up the request.";

      toast.error(errorMessage, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });
    }
  }, [file, token, setField, onClose]);

  if (!openimport) return null;

  return (
    <Modal open={openimport} onClose={onClose}>
      <Fade in={openimport} className="bg_imagess">
        <Box sx={modalStyle} borderRadius={"10px"} textAlign={"center"}>
          <IconButton onClick={onClose} sx={{ float: "inline-end" }}>
            <Close />
          </IconButton>
          <br />
          <br />
          <img src="/img/import-icon.png" alt="import" style={{ borderRadius: "30px" }} />
          <form style={{ 
            textAlign: "center", 
            height: "auto", 
            overflow: "auto", 
            paddingTop: "10px", 
            padding: "20px" 
          }}>
            <Typography 
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
                margin: "7px 0", 
                textAlign: "center !important" 
              }}
              type={"file"}
              onChange={handleOnChange}
            />
            <br />
            <br />
            <Button
              variant="contained"
              className="all_button_clr"
              sx={{
                fontSize: "16px !important",
                background: "linear-gradient(180deg, #0E397F 0%, #001E50 100%) !important",
                marginTop: "20px",
                padding: "10px 20px !important",
                textTransform: "capitalize !important",
              }}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              className="all_button_clr"
              sx={{
                fontSize: "16px !important",
                background: "#092b5f",
                marginTop: "20px",
                padding: "10px 20px !important",
                textTransform: "capitalize !important",
              }}
              onClick={handleOnSubmit}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
});

export default ImportModal;