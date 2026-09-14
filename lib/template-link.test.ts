import { describe, expect, it } from "vitest";
import { configuratorHref, readTemplate } from "@/lib/template-link";
import { PART_NAMES, type PartColors } from "@/lib/types";

const colors = Object.fromEntries(
  PART_NAMES.map((part, index) => [part, { _id: `id-${index}`, name: part, value: "#000000" }])
) as PartColors;

describe("configuratorHref", () => {
  it("links to the configurator with one colour id per part", () => {
    const url = new URL(configuratorHref(colors), "http://localhost");

    expect(url.pathname).toBe("/configurator");
    PART_NAMES.forEach((part, index) => {
      expect(url.searchParams.get(part)).toBe(`id-${index}`);
    });
  });
});

describe("readTemplate", () => {
  it("reads back what configuratorHref wrote", () => {
    const url = new URL(configuratorHref(colors), "http://localhost");
    const expected = Object.fromEntries(PART_NAMES.map((part, index) => [part, `id-${index}`]));

    expect(readTemplate(Object.fromEntries(url.searchParams))).toEqual(expected);
  });

  it("ignores unknown keys and repeated parameters", () => {
    expect(readTemplate({ body: ["a", "b"], colour: "c", dpad: "d" })).toEqual({ dpad: "d" });
  });
});
