import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import BASE_URL from "../../config/config";

// "http://localhost:4002/api/user/allusers"
function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("jwt");
        console.log("JWT Token:", Cookies.get("jwt"));
        const response = await axios.get(`${BASE_URL}/api/user/allusers`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error in useGetAllUsers: " + error);
      }
    };
    getUsers();
  }, []);
  return [allUsers, loading];
}

export default useGetAllUsers;