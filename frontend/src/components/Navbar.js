import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-green-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Brand Name */}
      <div className="text-2xl font-bold">
        CleanTechAI
      </div>

      {/* Links */}
      <div className="flex gap-6">
        <Link to="/" className="hover:text-yellow-300">Dashboard</Link>
        <Link to="/supply" className="hover:text-yellow-300">Supply</Link>
        <Link to="/demand" className="hover:text-yellow-300">Demand</Link>
        <Link to="/calculator" className="hover:text-yellow-300">Cost Calculator</Link>
        <Link to="/about" className="hover:text-yellow-300">About</Link>
      </div>
    </nav>
  );
}
