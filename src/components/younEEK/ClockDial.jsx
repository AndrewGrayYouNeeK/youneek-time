import { motion } from 'framer-motion';

export default function ClockDial({ time }) {
  return (
    <motion.div
      animate={{ scale: [1, 1.01, 1.018, 1.008, 1] }}
      transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      className="relative mx-auto w-full max-w-[32rem] aspect-square"
    >
      <style>{`
        .clock {
          position: relative;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          border: 2px solid #00ff00;
          background: #050505;
          box-shadow: 0 0 30px rgba(0, 255, 0, 0.15), inset 0 0 30px rgba(0, 0, 0, 0.8);
          margin: 0 auto;
          overflow: hidden;
        }

        .clock::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 255, 0, 0.03) 0px,
            rgba(0, 255, 0, 0.03) 1px,
            transparent 1px,
            transparent 2px
          );
          pointer-events: none;
          border-radius: 50%;
        }

        .clock-center {
          position: absolute;
          inset: 0;
        }

        .tick {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 2px;
          height: 8px;
          background: #003300;
          transform-origin: center 150px;
          margin-left: -1px;
          margin-top: -150px;
          transition: all 0.3s ease;
        }

        .tick.major {
          background: #00ff00;
          box-shadow: 0 0 8px rgba(0, 255, 0, 0.4);
        }

        .tick:hover {
          background: #00ff00;
          box-shadow: 0 0 12px rgba(0, 255, 0, 0.8), 0 0 20px rgba(0, 255, 0, 0.5);
        }

        .hands-container {
          position: absolute;
          inset: 0;
        }

        .hand {
          position: absolute;
          left: 50%;
          top: 50%;
          transform-origin: center center;
        }

        .hand.green-hand {
          width: 2px;
          height: 120px;
          background: #00ff00;
          margin-left: -1px;
          margin-top: -120px;
          box-shadow: 0 0 8px rgba(0, 255, 0, 0.6), 0 0 16px rgba(0, 255, 0, 0.3);
        }

        .hand.red-hand {
          width: 2px;
          height: 80px;
          background: #ff0033;
          margin-left: -1px;
          margin-top: -80px;
          box-shadow: 0 0 6px rgba(255, 0, 51, 0.5), 0 0 12px rgba(255, 0, 51, 0.2);
          z-index: 10;
        }

        .hub {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 8px;
          height: 8px;
          background: #00ff00;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 8px rgba(0, 255, 0, 0.8), inset 0 0 4px rgba(0, 0, 0, 0.5);
          z-index: 20;
        }
      `}</style>

      <div className="clock">
        <div className="clock-center">
          {/* Generate 100 ticks for all 100 units */}
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={`tick-${i}`}
              className={`tick ${i % 5 === 0 ? 'major' : ''}`}
              style={{ transform: `rotate(${(i / 100) * 360}deg)` }}
            />
          ))}

          <div className="hands-container">
            <div
              className="hand green-hand"
              style={{ transform: `rotate(${time.unitRotation}deg)` }}
            />
            <div
              className="hand red-hand"
              style={{ transform: `rotate(${time.minuteRotation}deg)` }}
            />
          </div>

          <div className="hub" />
        </div>
      </div>
    </motion.div>
  );
}