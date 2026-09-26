export const MS_DAY = 1000 * 60 * 60 * 24;

export function startOfDay(d) {
  const nd = new Date(d);
  nd.setHours(0, 0, 0, 0);
  return nd;
}

export function isBefore(a, b) {
  return startOfDay(a).getTime() < startOfDay(b).getTime();
}

export function isSameDay(a, b) {
  return startOfDay(a).getTime() === startOfDay(b).getTime();
}

export function isWithin(d, start, end) {
  const t = startOfDay(d).getTime();
  return t > startOfDay(start).getTime() && t < startOfDay(end).getTime();
}

export function nightsBetween(start, end) {
  if (!start || !end) return 0;
  const diff = startOfDay(end).getTime() - startOfDay(start).getTime();
  return Math.max(0, Math.round(diff / MS_DAY));
}

export function formatDate(d) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatShort(d) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function getMonthMatrix(year, month) {
  // month: 0-11. Returns array of weeks, each 7 entries (Date or null)
  const first = new Date(year, month, 1);
  const startWeekday = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}
