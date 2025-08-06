import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { dishes } from "./dishes";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDishwById(id: string) {
  for (const dish of dishes) {
    if (dish.dish_name.replace(" ", "-").toLowerCase() === id) {
      return dish;
    }
  }

  return null;
}


export function generateUUID(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  // Fallback (RFC4122-compliant) polyfill
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = (crypto.getRandomValues(new Uint8Array(1))[0] & 0xf) >> 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}