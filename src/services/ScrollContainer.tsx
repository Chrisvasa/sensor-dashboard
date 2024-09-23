import { useEffect } from 'react';
import LandingPage from '../pages/LandingPage';
import SensorStatuspage from '../pages/SensorStatusPage';
import DashboardPage from '../components/dashboardUI'
import AboutUs from '../pages/AboutUsPage'

// PROBABLY MOVE THIS INTO ANOTHER FOLDER???

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
      <div className="section" style={{ height: 'auto' }}>
        <SensorStatuspage />
      </div>
      <div className="section" style={{ height: 'auto' }}>
        <DashboardPage />
      </div>
      <div className ="section" style={{ height: '100vh'}}>
        <AboutUs />
      </div>
    </div>
  );
};

export default ScrollContainer;
