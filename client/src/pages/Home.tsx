import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Header from "../components/Header";

const Home = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { user } = authContext;
  useEffect(() => {
    if (!user?.email) {
      navigate("/login");
    }
  }, [user]);
  return (
    <div>
      <Header />
      Home
    </div>
  );
};

export default Home;
