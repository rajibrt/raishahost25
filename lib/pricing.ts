export function formatBDT(amount: number, withPlus: boolean = true): string {
  if (!Number.isFinite(amount)) throw new Error("Invalid amount");
  const formatted = new Intl.NumberFormat("en-IN").format(Math.round(amount));
  return `৳${formatted}${withPlus ? "+" : ""}`;
}
