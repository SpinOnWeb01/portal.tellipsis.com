import React, { useCallback } from "react";
import {
  Box,
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import HowToRegIcon from "@mui/icons-material/HowToReg";

const FilterSection = React.memo(({
  user,
  radioValue,
  setField,
  searchDestination,
  selectedCallerData,
  filteredRows,
  selectedRows,
  setMultipleFields,
  rows,
}) => {

  const getToggleSuspendText = useCallback(() => {
    const firstSelectedRow = filteredRows.find((row) => row.id === selectedRows[0]);
    return firstSelectedRow?.is_suspended === 1 ? "Un-Suspend" : "Suspend";
  }, [filteredRows, selectedRows]);

  const getSuspendIcon = useCallback(() => {
    const firstSelectedRow = filteredRows.find((row) => row.id === selectedRows[0]);
    return firstSelectedRow?.is_suspended === 1 ? <HowToRegIcon /> : <NoAccountsIcon />;
  }, [filteredRows, selectedRows]);

  const handleMessage = useCallback(() => {
    setField('alertMessage', true);
  }, [setField]);

  return (
    <div className="d-flex justify-content-between">
      <div className="d-flex justify-content-between">
        <div>
          <FormControl>
            <RadioGroup
              row
              value={radioValue}
              onChange={(e) => {
                setField('radioValue', e.target.value);
                setField('loader', true);
              }}
            >
              <FormControlLabel value="" control={<Radio />} label={`All(${radioValue === "true" || radioValue === "false" || radioValue === "1" ? 0 : rows.length})`} />
              <FormControlLabel value="true" control={<Radio />} label={`Active(${radioValue === "" || radioValue === "false" || radioValue === "1" ? 0 : rows.length})`} />
              <FormControlLabel value="false" control={<Radio />} label={`Deactive(${radioValue === "" || radioValue === "true" || radioValue === "1" ? 0 : rows.length})`} />
              <FormControlLabel value="1" control={<Radio />} label={`Suspended(${radioValue === "" || radioValue === "true" || radioValue === "false" ? 0 : rows.length})`} />
            </RadioGroup>
          </FormControl>
        </div>
        <div>
          <Button
            variant="contained"
            style={{
              fontSize: "15px",
              borderRadius: "5px",
              border: "none",
              color: "#fff",
              background: selectedCallerData.length ? "red" : "orange",
              textTransform: "capitalize",
              height: "35px",
              width: "auto",
              minWidth: "90px",
              display: selectedCallerData.length === 0 ? "none" : "inline-flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
            className="all_button_clr"
            onClick={handleMessage}
            startIcon={getSuspendIcon()}
          >
            {getToggleSuspendText()}
          </Button>
        </div>
      </div>

      <div>
        <Box sx={{ width: "auto", display: { xs: "none", md: "block" } }}>
          <TextField
            size="small"
            fullWidth
            variant="outlined"
            placeholder="Search destination numbers..."
            value={searchDestination}
            onChange={(e) => setField('searchDestination', e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: searchDestination && (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    size="small"
                    sx={{ mr: -1 }}
                    onClick={() => setField('searchDestination', "")}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                fontSize: { xs: "0.875rem", sm: "1rem" },
                height: { xs: "36px", sm: "40px" },
              },
            }}
          />
        </Box>
      </div>
    </div>
  );
});

export default FilterSection;