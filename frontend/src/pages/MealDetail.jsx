import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function MealDetail() {
  const { title } = useParams();
  const navigate = useNavigate();
  const [logged, setLogged] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const mealDetails = {
    Breakfast: {
      description: "Log your breakfast meal. Include calories, protein, carbs, and fats.",
      steps: ["Prepare your breakfast", "Take photos or note ingredients", "Log in the app"],
    },
    Lunch: {
      description: "Log your lunch meal. Make sure to balance protein, carbs, and veggies.",
      steps: ["Prepare lunch", "Record portions", "Log in the app"],
    },
    Dinner: {
      description: "Log your dinner meal. Avoid heavy meals too late in the day.",
      steps: ["Prepare dinner", "Track calories", "Log in the app"],
    },
  };

  const meal = mealDetails[title] || { description: "No details available", steps: [] };

  useEffect(() => {
    if (!currentUser) return;
    const stats = JSON.parse(localStorage.getItem("userStats")) || {};
    const userStats = stats[currentUser.email] || {};
    setLogged(userStats[`meal-${title}`] || false);
  }, [title, currentUser]);

  const handleToggleLogged = () => {
    if (!currentUser) return;
    const stats = JSON.parse(localStorage.getItem("userStats")) || {};
    if (!stats[currentUser.email]) stats[currentUser.email] = {};
    stats[currentUser.email][`meal-${title}`] = !logged;
    localStorage.setItem("userStats", JSON.stringify(stats));
    setLogged(!logged);

    window.dispatchEvent(new Event("statsUpdated"));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="mb-4">{meal.description}</p>

      <h2 className="text-2xl font-semibold mb-2">Steps:</h2>
      <ol className="list-decimal list-inside space-y-1 mb-4">
        {meal.steps.map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ol>

      <button
        onClick={handleToggleLogged}
        className={`px-4 py-2 rounded-lg font-semibold text-white ${
          logged ? "bg-green-500 hover:bg-green-600" : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {logged ? "Logged (Undo)" : "Mark as Logged"}
      </button>
    </div>
  );
}

export default MealDetail;