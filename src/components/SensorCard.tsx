import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sensor } from '../types/Sensor';

export const SensorCard: React.FC<{ sensor: Sensor; selected: boolean }> = ({ sensor, selected }) => {
  // Assuming you want to display the most recent measurement
  const latestMeasurement = sensor.measurements.length > 0 ? sensor.measurements[0] : null;

  return (
    <Card
      className={`mb-4 transition-transform transform ${selected ? 'scale-105 border border-blue-500 shadow-lg' : 'hover:scale-105 hover:shadow-md'}`}
    >
      <CardHeader>
        <CardTitle className={`text-lg font-medium ${selected ? 'text-blue-600' : 'text-gray-300'}`}>
          {sensor.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {latestMeasurement ? (
          <>
            <p className={`text-sm ${selected ? 'text-blue-600' : 'text-gray-300'}`}>
              Temperature: {latestMeasurement.temp}°C
            </p>
            <p className={`text-sm ${selected ? 'text-blue-600' : 'text-gray-300'}`}>
              Date: {new Date(latestMeasurement.measurementTime).toLocaleString().split(' ')[0]}
            </p>
            <p className={`text-sm ${selected ? 'text-blue-400' : 'text-gray-300'}`}>
            Time: {new Date(latestMeasurement.measurementTime).toLocaleString().split(' ')[1]}
            </p>
          </>
        ) : (
          <p className={`text-sm ${selected ? 'text-blue-600' : 'text-gray-300'}`}>
            No measurements available
          </p>
        )}
      </CardContent>
    </Card>
  );
};
