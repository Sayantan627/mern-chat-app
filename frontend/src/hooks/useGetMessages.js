import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import { customFetch } from "../utils/customFetch";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const { data } = await customFetch.get(
          `/messages/${selectedConversation._id}`
        );
        setMessages(data);
      } catch (error) {
        toast.error(error?.response?.data?.msg);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { loading, messages };
};
export default useGetMessages;
