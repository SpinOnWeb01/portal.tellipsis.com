import axios from "axios";
import { ALL_DASHBOARD_BILLING_CHART_FAIL, ALL_DASHBOARD_BILLING_CHART_REQUEST, ALL_DASHBOARD_BILLING_CHART_SUCCESS, ALL_DASHBOARD_CHART_FAIL, ALL_DASHBOARD_CHART_REQUEST, ALL_DASHBOARD_CHART_SUCCESS, ALL_DASHBOARD_LINE_CHART_FAIL, ALL_DASHBOARD_LINE_CHART_REQUEST, ALL_DASHBOARD_LINE_CHART_SUCCESS } from "../../constants/adminPortal/adminPortal_dashboardConstants";
import { toast } from "react-toastify";
import { api } from "../../../mockData";

export const getDashboardChart = () => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("admin"));
      try {
        dispatch({ type: ALL_DASHBOARD_CHART_REQUEST });
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `${api.dev}/api/serverstats`,
          headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token.access_token} `
          },
        };
        await axios
          .request(config)
          .then((response) => {
            dispatch({
              type: ALL_DASHBOARD_CHART_SUCCESS,
              payload: response?.data?.data,
            });
          })
          .catch((error) => {
            let errorMessage = "An error occurred while fetching data.";
            if (error.response) {
              if (error.response.status === 403) {
                errorMessage = "Permission Denied";
              } else if (error.response.status === 400 || error.response.status === 401 || error.response.status === 500) {
                errorMessage = error.response.data.message || "Bad Request";
              }
            }
            dispatch({ type: ALL_DASHBOARD_CHART_FAIL, payload: errorMessage });
          });
      } catch (error) {
        dispatch({ type: ALL_DASHBOARD_CHART_FAIL, payload: error.response.data.message });
      }
    };
    export const getDashboardBillingChart = () => async (dispatch) => {
      const token = JSON.parse(localStorage.getItem("admin"));
        try {
          dispatch({ type: ALL_DASHBOARD_BILLING_CHART_REQUEST });
          let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${api.dev}/api/billingstats`,
            headers: {
              "Content-Type": "application/json",
              "Authorization" : `Bearer ${token.access_token} `
            },
          };
          await axios
            .request(config)
            .then((response) => {
              dispatch({
                type: ALL_DASHBOARD_BILLING_CHART_SUCCESS,
                payload: response?.data?.data,
              });
            })
            .catch((error) => {
              if (error.response && error.response.data.status === 403) {
                dispatch({ type: ALL_DASHBOARD_BILLING_CHART_FAIL, payload: "Permission Denied" });
              } else if (error.response && error.response.data && error.response.data.message) {
                dispatch({ type: ALL_DASHBOARD_BILLING_CHART_FAIL, payload: error.response.data.message });
              } else {
                dispatch({ type: ALL_DASHBOARD_BILLING_CHART_FAIL, payload: "An error occurred while fetching data." });
              }
            });
        } catch (error) {
          dispatch({ type: ALL_DASHBOARD_BILLING_CHART_FAIL, payload: error.response.data.message });
        }
      };

      export const getDashboardLineChart = () => async (dispatch) => {
        const token = JSON.parse(localStorage.getItem("admin"));
          try {
            dispatch({ type: ALL_DASHBOARD_LINE_CHART_REQUEST });
            let config = {
              method: "get",
              maxBodyLength: Infinity,
              url: `${api.dev}/api/generate_ACD_ASR_chart`,
              headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token.access_token} `
              },
            };
            await axios
              .request(config)
              .then((response) => {
                dispatch({
                  type: ALL_DASHBOARD_LINE_CHART_SUCCESS,
                  payload: response?.data,
                });
              })
              .catch((error) => {
                if (error.response && error.response.data.status === 403) {
                  dispatch({ type: ALL_DASHBOARD_LINE_CHART_FAIL, payload: "Permission Denied" });
                } else if (error.response && error.response.data && error.response.data.message) {
                  dispatch({ type: ALL_DASHBOARD_LINE_CHART_FAIL, payload: error.response.data.message });
                } else {
                  dispatch({ type: ALL_DASHBOARD_LINE_CHART_FAIL, payload: "An error occurred while fetching data." });
                }
              });
          } catch (error) {
            dispatch({ type: ALL_DASHBOARD_LINE_CHART_FAIL, payload: error.response.data.message });
          }
        };