import { Outlet } from "react-router-dom";
import Header from "../components/Header";
const Layout = () => {
  return (
    <div className="mx-44">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
