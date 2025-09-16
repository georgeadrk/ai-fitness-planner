import React from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-600 text-white p-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>
      <main className="p-6">
        <p className="text-gray-700 text-lg">
          Manage users, workouts, nutrition plans, and track app usage here.
        </p>
      </main>
    </div>
  );
}

export default AdminDashboard;