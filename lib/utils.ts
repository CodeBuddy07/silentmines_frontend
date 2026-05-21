import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Normalise media URLs stored in the DB that may use old IP-based origins.
const LEGACY_ORIGINS = [
  'http://148.230.85.23:5000',
  'http://72.62.128.216:5000',
]
const CDN = 'https://server.greenlove.fun'

export function normalizeMediaUrl(url: string): string {
  if (!url) return url
  for (const origin of LEGACY_ORIGINS) {
    if (url.startsWith(origin)) return CDN + url.slice(origin.length)
  }
  return url
}
