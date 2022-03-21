import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";
import { Link } from "react-router-dom";
import Search from "./Search";

const Nav = () => {
  const { setIsLogin } = useContext(LoginContext);

  // Logout user
  const logoutUser = () => {
    localStorage.clear();
    setIsLogin(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <h1>
          <Link to="/">Notes App</Link>
        </h1>
      </div>
      <Search />
      <ul className="nav-items">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/create">Create</Link>
        </li>
        <li className="nav-item" onClick={logoutUser}>
          <Link to="/">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
