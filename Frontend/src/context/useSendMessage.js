import React, { useState } from "react";
import useConversation from "../zustand/useConversation.js";
import axios from "axios";
import BASE_URL from "../../config/config.js";
const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();

  const sendMessages = async (message) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/api/message/send/${selectedConversation._id}`,
        { message },
        {
          withCredentials: true, // ✅ Ensure cookies are sent with the request
        }
      );

      setMessage([...messages, res.data]);
    } catch (error) {
      console.log("Error in send messages", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessages };
};

export default useSendMessage;
