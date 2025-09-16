import { useState } from "react";
import API from "../api";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      alert(res.data.message);
    } catch (err) {
      alert(err.response.data.detail);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-64">
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border p-2 rounded"
        />
        <button className="bg-green-500 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
}