import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

type DateRangePickerProps = {
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
};

export function DateRangePicker({ dateRange, setDateRange }: DateRangePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild className="bg-dark-300 rounded hover:bg-dark-400 border-none shadow-mac">
        <Button
          id="date"
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left text-main font-normal",
            !dateRange && "text-title"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateRange?.from ? (
            dateRange.to ? (
              <>
                {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
              </>
            ) : (
              format(dateRange.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-dark-400" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={setDateRange}
          numberOfMonths={2}
          className="bg-dark-300 text-title"
        />
      </PopoverContent>
    </Popover>
  );
}
