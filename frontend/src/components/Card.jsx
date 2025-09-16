import React, { useState } from "react";

function Card({ title, description }) {
  const [completed, setCompleted] = useState(false);

  return (
    <div
      className={`bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col justify-between`}
    >
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 mb-4">{description}</p>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={() => setCompleted(!completed)}
          className={`px-4 py-2 rounded-lg font-semibold text-white transition ${
            completed ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
          disabled={completed}
        >
          {completed ? "Completed" : "Start Workout"}
        </button>

        {completed && (
          <span className="text-green-500 font-semibold ml-2">✔ Done</span>
        )}
      </div>
    </div>
  );
}

export default Card;