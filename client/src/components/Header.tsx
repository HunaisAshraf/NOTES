import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const Header = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { logout } = authContext;

  return (
    <div className="flex justify-between items-center py-3">
      <h1 className="text-3xl ">Notes</h1>
      <div>
        <button
          onClick={logout}
          className="mx-2 bg-yellow-300 text-slate-600 font-semibold px-3 py-2 rounded w-28"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
