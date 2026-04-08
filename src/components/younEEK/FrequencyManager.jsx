import { useEffect, useRef } from 'react';

export default function FrequencyManager({ time }) {
  const lastUnitRef = useRef(time.units);

  useEffect(() => {
    if (time.units !== lastUnitRef.current) {
      lastUnitRef.current = time.units;
      
      const enabled = localStorage.getItem('hourlyFreqEnabled') === 'true';
      if (!enabled) return;

      const freq = parseFloat(localStorage.getItem('hourlyFreqHz')) || 432;
      const duration = parseInt(localStorage.getItem('hourlyFreqDuration'), 10) || 5;

      playFrequency(freq, duration);
    }
  }, [time.units]);

  const playFrequency = (freq, duration) => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!window.audioCtx) window.audioCtx = new AudioContext();
      const ctx = window.audioCtx;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + Math.min(0.5, duration / 2));
      gain.gain.setValueAtTime(0.3, ctx.currentTime + duration - Math.min(0.5, duration / 2));
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.error('Audio play failed', e);
    }
  };

  return null;
}