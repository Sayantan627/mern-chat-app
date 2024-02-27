import { useState } from "react";
import toast from "react-hot-toast";
import { customFetch } from "../utils/customFetch";
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const { data } = await customFetch.get("/auth/logout");
      localStorage.removeItem("chat-user");
      setUser(null);
      toast.success(data.msg);
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
};
export default useLogout;
