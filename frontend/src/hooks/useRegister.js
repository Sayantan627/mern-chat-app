import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { customFetch } from "../utils/customFetch";

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthContext();

  const register = async ({ fullName, username, password, gender }) => {
    setLoading(true);
    try {
      const { data } = await customFetch.post("/auth/register", {
        fullName,
        username,
        password,
        gender,
      });
      localStorage.setItem("chat-user", JSON.stringify(data));
      setUser(data);
      toast.success("Registration successful");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    } finally {
      setLoading(false);
    }
  };

  return { loading, register };
};
export default useRegister;
