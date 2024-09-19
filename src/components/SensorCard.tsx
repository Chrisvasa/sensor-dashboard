import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SensorData } from '../types/SensorData';

export const SensorCard: React.FC<{ sensor: SensorData; selected: boolean }> = ({ sensor, selected }) => (
  <Card 
  className={`mb-4 transition-transform transform ${selected ? 'scale-105 border border-blue-500 shadow-lg' : 'hover:scale-105 hover:shadow-md'}`}
>

    <CardHeader>
      <CardTitle className={`text-lg font-medium ${selected ? 'text-blue-600' : 'text-gray-300'}`}>{sensor.name}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className={`text-sm ${selected ? 'text-blue-600' : 'text-gray-300'}`}>Temperature: {sensor.temperature}°C</p>
      <p className={`text-sm ${selected ? 'text-blue-600' : 'text-gray-300'}`}>Date: {new Date(sensor.date).toLocaleString()}</p>
      <p className={`text-sm ${selected ? 'text-blue-600' : 'text-gray-300'}`}>Location: {sensor.location}</p>
    </CardContent>
  </Card>
);