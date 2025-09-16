import React from 'react';
import DemandChart from '../components/DemandChart';
import SupplyChart from '../components/SupplyChart';

const Dashboard = () => {
  return (
    <div>
      <h1>Ontario Energy Dashboard</h1>
      <DemandChart />
      <SupplyChart />
    </div>
  );
};

export default Dashboard;
