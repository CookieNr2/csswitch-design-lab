"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { endSession, getCurrentUser } from "@/lib/auth";
import { deleteAccount, describeError, updateAccount } from "@/lib/mutations";
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
    const updated = await updateAccount(user._id, parsed.data);
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
    await deleteAccount(user._id);
    await endSession();
  } catch (error) {
    return failed(describeError(error));
  }

  revalidatePath("/", "layout");
  redirect("/");
};
