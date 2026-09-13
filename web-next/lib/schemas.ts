import { z } from "zod";
import { isValidObjectId } from "mongoose";
import { PART_NAMES } from "@/lib/types";
import { PASSWORD_MESSAGE, PASSWORD_REGEX } from "@/lib/password";

/** Every value that reaches the database is parsed by one of these first. */

const objectId = z
  .string()
  .refine((value) => isValidObjectId(value), "Not a valid id");

const trimmed = (label: string, max = 200) =>
  z.string().trim().min(1, `${label} is required`).max(max);

export const emailSchema = z.string().trim().toLowerCase().email("Enter a valid email address");

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  firstName: trimmed("First name"),
  lastName: trimmed("Last name"),
  email: emailSchema,
  password: z.string().regex(PASSWORD_REGEX, PASSWORD_MESSAGE),
});

export const accountSchema = z.object({
  firstName: trimmed("First name"),
  lastName: trimmed("Last name"),
  email: emailSchema,
  street: z.string().trim().max(200).optional().or(z.literal("")),
  postalCode: z
    .string()
    .trim()
    .regex(/^\d*$/, "Postal code must be digits")
    .max(10)
    .optional()
    .or(z.literal("")),
  paymentMethodType: z.enum(["Visa", "Master Card"]).optional().or(z.literal("")),
  cardNumber: z
    .string()
    .trim()
    .regex(/^[\d ]*$/, "Card number must be digits")
    .max(24)
    .optional()
    .or(z.literal("")),
});

/** One colour id per configurable part. Rejects unknown keys by construction. */
export const partColorsSchema = z.object(
  Object.fromEntries(PART_NAMES.map((part) => [part, objectId])) as Record<
    (typeof PART_NAMES)[number],
    typeof objectId
  >
);

export const configSchema = z.object({
  name: z.string().trim().max(120).optional(),
  colors: partColorsSchema,
});

export const orderSchema = z.object({
  firstName: trimmed("First name"),
  lastName: trimmed("Last name"),
  email: emailSchema,
  location: z.object({
    street: trimmed("Street"),
    postalCode: z.string().trim().regex(/^\d+$/, "Postal code must be digits"),
  }),
  paymentMethod: z.object({
    type: trimmed("Payment method"),
    cardNumber: z.string().trim().regex(/^[\d ]+$/, "Card number must be digits"),
  }),
});

/** The REST shape: colours sit at the top level next to `name`. */
export const configBodySchema = partColorsSchema.extend({
  name: z.string().trim().max(120).optional(),
});

export const orderBodySchema = orderSchema.extend({
  switchConfig: z.union([objectId, z.object({ _id: objectId })]),
});

/** First message from a failed parse, suitable for showing a user. */
export const firstIssue = (error: z.ZodError): string =>
  error.issues[0]?.message ?? "Please review the form data.";

export type LoginFields = z.infer<typeof loginSchema>;
export type RegisterFields = z.infer<typeof registerSchema>;
export type AccountFields = z.infer<typeof accountSchema>;
export type OrderFields = z.infer<typeof orderSchema>;
export type ConfigFields = z.infer<typeof configSchema>;
