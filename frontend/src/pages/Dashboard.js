import React from "react";
import DemandSupplyChart from "../components/DemandSupplyChart";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Page Title */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Ontario Energy Dashboard</h1>
        <p className="dashboard-subtitle">Real-time electricity supply and demand data</p>
      </div>

      {/* Chart Section */}
      <div className="chart-section">
        <DemandSupplyChart />
      </div>
    </div>
  );
};

export default Dashboard;