import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import LoginProvider from "./contexts/LoginContext";
import LoadingProvider from "./contexts/LoadingContext";
import SearchProvider from "./contexts/SearchContext";

ReactDOM.render(
  <React.StrictMode>
    <LoginProvider>
      <LoadingProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </LoadingProvider>
    </LoginProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
