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
      const response = await base44.functions.invoke('getMoonPhase', {});
      setMoon(response.data);
      setLoading(false);
    };

    loadMoon();
  }, []);

  const phaseName = useMemo(() => normalizePhase(moon?.phase), [moon?.phase]);
  const illumination = Number(moon?.illumination || 0);
  const isWaning = phaseName.includes('Waning') || phaseName === 'Last Quarter';
  const shadowStyle = isWaning
    ? { clipPath: `inset(0 ${illumination}% 0 0)` }
    : { clipPath: `inset(0 0 0 ${illumination}%)` };

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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_62%)]" />
        <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#f8fafc_0%,#e2e8f0_18%,#cbd5e1_38%,#94a3b8_70%,#475569_100%)] sm:h-52 sm:w-52" />
        <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full sm:h-52 sm:w-52">
          <div className="absolute inset-0 rounded-full bg-[#020202]" style={shadowStyle} />
        </div>
        <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_30%_28%,rgba(255,255,255,0.22),transparent_20%),radial-gradient(circle_at_68%_62%,rgba(15,23,42,0.18),transparent_18%),radial-gradient(circle_at_55%_40%,rgba(71,85,105,0.2),transparent_14%)] sm:h-52 sm:w-52" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-200">Live moon phase</p>
          <h2 className="mt-3 font-mono text-2xl uppercase tracking-[0.22em] text-white sm:text-3xl">{phaseName}</h2>
        </div>
      </div>

      <div className="grid gap-4 px-5 py-5 sm:grid-cols-3 sm:px-6 sm:py-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/60">Illumination</p>
          <p className="mt-2 font-mono text-lg text-white/95">{moon?.illumination}%</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/60">Moonrise</p>
          <p className="mt-2 font-mono text-lg text-white/95">{moon?.moonrise || '—'}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/60">Moonset</p>
          <p className="mt-2 font-mono text-lg text-white/95">{moon?.moonset || '—'}</p>
        </div>
      </div>
    </section>
  );
}