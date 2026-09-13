import { describe, expect, it } from "vitest";
import { failed, fields, succeeded } from "@/lib/form-state";

describe("fields", () => {
  it("keeps text values and drops uploaded files", () => {
    const formData = new FormData();
    formData.set("email", "ada@example.com");
    formData.set("avatar", new File(["x"], "avatar.png"));

    expect(fields(formData)).toEqual({ email: "ada@example.com" });
  });
});

describe("failed and succeeded", () => {
  it("build the states that FormAlert renders", () => {
    expect(failed("Nope")).toEqual({ status: "error", message: "Nope" });
    expect(succeeded("Saved")).toEqual({ status: "success", message: "Saved" });
  });
});
