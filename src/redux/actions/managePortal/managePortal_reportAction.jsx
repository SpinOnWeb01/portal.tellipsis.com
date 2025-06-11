import axios from "axios";
import { ALL_MANAGE_REPORT_FAIL, ALL_MANAGE_REPORT_REQUEST, ALL_MANAGE_REPORT_SUCCESS } from "../../constants/managePortal/managePortal_reportConstants";
import { api } from "../../../mockData";
import { toast } from "react-toastify";

export const getManageReport = (filterValues) => async (dispatch) => {
  const current_user = localStorage.getItem("current_user");
  const token = JSON.parse(localStorage.getItem(`user_${current_user}`));
      // try {
      //   dispatch({ type: ALL_MANAGE_REPORT_REQUEST });
      //   let config = {
      //     method: "get",
      //     maxBodyLength: Infinity,
      //     url: `${api.dev}/userallcdr`,
      //     headers: {
      //       "Content-Type": "application/json",
      //       "Authorization" : `Bearer ${token.access_token} `
      //     },
      //   };
      //   await axios
      //     .request(config)
      //     .then((response) => {
      //       dispatch({
      //         type: ALL_MANAGE_REPORT_SUCCESS,
      //         payload: response?.data?.data,
      //       });
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
      // } catch (error) {
      //   dispatch({ type: ALL_MANAGE_REPORT_FAIL, payload: error.response.data.message });
      // }
      try {
        dispatch({ type: ALL_MANAGE_REPORT_REQUEST });
        const config = {
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token.access_token} `
          },
        };
        const { data } = await axios.post(
          
          
          `${api.dev}/api/userallcdr`,
          filterValues,
          config
        );
       if (data?.status === 200) {
          toast.success(data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          });
             
        }  else {
          toast.error(data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2500,
          });
        }
        dispatch({ type: ALL_MANAGE_REPORT_SUCCESS, payload: data });
      } catch (error) {
        toast.error(error?.response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
        });
        dispatch({
          type: ALL_MANAGE_REPORT_FAIL,
          payload: error?.response?.data?.message,
        });
      }
    };