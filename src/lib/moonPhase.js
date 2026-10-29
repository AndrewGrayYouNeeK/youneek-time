const RAD = Math.PI / 180;
const DAY_MS = 1000 * 60 * 60 * 24;
const J1970 = 2440588;
const J2000 = 2451545;
const OBLIQUITY = RAD * 23.4397;
const SUN_DISTANCE_KM = 149598000;

function toDays(date) {
  return date.valueOf() / DAY_MS - 0.5 + J1970 - J2000;
}

function rightAscension(longitude, latitude) {
  return Math.atan2(
    Math.sin(longitude) * Math.cos(OBLIQUITY) - Math.tan(latitude) * Math.sin(OBLIQUITY),
    Math.cos(longitude),
  );
}

function declination(longitude, latitude) {
  return Math.asin(
    Math.sin(latitude) * Math.cos(OBLIQUITY) +
      Math.cos(latitude) * Math.sin(OBLIQUITY) * Math.sin(longitude),
  );
}

function solarMeanAnomaly(days) {
  return RAD * (357.5291 + 0.98560028 * days);
}

function sunEclipticLongitude(anomaly) {
  const center =
    RAD *
    (1.9148 * Math.sin(anomaly) + 0.02 * Math.sin(2 * anomaly) + 0.0003 * Math.sin(3 * anomaly));
  const perihelion = RAD * 102.9372;
  return anomaly + center + perihelion + Math.PI;
}

function sunCoords(days) {
  const longitude = sunEclipticLongitude(solarMeanAnomaly(days));
  return {
    dec: declination(longitude, 0),
    ra: rightAscension(longitude, 0),
  };
}

function moonCoords(days) {
  const meanLongitude = RAD * (218.316 + 13.176396 * days);
  const anomaly = RAD * (134.963 + 13.064993 * days);
  const meanDistance = RAD * (93.272 + 13.22935 * days);
  const longitude = meanLongitude + RAD * 6.289 * Math.sin(anomaly);
  const latitude = RAD * 5.128 * Math.sin(meanDistance);

  return {
    ra: rightAscension(longitude, latitude),
    dec: declination(longitude, latitude),
    dist: 385001 - 20905 * Math.cos(anomaly),
  };
}

export function getMoonIllumination(date = new Date()) {
  const days = toDays(date);
  const sun = sunCoords(days);
  const moon = moonCoords(days);
  const phi = Math.acos(
    Math.sin(sun.dec) * Math.sin(moon.dec) +
      Math.cos(sun.dec) * Math.cos(moon.dec) * Math.cos(sun.ra - moon.ra),
  );
  const inc = Math.atan2(
    SUN_DISTANCE_KM * Math.sin(phi),
    moon.dist - SUN_DISTANCE_KM * Math.cos(phi),
  );
  const angle = Math.atan2(
    Math.cos(sun.dec) * Math.sin(sun.ra - moon.ra),
    Math.sin(sun.dec) * Math.cos(moon.dec) -
      Math.cos(sun.dec) * Math.sin(moon.dec) * Math.cos(sun.ra - moon.ra),
  );

  return {
    fraction: (1 + Math.cos(inc)) / 2,
    phase: 0.5 + (0.5 * inc * (angle < 0 ? -1 : 1)) / Math.PI,
    angle,
  };
}

function phaseName(phase) {
  if (phase < 0.03) return 'New Moon';
  if (phase < 0.22) return 'Waxing Crescent';
  if (phase < 0.28) return 'First Quarter';
  if (phase < 0.47) return 'Waxing Gibbous';
  if (phase < 0.53) return 'Full Moon';
  if (phase < 0.72) return 'Waning Gibbous';
  if (phase < 0.78) return 'Last Quarter';
  if (phase < 0.97) return 'Waning Crescent';
  return 'New Moon';
}

export function getMoonPhase(date = new Date()) {
  const illumination = getMoonIllumination(date);
  return {
    phase: phaseName(illumination.phase),
    illumination: Math.round(illumination.fraction * 100),
    moonrise: '—',
    moonset: '—',
  };
}
