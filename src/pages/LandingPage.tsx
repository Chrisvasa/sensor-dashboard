import { useEffect, useState } from 'react'
import { ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom';


interface LandingPageProps {
  scrollToSection: (index: number) => void;
}
export default function LandingPage({scrollToSection}: LandingPageProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    })
  }

  return (
    <div className="relative min-h-screen w-full">
      <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center text-main p-4 md:p-8">
        {!isMobile && (
          <div className="relative w-1/2 h-full">
            <img 
              src="/src/assets/esp32.png" 
              alt="ESP32-Board" 
              className="absolute left-1/2 top-1/2 transform -translate-x-3/4 -translate-y-1/2 w-9/12 h-auto z-10 object-contain"
            />
            <img 
              src="/src/assets/arduino.png" 
              alt="Arduino-Board" 
              className="absolute left-1/2 top-1/2 transform -translate-x-1/4 -translate-y-1/2 w-4/6 h-auto object-contain"
            />
          </div>
        )}
        
        <div className={`w-full ${!isMobile ? 'md:w-1/2' : ''} flex flex-col items-center ${!isMobile ? 'md:items-start' : ''} justify-center p-4 md:p-8 text-center ${!isMobile ? 'md:text-left' : ''}`}>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 cursor-default">
            Welcome to<br/> Sensor Chadboard
          </h1>
          <p className="text-lg md:text-xl mb-8 bg-gradient-to-r from-neutral-300 to-stone-400 bg-clip-text text-transparent cursor-default">
            Monitor and analyze sensor data in real-time.
          </p>
          <Link to="/dashboard">
            <Button variant="outline" className='bg-primary-300 hover:bg-primary-400 cursor-pointer text-black shadow-clean border-none'
            onClick={() => scrollToSection(2)}>Dashboard</Button>
          </Link>
        </div>
      </div>
      
      {!isMobile && (
        <div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer text-primary-100" 
          onClick={handleScroll}
          aria-hidden="true"
        >
          <ArrowDown size={48} />
        </div>
      )}
    </div>
  )
}