import axios from "axios";
import { ALL_PERMISSIONS_REQUEST, ALL_PERMISSIONS_FAIL, ALL_PERMISSIONS_SUCCESS,
  PUT_PERMISSION_REQUEST,PUT_PERMISSION_SUCCESS, PUT_PERMISSION_FAIL } from "../../constants/adminPortal/adminPortal_permissionsContants";
import { api } from "../../../mockData";

export const getPermissions = (id) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("admin"));
    try {
      dispatch({ type: ALL_PERMISSIONS_REQUEST });
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${api.dev}/api/permissions/${id}`,
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${token.access_token} `
        },
      };
      await axios
        .request(config)
        .then((response) => {
          dispatch({
            type: ALL_PERMISSIONS_SUCCESS,
            payload: response?.data?.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      dispatch({ type: ALL_PERMISSIONS_FAIL, payload: error.response.data.message });
    }
  };

  export const putPermission = (id, data) => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("admin"));
      try {
        dispatch({ type: PUT_PERMISSION_REQUEST });
        let config = {
          method: "put",
          maxBodyLength: Infinity,
          data: data,
          url: `${api.dev}/api/permissions`,
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token.access_token} `
          },
        };
        await axios
          .request(config)
          .then((response) => {
            dispatch({
              type: PUT_PERMISSION_SUCCESS,
              payload: response?.data,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        dispatch({ type: PUT_PERMISSION_FAIL, payload: error.response.data.message });
      }
    };
    