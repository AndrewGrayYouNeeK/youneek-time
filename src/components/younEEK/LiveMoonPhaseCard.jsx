import { useEffect, useMemo, useState } from 'react';
import { base44 } from '@/api/base44Client';

function normalizePhase(phase) {
  const value = (phase || '').toLowerCase();

  if (value.includes('new')) return 'New Moon';
  if (value.includes('waxing') && value.includes('crescent')) return 'Waxing Crescent';
  if (value.includes('first')) return 'First Quarter';
  if (value.includes('waxing') && value.includes('gibbous')) return 'Waxing Gibbous';
  if (value.includes('full')) return 'Full Moon';
  if (value.includes('waning') && value.includes('gibbous')) return 'Waning Gibbous';
  if (value.includes('last') || value.includes('third')) return 'Last Quarter';
  if (value.includes('waning') && value.includes('crescent')) return 'Waning Crescent';

  return phase || 'Moon Phase';
}

export default function LiveMoonPhaseCard() {
  const [moon, setMoon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMoon = async () => {
      try {
        const response = await base44.functions.invoke('getMoonPhase', {});
        if (response && response.data) {
          setMoon(response.data);
        }
      } catch (error) {
        console.error("Failed to load moon phase:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMoon();
  }, []);

  const phaseName = useMemo(() => normalizePhase(moon?.phase), [moon?.phase]);
  const isWaxing = useMemo(() => {
    const p = phaseName.toLowerCase();
    return p.includes('waxing') || p.includes('first') || p.includes('new');
  }, [phaseName]);

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-[18rem] rounded-[1.6rem] border border-emerald-200/15 bg-[#101010] px-6 py-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04),0_0_26px_rgba(74,222,128,0.06)] text-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-white/10" />
          <div className="h-4 w-32 rounded bg-white/10" />
          <div className="h-3 w-16 rounded bg-white/10" />
        </div>
      </div>
    );
  }

  // Illumination maps from 0 (New Moon) to 100 (Full Moon).
  // The moon is 56px wide (w-14 = 3.5rem = 56px).
  // To fully uncover the moon, we shift the shadow by 56px.
  const illumFraction = (moon?.illumination || 0) / 100;
  const shadowOffset = illumFraction * 56;

  return (
    <div className="mx-auto w-full max-w-[18rem] rounded-[1.6rem] border border-emerald-200/15 bg-[#101010] px-6 py-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04),0_0_26px_rgba(74,222,128,0.06)] text-center">
      <div className="flex flex-col items-center gap-4">
        
        <div className="relative h-14 w-14 overflow-hidden rounded-full bg-[#e2e8f0] shadow-[0_0_28px_rgba(255,244,200,0.28)]">
          <div
            className="absolute inset-0 rounded-full bg-[#101010]"
            style={{ transform: `translateX(${isWaxing ? -shadowOffset : shadowOffset}px)` }}
          />
        </div>

        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#39ff14] drop-shadow-[0_0_8px_rgba(57,255,20,0.4)] mb-2">Live Moon Phase</p>
          <p className="font-mono text-base uppercase tracking-[0.22em] text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">{phaseName}</p>
          <p className="mt-1 font-mono text-xs uppercase tracking-[0.22em] text-white/42">{moon?.illumination || 0}% illum</p>
        </div>

        <div className="w-full mt-2 pt-4 border-t border-white/5 flex justify-between px-2">
          <div className="text-center">
             <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">Rise</p>
             <p className="font-mono text-[10px] tracking-wider text-white/60 mt-1">{moon?.moonrise || '—'}</p>
          </div>
          <div className="text-center">
             <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">Set</p>
             <p className="font-mono text-[10px] tracking-wider text-white/60 mt-1">{moon?.moonset || '—'}</p>
          </div>
        </div>

      </div>
    </div>
  );
}