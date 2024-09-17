// src/mockData/mockSensors.ts
import { SensorData } from '../types/SensorData';

export const mockSensors: SensorData[] = [
  {
    id: 1,
    name: 'Sensor A',
    temperature: 22.5,
    date: '2023-10-01T10:30:00Z',
    location: 'Building A',
  },
  {
    id: 2,
    name: 'Sensor B',
    temperature: 23.1,
    date: '2023-10-01T11:00:00Z',
    location: 'Building B',
  },
  // Add more mock data as needed
];
