import { useMemo } from "react";
import { differenceInDays, format, parse } from "date-fns";
import { DateRange } from "react-day-picker";
import { Measurement } from "@/types/SensorTypes";

type GroupedDataEntry = {
  date: string;
  totalMeasurements: number;
};

export function useGroupedData(
  filteredMeasurements: Measurement[],
  dateRange: DateRange | undefined
): GroupedDataEntry[] {
  return useMemo(() => {
    if (!filteredMeasurements.length) return [];

    const isShortDateRange =
      dateRange?.from && dateRange?.to && differenceInDays(dateRange.to, dateRange.from) <= 90;

    const groupingFormat = isShortDateRange ? "yyyy-MM-dd" : "yyyy-MM";

    // Group measurements by date
    const grouped = filteredMeasurements.reduce((acc, curr) => {
      const dateKey = format(new Date(curr.measurementTime), groupingFormat);
      if (!acc[dateKey]) {
        acc[dateKey] = { date: dateKey, totalMeasurements: 0 };
      }
      acc[dateKey].totalMeasurements += 1;
      return acc;
    }, {} as Record<string, GroupedDataEntry>);

    const groupedArray = Object.values(grouped);

    groupedArray.sort((a, b) => {
      const dateA = parse(a.date, groupingFormat, new Date());
      const dateB = parse(b.date, groupingFormat, new Date());
      return dateA.getTime() - dateB.getTime();
    });

    return groupedArray;
  }, [filteredMeasurements, dateRange]);
}
