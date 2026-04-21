export const pad = (n: number, len = 2) => String(n).padStart(len, '0');

export const clone = (d: Date) => new Date(d.getTime());

export const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export const isSameMonth = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();

export const isSameYear = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear();

export const isSameQuarter = (a: Date, b: Date) =>
  isSameYear(a, b) &&
  Math.floor(a.getMonth() / 3) === Math.floor(b.getMonth() / 3);

export const addDays = (d: Date, n: number) => {
  const r = clone(d);
  r.setDate(r.getDate() + n);
  return r;
};
export const addMonths = (d: Date, n: number) => {
  const r = clone(d);
  r.setMonth(r.getMonth() + n);
  return r;
};
export const addYears = (d: Date, n: number) => {
  const r = clone(d);
  r.setFullYear(r.getFullYear() + n);
  return r;
};

export const startOfMonth = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), 1);
export const endOfMonth = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth() + 1, 0);

/** Monday-based weekday index (Mon=0..Sun=6). */
export const mondayIndex = (d: Date) => (d.getDay() + 6) % 7;

export const startOfWeek = (d: Date) => {
  const r = clone(d);
  r.setDate(r.getDate() - mondayIndex(r));
  r.setHours(0, 0, 0, 0);
  return r;
};
export const endOfWeek = (d: Date) => {
  const r = startOfWeek(d);
  r.setDate(r.getDate() + 6);
  r.setHours(23, 59, 59, 999);
  return r;
};

export const getQuarter = (d: Date) => Math.floor(d.getMonth() / 3) + 1;

export const startOfQuarter = (d: Date) =>
  new Date(d.getFullYear(), (getQuarter(d) - 1) * 3, 1);
export const endOfQuarter = (d: Date) => {
  const q = getQuarter(d);
  return new Date(d.getFullYear(), q * 3, 0);
};

export function getISOWeek(d: Date): { year: number; week: number } {
  const target = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNr = (target.getUTCDay() + 6) % 7;
  target.setUTCDate(target.getUTCDate() - dayNr + 3);
  const firstThursday = new Date(Date.UTC(target.getUTCFullYear(), 0, 4));
  const diff = target.getTime() - firstThursday.getTime();
  const week =
    1 +
    Math.round(
      (diff / 86400000 - 3 + ((firstThursday.getUTCDay() + 6) % 7)) / 7,
    );
  return { year: target.getUTCFullYear(), week };
}

export const isSameISOWeek = (a: Date, b: Date) => {
  const aw = getISOWeek(a);
  const bw = getISOWeek(b);
  return aw.year === bw.year && aw.week === bw.week;
};

/** Number of ISO weeks in the given calendar year (52 or 53). */
export function weeksInISOYear(year: number): number {
  return getISOWeek(new Date(year, 11, 28)).week;
}

/** Monday of the given ISO-week within the given ISO-year. */
export function firstDayOfISOWeek(year: number, week: number): Date {
  const jan4 = new Date(year, 0, 4);
  const jan4Mon = (jan4.getDay() + 6) % 7;
  const week1Monday = new Date(year, 0, 4 - jan4Mon);
  const target = new Date(week1Monday);
  target.setDate(target.getDate() + (week - 1) * 7);
  target.setHours(0, 0, 0, 0);
  return target;
}

/** Inclusive day compare: -1 / 0 / 1. */
export const cmpDay = (a: Date, b: Date) => {
  const da = new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime();
  const db = new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime();
  return da === db ? 0 : da < db ? -1 : 1;
};

/**
 * Minimal formatter. Tokens: YYYY MM DD HH mm ss Q w ww.
 * Literals wrapped in `[...]` are emitted verbatim.
 */
export function formatDate(d: Date, fmt: string): string {
  const tokens: Record<string, string> = {
    YYYY: String(d.getFullYear()),
    MM: pad(d.getMonth() + 1),
    DD: pad(d.getDate()),
    HH: pad(d.getHours()),
    mm: pad(d.getMinutes()),
    ss: pad(d.getSeconds()),
    Q: String(getQuarter(d)),
    ww: pad(getISOWeek(d).week),
    w: String(getISOWeek(d).week),
  };
  return fmt.replace(
    /\[([^\]]+)\]|YYYY|MM|DD|HH|mm|ss|ww|w|Q/g,
    (match, literal) => (literal !== undefined ? literal : tokens[match] ?? match),
  );
}

export const defaultFormats = {
  date: 'YYYY-MM-DD',
  'date-time': 'YYYY-MM-DD HH:mm:ss',
  year: 'YYYY',
  month: 'YYYY-MM',
  quarter: 'YYYY-[Q]Q',
  week: 'YYYY-[第]w[周]',
  time: 'HH:mm:ss',
} as const;
