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
    temperature: 30.1,
    date: '2023-10-01T11:00:00Z',
    location: 'Building B',
  },
  {
    id: 3,
    name: 'Sensor C',
    temperature: 14.1,
    date: '2023-11-01T11:00:00Z',
    location: 'Building A',
  },
  {
    id: 4,
    name: 'Sensor D',
    temperature: 24.5,
    date: '2023-05-01T11:00:00Z',
    location: 'Building C',
  },
  {
    id: 5,
    name: 'Sensor E',
    temperature: 17.7,
    date: '2023-08-01T11:00:00Z',
    location: 'Building B',
  },
  // Add more mock data as needed
];
