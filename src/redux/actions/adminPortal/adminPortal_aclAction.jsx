import axios from "axios";
import { CREATE_ADMIN_ACL_FAIL, CREATE_ADMIN_ACL_REQUEST, CREATE_ADMIN_ACL_SUCCESS, DELETE_ADMIN_ACL_FAIL, DELETE_ADMIN_ACL_REQUEST, DELETE_ADMIN_ACL_SUCCESS, GET_ADMIN_ACL_FAIL, GET_ADMIN_ACL_REQUEST, GET_ADMIN_ACL_SUCCESS, UPDATE_ADMIN_ACL_FAIL, UPDATE_ADMIN_ACL_REQUEST, UPDATE_ADMIN_ACL_SUCCESS } from "../../constants/adminPortal/adminPortal_aclConstants";
import { toast } from "react-toastify";
import { api } from "../../../mockData";

export const getAdminAcl = () => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("admin"));
    try {
      dispatch({ type: GET_ADMIN_ACL_REQUEST });
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${api.dev}/api/acl_iplist`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token} `,
        },
      };
      await axios
        .request(config)
        .then((response) => {
          dispatch({
            type: GET_ADMIN_ACL_SUCCESS,
            payload: response?.data?.data,
          });
        })
        .catch((error) => {});
    } catch (error) {
      dispatch({
        type: GET_ADMIN_ACL_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const createAdminAcl = (createAdminAcl, setOpen, setResponse,) => async (dispatch) => {
    
    const token = JSON.parse(localStorage.getItem("admin"));
      try {
        dispatch({ type: CREATE_ADMIN_ACL_REQUEST });
        const config = {
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token.access_token} `
          },
        };
        const { data } = await axios.post(
          
          
          `${api.dev}/api/acl_iplist`,
          createAdminAcl,
          config
        );
       if (data?.status === 200) {
          toast.success(data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          });
          setOpen(false);
          setResponse(data);

        }  else {
          toast.error(data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2500,
          });
        }
        dispatch({ type: CREATE_ADMIN_ACL_SUCCESS, payload: data });
      } catch (error) {
        toast.error(error?.response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
        });
        dispatch({
          type: CREATE_ADMIN_ACL_FAIL,
          payload: error?.response?.data?.message,
        });
      }
    };

    export const updateAdminAcl = (updateAcl, setOpenModal, setResponse,) => async (dispatch) => {
      const token = JSON.parse(localStorage.getItem("admin"));
        try {
          dispatch({ type: UPDATE_ADMIN_ACL_REQUEST });
          const config = {
            headers: {
              "Content-Type": "application/json",
              "Authorization" : `Bearer ${token.access_token} `
            },
          };
          const { data } = await axios.put(
            
            
            `${api.dev}/api/acl_iplist`,
            updateAcl,
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
          dispatch({ type: UPDATE_ADMIN_ACL_SUCCESS, payload: data });
        } catch (error) {
          toast.error(error?.response?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2500,
          });
          dispatch({
            type: UPDATE_ADMIN_ACL_FAIL,
            payload: error?.response?.data?.message,
          });
        }
      };

      export const deleteAdminAcl = (deleteAcl, setResponse, setAclId) => async (dispatch) => {
                
  
        try {
          dispatch({ type: DELETE_ADMIN_ACL_REQUEST });
          const token = JSON.parse(localStorage.getItem("admin"));
    
          fetch(`${api.dev}/api/acl_iplist`, {
            method: 'DELETE',
            body: JSON.stringify(deleteAcl), // Using body instead of data for sending data
            headers: {
              'Authorization': `Bearer ${token.access_token}`,
              'Content-Type': 'application/json'
            },
          })
          .then(response => {
            if (response.status === 200) {
              // Parse JSON response
              return response.json();
            } else {
              // Handle error status
              throw new Error(`Request failed with status ${response.status}`);
            }
          })
          .then(data => {
            // Handle successful response
            toast.success(data?.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1500,
            });
            setResponse(data);
            setAclId("")
            dispatch({ type: DELETE_ADMIN_ACL_SUCCESS, payload: data });
          })
          .catch(error => {
            // Handle fetch errors
            toast.error('Error deleting. Please try again later.', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1500,
            });
          });
          
          
        } 
         catch (error) {
          dispatch({ type: DELETE_ADMIN_ACL_FAIL, payload: error.response.data.message });
        }
      };