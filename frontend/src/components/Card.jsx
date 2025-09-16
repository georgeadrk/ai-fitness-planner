import React, { useState, useEffect } from "react";

function Card({ title, description }) {
  const [completed, setCompleted] = useState(false);

  // Get current logged-in user
  const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    if (!currentUser) return;
    const stats = JSON.parse(localStorage.getItem("userStats")) || {};
    const userStats = stats[currentUser.email] || {};
    setCompleted(userStats[title] || false);
  }, [title, currentUser]);

  const handleToggleComplete = () => {
    if (!currentUser) return;

    const stats = JSON.parse(localStorage.getItem("userStats")) || {};
    if (!stats[currentUser.email]) stats[currentUser.email] = {};

    // Toggle the completion
    stats[currentUser.email][title] = !completed;
    localStorage.setItem("userStats", JSON.stringify(stats));

    setCompleted(!completed);
  };

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 mb-4">{description}</p>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={handleToggleComplete}
          className={`px-4 py-2 rounded-lg font-semibold text-white transition ${
            completed ? "bg-green-500 hover:bg-green-600" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {completed ? "Completed (Undo)" : "Start Workout"}
        </button>

        {completed && <span className="text-green-500 font-semibold ml-2">✔ Done</span>}
      </div>
    </div>
  );
}

export default Card;