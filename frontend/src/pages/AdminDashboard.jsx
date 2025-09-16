import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [userStats, setUserStats] = useState({});
  const navigate = useNavigate();

  // Load users and stats on mount
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const allUsers = [
      { email: "admin@gmail.com", role: "admin" },
      ...storedUsers.map(u => ({ email: u.email, role: u.role }))
    ];
    setUsers(allUsers);

    const stats = JSON.parse(localStorage.getItem("userStats")) || {};
    setUserStats(stats);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  const handleDelete = (email) => {
    if (email === "admin@gmail.com") {
      alert("Cannot delete admin!");
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = storedUsers.filter((u) => u.email !== email);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers([
      { email: "admin@gmail.com", role: "admin" },
      ...updatedUsers.map(u => ({ email: u.email, role: u.role }))
    ]);
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

      <main className="p-6 max-w-6xl mx-auto space-y-8">
        {/* Users Table */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Registered Users</h2>
          {users.length === 0 ? (
            <p className="text-gray-700">No users found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow rounded-lg">
                <thead className="bg-indigo-100">
                  <tr>
                    <th className="text-left px-6 py-3">Email</th>
                    <th className="text-left px-6 py-3">Role</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">{user.role}</td>
                      <td className="px-6 py-4 text-center">
                        {user.role !== "admin" && (
                          <button
                            onClick={() => handleDelete(user.email)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Stats Chart */}
<section className="mt-8">
  <h2 className="text-2xl font-semibold mb-4">Workout / Nutrition Stats</h2>
  <div className="bg-white p-6 rounded-xl shadow">
    {users.length === 0 ? (
      <p className="text-gray-700">No stats to display.</p>
    ) : (
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={users
            .filter(user => user.role !== "admin")
            .map(user => {
              const stats = userStats[user.email] || {};
              const workoutCount = Object.keys(stats).filter(key => !key.includes("meal") && stats[key]).length;
              const mealCount = Object.keys(stats).filter(key => key.includes("meal") && stats[key]).length;
              return {
                name: user.email.split("@")[0],
                workouts: workoutCount,
                meals: mealCount,
              };
            })}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="workouts" fill="#4F46E5" />
          <Bar dataKey="meals" fill="#10B981" />
        </BarChart>
      </ResponsiveContainer>
    )}
  </div>
</section>

      </main>
    </div>
  );
}

export default AdminDashboard;