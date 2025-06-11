import axios from "axios";
import { ALL_REPORT_FAIL, ALL_REPORT_REQUEST, ALL_REPORT_SUCCESS, CREATE_ADMIN_BLOCK_REPORT_FAIL, CREATE_ADMIN_BLOCK_REPORT_REQUEST, CREATE_ADMIN_BLOCK_REPORT_SUCCESS } from "../../constants/adminPortal/reportConstants";
import { toast } from "react-toastify";
import { api } from "../../../mockData";

export const getReport = (filterValues) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("admin"));
    // try {
    //   dispatch({ type: ALL_REPORT_REQUEST });
    //   let config = {
    //     method: "post",
    //     body: filterValues,
    //     maxBodyLength: Infinity,
    //     url: `${api.dev}/allcdr`,
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Authorization" : `Bearer ${token.access_token} `
    //     },
    //   };
    //   await axios
    //     .request(config)
    //     .then((response) => {
    //       dispatch({
    //         type: ALL_REPORT_SUCCESS,
    //         payload: response?.data?.data,
    //       });
    //     })
    //     .catch((error) => {
    //       let errorMessage = "An error occurred while fetching data.";
    //       if (error.response) {
    //         if (error.response.status === 403) {
    //           errorMessage = "Permission Denied";
    //         } else if (error.response.status === 401 ) {
    //           errorMessage = error.response.data.message || "Token has expired";
    //         }
    //         else if (error.response.status === 400 || error.response.status === 500) {
    //           errorMessage = error.response.data.message || "Bad Request";
    //         }
    //       }
    //       dispatch({ type: ALL_REPORT_FAIL, payload: errorMessage });
    //     });
    // } catch (error) {
    //   dispatch({ type: ALL_REPORT_FAIL, payload: error.response.data.message });
    // }
    try {
      dispatch({ type: ALL_REPORT_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${token.access_token} `
        },
      };
      const { data } = await axios.post(
        
        
        `${api.dev}/api/allcdr`,
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
      dispatch({ type: ALL_REPORT_SUCCESS, payload: data });
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
      });
      dispatch({
        type: ALL_REPORT_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  export const createBlockReport = (createBlockReport, setResponse) => async (dispatch) => {
 
    const token = JSON.parse(localStorage.getItem(`admin`));
            try {
              dispatch({ type: CREATE_ADMIN_BLOCK_REPORT_REQUEST });
              const config = {
                headers: {
                  "Content-Type": "application/json",
                  "Authorization" : `Bearer ${token.access_token} `
                },
              };
              const { data } = await axios.post(
                
                
                `${api.dev}/api/adminreportcallblock`,
                createBlockReport,
                config
              );
             if (data?.status === 200) {
                toast.success(data.data[0].message, {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 1500,
                });
                setResponse(data);  
              }  else {
                toast.error(data?.message, {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 2500,
                });
              }
              dispatch({ type: CREATE_ADMIN_BLOCK_REPORT_SUCCESS, payload: data });
            } catch (error) {
              toast.error(error?.response?.data?.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2500,
              });
              dispatch({
                type: CREATE_ADMIN_BLOCK_REPORT_FAIL,
                payload: error?.response?.data?.message,
              });
            }
  };
  