import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import WorkoutDetail from "./pages/WorkoutDetail";
import MealDetail from "./pages/MealDetail";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/workout/:title" element={<WorkoutDetail />} />
        <Route path="/meal/:title" element={<MealDetail />} />
        <Route path="*" element={<div className="p-6 text-center">Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
