import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { customFetch } from "../utils/customFetch";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const { data } = await customFetch.get("/users");
        setConversations(data);
      } catch (error) {
        toast.error(error?.response?.data?.msg);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
