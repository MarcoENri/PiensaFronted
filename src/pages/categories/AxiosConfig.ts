import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8081", 
  headers: {
    "Content-Type": "application/json",
  },
});

interface SensorData {
  id?: number;
  temperature: number;
  humidity: number;
  soilMoisture: number;
  colorValue: string;
}

export const getSensorData = () => apiClient.get<SensorData[]>("/sensor-data");
export const getSensorDataById = (id: number) => apiClient.get<SensorData>(`/sensor-data/${id}`);
export const createSensorData = (data: SensorData) => apiClient.post("/sensor-data", data);
export const updateSensorData = (id: number, data: Partial<SensorData>) =>
  apiClient.put(`/sensor-data/${id}`, data);
export const deleteSensorData = (id: number) => apiClient.delete(`/sensor-data/${id}`);

export default apiClient;
