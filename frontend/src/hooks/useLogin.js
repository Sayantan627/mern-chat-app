import { useState } from "react";
import toast from "react-hot-toast";
import { customFetch } from "../utils/customFetch";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthContext();
  const login = async (username, password) => {
    setLoading(true);
    try {
      const { data } = await customFetch.post("/auth/login", {
        username,
        password,
      });
      localStorage.setItem("chat-user", JSON.stringify(data));
      setUser(data);
      toast.success("Login successful");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;
