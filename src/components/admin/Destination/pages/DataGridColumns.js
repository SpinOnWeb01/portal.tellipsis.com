import React from "react";
import { Typography, IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";

export const columns = ({ isMobile, isXs, user, handleEdit }) => [
  {
    field: "action",
    headerName: "Action",
    headerClassName: "custom-header",
    headerAlign: "center",
    align: "center",
    sortable: false,
    width: 50,
    renderCell: (params) => (
      user.user_role !== "Reseller" && (
        <IconButton onClick={() => handleEdit(params.row)}>
          <Edit style={{ cursor: "pointer", color: "#0e397f" }} />
        </IconButton>
      )
    ),
  },
  {
    field: "tfn_number",
    headerName: "Destination",
    headerClassName: "custom-header",
    width: 120,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "username",
    headerName: "User",
    headerClassName: "custom-header",
    width: 100,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "reseller_name",
    headerName: "Reseller",
    headerClassName: "custom-header",
    width: 100,
    headerAlign: "center",
    align: "center",
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
    field: "sub_type",
    headerName: "Sub Type",
    headerClassName: "custom-header",
    width: 100,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => {
      const subType = params.row.sub_type?.toString()?.toLowerCase();
      const isExtension = subType === "extension";
      const isQueue = subType === "queue";
      
      if (!isExtension && !isQueue) return null;

      return (
        <div
          style={{
            color: "white",
            background: isExtension ? "cornflowerblue" : "blueviolet",
            padding: "7px",
            borderRadius: "5px",
            fontSize: "12px",
            textTransform: "capitalize",
          }}
        >
          {subType}
        </div>
      );
    },
  },
  {
    field: "details",
    headerName: "Details",
    headerClassName: "custom-header",
    width: 150,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "recording",
    headerName: "Recording",
    headerClassName: "custom-header",
    width: 80,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => (
      <div
        style={{
          color: params.row.recording ? "green" : "red",
          padding: "7px",
          borderRadius: "5px",
          fontSize: "12px",
          textTransform: "capitalize",
        }}
      >
        {params.row.recording ? "Yes" : "No"}
      </div>
    ),
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
    valueFormatter: (params) => {
      const date = new Date(params.value);
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    },
  },
  {
    field: "updated_date",
    headerName: "Update Date",
    headerClassName: "custom-header",
    width: 100,
    headerAlign: "center",
    align: "center",
    valueFormatter: (params) => {
      const date = new Date(params.value);
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    },
  },
  {
    field: "status",
    headerName: "Status",
    headerClassName: "custom-header",
    width: isXs ? 70 : 80,
    minWidth: 70,
    maxWidth: 80,
    headerAlign: "start",
    align: "start",
    renderHeader: () => (
      <Typography
        variant="body2"
        sx={{
          fontSize: "calc(0.6rem + 0.2vw)",
          fontWeight: "bold",
          color: "white !important",
        }}
      >
        Status
      </Typography>
    ),
    renderCell: (params) => {
      const { is_active, is_suspended } = params.row;
      const key = `${String(is_active)}_${String(is_suspended)}`;
      
      const labelMap = {
        1: { label: "Suspend", color: "orange" },
        Active_0: { label: "Active", color: "green" },
        Deactive_1: { label: "Suspend", color: "orange" },
        Deactive_0: { label: "Deactive", color: "red" },
      };

      const { label, color } = labelMap[key] || { label: "Suspend", color: "orange" };

      return (
        <div
          style={{
            color,
            padding: isMobile ? "5px" : "7px",
            borderRadius: "5px",
            textAlign: "center",
            fontSize: "calc(0.6rem + 0.2vw)",
          }}
        >
          {label}
        </div>
      );
    },
  },
];