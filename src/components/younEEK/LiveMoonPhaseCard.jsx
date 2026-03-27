import { useEffect, useState } from 'react';

function getNASAMoonUrl() {
  const now = new Date();
  const start = new Date(Date.UTC(now.getUTCFullYear(), 0, 1, 0, 0, 0));
  const diffMs = now - start;
  const hourOfYear = Math.floor(diffMs / (1000 * 60 * 60)) + 1;
  const frame = String(Math.min(hourOfYear, 8760)).padStart(4, '0');
  return `https://svs.gsfc.nasa.gov/vis/a000000/a005500/a005587/frames/730x730_1x1_30p/moon.${frame}.jpg`;
}

export default function LiveMoonPhaseCard({ phaseName, illumination, moonrise, moonset }) {
  const [moonUrl, setMoonUrl] = useState('');

  useEffect(() => {
    setMoonUrl(getNASAMoonUrl());
  }, []);

  return (
    <div style={{ background: '#111', borderRadius: 16, padding: '16px', display: 'flex', alignItems: 'center', gap: 16 }}>
      {moonUrl && (
        <img src={moonUrl} alt="Moon phase" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover' }} />
      )}
      <div>
        <div style={{ color: '#00ff88', fontFamily: 'monospace', fontWeight: 700, letterSpacing: 2, fontSize: 16 }}>
          {phaseName?.toUpperCase()}
        </div>
        <div style={{ color: '#ff4444', fontFamily: 'monospace', fontSize: 12, marginTop: 4 }}>
          {illumination?.toFixed(1)}% CYCLE
        </div>
      </div>
    </div>
  );
}