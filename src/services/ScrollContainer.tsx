import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = lazy(() => import('../pages/LandingPage'));
const SensorStatuspage = lazy(() => import('../pages/SensorStatusPage'));
const DashboardPage = lazy(() => import('../components/dashboardUI'));
const AboutUs = lazy(() => import('../pages/AboutUsPage'));

const ScrollContainer: React.FC = () => {
  const sectionsRef = useRef<Array<HTMLDivElement | null>>([]);
  const [currentSection, setCurrentSection] = useState<number>(0);
  const navigate = useNavigate();

  const scrollToSection = (index: number) => {
    const section = sectionsRef.current[index];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setCurrentSection(index);
      updateURL(index);
    }
  };

  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = entry.target.getAttribute('data-index');
          if (index) {
            const sectionIndex = Number(index);
            setCurrentSection(sectionIndex);
            updateURL(sectionIndex);
          }
        }
      });
    }, options);

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const updateURL = (index: number) => {
    const paths = ['/', '/sensor-status', '/dashboard', '/about'];
    navigate(paths[index], { replace: true });
  };

  return (
    <div>
      <div
        className="section"
        data-index="0"
        ref={(el) => (sectionsRef.current[0] = el)}
        style={{ height: '100vh' }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <LandingPage scrollToSection={scrollToSection} />
        </Suspense>
      </div>
      <div
        className="section"
        data-index="1"
        ref={(el) => (sectionsRef.current[1] = el)}
        style={{ height: 'auto' }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <SensorStatuspage />
        </Suspense>
      </div>
      <div
        className="section"
        data-index="2"
        ref={(el) => (sectionsRef.current[2] = el)}
        style={{ height: 'auto' }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <DashboardPage />
        </Suspense>
      </div>
      <div
        className="section"
        data-index="3"
        ref={(el) => (sectionsRef.current[3] = el)}
        style={{ height: '100vh' }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <AboutUs />
        </Suspense>
      </div>
      <div>Current Section: {currentSection}</div>
    </div>
  );
};

export default ScrollContainer;
