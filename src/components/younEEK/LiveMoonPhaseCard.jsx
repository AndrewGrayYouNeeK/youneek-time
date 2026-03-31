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

  if (loading) {
    return (
      <section className="w-full relative rounded-[2rem] overflow-hidden border border-white/5 bg-[#111111] p-6 sm:p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 rounded bg-white/10" />
          <div className="space-y-4 pt-4">
            <div className="h-6 w-24 rounded bg-white/5" />
            <div className="h-6 w-24 rounded bg-white/5" />
            <div className="h-6 w-24 rounded bg-white/5" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full relative rounded-[2rem] overflow-hidden border border-white/5 bg-[#111111]">
      <div 
        className="absolute top-0 left-0 w-full h-[60%] opacity-40 mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?auto=format&fit=crop&q=80&w=800")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          maskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)'
        }}
      />
      
      <div className="relative z-10 p-6 sm:p-8 pt-[35%]">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#39ff14] drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]">Live moon phase</p>
          <h2 className="mt-2 font-mono text-xl sm:text-2xl uppercase tracking-[0.25em] text-white/90">{phaseName}</h2>
        </div>
        
        <div className="mt-8 space-y-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">Illumination</p>
            <p className="mt-1.5 font-mono text-base tracking-wider text-white/80">{moon?.illumination}%</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">Moonrise</p>
            <p className="mt-1.5 font-mono text-base tracking-wider text-white/80">{moon?.moonrise || '—'}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">Moonset</p>
            <p className="mt-1.5 font-mono text-base tracking-wider text-white/80">{moon?.moonset || '—'}</p>
          </div>
        </div>
      </div>
    </section>
  );
}