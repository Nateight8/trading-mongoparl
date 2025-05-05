import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { customAlphabet } from "nanoid";
import { Snowflake } from "@theinternetfolks/snowflake";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates a unique ID with the provided prefix.
 * @param pfx - The prefix to use for the generated ID.
 * @returns A unique ID in the format `{pfx}_{randomId}`.
 */

export function genId(pfx: string) {
  const nanoid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 10);
  return [pfx, nanoid()].join("_");
}

export const snowflake = new Snowflake();

export function formatBalance(value: number): string {
  if (value >= 1_000_000)
    return `${(value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1)}M`;
  if (value >= 1_000)
    return `${(value / 1_000).toFixed(value % 1_000 === 0 ? 0 : 1)}k`;
  return value.toString();
}
