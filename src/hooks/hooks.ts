import { useMemo } from "react";
import { differenceInDays, format, parse, startOfMonth } from "date-fns";
import { SensorData } from "@/types/SensorData";
import { DateRange } from "react-day-picker";
import { Sensor, SortConfig } from "@/services/data";

export function useFilteredData(sensorData: Array<SensorData>, dateRange: DateRange | undefined) {
  return useMemo(() => {
    return sensorData.filter(
      (entry) =>
        dateRange?.from &&
        dateRange?.to &&
        new Date(entry.date) >= dateRange.from &&
        new Date(entry.date) <= dateRange.to
    );
  }, [sensorData, dateRange]);
}

export function useGroupedData(filteredData: Array<SensorData>, dateRange: DateRange | undefined) {
  return useMemo(() => {
    const isShortDateRange =
      dateRange?.from && dateRange?.to && differenceInDays(dateRange.to, dateRange.from) <= 90;

    if (isShortDateRange) {
      return filteredData;
    } else {
      const grouped = filteredData.reduce((acc, curr) => {
        const date = startOfMonth(parse(curr.date, "yyyy-MM-dd", new Date()));
        const key = format(date, "yyyy-MM");
        if (!acc[key]) {
          acc[key] = { date: key, totalMeasurements: 0 };
        }
        acc[key].totalMeasurements += curr.totalMeasurements;
        return acc;
      }, {} as Record<string, { date: string; totalMeasurements: number }>);
      return Object.values(grouped);
    }
  }, [filteredData, dateRange]);
}

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
