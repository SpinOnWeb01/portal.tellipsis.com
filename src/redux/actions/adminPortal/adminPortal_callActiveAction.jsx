import socketIOClient from 'socket.io-client';
import {
  GET_ADMIN_CALL_ACTIVE_FAIL,
  GET_ADMIN_CALL_ACTIVE_REQUEST,
  GET_ADMIN_CALL_ACTIVE_SUCCESS
} from "../../constants/adminPortal/adminPortal_callActiveConstants";
import { api } from '../../../mockData';

export const getAdminCallActive = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ADMIN_CALL_ACTIVE_REQUEST });
    const socket = socketIOClient(`${api.dev}`);

    // Listen for events from the server
    socket.on('call_details', (data) => {
      if (data?.data !== undefined) {
        dispatch({
          type: GET_ADMIN_CALL_ACTIVE_SUCCESS,
          payload: data?.data
        });
      }
    });

    // Clean up function
    return () => {
      socket.disconnect();
    };
  } catch (error) {
    dispatch({ type: GET_ADMIN_CALL_ACTIVE_FAIL, payload: error.message });
  }
};
