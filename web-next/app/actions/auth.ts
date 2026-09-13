"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { endSession, startSession } from "@/lib/auth";
import { authenticate, createUser, describeError } from "@/lib/mutations";
import { failed, fields, type FormState } from "@/lib/form-state";
import { firstIssue, loginSchema, registerSchema } from "@/lib/schemas";

export const loginAction = async (
  _previous: FormState,
  formData: FormData
): Promise<FormState> => {
  const parsed = loginSchema.safeParse(fields(formData));
  if (!parsed.success) return failed(firstIssue(parsed.error));

  try {
    const userId = await authenticate(parsed.data.email, parsed.data.password);
    if (!userId) return failed("Invalid email or password.");
    await startSession(userId);
  } catch (error) {
    return failed(describeError(error));
  }

  // Outside the try: redirect() signals by throwing, and a catch would swallow it.
  revalidatePath("/", "layout");
  redirect("/");
};

export const registerAction = async (
  _previous: FormState,
  formData: FormData
): Promise<FormState> => {
  const parsed = registerSchema.safeParse(fields(formData));
  if (!parsed.success) return failed(firstIssue(parsed.error));

  try {
    await createUser(parsed.data);
  } catch (error) {
    return failed(describeError(error));
  }

  redirect("/login");
};

export const logoutAction = async () => {
  await endSession();
  revalidatePath("/", "layout");
  redirect("/");
};
