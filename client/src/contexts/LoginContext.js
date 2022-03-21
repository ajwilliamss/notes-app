import { createContext, useState } from "react";

export const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <LoginContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
