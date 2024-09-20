import { Sensor, SortConfig } from "@/services/data";
import { useMemo } from "react";

// Manages sorting logic for sensor data, including sort configuration state.
export function useSortedSensors(
    sensors: Array<Sensor>,
    sortConfig: SortConfig,
    setSortConfig: React.Dispatch<React.SetStateAction<SortConfig>>
  ) {
    const sortedSensors = useMemo(() => {
      let sortableSensors = [...sensors];
      if (sortConfig !== null) {
        sortableSensors.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "asc" ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "asc" ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableSensors;
    }, [sensors, sortConfig]);
  
    const requestSort = (key: keyof Sensor) => {
      let direction: "asc" | "desc" = "asc";
      if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
        direction = "desc";
      }
      setSortConfig({ key, direction });
    };
  
    return { sortedSensors, requestSort };
  }