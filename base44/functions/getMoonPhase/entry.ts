import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';
import SunCalc from 'npm:suncalc@1.9.0';

Deno.serve(async (req) => {
  try {
    const date = new Date();
    const moonIllumination = SunCalc.getMoonIllumination(date);
    
    const phaseValue = moonIllumination.phase;
    let phaseName = 'New Moon';
    if (phaseValue < 0.03) phaseName = 'New Moon';
    else if (phaseValue < 0.22) phaseName = 'Waxing Crescent';
    else if (phaseValue < 0.28) phaseName = 'First Quarter';
    else if (phaseValue < 0.47) phaseName = 'Waxing Gibbous';
    else if (phaseValue < 0.53) phaseName = 'Full Moon';
    else if (phaseValue < 0.72) phaseName = 'Waning Gibbous';
    else if (phaseValue < 0.78) phaseName = 'Last Quarter';
    else if (phaseValue < 0.97) phaseName = 'Waning Crescent';
    
    const illumination = Math.round(moonIllumination.fraction * 100);

    return Response.json({
      phase: phaseName,
      illumination: illumination,
      moonrise: '—',
      moonset: '—'
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});