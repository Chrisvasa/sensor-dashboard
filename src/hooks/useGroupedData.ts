import { useMemo } from "react";
import { SensorData } from "@/services/data";
import { DateRange } from "react-day-picker";
import { differenceInDays, format, parse, startOfMonth } from "date-fns";

// Groups the filtered data by month or keeps it as is, depending on the date range.
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