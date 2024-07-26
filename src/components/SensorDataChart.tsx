// src/components/SensorDataChart.tsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

interface SensorDataChartProps {
  data: { name: string; value: number }[];
  dataKey: string;
  title: string;
}

const SensorDataChart: React.FC<SensorDataChartProps> = ({ data, dataKey, title }) => {
  return (
    <div>
      <h3>{title}</h3>
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={dataKey} fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default SensorDataChart;
