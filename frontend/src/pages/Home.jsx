import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  // Example cards
  const exampleCards = [
    { title: "Morning Run", description: "5 km run around the park" },
    { title: "HIIT Workout", description: "20 min high intensity" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar onLogout={handleLogout} />

      {/* Welcome Section */}
      <section className="py-16 px-6 text-center bg-indigo-600 text-white rounded-b-3xl">
        <h1 className="text-4xl font-bold mb-2">Welcome, George!</h1>
        <p className="text-lg text-indigo-100">
          Track your workouts, meals, and progress all in one place.
        </p>
      </section>

      {/* Card Grid */}
      <section className="py-10 px-6 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {exampleCards.map((card, index) => (
          <Card key={index} title={card.title} description={card.description} />
        ))}
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;