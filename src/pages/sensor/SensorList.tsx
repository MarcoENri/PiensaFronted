// src/pages/sensor/SensorList.tsx
import React from "react";
import { Table, Space, Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { useList } from "@refinedev/core";

interface Sensor {
  id: number;
  named: string;
  types: string;
}

export const SensorList: React.FC = () => {
  const { data, isLoading } = useList<Sensor>({ resource: "sensors" });
  const navigate = useNavigate();

  const handleViewSensorData = (id: number) => {
    navigate(`/sensors/${id}`);
  };

  return (
    <Card title="Sensors">
      <Table dataSource={data?.data} loading={isLoading} rowKey="id">
        <Table.Column title="ID" dataIndex="id" />
        <Table.Column title="Name" dataIndex="named" />
        <Table.Column title="Type" dataIndex="types" />
        <Table.Column
          title="Actions"
          render={(text, record: Sensor) => (
            <Space>
              <Button onClick={() => handleViewSensorData(record.id)}>View Data</Button>
            </Space>
          )}
        />
      </Table>
    </Card>
  );
};
