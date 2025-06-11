import axios from "axios";
import { api } from "../../../mockData";
import { GET_ADMIN_PRODUCTS_FAIL, GET_ADMIN_PRODUCTS_REQUEST, GET_ADMIN_PRODUCTS_SUCCESS, POST_ADMIN_PRODUCTS_FAIL, POST_ADMIN_PRODUCTS_REQUEST, POST_ADMIN_PRODUCTS_SUCCESS } from "../../constants/adminPortal/adminPortal_productsConstants";
import { toast } from "react-toastify";

export const getAdminProducts = () => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("admin"));
    try {
      dispatch({ type: GET_ADMIN_PRODUCTS_REQUEST });
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${api.dev}/api/products`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token} `,
        },
      };
      await axios
        .request(config)
        .then((response) => {
          dispatch({
            type: GET_ADMIN_PRODUCTS_SUCCESS,
            payload: response?.data?.data,
          });
        })
        .catch((error) => {});
    } catch (error) {
      dispatch({
        type: GET_ADMIN_PRODUCTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const createAdminProduct = (createAdminProduct, setOpen, setResponse,setDescription,setName, setPrice) => async (dispatch) => {
    
    const token = JSON.parse(localStorage.getItem("admin"));
      try {
        dispatch({ type: POST_ADMIN_PRODUCTS_REQUEST });
        const config = {
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token.access_token} `
          },
        };
        const { data } = await axios.post(
          
          
          `${api.dev}/api/products`,
          createAdminProduct,
          config
        );
       if (data?.status === 200) {
          toast.success(data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          });
          setOpen(false);
          setResponse(data);
          setDescription("");
          setName("");
          setPrice("");
        }  else {
          toast.error(data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2500,
          });
        }
        dispatch({ type: POST_ADMIN_PRODUCTS_SUCCESS, payload: data });
      } catch (error) {
        toast.error(error?.response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
        });
        dispatch({
          type: POST_ADMIN_PRODUCTS_FAIL,
          payload: error?.response?.data?.message,
        });
      }
    };