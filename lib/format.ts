export function formatCurrency(amount: number, options: { cents?: boolean } = {}): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: options.cents ? 2 : 0,
    maximumFractionDigits: options.cents ? 2 : 0,
  }).format(amount);
}

/** Compact menu prices: 21 → "$21". */
export const formatMenuPrice = (price: number) => `$${price}`;

/** "19:30" → "7:30pm", matching the house style used on menus and signage. */
export function formatTime(value: string): string {
  const [h = "0", m = "00"] = value.split(":");
  const hours = Number(h);
  const suffix = hours >= 12 && hours < 24 ? "pm" : "am";
  const display = hours % 12 === 0 ? 12 : hours % 12;
  return `${display}:${m}${suffix}`;
}

export const pluralize = (count: number, singular: string, plural = `${singular}s`) =>
  `${count} ${count === 1 ? singular : plural}`;
