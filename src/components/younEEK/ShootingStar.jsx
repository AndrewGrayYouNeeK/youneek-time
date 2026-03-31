import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ShootingStar() {
  const [stars, setStars] = useState([]);
  const [lastHour, setLastHour] = useState(() => new Date().getHours());

  useEffect(() => {
    const checkHour = setInterval(() => {
      const currentHour = new Date().getHours();
      if (currentHour !== lastHour) {
        setLastHour(currentHour);
        triggerStar();
      }
    }, 1000);
    return () => clearInterval(checkHour);
  }, [lastHour]);

  const triggerStar = () => {
    const id = Date.now();
    // Randomize starting Y position between 5% and 30% of the screen height
    const startY = Math.random() * 25 + 5; 
    setStars(prev => [...prev, { id, top: `${startY}%` }]);
    
    // Remove the star after animation finishes
    setTimeout(() => {
      setStars(prev => prev.filter(s => s.id !== id));
    }, 2500);
  };

  // Expose to window for easy manual testing
  useEffect(() => {
    window.triggerShootingStar = triggerStar;
    return () => {
      delete window.triggerShootingStar;
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence>
        {stars.map(star => (
          <motion.div
            key={star.id}
            initial={{ opacity: 0, x: '-20vw', y: 0, rotate: 15 }}
            animate={{ opacity: [0, 1, 1, 0], x: '120vw', y: '30vh', rotate: 15 }}
            transition={{ duration: 1.5, ease: "easeIn" }}
            className="absolute h-[2px] w-[150px] sm:w-[250px] rounded-full"
            style={{ 
              top: star.top,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), white)',
              boxShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.4)',
              left: 0
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}