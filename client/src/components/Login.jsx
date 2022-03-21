import { useState, useEffect, useRef, useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState("");
  const { setIsLogin } = useContext(LoginContext);
  const emailRef = useRef(null);

  const { email, password } = formData;

  // Add input to formData state
  const getUserInput = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setLoginError("");
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/users/login", { email, password });
      // console.log(response.data);

      localStorage.setItem("token", response.data.token);
      setFormData({ email: "", password: "" });
      setIsLogin(true);
    } catch (error) {
      console.error(error);
      setLoginError(error.response.data.message);
    }
  };

  // Focus email input on initial load
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <section className="login">
      <div className="login-wrapper">
        <h1>Login</h1>
        <form onSubmit={loginUser}>
          <div className="login-fields">
            {/* Email */}
            <input
              type="email"
              name="email"
              id="login-email"
              value={email}
              placeholder="Email"
              required
              onChange={getUserInput}
              ref={emailRef}
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              id="login-password"
              value={password}
              placeholder="Password"
              required
              onChange={getUserInput}
            />

            <button type="submit" className="login-btn">
              Login
            </button>
          </div>
          <p className="account">
            Don't have an account?&nbsp;
            <Link to="/register">Register Here</Link>
          </p>
          <h2 className="error-message">{loginError}</h2>
        </form>
      </div>
    </section>
  );
};

export default Login;
