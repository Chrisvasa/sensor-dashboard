// ScrollContainer.tsx
import { useEffect } from 'react';
import LandingPage from '../pages/LandingPage';
import SensorPage from '../pages/SensorPage';
import StatPage from '../pages/StatPage';

const scrollToSection = (sectionIndex: number) => {
    const section = document.querySelectorAll('.section')[sectionIndex];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  

const ScrollContainer = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Implement lazy loading or trigger animations based on scrollPosition
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="section" style={{ height: '100vh' }}>
        <LandingPage />
      </div>
      <div className="section" style={{ height: '100vh' }}>
        <StatPage />
      </div>
      <div className="section" style={{ height: '100vh' }}>
        <SensorPage />
      </div>
    </div>
  );
};

export default ScrollContainer;
