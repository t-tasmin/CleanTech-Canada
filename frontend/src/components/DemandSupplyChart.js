import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { fetchDemand, fetchSupply } from '../services/api';
import './DemandSupplyChart.css';

const DemandSupplyChart = () => {
  const [demandData, setDemandData] = useState([]);
  const [supplyData, setSupplyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCombinedData = async () => {
      try {
        setLoading(true);

        const [demandRes, supplyRes] = await Promise.all([
          fetchDemand(),
          fetchSupply(),
        ]);

        const processedDemandData = processDemandData(demandRes.data.data);
        const processedSupplyData = processSupplyData(supplyRes.data.data);

        setDemandData(processedDemandData);
        setSupplyData(processedSupplyData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCombinedData();
  }, []);

  const processDemandData = (demandData) =>
    demandData
      .map((item) => ({
        hour: item.hour,
        ontario_demand: item.ontario_demand,
        market_demand: item.market_demand,
        date: item.date,
      }))
      .sort((a, b) => a.hour - b.hour);

  const processSupplyData = (supplyData) => {
    const hourlySupplyData = {};
    supplyData.forEach((item) => {
      if (item.measurement === 'Output' && item.value > 0) {
        const hour = item.hour;
        const fuel = item.fuel ? item.fuel.toLowerCase() : 'other';
        if (!hourlySupplyData[hour]) {
          hourlySupplyData[hour] = { hour: hour };
        }
        hourlySupplyData[hour][fuel] =
          (hourlySupplyData[hour][fuel] || 0) + item.value;
      }
    });
    return Object.values(hourlySupplyData).sort((a, b) => a.hour - b.hour);
  };

  const getFuelTypes = (data) => {
    const fuelTypes = new Set();
    data.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (key !== 'hour' && item[key] > 0) {
          fuelTypes.add(key);
        }
      });
    });
    return Array.from(fuelTypes);
  };

  const fuelColors = {
    hydro: '#0ea5e9',
    nuclear: '#10b981',
    wind: '#8b5cf6',
    solar: '#f59e0b',
    gas: '#ef4444',
    biofuel: '#06b6d4',
    other: '#6b7280',
  };

  if (loading) {
    return (
      <div className="chart-loading">
        <div className="loading-spinner"></div>
        <p>Loading demand and supply data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="chart-error">
        <p>⚠️ Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (!demandData || demandData.length === 0) {
    return (
      <div className="chart-error">
        <p>No data available</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  const fuelTypes = getFuelTypes(supplyData);

  return (
    <div className="chart-container">
      <h2 className="chart-title">Ontario Energy Data</h2>

      {/* Charts side by side */}
      <div className="charts-horizontal">
        {/* Demand Chart */}
        <div className="chart-section">
          <h3 className="chart-subtitle">📈 Electricity Demand (MW)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={demandData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="hour" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="ontario_demand"
                  stroke="#1f2937"
                  strokeWidth={3}
                  name="Ontario Demand"
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="chart-info">
              <div>Points: {demandData.length}</div>
              <div>Date: {demandData[0]?.date ? new Date(demandData[0].date).toDateString() : 'N/A'}</div>
            </div>
        </div>
       

        {/* Supply Chart */}
        <div className="chart-section">
          <h3 className="chart-subtitle">⚡ Supply by Fuel Type (MW)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={supplyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="hour" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Legend />
                {fuelTypes.map((fuel) => (
                  <Line
                    key={fuel}
                    type="monotone"
                    dataKey={fuel}
                    stroke={fuelColors[fuel] || fuelColors.other}
                    strokeWidth={2}
                    name={fuel.charAt(0).toUpperCase() + fuel.slice(1)}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
            <div className="chart-info">
              <div>Points: {supplyData.length}</div>
              <div>Fuels: {fuelTypes.join(', ')}</div>
            </div>
        </div>
      </div>
      
    </div>
  );
};

export default DemandSupplyChart;
