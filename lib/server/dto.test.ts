import { Types } from "mongoose";
import { describe, expect, it } from "vitest";
import { toColor, toSavedConfig, toSessionUser, toSwitchPart } from "@/lib/server/dto";
import { PART_NAMES, type PartName } from "@/lib/types";

const color = (value = "#353535") => ({ _id: new Types.ObjectId(), name: "Grey", value });

const user = {
  _id: new Types.ObjectId(),
  firstName: "Ada",
  lastName: "Lovelace",
  email: "ada@example.com",
};

describe("toColor", () => {
  it("returns a string id and an empty name when the colour has none", () => {
    const doc = { _id: new Types.ObjectId(), value: "#000000" };
    expect(toColor(doc)).toEqual({ _id: String(doc._id), name: "", value: "#000000" });
  });
});

describe("toSessionUser", () => {
  it("copies only the listed fields, so the password hash never leaves the server", () => {
    const doc = { ...user, password: "$2b$10$hash", createdAt: new Date() };
    const mapped = toSessionUser(doc);

    expect(mapped).not.toHaveProperty("password");
    expect(mapped).not.toHaveProperty("createdAt");
    expect(mapped._id).toBe(String(user._id));
  });

  it("turns the nulls MongoDB stores into undefined", () => {
    const mapped = toSessionUser({
      ...user,
      location: { street: null, postalCode: 28013 },
      paymentMethod: null,
    });

    expect(mapped.location).toEqual({ street: undefined, postalCode: 28013 });
    expect(mapped.paymentMethod).toEqual({ type: undefined, cardNumber: undefined });
  });
});

describe("toSwitchPart", () => {
  const part = {
    _id: new Types.ObjectId(),
    name: "body",
    displayName: "Body",
    defaultColor: color(),
    colorOptions: [color(), color("#ffffff")],
  };

  it("returns plain string ids all the way down", () => {
    const mapped = toSwitchPart(part);
    expect(mapped?.defaultColor._id).toBe(String(part.defaultColor._id));
    expect(mapped?.colorOptions.map((option) => typeof option._id)).toEqual(["string", "string"]);
  });

  it("skips a part the app does not know", () => {
    expect(toSwitchPart({ ...part, name: "kickstand" })).toBeNull();
  });

  it("skips a part whose default colour was deleted", () => {
    expect(toSwitchPart({ ...part, defaultColor: null })).toBeNull();
  });
});

describe("toSavedConfig", () => {
  const everyPart = () =>
    Object.fromEntries(PART_NAMES.map((part) => [part, color()])) as Record<
      PartName,
      ReturnType<typeof color>
    >;

  it("resolves one colour per part", () => {
    const mapped = toSavedConfig({ _id: new Types.ObjectId(), name: null, ...everyPart() });
    expect(Object.keys(mapped?.colors ?? {})).toEqual([...PART_NAMES]);
    expect(mapped?.name).toBeNull();
  });

  it("is null when one part's colour no longer exists", () => {
    expect(toSavedConfig({ _id: new Types.ObjectId(), ...everyPart(), dpad: null })).toBeNull();
  });
});
