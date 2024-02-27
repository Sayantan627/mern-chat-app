import { TbLogout2 } from "react-icons/tb";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();
  return (
    <div className="mt-auto">
      {loading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <TbLogout2
          className="w-6 h-6 cursor-pointer text-white"
          onClick={logout}
        />
      )}
    </div>
  );
};
export default LogoutButton;
