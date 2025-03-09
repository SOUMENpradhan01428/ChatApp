import React, { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation.js";
import axios from "axios";
import BASE_URL from "../../config/config.js";
const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      if (selectedConversation && selectedConversation._id) {
        try {
          const res = await axios.get(
            `${BASE_URL}/api/message/get/${selectedConversation._id}`,
            {
              withCredentials: true, // ✅ Ensure cookies are sent with the request
            }
          );
          setMessage(res.data);
          setLoading(false);
        } catch (error) {
          console.log("Error in getting messages", error);
          setLoading(false);
        }
      }
    };
    getMessages();
  }, [selectedConversation, setMessage]);
  return { loading, messages };
};

export default useGetMessage;