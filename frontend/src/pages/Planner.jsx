import { useEffect, useState } from "react";
import axios from "axios";

function Planner() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/")
      .then((res) => setMessage(res.data.message))
      .catch(() => setMessage("Error connecting to backend"));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Your Fitness Planner</h1>
      <p className="mt-2 text-gray-500">{message}</p>
    </div>
  );
}

export default Planner;