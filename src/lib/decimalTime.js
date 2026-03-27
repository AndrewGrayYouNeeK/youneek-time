export function getDecimalTime(now = new Date()) {
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);

  const elapsedMs = now.getTime() - startOfDay.getTime();
  const realSeconds = Math.floor(elapsedMs / 1000);
  const dayProgress = ((elapsedMs % 86400000) + 86400000) % 86400000 / 86400000;
  const totalUnits = dayProgress * 100;

  const units = Math.floor(totalUnits);
  const minutes = Math.floor((realSeconds % 3600) / 3600 * 100);
  const seconds = Math.floor((realSeconds % 60) / 60 * 100);

  return {
    progress: dayProgress,
    units,
    minutes,
    seconds,
    display: [units, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':'),
    dayPercent: (dayProgress * 100).toFixed(2),
    unitRotation: dayProgress * 360,
    minuteRotation: minutes * 3.6,
    secondRotation: seconds * 3.6
  };
}