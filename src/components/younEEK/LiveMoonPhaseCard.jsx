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
  const shadowOffset = (moon?.illumination || 0) / 100 * 56;

  if (loading) {
    return (
      <section className="w-full px-5 py-6 sm:px-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-40 rounded-full bg-white/10" />
          <div className="h-8 w-60 rounded-[1.4rem] bg-white/5" />
          <div className="flex gap-4">
            <div className="h-10 w-20 rounded-lg bg-white/10" />
            <div className="h-10 w-20 rounded-lg bg-white/10" />
            <div className="h-10 w-20 rounded-lg bg-white/10" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full px-5 py-6 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-300/90">Live moon phase</p>
          <h2 className="mt-3 font-mono text-2xl uppercase tracking-[0.22em] text-white sm:text-3xl">{phaseName}</h2>
        </div>
        <div className="relative h-14 w-14 overflow-hidden rounded-full bg-black shadow-[0_0_28px_rgba(255,244,200,0.28)] flex-shrink-0">
          <img src="https://media.base44.com/images/public/69c46a76857b7906981251c6/1f25e836d_IMG_0681.png" alt="Moon" className="absolute inset-0 w-full h-full object-cover opacity-90" />
          <div
            className="absolute inset-0 rounded-full bg-black"
            style={{ transform: `translateX(${isWaxing ? -shadowOffset : shadowOffset}px)` }}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">Illumination</p>
          <p className="mt-2 font-mono text-lg text-white/85">{moon?.illumination}%</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">Moonrise</p>
          <p className="mt-2 font-mono text-lg text-white/85">{moon?.moonrise || '—'}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">Moonset</p>
          <p className="mt-2 font-mono text-lg text-white/85">{moon?.moonset || '—'}</p>
        </div>
      </div>
    </section>
  );
}