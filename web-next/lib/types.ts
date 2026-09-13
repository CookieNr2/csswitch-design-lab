export const PART_NAMES = [
  "body",
  "joyControllerLeft",
  "joyControllerRight",
  "thumbSticks",
  "abxy",
  "dpad",
  "utils",
] as const;

export type PartName = (typeof PART_NAMES)[number];

export type Color = {
  _id: string;
  name: string;
  value: string;
};

export type SwitchPart = {
  _id: string;
  name: PartName;
  displayName: string;
  defaultColor: Color;
  colorOptions: Color[];
};

/** One color per configurable part: everything <ConfigRender> needs to draw a console. */
export type PartColors = Record<PartName, Color>;

export type SavedConfig = {
  _id: string;
  name: string | null;
  colors: PartColors;
};

/** A part plus the color currently picked for it. Drives the configurator UI. */
export type PartSelection = SwitchPart & { color: Color };

export type ConfigStatus = Record<PartName, PartSelection>;

export type SessionUser = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  location?: { street?: string; postalCode?: number };
  paymentMethod?: { type?: string; cardNumber?: string };
};

