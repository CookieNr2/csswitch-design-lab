/** The value every form action returns, consumed by useActionState. */
export type FormState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "success"; message: string };

export const idleState: FormState = { status: "idle" };

export const failed = (message: string): FormState => ({ status: "error", message });

export const succeeded = (message: string): FormState => ({
  status: "success",
  message,
});

/** FormData values are `string | File`; every field here is a text input. */
export const fields = (formData: FormData): Record<string, string> => {
  const entries: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") entries[key] = value;
  }
  return entries;
};
