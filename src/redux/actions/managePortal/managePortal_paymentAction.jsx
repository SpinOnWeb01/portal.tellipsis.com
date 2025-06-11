import { toast } from "react-toastify";
import { api } from "../../../mockData";
import axios from "axios";
import { GET_MANAGE_PAYMENT_FAIL, GET_MANAGE_PAYMENT_REQUEST, GET_MANAGE_PAYMENT_SUCCESS } from "../../constants/managePortal/managePortal_paymentConstants";

export const getManagePayment = () => async (dispatch) => {
  const current_user = localStorage.getItem("current_user");
  const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
      try {
        dispatch({ type: GET_MANAGE_PAYMENT_REQUEST });
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `${api.dev}/api/userpayment`,
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token.access_token} `
          },
        };
        await axios
          .request(config)
          .then((response) => {
            dispatch({
              type: GET_MANAGE_PAYMENT_SUCCESS,
              payload: response?.data?.data,
            });
          })
          .catch((error) => {
            toast.error(error?.response?.data?.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2500,
            });
          });
      } catch (error) {
        dispatch({ type: GET_MANAGE_PAYMENT_FAIL, payload: error.response.data.message });
      }
    };
