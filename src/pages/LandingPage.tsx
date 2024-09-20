import { ArrowDown } from 'lucide-react';
import { Button } from '../components/ui/button'

const LandingPage = () => {
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative h-screen w-full bg-transparent bg-gradient-to-b from-zinc-950 to-black max-h-[100vh] shadow-custom" >
      <div className="absolute inset-0 flex items-center justify-center text-slate-50 pl-32">
        <div className="relative flex-1 flex items-center justify-center">
          <img 
            src="src/assets/esp32.png" 
            alt="ESP32-Board" 
            className="w-9/12 h-auto absolute left-1/2 transform -translate-x-3/4 z-10"
          />
          <img 
            src="src/assets/arduino.png" 
            alt="Arduino-Board" 
            className="w-4/6 h-auto absolute left-1/2 transform -translate-x-1/4"
          />
        </div>
        
        <div className="flex-1 flex flex-col items-start justify-center p-8">
          <h1 className="text-5xl font-bold mb-4 hover:text-slate-200">Welcome to<br/> Sensor Chadboard</h1>
          <p className="text-xl mb-8 bg-gradient-to-r from-neutral-300 to-stone-400 bg-clip-text text-transparent">Monitor and analyze sensor data in real-time.</p>
          <Button variant="outline" className='hover:bg-zinc-900'>Dashboard</Button>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer text-slate-50" onClick={handleScroll}>
        <ArrowDown size={48} />
      </div>
    </div>
  );
};

export default LandingPage;