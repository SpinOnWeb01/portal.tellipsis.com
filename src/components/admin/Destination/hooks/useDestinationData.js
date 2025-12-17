import React, { useEffect, useMemo } from "react";
import axios from "axios";
import { api } from "../../../../mockData";

export const useDestinationData = (token, userId, resellerId) => {
  const [extensionNumber, setExtensionNumber] = React.useState([]);
  const [queue, setQueue] = React.useState([]);
  const [resellerUsersData, setResellerUsersData] = React.useState([]);

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const [extensionsResponse, queuesResponse] = await Promise.all([
            axios.get(`${api.dev}/api/getuserextensions?user_id=${userId}`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.access_token}`,
              },
            }),
            axios.get(`${api.dev}/api/getuserqueues?user_id=${userId}`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.access_token}`,
              },
            }),
          ]);
          setExtensionNumber(extensionsResponse?.data || []);
          setQueue(queuesResponse?.data || []);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [userId, token]);

  useEffect(() => {
    if (resellerId && resellerId !== "None") {
      const fetchResellerUsers = async () => {
        try {
          const response = await axios.get(
            `${api.dev}/api/getreselleruserlist?reseller_id=${resellerId}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.access_token}`,
              },
            }
          );
          setResellerUsersData(response?.data?.data || []);
        } catch (error) {
          console.error("Error fetching reseller users:", error);
        }
      };
      fetchResellerUsers();
    }
  }, [resellerId, token]);

  return { extensionNumber, queue, resellerUsersData };
};

export const useUsersAndResellers = (state, resellerUsersData) => {
  return useMemo(() => {
    const users = state?.getAdminUsersList?.userList
      ? Object.keys(state.getAdminUsersList.userList).map((key) => ({
          user_id: key,
          username: state.getAdminUsersList.userList[key],
        }))
      : [];

    const resellers = state?.getAdminResellersList?.resellerList
      ? Object.keys(state.getAdminResellersList.resellerList).map((key) => ({
          reseller_id: key,
          username: state.getAdminResellersList.resellerList[key],
        }))
      : [];

    const resellerUsers = resellerUsersData
      ? Object.keys(resellerUsersData).map((key) => ({
          user_id: key,
          username: resellerUsersData[key],
        }))
      : [];

    return { users, resellers, resellerUsers };
  }, [state?.getAdminUsersList?.userList, state?.getAdminResellersList?.resellerList, resellerUsersData]);
};