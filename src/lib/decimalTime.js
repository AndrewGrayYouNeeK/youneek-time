export function getDecimalTime(now = new Date()) {
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);

  const elapsedMs = now.getTime() - startOfDay.getTime();
  const dayProgress = ((elapsedMs % 86400000) + 86400000) % 86400000 / 86400000;
  const totalDecimalSeconds = dayProgress * 1000000;

  const units = Math.floor(totalDecimalSeconds / 10000);
  const minutes = Math.floor(totalDecimalSeconds / 100) % 100;
  const seconds = Math.floor(totalDecimalSeconds) % 100;

  return {
    progress: dayProgress,
    units,
    minutes,
    seconds,
    display: [units, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':')
  };
}