import { useState } from "react";
import useConversation from "../zustand/useConversation";
import { customFetch } from "../utils/customFetch";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const { data } = await customFetch.post(
        `/messages/send/${selectedConversation._id}`,
        { message }
      );
      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;
