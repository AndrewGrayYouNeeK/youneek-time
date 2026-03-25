export function getDecimalTime(now = new Date()) {
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);

  const elapsedMs = now.getTime() - startOfDay.getTime();
  const dayProgress = ((elapsedMs % 86400000) + 86400000) % 86400000 / 86400000;
  const totalUnits = dayProgress * 100;
  const totalBaseMinutes = dayProgress * 10000;
  const totalBaseSeconds = dayProgress * 1000000;

  const units = Math.floor(totalUnits);
  const minutes = Math.floor(totalBaseMinutes) % 100;
  const seconds = Math.floor(totalBaseSeconds) % 100;

  return {
    progress: dayProgress,
    units,
    minutes,
    seconds,
    display: [units, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':'),
    dayPercent: (dayProgress * 100).toFixed(2),
    unitRotation: dayProgress * 360,
    minuteRotation: (totalBaseMinutes % 100) * 3.6,
    secondRotation: (totalBaseSeconds % 100) * 3.6
  };
}