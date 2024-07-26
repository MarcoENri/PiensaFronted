// src/pages/sensor-data/SensorDataShow.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Typography } from "antd";
import { getSensorDataById } from "../categories/AxiosConfig";
import SensorDataChart from "../../components/SensorDataChart";

const { Title } = Typography;

interface RouteParams {
  id: string;
}

const SensorDataShow: React.FC = () => {
  const params = useParams<{ id: string }>();
  const [sensorData, setSensorData] = useState<any>({});

  useEffect(() => {
    const fetchSensorData = async (id: string) => {
      try {
        const response = await getSensorDataById(Number(id));
        setSensorData(response.data);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    if (params.id) {
      fetchSensorData(params.id);
    }
  }, [params.id]);

  if (!params.id) {
    return <div>No ID parameter provided</div>;
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

export default SensorDataShow;
