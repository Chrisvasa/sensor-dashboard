import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sensor } from '../types/Sensor'
import { ThermometerIcon, CalendarIcon, ClockIcon } from "lucide-react"

export const SensorCard: React.FC<{ 
  sensor: Sensor; 
  selected: boolean; 
  onClick: () => void 
}> = ({ sensor, selected, onClick }) => {
  const latestMeasurement = sensor.measurements[sensor.measurements.length - 1]

  return (
    <Card 
      className={`transition-all duration-300 cursor-pointer h-full border-none bg-d-dark-300 shadow-mac ${
        selected 
          ? '' 
          : 'hover:shadow-clean'
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-medium truncate mr-2">{sensor.name}</h3>
            {selected && <Badge variant="default" className="text-xs rounded-s-full">Selected</Badge>}
          </div>
          <div className="bg-d-dark-400 bg-opacity-60 rounded-md p-1">
          {latestMeasurement ? (
            <div className="space-y-1 text-sm">
              <div className="flex items-center">
                <ThermometerIcon className="h-3 w-3 mr-1 text-muted-foreground" />
                <span className="font-medium">{latestMeasurement.temp}°C</span>
              </div>
              <div className="flex items-center">
                <CalendarIcon className="h-3 w-3 mr-1 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {new Date(latestMeasurement.measurementTime).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center">
                <ClockIcon className="h-3 w-3 mr-1 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {new Date(latestMeasurement.measurementTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">
              No measurements available
            </p>
          )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}