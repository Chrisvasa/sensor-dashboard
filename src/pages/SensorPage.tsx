import { mockSensors } from "../mockData/mockSensors";
import { SensorCard } from "@/components/SensorCard";
const SensorsPage = () => {
    return (
        <div className="inset-0 flex flex-col items-center justify-center text-slate-50 bg-black">
            <h1 className="bg-gradient-to-r from-teal-200 to-teal-500 bg-clip-text text-transparent">BIG TEST PAGE</h1>
            {mockSensors.map((sensor) => (
            <SensorCard key={sensor.id} sensor={sensor}/>
        ))}
        </div>
    )
  };
  
export default SensorsPage;