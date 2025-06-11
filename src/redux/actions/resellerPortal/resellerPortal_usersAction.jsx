import { toast } from "react-toastify";
import axios from "axios";

import {api} from '../../../mockData'
import { ALL_RESELLER_USERS_FAIL, ALL_RESELLER_USERS_REQUEST, ALL_RESELLER_USERS_SUCCESS, DELETE_RESELLER_USER_FAIL, DELETE_RESELLER_USER_REQUEST, DELETE_RESELLER_USER_SUCCESS, LOAD_RESELLER_USER_FAIL, LOAD_RESELLER_USER_REQUEST, LOAD_RESELLER_USER_SUCCESS, REGISTER_RESELLER_USER_FAIL, REGISTER_RESELLER_USER_REQUEST, REGISTER_RESELLER_USER_SUCCESS, RESELLER_LOGIN_FAIL, RESELLER_LOGIN_REQUEST, RESELLER_LOGIN_SUCCESS, RESELLER_LOGOUT_FAIL, RESELLER_LOGOUT_SUCCESS, UPDATE_RESELLER_USER_FAIL, UPDATE_RESELLER_USER_REQUEST, UPDATE_RESELLER_USER_SUCCESS, USER_RESELLER_ROLE_FAIL, USER_RESELLER_ROLE_REQUEST, USER_RESELLER_ROLE_SUCCESS } from "../../constants/resellerPortal/resellerPortal_usersConstants";

export const login = (values) => async (dispatch) => {

  try {
    dispatch({ type: RESELLER_LOGIN_REQUEST });
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    // await axios
    //   .get(
    //     `https://ikalyuga.com/api/index.php?action=login&email=${email}&password=${password}`,
    //     config
    //   )
    //   .then((res) => {
    //     const data = res?.data?.response;

    //     if (data.success === 1) {
    //       toast.success(data.message, {
    //         position: toast.POSITION.TOP_RIGHT,
    //         autoClose: 1500,
    //       });
    //       //   navigate("/"})
    //       localStorage.setItem("user", JSON.stringify(data))
    //       dispatch({ type: LOGIN_SUCCESS, payload: data });
    //     } else {
    //       toast.error(data.message, {
    //         position: toast.POSITION.TOP_RIGHT,
    //         autoClose: 1500,
    //       });
    //     }
    //   });

    // let config = {
    //   method: 'post',
    //   maxBodyLength: Infinity,
    //   url: 'http://95.217.227.234:5000/login',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   data : data
    // };

    // axios.request(config)
    // .then((response) => {
    //    const values = response?.data;
    //    if (values.status === "200") {
    //     toast.success(values.message, {
    //       position: toast.POSITION.TOP_RIGHT,
    //       autoClose: 1500,
    //     });
    //     //   navigate("/"})
    //     localStorage.setItem("user", JSON.stringify(values))

    dispatch({ type: RESELLER_LOGIN_SUCCESS, payload: values });

    //   } else {
    //     toast.error(values.message, {
    //       position: toast.POSITION.TOP_RIGHT,
    //       autoClose: 1500,
    //     });
    //   }

    // })
  } catch (error) {
    dispatch({ type: RESELLER_LOGIN_FAIL, payload: error });
  }
};

//logout

export const logout = () => async (dispatch) => {
  try {
    const { data } = await axios.get(``);
    dispatch({ type: RESELLER_LOGOUT_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: RESELLER_LOGOUT_FAIL, payload: error.response.data.message });
  }
};

export const registerReseller = (createData, setOpen, setInputValues, setResponse) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("reseller"));
    try {
      dispatch({ type: REGISTER_RESELLER_USER_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${token.access_token} `
        },
      };
      const { data } = await axios.post(
        
        
        `${api.dev}/api/users`,
        JSON.stringify(createData),
        config
      );
     if (data?.status === 200) {
        toast.success(data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        });
        setOpen(false);
        setInputValues("");
        setResponse(data);          
      }  else {
        toast.error(data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
        });
      }
      dispatch({ type: REGISTER_RESELLER_USER_SUCCESS, payload: data });
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
      });
      dispatch({
        type: REGISTER_RESELLER_USER_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_RESELLER_USER_REQUEST });

    const { data } = await axios.get(``);
    dispatch({ type: LOAD_RESELLER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_RESELLER_USER_FAIL, payload: error.response.data.message });
  }
};

export const getRoleUsersReseller = () => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("reseller"));
  try {
    dispatch({ type: USER_RESELLER_ROLE_REQUEST });
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${api.dev}/api/roles`,
      headers: {
        "Content-Type": "application/json",
          "Authorization" : `Bearer ${token.access_token} `
      },
    };
    await axios
      .request(config)
      .then((response) => {
        dispatch({
          type: USER_RESELLER_ROLE_SUCCESS,
          payload: response?.data?.data,
        });
      })
      .catch((error) => {
      });
  } catch (error) {
    dispatch({ type: USER_RESELLER_ROLE_FAIL, payload: error.response.data.message });
  }
};

export const getAllUsersReseller = (radioValue) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("reseller"));
  try {
    dispatch({ type: ALL_RESELLER_USERS_REQUEST });
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${api.dev}/api/users?is_active=${radioValue}`,
      headers: {
        "Content-Type": "application/json",
          "Authorization" : `Bearer ${token.access_token} `
      },
    };
    const response = await axios.request(config);

    if (response?.data?.data) {
      dispatch({
        type: ALL_RESELLER_USERS_SUCCESS,
        payload: response.data.data,
      });
     // dispatch({ type: ALL_USERS_RESET }); // Reset error if data is successfully fetched
    } else {
      const errorMessage = "An error occurred while fetching data.";
      dispatch({ type: ALL_RESELLER_USERS_FAIL, payload: errorMessage });
    }
  }catch (error) {
    let errorMessage = "An error occurred while fetching data.";
    if (error.response) {
      if (error.response.status === 403) {
        errorMessage = "Permission Denied";
      } else if (error.response.status === 401) {
        errorMessage = error.response.data.msg || "Token has expired";
      } else if (error.response.status === 400 || error.response.status === 500) {
        errorMessage = error.response.data.message || "Bad Request";
      }
    }
    dispatch({ type: ALL_RESELLER_USERS_FAIL, payload: errorMessage });
  }
 
};

export const updateUserReseller = ( userData, setOpenModal, setResponse) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("reseller"));
  try {
    dispatch({ type: UPDATE_RESELLER_USER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token.access_token} `
      },
    };
    const { data } = await axios.put(
      
      
      `${api.dev}/api/users`,
      JSON.stringify(userData),
      config
    );
   if (data?.status === 200) {
      toast.success(data?.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });
       setOpenModal(false);
      // setInputValues("");
       setResponse(data);          
    }  else {
      toast.error(data?.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
      });
    }

    dispatch({ type: UPDATE_RESELLER_USER_SUCCESS, payload: data });
  } catch (error) {
    toast.error(error?.response?.data?.message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2500,
    });
    dispatch({ type: UPDATE_RESELLER_USER_FAIL, payload: error.response.data.message });
  }
};

export const deleteUserReseller = (userData, setResponse) => async (dispatch) => {
  

  try {
    dispatch({ type: DELETE_RESELLER_USER_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      
     
      `http://95.217.227.234:5000/deleteuser`,
      userData,
      config
    );
         if (data?.status === "200") {
          toast.success(data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          });
          setResponse(data);
        } else {
          toast.error(data?.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          });
        }

    dispatch({ type: DELETE_RESELLER_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_RESELLER_USER_FAIL, payload: error.response.data.message });
  }
};
