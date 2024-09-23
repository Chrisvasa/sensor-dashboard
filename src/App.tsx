// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from '@/components/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LandingPage from './pages/LandingPage';
import SensorPage from './pages/SensorPage';
import DashboardPage from './pages/DashboardPage';
import SensorDetail from './components/SensorDetail';
import { Dashboard } from './components/dashboardUI';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sensors" element={<SensorPage />} />
          <Route path="/devDashboard" element = {<Dashboard />}>
          <Route path="sensor/:sensorId" element={<SensorDetail />} />
            <Route
              path=""

            />
          </Route>
          
          {/* Nested routes under /dashboard */}
          <Route path="/dashboard/*" element={<Dashboard />}>
            <Route path="sensor/:sensorId" element={<SensorDetail />} />
            <Route
              path=""
              element={
                <div className="text-slate-50">
                  Please select a sensor to view details
                </div>
              }
            />
          </Route>
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
