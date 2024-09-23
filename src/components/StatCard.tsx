import { format } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DateRange } from "react-day-picker";

type StatCard = {
  totalMeasurements: number;
  averageMeasurementsPerDay: number;
  dateRange: DateRange | undefined;
};

export function StatCard({ totalMeasurements, averageMeasurementsPerDay, dateRange }: StatCard) {
  return (
    <Card className="bg-gray-700">
      <CardHeader>
        <CardTitle>Statistics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Total Measurements:</p>
          <p className="text-2xl font-bold text-primary">{totalMeasurements.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Average Measurements/Day:</p>
          <p className="text-2xl font-bold text-primary">{Math.round(averageMeasurementsPerDay).toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Date Range:</p>
          <p className="text-lg font-semibold">
            {dateRange?.from && dateRange?.to
              ? `${format(dateRange.from, "MMM d, yyyy")} - ${format(dateRange.to, "MMM d, yyyy")}`
              : "All Time"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
