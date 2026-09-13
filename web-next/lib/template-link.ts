import { PART_NAMES, type PartColors, type PartName } from "@/lib/types";

/**
 * The Vite app passed a template through react-router location state, which
 * disappears on refresh and cannot be shared. The colours now live in the
 * query string, so a design is a real URL.
 */
export const configuratorHref = (colors: PartColors) => {
  const params = new URLSearchParams();
  for (const part of PART_NAMES) params.set(part, colors[part]._id);
  return `/configurator?${params.toString()}`;
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
