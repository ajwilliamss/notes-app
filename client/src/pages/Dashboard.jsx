import { useContext, useEffect } from "react";
import { LoginContext } from "../contexts/LoginContext";
import { LoadingContext } from "../contexts/LoadingContext";
import Login from "../components/Login";
import Notes from "../components/Notes";
import axios from "axios";

const Dashboard = () => {
  const { isLogin, setIsLogin } = useContext(LoginContext);
  const { setIsLoading } = useContext(LoadingContext);

  // Keep user logged in
  const getUser = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get("/users/user", {
          headers: { Authorization: token },
        });

        // console.log(response.data);
        setIsLogin(true);
        setIsLoading(false);
      } else {
        setIsLogin(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return <>{isLogin ? <Notes /> : <Login />}</>;
};

export default Dashboard;
