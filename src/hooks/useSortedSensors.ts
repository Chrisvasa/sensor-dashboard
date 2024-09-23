import { Sensor } from "../types/Sensor";
import { SortConfig } from "@/services/data";
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
      uptime: computeUptime(sensor),
      lastMeasurement: getLastMeasurement(sensor),
    }));
  }, [sensors]);

  const sortedSensors = useMemo(() => {
    let sortableSensors = [...sensorsWithComputedFields];
    if (sortConfig !== null) {
      sortableSensors.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue == null) return 1;
        if (bValue == null) return -1;

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

  const requestSort = (key: keyof Sensor | 'uptime' | 'lastMeasurement') => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return { sortedSensors, requestSort };
}

function computeUptime(sensor: Sensor): number {
  // Placeholder: Implement actual uptime calculation
  // For example, based on measurements frequency or status over time
  return sensor.status ? 99.9 : 95.0; // Example values
}

function getLastMeasurement(sensor: Sensor): number | null {
  const lastMeasurement = sensor.measurements[sensor.measurements.length - 1];
  return lastMeasurement ? lastMeasurement.temp : null;
}