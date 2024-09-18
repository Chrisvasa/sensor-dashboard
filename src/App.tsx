import { useEffect, useState } from 'react';
import { SensorData } from './types/SensorData';
import { SensorCard } from './components/SensorCard';
import { mockSensors } from './mockData/mockSensors';

const App = () => {
  const [sensors, setSensors] = useState<SensorData[]>([]);

  useEffect(() => {
    // Simulate data fetching with a delay
    setTimeout(() => {
      setSensors(mockSensors);
    }, 500); // 500ms delay to mimic API call
  }, []);

  return (
    <div className="container mx-auto p-4">
      {sensors.map((sensor) => (
        <SensorCard key={sensor.id} sensor={sensor} />
      ))}
    </div>
  );
};

export default App;
