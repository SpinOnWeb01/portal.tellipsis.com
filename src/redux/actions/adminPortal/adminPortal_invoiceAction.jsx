import axios from "axios";
import { api } from "../../../mockData";
import { CREATE_ADMIN_INVOICE_FAIL, CREATE_ADMIN_INVOICE_REQUEST, CREATE_ADMIN_INVOICE_SUCCESS, GET_ADMIN_INVOICE_FAIL, GET_ADMIN_INVOICE_REQUEST, GET_ADMIN_INVOICE_SUCCESS, UPDATE_ADMIN_INVOICE_FAIL, UPDATE_ADMIN_INVOICE_REQUEST, UPDATE_ADMIN_INVOICE_SUCCESS } from "../../constants/adminPortal/adminPortal_invoiceConstants";
import { toast } from "react-toastify";

export const getAdminInvoice = () => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("admin"));
    try {
      dispatch({ type: GET_ADMIN_INVOICE_REQUEST });
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${api.dev}/api/invoice`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token} `,
        },
      };
      await axios
        .request(config)
        .then((response) => {
          dispatch({
            type: GET_ADMIN_INVOICE_SUCCESS,
            payload: response?.data?.data,
          });
        })
        .catch((error) => {});
    } catch (error) {
      dispatch({
        type: GET_ADMIN_INVOICE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const createAdminInvoice = (createAdminInvoice, setResponse, handleClose) => async (dispatch) => {
    
    const token = JSON.parse(localStorage.getItem("admin"));
      try {
        dispatch({ type: CREATE_ADMIN_INVOICE_REQUEST });
        const config = {
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token.access_token} `
          },
        };
        const { data } = await axios.post(
          
          
          `${api.dev}/api/invoice`,
          createAdminInvoice,
          config
        );
       if (data?.status === 200) {
          toast.success(data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          });
          setResponse(data);
          handleClose();
        }  else {
          toast.error(data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2500,
          });
        }
        dispatch({ type: CREATE_ADMIN_INVOICE_SUCCESS, payload: data });
      } catch (error) {
        toast.error(error?.response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
        });
        dispatch({
          type: CREATE_ADMIN_INVOICE_FAIL,
          payload: error?.response?.data?.message,
        });
      }
    };

    export const updateAdminInvoice = (updateInvoice, setOpenModal, setResponse,) => async (dispatch) => {
      const token = JSON.parse(localStorage.getItem("admin"));
        try {
          dispatch({ type: UPDATE_ADMIN_INVOICE_REQUEST });
          const config = {
            headers: {
              "Content-Type": "application/json",
              "Authorization" : `Bearer ${token.access_token} `
            },
          };
          const { data } = await axios.put(
            
            
            `${api.dev}/api/invoice`,
            updateInvoice,
            config
          );
         if (data?.status === 200) {
            toast.success(data?.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1500,
            });
            setOpenModal(false);
            setResponse(data);      
          }  else {
            toast.error(data?.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2500,
            });
          }
          dispatch({ type: UPDATE_ADMIN_INVOICE_SUCCESS, payload: data });
        } catch (error) {
          toast.error(error?.response?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2500,
          });
          dispatch({
            type: UPDATE_ADMIN_INVOICE_FAIL,
            payload: error?.response?.data?.message,
          });
        }
      };