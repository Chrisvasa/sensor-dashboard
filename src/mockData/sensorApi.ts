import { mockSensors } from "./mockSensors";
import { SensorData } from "../types/SensorData";

export const fetchSensorData = async (sensorId:number): Promise<SensorData> =>{
    const sensor = mockSensors.find(s => s.id === sensorId);

    if(!sensor){
        throw new Error('Sensor not found');
    }
    return sensor;
};