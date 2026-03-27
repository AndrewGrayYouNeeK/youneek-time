import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const response = await fetch('https://wttr.in/?format=j1', {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      return Response.json({ error: 'Failed to fetch moon data' }, { status: 502 });
    }

    const data = await response.json();
    const astronomy = data?.weather?.[0]?.astronomy?.[0];

    if (!astronomy) {
      return Response.json({ error: 'Moon data unavailable' }, { status: 502 });
    }

    return Response.json({
      phase: astronomy.moon_phase,
      illumination: astronomy.moon_illumination,
      moonrise: astronomy.moonrise,
      moonset: astronomy.moonset
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});