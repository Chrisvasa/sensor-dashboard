import { BrowserRouter } from 'react-router-dom';
import { Header } from '@/components/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ScrollContainer from './services/ScrollContainer'; // Import the new container

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
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <ScrollContainer />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
