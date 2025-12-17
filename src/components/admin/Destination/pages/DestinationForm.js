import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  OutlinedInput,
  ListItemText,
  DialogActions,
  Button,
} from "@mui/material";

// Constants
const SERVICE_TYPES = ["Manage", "IP"];
const SUB_TYPES = ["Extension", "Queue"];
const MENU_PROPS = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

const DestinationForm = React.memo(({
  mode,
  handleSubmit,
  handleUpdate,
  onClose,
  state,
  setField,
  users,
  resellers,
  resellerUsers,
  extensionNumber,
  queue,
  validation,
  error,
  handleIpChange,
}) => {
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
    service,
    suspendValue,
  } = state;

  return (
    <>
    <form >
      <div
        style={{
          textAlign: "center",
          height: "420px",
          paddingTop: "0px",
          padding: "0px",
          width: "auto",
          overflow: "auto",
        }}
      >
        {/* Destination Number */}
        <TextField
          style={{ width: "100%", margin: "7px 0" }}
          type="text"
          label="Destination"
          variant="outlined"
          value={tfnNumber}
          onChange={(e) => {
            const numericValue = e.target.value.replace(/[^0-9]/g, "");
            setField("tfnNumber", numericValue);
          }}
          inputProps={{ inputMode: "numeric" }}
        />
        {validation.tfnNumber && (
          <p className="mb-0" style={{ color: "red", textAlign: "left" }}>
            {validation.tfnNumber}
          </p>
        )}

        {/* Reseller Selection */}
        <FormControl fullWidth style={{ width: "100%", margin: "5px 0" }}>
          <InputLabel>Reseller</InputLabel>
          <Select
            label="Reseller"
            style={{ textAlign: "left" }}
            value={resellerId}
            onChange={(e) => setField("resellerId", e.target.value)}
          >
            <MenuItem value="">none</MenuItem>
            {resellers?.map((item) => (
              <MenuItem key={item.reseller_id} value={item.reseller_id}>
                {item.username}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* User Selection */}
        <FormControl fullWidth style={{ width: "100%", margin: "5px 0" }}>
          <InputLabel>UserName</InputLabel>
          <Select
            label="UserName"
            style={{ textAlign: "left" }}
            value={userId}
            onChange={(e) => setField("userId", e.target.value)}
          >
            <MenuItem value="">none</MenuItem>
            {(resellerId ? resellerUsers : users)?.map((item) => (
              <MenuItem key={item.user_id} value={item.user_id}>
                {item.username}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Service Type */}
        {mode === "add" ? (
          <FormControl style={{ width: "100%", margin: "5px 0" }}>
            <InputLabel>Services</InputLabel>
            <Select
              label="Services"
              style={{ textAlign: "left" }}
              multiple
              value={serviceType}
              onChange={(e) =>
                setField(
                  "serviceType",
                  typeof e.target.value === "string"
                    ? e.target.value.split(",")
                    : e.target.value
                )
              }
              input={<OutlinedInput label="Services" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MENU_PROPS}
            >
              {SERVICE_TYPES.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={serviceType.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <FormControl style={{ width: "100%", margin: "5px 0" }}>
            <InputLabel>Services</InputLabel>
            <Select
              label="Services"
              style={{ textAlign: "left" }}
              value={service}
              onChange={(e) => setField("service", e.target.value)}
            >
              {SERVICE_TYPES.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {/* Manage Service Options */}
        {(mode === "add"
          ? serviceType[0] === "Manage"
          : service === "Manage") && (
          <>
            <FormControl style={{ width: "100%", margin: "5px 0" }}>
              <InputLabel>Type</InputLabel>
              <Select
                label="Sub Type"
                style={{ textAlign: "left" }}
                value={subType}
                onChange={(e) => {
                  const newSubType = e.target.value;
                  setField("subType", newSubType);
                  if (newSubType === "Extension" || newSubType === "Queue") {
                    setField("destinationAction", []);
                  }
                }}
              >
                {SUB_TYPES.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Extension Selection */}
            {subType === "Extension" && (
              <FormControl style={{ width: "100%", margin: "5px 0" }}>
                <InputLabel>Extension</InputLabel>
                <Select
                  label="Extension"
                  style={{ textAlign: "left" }}
                  multiple
                  value={destinationAction || []}
                  onChange={(e) =>
                    setField("destinationAction", e.target.value)
                  }
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MENU_PROPS}
                >
                  {extensionNumber?.data?.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={destinationAction.includes(name)} />
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {/* Queue Selection */}
            {subType === "Queue" && (
              <FormControl fullWidth style={{ width: "100%", margin: "5px 0" }}>
                <InputLabel>Queue</InputLabel>
                <Select
                  label="Queue"
                  style={{ textAlign: "left" }}
                  value={destinationAction}
                  onChange={(e) =>
                    setField("destinationAction", e.target.value)
                  }
                  MenuProps={MENU_PROPS}
                >
                  {queue.data?.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </>
        )}

        {/* IP Service Option */}
        {(mode === "add" ? serviceType[0] === "IP" : service === "IP") && (
          <TextField
            style={{ width: "100%", margin: "5px 0" }}
            type="text"
            label="IP Address"
            variant="outlined"
            value={ipAddress}
            onChange={handleIpChange}
            error={Boolean(error)}
            helperText={error}
          />
        )}

        {/* Status Selection */}
        <FormControl fullWidth style={{ width: "100%", margin: "5px 0" }}>
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            style={{ textAlign: "left" }}
            value={selectedValue}
            onChange={(e) => setField("selectedValue", e.target.value)}
          >
            <MenuItem value="t">Active</MenuItem>
            <MenuItem value="f">Deactive</MenuItem>
          </Select>
        </FormControl>

        {/* Recording Selection */}
        <FormControl fullWidth style={{ width: "100%", margin: "5px 0" }}>
          <InputLabel>Recording</InputLabel>
          <Select
            label="Recording"
            style={{ textAlign: "left" }}
            value={recording}
            onChange={(e) => setField("recording", e.target.value)}
          >
            <MenuItem value="true">Yes</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </Select>
        </FormControl>

        {/* Suspend Selection (Edit mode only) */}
        {mode === "edit" && (
          <FormControl fullWidth style={{ width: "100%", margin: "5px 0" }}>
            <InputLabel>Suspend</InputLabel>
            <Select
              label="Suspend"
              style={{ textAlign: "left" }}
              value={suspendValue}
              onChange={(e) => setField("suspendValue", e.target.value)}
            >
              <MenuItem value={0}>Not Suspended</MenuItem>
              <MenuItem value={1}>Suspended</MenuItem>
            </Select>
          </FormControl>
        )}

        {/* Carrier Name */}
        <TextField
          style={{ width: "100%", margin: "5px 0" }}
          type="text"
          label="Carrier Name"
          variant="outlined"
          value={carrierName}
          onChange={(e) => setField("carrierName", e.target.value)}
        />
        {validation.carrierName && (
          <p className="mb-0" style={{ color: "red", textAlign: "left" }}>
            {validation.carrierName}
          </p>
        )}

        {/* Description */}
        <TextField
          style={{ width: "100%", margin: "5px 0" }}
          type="text"
          label="Description"
          variant="outlined"
          value={destinationDescription}
          onChange={(e) => setField("destinationDescription", e.target.value)}
        />
      </div>

      {/* Form Actions */}
      
    </form>
    <DialogActions
    sx={{ display: "flex", justifyContent: "center", paddingBottom: "10px" }}
      >
        <Button
          variant="contained"
          className="all_button_clr"
          sx={{
            fontSize: "15px !important",
            background:
              "linear-gradient(180deg, #0E397F 0%, #001E50 100%) !important",
            marginTop: "10px",
            padding: "8px 15px !important",
            textTransform: "capitalize !important",
          }}
          onClick={onClose}
        >
          {" "}
          Cancel{" "}
        </Button>{" "}
        <Button
          type="submit"
          variant="contained"
          className="all_button_clr"
          sx={{
            fontSize: "15px !important",
            background: "#092b5f",
            marginTop: "10px",
            padding: "8px 15px !important",
            textTransform: "capitalize !important",
          }}
          onClick={mode === "add" ? handleSubmit : handleUpdate}
        >
          {" "}
          {mode === "add" ? "Save" : "Update"}{" "}
        </Button>
      </DialogActions>
      </>
  );
});

export default DestinationForm;