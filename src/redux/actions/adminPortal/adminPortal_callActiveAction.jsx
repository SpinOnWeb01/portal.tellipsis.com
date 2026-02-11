import {
  GET_ADMIN_CALL_ACTIVE_FAIL,
  GET_ADMIN_CALL_ACTIVE_REQUEST,
  GET_ADMIN_CALL_ACTIVE_SUCCESS
} from "../../constants/adminPortal/adminPortal_callActiveConstants";

import { getSocket } from "../../../components/utils/socket";

export const getAdminCallActive = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ADMIN_CALL_ACTIVE_REQUEST });

    const socket = getSocket();

    // remove previous listener (VERY IMPORTANT)
    socket.off("call_details");

    socket.on("call_details", (response) => {
      const data = response?.data;

      // ❌ ignore empty / invalid data
      if (!data || Object.keys(data).length === 0) {
        return;
      }

      dispatch({
        type: GET_ADMIN_CALL_ACTIVE_SUCCESS,
        payload: data,
      });
    });
  } catch (error) {
    dispatch({
      type: GET_ADMIN_CALL_ACTIVE_FAIL,
      payload: error.message,
    });
  }
};

