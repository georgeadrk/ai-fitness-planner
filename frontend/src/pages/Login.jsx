import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Hardcoded users
const USERS = [
  { email: "admin@gmail.com", password: "admin1234", role: "admin" },
  { email: "user@gmail.com", password: "user123", role: "user" },
];

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
  e.preventDefault();

  // Get stored users (hardcoded + signed up)
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  const allUsers = [
    { email: "admin@gmail.com", password: "admin1234", role: "admin" },
    ...storedUsers,
  ];

  const user = allUsers.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    if (user.role === "admin") navigate("/admin");
    else navigate("/home");
  } else {
    setError("Invalid email or password");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
          Login
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          required
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Login
        </button>
        <p className="text-center mt-4 text-gray-500">
          Don't have an account?{" "}
          <a href="/signup" className="text-indigo-600 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;