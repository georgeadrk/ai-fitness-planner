import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Planner from "./pages/Planner";

function App() {
  return (
    <Router>
      <nav className="p-4 bg-blue-600 text-white flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/planner">Planner</Link>
      </nav>
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planner" element={<Planner />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;