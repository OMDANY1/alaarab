// ─────────────────────────────────────────────────────────
// Utility helpers — Shawarma Al-Arrab
// ─────────────────────────────────────────────────────────

// ─── cn: className merger ─────────────────────────────────
type ClassValue = string | number | boolean | undefined | null | ClassValue[];
type ClassRecord = Record<string, boolean | undefined | null>;
type ClassInput = ClassValue | ClassRecord;

/**
 * Merge class names conditionally (clsx-compatible pattern).
 *
 * @example
 * cn('base', isActive && 'active', { 'text-bold': isBold })
 * // → 'base active text-bold'
 */
export function cn(...inputs: ClassInput[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === 'string') {
      classes.push(input);
    } else if (typeof input === 'number') {
      classes.push(String(input));
    } else if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) classes.push(nested);
    } else if (typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key);
      }
    }
  }

  return classes.join(' ');
}

// ─── splitIntoWords ───────────────────────────────────────
/**
 * Splits text into an array of words.
 * Handles Arabic, English, and mixed content correctly by
 * splitting on whitespace boundaries.
 *
 * @example
 * splitIntoWords('للصنعة عرّاب') // → ['للصنعة', 'عرّاب']
 * splitIntoWords('EVERY CRAFT HAS ITS MASTER.')
 * // → ['EVERY', 'CRAFT', 'HAS', 'ITS', 'MASTER.']
 */
export function splitIntoWords(text: string): string[] {
  if (!text) return [];
  return text.split(/\s+/).filter(Boolean);
}

// ─── lerp ─────────────────────────────────────────────────
/**
 * Linear interpolation between two values.
 *
 * @param start  - Value at factor 0
 * @param end    - Value at factor 1
 * @param factor - Interpolation factor, typically 0–1
 * @returns Interpolated value
 *
 * @example
 * lerp(0, 100, 0.5) // → 50
 * lerp(20, 80, 0.25) // → 35
 */
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

// ─── clamp ────────────────────────────────────────────────
/**
 * Clamp a value between a minimum and maximum.
 *
 * @example
 * clamp(150, 0, 100) // → 100
 * clamp(-5, 0, 100)  // → 0
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// ─── mapRange ─────────────────────────────────────────────
/**
 * Re-map a value from one range to another.
 *
 * @example
 * mapRange(50, 0, 100, 0, 1) // → 0.5
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
}
