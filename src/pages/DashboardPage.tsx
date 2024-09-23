// DashboardPage.tsx
import { Link, Outlet } from 'react-router-dom';
import { mockSensors } from '../mockData/mockSensors';
import { SensorCard } from '../components/SensorCard';

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen flex">
      <div className="w-1/4 p-4 text-slate-50">
        <h1 className="text-xl font-bold text-slate-50 mb-4">Sensors</h1>
        {mockSensors.map((sensor) => (
          <Link key={sensor.id} to={`sensor/${sensor.id}`}>
            <SensorCard sensor={sensor} />
          </Link>
        ))}
      </div>
      <div className="w-3/4 p-4 bg-gray-800 text-white">
        {/* Render nested routes here */}
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardPage;
