import { motion } from 'framer-motion';
import ClockTicks from './ClockTicks';

export default function ClockDial({ progress, display, compact = false }) {
  const wrapperClass = compact
    ? 'relative w-40 sm:w-44 aspect-square'
    : 'relative w-[84vw] max-w-[30rem] aspect-square';

  const handClass = compact
    ? 'absolute left-1/2 top-[21%] h-[29%] w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-cyan-200 via-white to-transparent shadow-[0_0_18px_rgba(186,230,253,0.95)]'
    : 'absolute left-1/2 top-[14%] h-[38%] w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-cyan-200 via-white to-transparent shadow-[0_0_20px_rgba(186,230,253,0.95)]';

  const centerGlowClass = compact
    ? 'absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-100/80 blur-[2px]'
    : 'absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-100/80 blur-[2px]';

  return (
    <motion.div
      animate={{ scale: compact ? [1, 1.02, 1] : [1, 1.035, 1] }}
      transition={{ duration: compact ? 4.2 : 5.4, repeat: Infinity, ease: 'easeInOut' }}
      className={wrapperClass}
    >
      <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute inset-0 rounded-full border border-white/10 bg-[radial-gradient(circle_at_center,rgba(180,240,255,0.16),rgba(0,0,0,0.96)_56%)] shadow-[0_0_60px_rgba(34,211,238,0.15)]" />
      <div className="absolute inset-[2.5%] rounded-full border border-white/10" />
      <div className="absolute inset-[10%] rounded-full border border-cyan-200/10" />
      <ClockTicks />

      <div className="absolute inset-0" style={{ transform: `rotate(${progress * 360}deg)` }}>
        <div className={handClass} />
      </div>

      <motion.div
        animate={{ scale: [1, 1.05, 1, 1.035, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        className={centerGlowClass}
      />

      <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.85)]" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className={compact ? 'text-[10px] uppercase tracking-[0.35em] text-white/50' : 'text-xs uppercase tracking-[0.45em] text-white/45'}>
          YouNeeK Time
        </div>
        <div className={compact ? 'mt-2 text-2xl font-light tracking-[0.25em] text-white' : 'mt-3 text-5xl font-light tracking-[0.3em] text-white sm:text-6xl'}>
          {display}
        </div>
        {!compact && (
          <div className="mt-3 text-xs uppercase tracking-[0.4em] text-white/35">
            100-unit day
          </div>
        )}
      </div>
    </motion.div>
  );
}