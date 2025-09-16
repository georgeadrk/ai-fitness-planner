import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function WorkoutDetail() {
  const { title } = useParams();
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const workoutDetails = {
    "Morning Run": {
      description: "Run 3–5 km in the morning.",
      steps: ["Warm up 5 minutes", "Run 3–5 km", "Cool down and stretch"],
    },
    "HIIT Workout": {
      description: "High intensity interval training.",
      steps: ["10 push-ups", "20 squats", "30 seconds plank", "Repeat 4 times"],
    },
    Yoga: {
      description: "30 minutes of yoga stretches.",
      steps: ["Sun Salutation", "Warrior Poses", "Balance Poses", "Meditation"],
    },
  };

  const workout = workoutDetails[title] || { description: "No details available", steps: [] };

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
    stats[currentUser.email][title] = !completed;
    localStorage.setItem("userStats", JSON.stringify(stats));
    setCompleted(!completed);

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
      <p className="mb-4">{workout.description}</p>

      <h2 className="text-2xl font-semibold mb-2">Steps:</h2>
      <ol className="list-decimal list-inside space-y-1 mb-4">
        {workout.steps.map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ol>

      <button
        onClick={handleToggleComplete}
        className={`px-4 py-2 rounded-lg font-semibold text-white ${
          completed ? "bg-green-500 hover:bg-green-600" : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {completed ? "Completed (Undo)" : "Mark as Complete"}
      </button>
    </div>
  );
}

export default WorkoutDetail;