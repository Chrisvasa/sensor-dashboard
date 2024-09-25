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
      className={`transition-all duration-300 cursor-pointer h-full border-none bg-dark-300 ${
        selected 
          ? 'shadow-custom' 
          : 'hover:shadow-clean'
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4 shadow-clean">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-medium truncate mr-2">{sensor.name}</h3>
            {selected && <Badge variant="default" className="text-xs rounded-s-full text-primary-300">Selected</Badge>}
          </div>
          <div className="bg-dark-400 bg-opacity-60 rounded-b-lg border-primary-100 border-solid border-t-2 p-1">
          {latestMeasurement ? (
            <div className="space-y-1 text-sm">
              <div className="flex items-center">
                <ThermometerIcon className="h-3 w-3 mr-1 text-muted-foreground" />
                <span className="font-medium text-title">{latestMeasurement.temp}°C</span>
              </div>
              <div className="flex items-center">
                <CalendarIcon className="h-3 w-3 mr-1 text-muted-foreground" />
                <span className="text-xs text-title">
                  {new Date(latestMeasurement.measurementTime).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center">
                <ClockIcon className="h-3 w-3 mr-1 text-muted-foreground" />
                <span className="text-xs text-title">
                  {new Date(latestMeasurement.measurementTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-title">
              No measurements available
            </p>
          )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}