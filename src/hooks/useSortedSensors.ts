import { Sensor } from "../types/Sensor";
import { SortConfig } from "../services/data";
import { useMemo } from "react";

// Manages sorting logic for sensor data, including sort configuration state.
export function useSortedSensors(
  sensors: Sensor[],
  sortConfig: SortConfig,
  setSortConfig: React.Dispatch<React.SetStateAction<SortConfig>>
) {
  const sensorsWithComputedFields = useMemo(() => {
    return sensors.map((sensor) => ({
      ...sensor,
      lastMeasurement: getLastMeasurement(sensor),
    }));
  }, [sensors]);

  const sortedSensors = useMemo(() => {
    let sortableSensors = [...sensorsWithComputedFields];
    if (sortConfig !== null) {
      sortableSensors.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
  
        if (aValue == null && bValue == null) return 0; // Both null, no sorting needed
        if (aValue == null) return sortConfig.direction === 'asc' ? -1 : 1;
        if (bValue == null) return sortConfig.direction === 'asc' ? 1 : -1;
  
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableSensors;
  }, [sensorsWithComputedFields, sortConfig]);
  

  const requestSort = (key: keyof Sensor | 'lastMeasurement') => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return { sortedSensors, requestSort };
}

function getLastMeasurement(sensor: Sensor): number | null {
  const lastMeasurement = sensor.measurements[sensor.measurements.length - 1];
  return lastMeasurement ? lastMeasurement.temp : null;
}