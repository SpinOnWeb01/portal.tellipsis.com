import axios from "axios";
import { api } from "../../../mockData";
import { CREATE_ADMIN_ROLES_FAIL, CREATE_ADMIN_ROLES_REQUEST, CREATE_ADMIN_ROLES_SUCCESS, GET_ADMIN_ROLES_FAIL, GET_ADMIN_ROLES_REQUEST, GET_ADMIN_ROLES_SUCCESS, UPDATE_ADMIN_ROLES_FAIL, UPDATE_ADMIN_ROLES_REQUEST, UPDATE_ADMIN_ROLES_SUCCESS } from "../../constants/adminPortal/adminPortal_rolesConstants";
import { toast } from "react-toastify";

export const getAdminRoles = () => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("admin"));
  try {
    dispatch({ type: GET_ADMIN_ROLES_REQUEST });
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${api.dev}/api/roles`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token} `,
      },
    };
    await axios
      .request(config)
      .then((response) => {
        dispatch({
          type: GET_ADMIN_ROLES_SUCCESS,
          payload: response?.data?.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_ADMIN_ROLES_SUCCESS,
          payload: [],
        });
      });
  } catch (error) {
    dispatch({
      type: GET_ADMIN_ROLES_FAIL,
      payload: [],
    });
  }
};

export const createAdminRoles =
  (createAdminRoles, setOpen, setResponse) => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("admin"));
    try {
      dispatch({ type: CREATE_ADMIN_ROLES_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token} `,
        },
      };
      const { data } = await axios.post(
        `${api.dev}/api/roles`,
        JSON.stringify(createAdminRoles),
        config
      );
      if (data?.status === 200) {
        toast.success(data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        });
        setOpen(false);
        setResponse(data);
      } else {
        toast.error(data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
        });
      }
      dispatch({ type: CREATE_ADMIN_ROLES_SUCCESS, payload: data });
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
      });
      dispatch({
        type: CREATE_ADMIN_ROLES_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

export const updateAdminRoles =
  (updateRoles, setOpenModal, setResponse) => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("admin"));
    try {
      dispatch({ type: UPDATE_ADMIN_ROLES_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token} `,
        },
      };
      const { data } = await axios.put(
        `${api.dev}/api/roles`,
        JSON.stringify(updateRoles),
        config
      );
      if (data?.status === 200) {
        toast.success(data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        });
        setOpenModal(false);
        setResponse(data);
      } else {
        toast.error(data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
        });
      }
      dispatch({ type: UPDATE_ADMIN_ROLES_SUCCESS, payload: data });
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
      });
      dispatch({
        type: UPDATE_ADMIN_ROLES_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };