import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages
import Dashboard from "./pages/Dashboard";
import Supply from "./pages/Supply";
import Demand from "./pages/Demand";
import Calculator from "./pages/Calculator";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <Navbar /> {/* Always visible */}

      <div className="p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/supply" element={<Supply />} />
          <Route path="/demand" element={<Demand />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
