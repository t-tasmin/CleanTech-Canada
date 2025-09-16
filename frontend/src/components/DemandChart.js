import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { fetchDemand } from '../services/api';

const DemandChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchDemand()
      .then((res) => {
        console.log('API Response:', res.data.data);
        // Access the nested data array
        setData(res.data.data); // Note: res.data.data
      })
      .catch((err) => console.error(err));
  }, []);

  
  return (
    <div style={{ width: '100%', height: 500 }}>
      <h2>Ontario vs Market Demand by Hour</h2>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="hour" 
            label={{ value: 'Hour', position: 'insideBottom', offset: -10 }}
          />
          <YAxis 
            label={{ value: 'Demand (MW)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            formatter={(value, name) => [
              `${value.toLocaleString()} MW`, 
              name
            ]}
            labelFormatter={(label) => `Hour: ${label}`}
          />
          <Legend />
          
          {/* Ontario Demand Line */}
          <Line 
            type="monotone" 
            dataKey="ontario_demand" 
            stroke="#2563eb" 
            strokeWidth={3}
            name="Ontario Demand"
            dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
          />
          
          {/* Market Demand Line */}
          <Line 
            type="monotone" 
            dataKey="market_demand" 
            stroke="#dc2626" 
            strokeWidth={3}
            name="Market Demand"
            dot={{ fill: '#dc2626', strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
      
      {/* Debug info */}
      <div style={{ marginTop: 20, fontSize: '12px', color: '#666' }}>
        Data points: {data.length} | Date: {data[0]?.date ? new Date(data[0].date).toDateString() : 'N/A'}
      </div>
    </div>
  );
};

export default DemandChart;