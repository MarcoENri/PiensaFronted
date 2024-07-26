import React, { useEffect, useState } from "react";
import { DeleteButton, EditButton, List, ShowButton, useTable } from "@refinedev/antd";
import { Space, Table } from "antd";
import { deleteSensorData, getSensorData } from "../categories/AxiosConfig";

interface SensorData {
  id?: number;
  temperature: number;
  humidity: number;
  soilMoisture: number;
  colorValue: string;
}

export const SensorDataList: React.FC = () => {
  const { tableProps } = useTable({
    resource: "sensor-data",
    syncWithLocation: true,
  });

  const [sensorData, setSensorData] = useState<SensorData[]>([]);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await getSensorData();
        setSensorData(response.data);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };
    fetchSensorData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteSensorData(id);
      console.log("Sensor data deleted successfully!");
      setSensorData(sensorData.filter(data => data.id !== id));
    } catch (error) {
      console.error("Error deleting sensor data:", error);
    }
  };

  return (
    <List>
      <Table {...tableProps} dataSource={sensorData} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="temperature" title="Temperature" />
        <Table.Column dataIndex="humidity" title="Humidity" />
        <Table.Column dataIndex="soilMoisture" title="Soil Moisture" />
        <Table.Column dataIndex="colorValue" title="Color Value" />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: SensorData) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton
                hideText
                size="small"
                recordItemId={record.id}
                onClick={() => handleDelete(record.id || 0)}
              />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
