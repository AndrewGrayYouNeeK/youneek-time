import { useEffect, useMemo, useState } from 'react';
import { base44 } from '@/api/base44Client';

const moonPhoto = 'https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg';

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

function getPhaseMaskStyle(phaseName, illumination) {
  const litScale = Math.max(0, Math.min(1, illumination / 100));
  const shadowScale = Math.max(0, Math.min(1, 1 - litScale));

  if (phaseName === 'New Moon') {
    return { width: '100%', left: 0, borderRadius: '9999px' };
  }

  if (phaseName === 'Full Moon') {
    return { width: 0, right: 0, borderRadius: '9999px' };
  }

  if (phaseName === 'First Quarter') {
    return { width: '50%', left: 0, borderRadius: '9999px 0 0 9999px' };
  }

  if (phaseName === 'Last Quarter') {
    return { width: '50%', right: 0, borderRadius: '0 9999px 9999px 0' };
  }

  if (phaseName === 'Waxing Crescent') {
    return { width: `${Math.max(50, shadowScale * 100)}%`, left: 0, borderRadius: '9999px 0 0 9999px' };
  }

  if (phaseName === 'Waxing Gibbous') {
    return { width: `${Math.min(50, shadowScale * 100)}%`, left: 0, borderRadius: '9999px 0 0 9999px' };
  }

  if (phaseName === 'Waning Gibbous') {
    return { width: `${Math.min(50, shadowScale * 100)}%`, right: 0, borderRadius: '0 9999px 9999px 0' };
  }

  return { width: `${Math.max(50, shadowScale * 100)}%`, right: 0, borderRadius: '0 9999px 9999px 0' };
}

export default function LiveMoonPhaseCard() {
  const [moon, setMoon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMoon = async () => {
      const response = await base44.functions.invoke('getMoonPhase', {});
      setMoon(response.data);
      setLoading(false);
    };

    loadMoon();
  }, []);

  const phaseName = useMemo(() => normalizePhase(moon?.phase), [moon?.phase]);
  const illumination = Number(moon?.illumination || 0);
  const phaseMaskStyle = useMemo(() => getPhaseMaskStyle(phaseName, illumination), [phaseName, illumination]);

  if (loading) {
    return (
      <section className="w-full overflow-hidden rounded-[1.9rem] border border-white/10 bg-[#0d0d0d] p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02),0_0_28px_rgba(0,0,0,0.35)] sm:p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-40 rounded-full bg-white/10" />
          <div className="h-56 rounded-[1.4rem] bg-white/5" />
          <div className="h-4 w-52 rounded-full bg-white/10" />
        </div>
      </section>
    );
  }

  return (
    <section className="w-full overflow-hidden rounded-[1.9rem] border border-white/10 bg-[#0d0d0d] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02),0_0_28px_rgba(0,0,0,0.35)]">
      <div className="relative h-64 w-full overflow-hidden bg-[#050505] sm:h-72">
        <img src={moonPhoto} alt={phaseName} className="h-full w-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-[#020202]/96" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="relative aspect-square h-[72%] max-h-52 w-full max-w-52 overflow-hidden rounded-full border border-white/10">
            <img src={moonPhoto} alt={phaseName} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[#020202]/96" style={phaseMaskStyle} />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-300/90">Live moon phase</p>
          <h2 className="mt-3 font-mono text-2xl uppercase tracking-[0.22em] text-white sm:text-3xl">{phaseName}</h2>
        </div>
      </div>

      <div className="grid gap-4 px-5 py-5 sm:grid-cols-3 sm:px-6 sm:py-6">
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