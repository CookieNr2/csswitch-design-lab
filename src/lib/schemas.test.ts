import { describe, expect, it } from "vitest";
import {
  accountSchema,
  configBodySchema,
  firstIssue,
  loginSchema,
  orderSchema,
  registerSchema,
} from "@/lib/schemas";
import { PART_NAMES } from "@/lib/types";

const COLOR_ID = "66473694a78ca1580c04ee12";
const everyPart = Object.fromEntries(PART_NAMES.map((part) => [part, COLOR_ID]));

describe("loginSchema", () => {
  it("normalises the email before checking it", () => {
    const parsed = loginSchema.parse({ email: "  Ada@Example.COM ", password: "x" });
    expect(parsed.email).toBe("ada@example.com");
  });
});

describe("registerSchema", () => {
  const user = {
    firstName: "Ada",
    lastName: "Lovelace",
    email: "ada@example.com",
    password: "Secret#123",
  };

  it("accepts a password with an upper-case letter, a digit and a symbol", () => {
    expect(registerSchema.safeParse(user).success).toBe(true);
  });

  it.each(["secret#123", "Secret#abc", "Secret123", "Se#1"])(
    "rejects the weak password %s",
    (password) => {
      expect(registerSchema.safeParse({ ...user, password }).success).toBe(false);
    }
  );

  it("reports the first problem in words the form can show", () => {
    const result = registerSchema.safeParse({ ...user, firstName: "   " });
    expect(result.success).toBe(false);
    if (!result.success) expect(firstIssue(result.error)).toBe("First name is required");
  });
});

describe("configBodySchema", () => {
  it("accepts one colour id per part and trims the name", () => {
    const parsed = configBodySchema.parse({ ...everyPart, name: "  Sunset  " });
    expect(parsed.name).toBe("Sunset");
  });

  it("requires every part", () => {
    const { body: _body, ...withoutBody } = everyPart;
    expect(configBodySchema.safeParse(withoutBody).success).toBe(false);
  });

  it.each(["#353535", "abcdefghijkl", "66473694a78ca1580c04ee1"])(
    "rejects %s, which is not a 24-character hex ObjectId",
    (id) => {
      expect(configBodySchema.safeParse({ ...everyPart, body: id }).success).toBe(false);
    }
  );
});

describe("orderSchema", () => {
  const order = {
    firstName: "Ada",
    lastName: "Lovelace",
    email: "ada@example.com",
    location: { street: "Calle Mayor 1", postalCode: "28013" },
    paymentMethod: { type: "Visa", cardNumber: "4111 1111 1111 1111" },
  };

  it("accepts a complete order", () => {
    expect(orderSchema.safeParse(order).success).toBe(true);
  });

  it("rejects a postal code with letters in it", () => {
    const location = { ...order.location, postalCode: "28A13" };
    expect(orderSchema.safeParse({ ...order, location }).success).toBe(false);
  });
});

describe("accountSchema", () => {
  const account = { firstName: "Ada", lastName: "Lovelace", email: "ada@example.com" };

  it("lets the address and payment fields stay empty", () => {
    const empty = { street: "", postalCode: "", paymentMethodType: "", cardNumber: "" };
    expect(accountSchema.safeParse({ ...account, ...empty }).success).toBe(true);
  });

  it("only accepts the payment methods the account form offers", () => {
    expect(accountSchema.safeParse({ ...account, paymentMethodType: "Amex" }).success).toBe(false);
  });
});
