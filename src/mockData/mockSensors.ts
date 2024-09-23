import { SensorData } from '../types/SensorData';

export const mockSensors: SensorData[] = [
  {
    totalMeasurements: 100,
    id: 1,
    name: 'Sensor A',
    temperature: 22.5,
    date: '2023-10-01T10:30:00Z',
    location: 'Building A',
    chartData: [
      { month: "January", temperature: 100},
      { month: "February", temperature: 200},
    ]
  },
  {
    totalMeasurements: 100,
    id: 2,
    name: 'Sensor B',
    temperature: 30.1,
    date: '2023-10-01T11:00:00Z',
    location: 'Building B',
    chartData: [
      { month: "January", temperature: 80},
      { month: "February", temperature: 110},
    ],
  },
  {
    totalMeasurements: 100,
    id: 3,
    name: 'Sensor C',
    temperature: 14.1,
    date: '2023-11-01T11:00:00Z',
    location: 'Building A',
    chartData: [
      { month: "January", temperature: 80 },
      { month: "February", temperature: 110 },
    ],
  },
  {
    totalMeasurements: 100,
    id: 4,
    name: 'Sensor D',
    temperature: 24.5,
    date: '2023-05-01T11:00:00Z',
    location: 'Building C',
    chartData: [
      { month: "January", temperature: 80},
      { month: "February", temperature: 110},
      { month: "March", temperature: 70},
      { month: "April", temperature: 150},
      { month: "May", temperature: 15},
      { month: "June", temperature: 250},
      { month: "July", temperature: 123 },
      {month: "August", temperature: 140},
      {month: "September", temperature: 70},
      {month: "October", temperature: 110},
      {month: "November", temperature: 100},
      {month: "December", temperature: 90},
    ],
  },
  {
    totalMeasurements: 100,
    id: 5,
    name: 'Sensor E',
    temperature: 17.7,
    date: '2023-08-01T11:00:00Z',
    location: 'Building B',
    chartData: [
      { month: "January", temperature: 80 },
      { month: "February", temperature: 110},
    ],
  },
];
