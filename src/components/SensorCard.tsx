import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SensorData } from '../types/SensorData';

export const SensorCard: React.FC<{ sensor: SensorData }> = ({ sensor }) => (
  <Card className="mb-4">
    <CardHeader>
      <CardTitle>{sensor.name}</CardTitle>
    </CardHeader>
    <CardContent>
      <p>Temperature: {sensor.temperature}°C</p>
      <p>Date: {new Date(sensor.date).toLocaleString()}</p>
      <p>Location: {sensor.location}</p>
    </CardContent>
  </Card>
);