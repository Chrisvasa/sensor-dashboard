import { mockSensors } from "../mockData/mockSensors";
import { SensorCard } from "@/components/SensorCard";
const SensorsPage = () => {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-50">
            {mockSensors.map((sensor) => (
            <SensorCard sensor={sensor}/>
        ))}
        </div>
    )
  };
  
export default SensorsPage;