import React, { useCallback, useEffect, useMemo, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, useMediaQuery } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";

import { getDid } from "../../../redux/actions/adminPortal/destinationAction";
import { getExtension } from "../../../redux/actions/adminPortal/extensionAction";
import { getAllUsers } from "../../../redux/actions/adminPortal/userAction";
import {
  getAdminResellersList,
  getAdminUsersList,
} from "../../../redux/actions/adminPortal/adminPortal_listAction";
import { GET_DID_SUCCESS } from "../../../redux/constants/adminPortal/destinationConstants";

import CustomToolbar from "./pages/CustomToolbar";
import HeaderSection from "./pages/HeaderSection";
import FilterSection from "./pages/FilterSection";
import AddDestinationModal from "./pages/AddDestinationModal";
import EditDestinationModal from "./pages/EditDestinationModal";
import ImportModal from "./pages/ImportModal";
import SuspendConfirmationModal from "./pages/SuspendConfirmationModal";
import { columns } from "./pages/DataGridColumns";
import { useDestinationData, useUsersAndResellers } from "./hooks/useDestinationData";
import { destinationReducer, initialState } from "./reducers/destinationReducer";

// Constants
const DRAWER_WIDTH = 240;

// Styles
const useStyles = makeStyles({
  borderedGreen: {
    borderLeft: "3px solid green",
    boxShadow: "2px -1px 4px -3px #686868",
    margin: "4px 4px 1px 4px !important",
  },
  borderedRed: {
    borderLeft: "3px solid red",
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
            minHeight: "auto",
          },
        },
      },
      defaultProps: {
        density: "compact",
      },
    },
  },
});

