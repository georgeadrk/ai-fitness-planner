import React from "react";

function Navbar({ onLogout }) {
  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <div className="text-indigo-600 font-bold text-xl">AI Fitness</div>
      <div className="space-x-4 flex items-center">
        <a href="/home" className="text-gray-700 hover:text-indigo-600">
          Home
        </a>
        <a href="/workouts" className="text-gray-700 hover:text-indigo-600">
          Workouts
        </a>
        <a href="/nutrition" className="text-gray-700 hover:text-indigo-600">
          Nutrition
        </a>
        <a href="/progress" className="text-gray-700 hover:text-indigo-600">
          Progress
        </a>
        <button
          onClick={onLogout}
          className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;