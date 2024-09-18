import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from '@/components/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LandingPage from './pages/LandingPage';
import SensorPage from './pages/SensorPage';

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
    <QueryClientProvider client={queryClient} />
      <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sensors" element={<SensorPage />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;