function AdminDestination({ colorThem }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("admin"));
  const user = JSON.parse(localStorage.getItem("admin"));
  const state = useSelector((state) => state);
  
  const [stateReducer, dispatchReducer] = useReducer(destinationReducer, initialState);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));

  // Destructure state for easier access
  const {
    selectedValue,
    subType,
    didId,
    serviceType,
    destinationDescription,
    destinationAction,
    openimport,
    file,
    open,
    response,
    edit,
    tfnNumber,
    userId,
    recording,
    service,
    carrierName,
    resellerId,
    ipAddress,
    error,
    radioValue,
    searchDestination,
    selectedRows,
    alertMessage,
    loader,
    validation,
  } = stateReducer;

  // Custom hooks for data fetching
  const { extensionNumber, queue, resellerUsersData } = useDestinationData(token, userId, resellerId);
  const { users, resellers, resellerUsers } = useUsersAndResellers(state, resellerUsersData);

  // Action creators
  const setField = useCallback((field, value) => {
    dispatchReducer({ type: 'SET_FIELD', field, value });
  }, []);

  const resetForm = useCallback(() => {
    dispatchReducer({ type: 'RESET_FORM' });
  }, []);

  const setMultipleFields = useCallback((payload) => {
    dispatchReducer({ type: 'SET_MULTIPLE', payload });
  }, []);

  const handleEdit = useCallback((data) => {
    const stringArray = data?.details
      ?.replace(/[{}]/g, "")
      ?.split(",")
      ?.map((item) => item.trim().replace(/'/g, "")) || [];

    const editData = {
      edit: true,
      tfnNumber: data?.tfn_number || "",
      selectedValue: data?.is_active === "Active" ? "t" : "f",
      destinationAction: stringArray,
      carrierName: data?.carrier_name || "",
      destinationDescription: data?.description || "",
      didId: data?.did_id || "",
      recording: data?.recording?.toString() || "",
      userId: data.user_id || "",
      service: data?.service_type === "IP" 
        ? data?.service_type 
        : data?.service_type?.charAt(0).toUpperCase() + data?.service_type?.slice(1).toLowerCase() || "",
      ipAddress: data?.service_type === "IP" ? data.details : "",
      resellerId: data?.reseller_id === null ? "" : data?.reseller_id,
      subType: data?.sub_type?.charAt(0) + data?.sub_type?.slice(1).toLowerCase() || "",
      suspendValue: data?.is_suspended || 0,
    };

    dispatchReducer({ type: 'SET_EDIT_DATA', payload: editData });
  }, []);

  // DataGrid configuration
  const memoizedColumns = useMemo(() => 
    columns({ isMobile, isXs, user, handleEdit }), 
    [isMobile, isXs, user, handleEdit]
  );

  const rows = useMemo(() => {
    return state?.allDid?.alldid?.map((item, index) => ({
      id: index + 1,
      did_id: item?.id,
      tfn_number: item?.didnumber,
      username: item?.username,
      record: item?.destination_record,
      service_type: item?.service_type,
      created_date: item?.created_date,
      updated_date: item?.updated_date,
      extension: item?.destination_actions,
      status: item?.status,
      details: item?.details,
      description: item?.description,
      recording: item.recording,
      user_id: item.user_id,
      reseller_id: item.reseller_id,
      reseller_name: item.reseller_name,
      sub_type: item.sub_type,
      carrier_name: item.carrier_name,
      total_call_duration: item.total_call_duration,
      Assignment: item.status,
      is_active: item.is_active,
      is_suspended: item.is_suspended,
    })) || [];
  }, [state?.allDid?.alldid]);

  const filteredRows = useMemo(() => 
    rows.filter((row) =>
      row.tfn_number?.toLowerCase().includes(searchDestination.toLowerCase())
    ),
    [rows, searchDestination]
  );

  const selectedCallerData = useMemo(() => {
    const selectedSet = new Set();
    selectedRows.forEach((id) => {
      const selectedRow = filteredRows.find((row) => row.id === id);
      if (selectedRow) {
        selectedSet.add(selectedRow.did_id);
      }
    });
    return Array.from(selectedSet);
  }, [selectedRows, filteredRows]);

  const isRowBordered = useCallback((params) => params.row.status === true, []);

  // Effects
  useEffect(() => {
    dispatch(getDid(radioValue, (loader) => setField('loader', loader)));
    dispatch({ type: GET_DID_SUCCESS, payload: [] });
  }, [radioValue, dispatch, setField]);

  useEffect(() => {
    dispatch(getExtension(""));
    dispatch(getAllUsers(""));
    dispatch(getAdminUsersList());
    dispatch(getAdminResellersList());
  }, [dispatch]);

  return (
    <div className={`App ${colorThem}`}>
      <div className="contant_box">
        <Box
          className="right_sidebox mobile_top_pddng"
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          }}
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="tab-content" id="pills-tabContent">
                  <div className="tab-pane fade show active" id="pills-home" role="tabpanel">
                    <div className="">
                      <HeaderSection
                        user={user}
                        stateReducer={stateReducer}
                        setField={setField}
                        resetForm={resetForm}
                      />

                      <FilterSection
                        user={user}
                        radioValue={radioValue}
                        setField={setField}
                        searchDestination={searchDestination}
                        selectedCallerData={selectedCallerData}
                        filteredRows={filteredRows}
                        selectedRows={selectedRows}
                        setMultipleFields={setMultipleFields}
                        rows={rows}
                      />

                      {/* Modals */}
                      <AddDestinationModal
                        open={open}
                        onClose={resetForm}
                        stateReducer={stateReducer}
                        setField={setField}
                        users={users}
                        resellers={resellers}
                        resellerUsers={resellerUsers}
                        extensionNumber={extensionNumber}
                        queue={queue}
                        validation={validation}
                        error={error}
                      />

                      <EditDestinationModal
                        edit={edit}
                        onClose={resetForm}
                        stateReducer={stateReducer}
                        setField={setField}
                        users={users}
                        resellers={resellers}
                        resellerUsers={resellerUsers}
                        extensionNumber={extensionNumber}
                        queue={queue}
                        validation={validation}
                        error={error}
                      />

                      <ImportModal
                        openimport={openimport}
                        onClose={() => setField('openimport', false)}
                        file={file}
                        setField={setField}
                        token={token}
                      />

                      <SuspendConfirmationModal
                        alertMessage={alertMessage}
                        onClose={() => setField('alertMessage', false)}
                        selectedCallerData={selectedCallerData}
                        selectedRows={selectedRows}
                        filteredRows={filteredRows}
                        setField={setField}
                        dispatch={dispatch}
                      />

                      <ThemeProvider theme={theme}>
                        <div style={{ height: "100%", width: "100%" }}>
                          <DataGrid
                            rows={filteredRows}
                            columns={memoizedColumns}
                            checkboxSelection
                            disableRowSelectionOnClick
                            rowSelectionModel={selectedRows}
                            onRowSelectionModelChange={(selection) => setField('selectedRows', selection)}
                            getRowClassName={(params) => isRowBordered(params) ? "borderedGreen" : "borderedRed"}
                            components={{ Toolbar: CustomToolbar }}
                            slots={{ toolbar: CustomToolbar }}
                            autoHeight
                          />
                        </div>
                      </ThemeProvider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default React.memo(AdminDestination);