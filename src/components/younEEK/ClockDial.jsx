import { motion } from 'framer-motion';
import ClockTicks from './ClockTicks';
import ClockHands from './ClockHands';

export default function ClockDial({ time, compact = false }) {
  const wrapperClass = compact
    ? 'relative aspect-square w-40 sm:w-44'
    : 'relative aspect-square w-[84vw] max-w-[34rem]';

  return (
    <motion.div
      animate={{ scale: compact ? [1, 1.02, 1] : [1, 1.03, 1] }}
      transition={{ duration: compact ? 4 : 4.6, repeat: Infinity, ease: 'easeInOut' }}
      className={wrapperClass}
    >
      <div className="absolute inset-0 rounded-full bg-cyan-400/[0.18] blur-3xl" />
      <div className="absolute inset-0 rounded-full border border-white/10 bg-[radial-gradient(circle_at_center,rgba(180,240,255,0.18),rgba(0,0,0,0.96)_56%)] shadow-[0_0_80px_rgba(34,211,238,0.16)]" />
      <div className="absolute inset-[2.5%] rounded-full border border-white/10" />
      <div className="absolute inset-[9%] rounded-full border border-cyan-200/10" />
      <ClockTicks />
      <ClockHands
        compact={compact}
        unitRotation={time.unitRotation}
        minuteRotation={time.minuteRotation}
        secondRotation={time.secondRotation}
      />

      <div className="absolute inset-[26%] rounded-full bg-cyan-300/[0.08] blur-2xl" />
      <motion.div
        animate={{ scale: [1, 1.04, 1, 1.02, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        className={compact ? 'absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-100/70 blur-[2px]' : 'absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-100/70 blur-[2px]'}
      />
      <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_24px_rgba(255,255,255,0.95)]" />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        {!compact && (
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[11px] uppercase tracking-[0.35em] text-white/70">
            YNK
          </div>
        )}
        <div className={compact ? 'text-[10px] uppercase tracking-[0.32em] text-white/50' : 'text-xs uppercase tracking-[0.45em] text-white/45'}>
          YouNeeK Time
        </div>
        <div className={compact ? 'mt-2 text-2xl font-light tracking-[0.2em] text-white' : 'mt-3 text-5xl font-light tracking-[0.28em] text-white sm:text-6xl'}>
          {time.display}
        </div>
        <div className={compact ? 'mt-2 text-[9px] uppercase tracking-[0.25em] text-white/40' : 'mt-3 text-xs uppercase tracking-[0.34em] text-white/38'}>
          {time.dayPercent}% of day
        </div>
        {!compact && (
          <div className="mt-2 text-[10px] uppercase tracking-[0.35em] text-white/30">
            100-unit day · base-10 flow
          </div>
        )}
      </div>
    </motion.div>
  );
}