import axios from "axios";
import { api } from "../../../mockData";
import { GET_ADMIN_PAYMENT_FAIL, GET_ADMIN_PAYMENT_REQUEST, GET_ADMIN_PAYMENT_SUCCESS } from "../../constants/adminPortal/adminPortal_paymentConstants";

export const getAdminPayment = () => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("admin"));
    try {
      dispatch({ type: GET_ADMIN_PAYMENT_REQUEST });
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${api.dev}/api/payment`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token} `,
        },
      };
      await axios
        .request(config)
        .then((response) => {
          dispatch({
            type: GET_ADMIN_PAYMENT_SUCCESS,
            payload: response?.data?.data,
          });
        })
        .catch((error) => {});
    } catch (error) {
      dispatch({
        type: GET_ADMIN_PAYMENT_FAIL,
        payload: error.response.data.message,
      });
    }
  };