import { ArrowDown } from 'lucide-react';

const LandingPage = () => {
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative h-screen w-full ">
      <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-50">
        <h1 className="text-5xl font-bold mb-4 hover:text-slate-300">Welcome to the Sensor Dashboard</h1>
        <p className="text-xl mb-8">Monitor and analyze sensor data in real-time.</p>
        <div className="absolute bottom-10 animate-bounce cursor-pointer" onClick={handleScroll}>
          <ArrowDown size={48} />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
