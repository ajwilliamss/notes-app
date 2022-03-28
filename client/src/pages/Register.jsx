import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [validUsername, setValidUsername] = useState(false);
  const [userIsFocused, setUserIsFocused] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [pwdIsFocused, setPwdIsFocused] = useState(false);

  const [registerError, setRegisterError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isValid, setIsValid] = useState(false);
  const usernameRef = useRef(null);

  const { username, email, password, password2 } = formData;

  // Add input to formData state
  const getUserInput = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setRegisterError("");
  };

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      // Check passwords
      if (password !== password2) {
        setRegisterError("Passwords do not match");
      } else {
        const response = await axios.post("/users/register", {
          username,
          email,
          password,
        });
        // console.log(response.data);

        setFormData({ username: "", email: "", password: "", password2: "" });
        setIsValid(true);
        setSuccessMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setIsValid(false);
      setRegisterError(error.response.data.message);
    }
  };

  // Focus username input on initial load
  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  // Test username regex
  useEffect(() => {
    setValidUsername(USERNAME_REGEX.test(username));
  }, [username]);

  // Test password regex
  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
  }, [password]);

  return (
    <section className="register">
      <div className="register-wrapper">
        <h1>Register</h1>
        <form onSubmit={registerUser}>
          <div className="register-fields">
            {/* Username */}
            <input
              type="username"
              name="username"
              id="register-username"
              value={username}
              placeholder="Username"
              required
              onChange={getUserInput}
              ref={usernameRef}
              autoComplete="off"
              onFocus={() => setUserIsFocused(true)}
              onBlur={() => setUserIsFocused(false)}
            />
            {!validUsername && userIsFocused && username && (
              <p>
                Username must be 4 to 24 characters and start with a letter.
                Letters, numbers, hyphens, and underscores are permitted.
              </p>
            )}

            {/* Email */}
            <input
              type="email"
              name="email"
              id="register-email"
              value={email}
              placeholder="Email"
              required
              onChange={getUserInput}
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              id="register-password"
              value={password}
              placeholder="Password"
              required
              onChange={getUserInput}
              onFocus={() => setPwdIsFocused(true)}
              onBlur={() => setPwdIsFocused(false)}
            />
            {!validPassword && pwdIsFocused && (
              <p>
                Password must be 8 to 24 characters, include uppercase and
                lowercase letters, a number, and a special character. Special
                characters that are permitted: ! @ # $ %
              </p>
            )}

            {/* Confirm Password */}
            <input
              type="password"
              name="password2"
              id="register-password2"
              value={password2}
              placeholder="Confirm Password"
              required
              onChange={getUserInput}
            />
            <button
              type="submit"
              className="register-btn"
              disabled={!validUsername || !validPassword ? true : false}
            >
              Register
            </button>
            <p className="account">
              Already have an account?&nbsp;
              <Link to="/">Login Here</Link>
            </p>
            <h2 className={isValid ? "success-message" : "error-message"}>
              {isValid ? successMessage : registerError}
            </h2>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
