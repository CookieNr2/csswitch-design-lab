import type { Route } from "next";
import { PART_NAMES, type PartColors, type PartName } from "@/lib/types";

/** Colours live in the query string, so a design survives a refresh and can be shared. */
export const configuratorHref = (colors: PartColors): Route => {
  const params = new URLSearchParams();
  for (const part of PART_NAMES) params.set(part, colors[part]._id);
  // Built at runtime, so typed routes cannot check it; the path itself is fixed.
  return `/configurator?${params.toString()}` as Route;
};

export const readTemplate = (
  searchParams: Record<string, string | string[] | undefined>
): Partial<Record<PartName, string>> => {
  const template: Partial<Record<PartName, string>> = {};
  for (const part of PART_NAMES) {
    const value = searchParams[part];
    if (typeof value === "string") template[part] = value;
  }
  return template;
};
