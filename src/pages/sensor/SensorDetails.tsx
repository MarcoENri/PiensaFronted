// src/pages/sensor-data/SensorDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Typography } from "antd";
import axios from "axios";
import SensorDataChart from "../../components/SensorDataChart";

const { Title } = Typography;

interface SensorData {
  id: number;
  temperature: number;
  humidity: number;
  soilMoisture: number;
  colorValue: string;
}

export const SensorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [sensorData, setSensorData] = useState<SensorData | null>(null);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/sensor-data/${id}`);
        setSensorData(response.data);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    if (id) {
      fetchSensorData();
    }
  }, [id]);

  if (!sensorData) {
    return <div>Loading...</div>;
  }

  // Data for the chart
  const chartData = [
    { name: 'Temperature', value: sensorData.temperature },
    { name: 'Humidity', value: sensorData.humidity },
    { name: 'Soil Moisture', value: sensorData.soilMoisture },
    { name: 'Color Value', value: parseInt(sensorData.colorValue, 10) || 0 }, // assuming colorValue can be converted to a number
  ];

  return (
    <Card title={`Sensor Data ID: ${sensorData.id}`}>
      <Title level={5}>Temperature: {sensorData.temperature}</Title>
      <Title level={5}>Humidity: {sensorData.humidity}</Title>
      <Title level={5}>Soil Moisture: {sensorData.soilMoisture}</Title>
      <Title level={5}>Color Value: {sensorData.colorValue}</Title>
      <SensorDataChart data={chartData} dataKey="value" title="Sensor Data Overview" />
    </Card>
  );
};
