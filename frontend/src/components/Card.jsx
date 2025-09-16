import React, { useState, useEffect } from "react";

function Card({ title, description, type, darkMode }) {
  const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!currentUser) return;
    const stats = JSON.parse(localStorage.getItem("userStats")) || {};
    const key = type === "meal" ? `meal-${title}` : title;
    setCompleted(stats[currentUser.email]?.[key] || false);
  }, [title, type, currentUser]);

  const handleToggleComplete = (e) => {
    e.stopPropagation(); // Prevent navigating
    if (!currentUser) return;
    const stats = JSON.parse(localStorage.getItem("userStats")) || {};
    if (!stats[currentUser.email]) stats[currentUser.email] = {};
    const key = type === "meal" ? `meal-${title}` : title;
    stats[currentUser.email][key] = !completed;
    localStorage.setItem("userStats", JSON.stringify(stats));
    setCompleted(!completed);
    window.dispatchEvent(new Event("statsUpdated"));
  };

  const handleCardClick = () => {
    window.location.href = `/${type}/${encodeURIComponent(title)}`;
  };

  // Conditional classes based on darkMode
  const cardBg = darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900";
  const descText = darkMode ? "text-gray-300" : "text-gray-500";

  return (
    <div
      onClick={handleCardClick}
      className={`${cardBg} rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col justify-between cursor-pointer`}
    >
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className={`${descText} mb-4`}>{description}</p>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={handleToggleComplete}
          className={`px-4 py-2 rounded-lg font-semibold text-white transition ${
            completed ? "bg-green-500 hover:bg-green-600" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {completed ? "Completed (Undo)" : "Start / Log"}
        </button>
        {completed && <span className="text-green-500 font-semibold ml-2">✔ Done</span>}
      </div>
    </div>
  );
}

export default Card;