import axios from "axios";
import { GET_ADMIN_AUDIT_LOGS_FAIL, GET_ADMIN_AUDIT_LOGS_REQUEST, GET_ADMIN_AUDIT_LOGS_SUCCESS } from "../../constants/adminPortal/adminPortal_auditLogsConstants";
import { api } from "../../../mockData";

export const getAdminAuditLogs = () => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("admin"));
    try {
      dispatch({ type: GET_ADMIN_AUDIT_LOGS_REQUEST });
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${api.dev}/api/auditlogs`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token} `,
        },
      };
      await axios
        .request(config)
        .then((response) => {
          dispatch({
            type: GET_ADMIN_AUDIT_LOGS_SUCCESS,
            payload: response?.data?.data,
          });
        })
        .catch((error) => {});
    } catch (error) {
      dispatch({
        type: GET_ADMIN_AUDIT_LOGS_FAIL,
        payload: error.response.data.message,
      });
    }
  };