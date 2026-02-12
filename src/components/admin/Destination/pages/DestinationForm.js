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
  Grid,
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
   <form style={{paddingTop: "10px",}}>
  <Grid container spacing={1}>

    {/* DESTINATION */}
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Destination"
        value={tfnNumber}
        onChange={(e) => {
          const numericValue = e.target.value.replace(/[^0-9]/g, "");
          setField("tfnNumber", numericValue);
        }}
        inputProps={{ inputMode: "numeric" }}
      />
    </Grid>

    {validation.tfnNumber && (
      <Grid item xs={12}>
        <p style={{ color: "red", textAlign: "left", margin: 0 }}>
          {validation.tfnNumber}
        </p>
      </Grid>
    )}

    {/* RESELLER */}
    <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel>Reseller</InputLabel>
        <Select
        style={{textAlign: "left"}}
          label="Reseller"
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
    </Grid>

    {/* USER */}
    <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel>UserName</InputLabel>
        <Select
        style={{textAlign: "left"}}
          label="UserName"
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
    </Grid>

    {/* SERVICES */}
    <Grid item xs={12} md={6}>
      {mode === "add" ? (
        <FormControl fullWidth>
          <InputLabel>Services</InputLabel>
          <Select
          style={{textAlign: "left"}}
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
        <FormControl fullWidth>
          <InputLabel>Services</InputLabel>
          <Select
          style={{textAlign: "left"}}
            value={service}
            onChange={(e) => setField("service", e.target.value)}
            input={<OutlinedInput label="Services" />}
          >
            {SERVICE_TYPES.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Grid>

    {/* MANAGE */}
    {(mode === "add"
      ? serviceType[0] === "Manage"
      : service === "Manage") && (
      <>
            <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
            style={{textAlign: "left"}}
              value={subType}
              onChange={(e) => {
                const newSubType = e.target.value;
                setField("subType", newSubType);
                if (newSubType === "Extension" || newSubType === "Queue") {
                  setField("destinationAction", []);
                }
              }}
              input={<OutlinedInput label="Type" />}
            >
              {SUB_TYPES.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {subType === "Extension" && (
              <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Extension</InputLabel>
              <Select
              style={{textAlign: "left"}}
                multiple
                value={destinationAction || []}
                onChange={(e) =>
                  setField("destinationAction", e.target.value)
                }
                input={<OutlinedInput label="Extension" />}
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
          </Grid>
        )}

        {subType === "Queue" && (
              <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Queue</InputLabel>
              <Select
              style={{textAlign: "left"}}
                value={destinationAction}
                onChange={(e) =>
                  setField("destinationAction", e.target.value)
                }
                input={<OutlinedInput label="Queue" />}
              >
                {queue.data?.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}
      </>
    )}

    {/* IP */}
    {(mode === "add" ? serviceType[0] === "IP" : service === "IP") && (
          <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="IP Address"
          value={ipAddress}
          onChange={handleIpChange}
          error={Boolean(error)}
          helperText={error}
        />
      </Grid>
    )}

    {/* STATUS */}
        <Grid item xs={12} md={6}>
      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
        style={{textAlign: "left",}}
          value={selectedValue}
          onChange={(e) => setField("selectedValue", e.target.value)}
          input={<OutlinedInput label="Status" />}
        >
          <MenuItem value="t">Active</MenuItem>
          <MenuItem value="f">Deactive</MenuItem>
        </Select>
      </FormControl>
    </Grid>

    {/* RECORDING */}
        <Grid item xs={12} >
      <FormControl fullWidth>
        <InputLabel>Recording</InputLabel>
        <Select
        style={{textAlign: "left"}}
          value={recording}
          onChange={(e) => setField("recording", e.target.value)}
          input={<OutlinedInput label="Recording" />}
        >
          <MenuItem value="true">Yes</MenuItem>
          <MenuItem value="false">No</MenuItem>
        </Select>
      </FormControl>
    </Grid>

    {/* SUSPEND */}
    {mode === "edit" && (
          <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel>Suspend</InputLabel>
          <Select
          style={{textAlign: "left"}}
            value={suspendValue}
            onChange={(e) => setField("suspendValue", e.target.value)}
          >
            <MenuItem value={0}>Not Suspended</MenuItem>
            <MenuItem value={1}>Suspended</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    )}

    {/* CARRIER */}
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Carrier Name"
        value={carrierName}
        onChange={(e) => setField("carrierName", e.target.value)}
      />
    </Grid>

    {validation.carrierName && (
      <Grid item xs={12}>
        <p style={{ color: "red", textAlign: "left", margin: 0 }}>
          {validation.carrierName}
        </p>
      </Grid>
    )}

    {/* DESCRIPTION */}
    <Grid item xs={12}>
      <TextField
      style={{textAlign: "left"}}
        fullWidth
        label="Description"
        value={destinationDescription}
        onChange={(e) =>
          setField("destinationDescription", e.target.value)
        }
      />
    </Grid>

  </Grid>
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