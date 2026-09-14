import "server-only";
import mongoose from "mongoose";

/** A rule the submitted data broke, with a message safe to show the user. */
export class ValidationFailure extends Error {}

/** MongoDB's error when a unique index rejects a write. */
export const isDuplicateKeyError = (error: unknown): boolean =>
  typeof error === "object" &&
  error !== null &&
  "code" in error &&
  (error as { code?: number }).code === 11000;

/** Turns a failure into something worth showing a person. */
export const describeError = (error: unknown): string => {
  if (error instanceof ValidationFailure) {
    return error.message;
  }
  if (error instanceof mongoose.Error.ValidationError) {
    const first = Object.values(error.errors)[0];
    return first?.message ?? "Please review the form data.";
  }
  console.error(error);
  return "Something went wrong. Please try again.";
};
