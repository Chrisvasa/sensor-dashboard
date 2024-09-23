import { useQuery } from '@tanstack/react-query';
import { fetchSensorData } from '../mockData/sensorApi';

export const useSensorData = (sensorId: number | null) => {
  return useQuery({
    queryKey: ['sensor', sensorId],
    queryFn: () => fetchSensorData(sensorId!),
    enabled: !!sensorId, // Only enable the query if sensorId is provided
  });
};
