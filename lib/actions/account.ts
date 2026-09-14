"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { endSession, getCurrentUser } from "@/lib/server/auth";
import { CONFIGS_TAG } from "@/lib/server/configs";
import { describeError } from "@/lib/server/errors";
import { deleteAccount, updateAccount } from "@/lib/server/users";
import { failed, fields, succeeded, type FormState } from "@/lib/form-state";
import { accountSchema, firstIssue } from "@/lib/schemas";

export const updateAccountAction = async (
  _previous: FormState,
  formData: FormData
): Promise<FormState> => {
  const user = await getCurrentUser();
  if (!user) return failed("Please log in first.");

  const parsed = accountSchema.safeParse(fields(formData));
  if (!parsed.success) return failed(firstIssue(parsed.error));

  try {
    const updated = await updateAccount(user, parsed.data);
    if (!updated) return failed("User not found.");
  } catch (error) {
    return failed(describeError(error));
  }

  revalidatePath("/", "layout");
  return succeeded("Account updated successfully.");
};

export const deleteAccountAction = async (
  _previous: FormState,
  _formData: FormData
): Promise<FormState> => {
  const user = await getCurrentUser();
  if (!user) return failed("Please log in first.");

  try {
    await deleteAccount(user);
    await endSession();
  } catch (error) {
    return failed(describeError(error));
  }

  // The account's designs are gone, so the popular galleries change too.
  updateTag(CONFIGS_TAG);
  revalidatePath("/", "layout");
  redirect("/");
};
