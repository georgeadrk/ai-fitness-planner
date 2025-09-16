import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";

function Home({ darkMode, toggleDarkMode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ workouts: 0, meals: 0 });

  const workouts = [
    { title: "Morning Run", description: "Run 3–5 km in the morning." },
    { title: "HIIT Workout", description: "High intensity interval training." },
    { title: "Yoga", description: "30 minutes of yoga stretches." },
  ];

  const meals = [
    { title: "Breakfast", description: "Log your breakfast meal." },
    { title: "Lunch", description: "Log your lunch meal." },
    { title: "Dinner", description: "Log your dinner meal." },
  ];

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) return navigate("/login");

    setUser(loggedInUser);

    const updateStats = () => {
      const allStats = JSON.parse(localStorage.getItem("userStats")) || {};
      const userStats = allStats[loggedInUser.email] || {};
      setStats({
        workouts: workouts.filter(w => userStats[w.title]).length,
        meals: meals.filter(m => userStats[`meal-${m.title}`]).length,
      });
    };

    updateStats();
    window.addEventListener("statsUpdated", updateStats);
    return () => window.removeEventListener("statsUpdated", updateStats);
  }, [navigate, workouts, meals]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  const totalWorkouts = workouts.length;
  const totalMeals = meals.length;
  const workoutPercent = totalWorkouts ? Math.round((stats.workouts / totalWorkouts) * 100) : 0;
  const mealPercent = totalMeals ? Math.round((stats.meals / totalMeals) * 100) : 0;

  if (!user) return <div className="p-6">Loading...</div>;

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"}`}>
      <header className={`p-6 flex justify-between items-center ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}>
        <h1 className="text-xl font-semibold">Welcome, {user.email.split("@")[0]}</h1>
        <div className="flex gap-4">
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-600 transition"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="p-6 max-w-6xl mx-auto space-y-8">
        {/* Progress Section */}
        <section className={`p-6 rounded-xl shadow space-y-4 ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}>
          <div>
            <h3 className="font-semibold">Workouts Completed</h3>
            <div className={`${darkMode ? "bg-gray-600" : "bg-gray-400"} w-full h-4 rounded-full mt-1`}>
              <div className="bg-indigo-500 h-4 rounded-full transition-all" style={{ width: `${workoutPercent}%` }} />
            </div>
            <p className="text-right text-sm mt-1">{stats.workouts} / {totalWorkouts} ({workoutPercent}%)</p>
          </div>

          <div>
            <h3 className="font-semibold">Meals Logged</h3>
            <div className={`${darkMode ? "bg-gray-600" : "bg-gray-400"} w-full h-4 rounded-full mt-1`}>
              <div className="bg-green-500 h-4 rounded-full transition-all" style={{ width: `${mealPercent}%` }} />
            </div>
            <p className="text-right text-sm mt-1">{stats.meals} / {totalMeals} ({mealPercent}%)</p>
          </div>
        </section>

        {/* Workouts */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Workouts</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {workouts.map((w, idx) => (
              <Card key={idx} title={w.title} description={w.description} type="workout" darkMode={darkMode} />
            ))}
          </div>
        </section>

        {/* Meals */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Meal Plans</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {meals.map((m, idx) => (
              <Card key={idx} title={m.title} description={m.description} type="meal" darkMode={darkMode} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;