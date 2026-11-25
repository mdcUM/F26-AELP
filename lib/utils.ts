export { cn } from "cn"

export const hasEnvVars =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") return false;
    return /^([a-z0-9-]+\.)+(?:[a-z]{2,}|xn--[a-z0-9-]+)$/i.test(url.hostname);
  } catch {
    return false;
  }
}