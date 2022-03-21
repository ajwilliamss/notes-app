import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Register from "./pages/Register";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="notes-app">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
