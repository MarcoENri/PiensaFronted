// src/pages/sensor/SensorDataList.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Space, Button, Card } from "antd";
import axios from "axios";
import SensorDataChart from "../../components/SensorDataChart";

interface SensorData {
  id: number;
  sensorId: number;
  value: number;
  timestamp: string;
}

export const SensorDataList: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/sensor-data?sensorId=${id}`);
        setSensorData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    if (id) {
      fetchSensorData();
    }
  }, [id]);

  // Data for the chart
  const chartData = sensorData.map(data => ({
    name: data.timestamp,
    value: data.value,
  }));

  return (
    <Card title={`Sensor Data for Sensor ID: ${id}`}>
      <Table dataSource={sensorData} loading={isLoading} rowKey="id">
        <Table.Column title="ID" dataIndex="id" />
        <Table.Column title="Value" dataIndex="value" />
        <Table.Column title="Timestamp" dataIndex="timestamp" />
      </Table>
      <SensorDataChart data={chartData} dataKey="value" title="Sensor Data Overview" />
    </Card>
  );
};
