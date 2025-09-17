import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages
import Dashboard from "./pages/Dashboard";
import Supply from "./pages/Supply";
import Demand from "./pages/Demand";
import CostCalculator from "./pages/CostCalculator";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-6 py-8 max-w-7xl">
          { <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/supply" element={<Supply />} />
            <Route path="/demand" element={<Demand />} />
            <Route path="/calculator" element={<CostCalculator />} />
            <Route path="/about" element={<About />} />
          </Routes> }
        </main>
      </div>
    </Router>
  );
}

export default App;