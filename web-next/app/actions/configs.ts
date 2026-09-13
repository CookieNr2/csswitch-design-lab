"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/server/auth";
import { createConfig, deleteConfig, describeError, placeOrder } from "@/lib/server/mutations";
import { failed, fields, succeeded, type FormState } from "@/lib/form-state";
import { configBodySchema, firstIssue, orderSchema } from "@/lib/schemas";
import { CONFIGS_TAG } from "@/lib/server/queries";

const revalidateGalleries = () => {
  // updateTag (not revalidateTag) so the user immediately sees their own write.
  updateTag(CONFIGS_TAG);
  revalidatePath("/profile/configurations");
};

export const saveConfigAction = async (
  _previous: FormState,
  formData: FormData
): Promise<FormState> => {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const parsed = configBodySchema.safeParse(fields(formData));
  if (!parsed.success) return failed(firstIssue(parsed.error));

  const { name, ...colors } = parsed.data;

  try {
    await createConfig({ ownerId: user._id, name, colors });
  } catch (error) {
    return failed(describeError(error));
  }

  revalidateGalleries();
  redirect("/profile/configurations");
};

export const deleteConfigAction = async (
  _previous: FormState,
  formData: FormData
): Promise<FormState> => {
  const user = await getCurrentUser();
  if (!user) return failed("Please log in first.");

  const configId = formData.get("configId");
  if (typeof configId !== "string") return failed("Configuration not found.");

  try {
    const deleted = await deleteConfig(user._id, configId);
    if (!deleted) return failed("Configuration not found.");
  } catch (error) {
    return failed(describeError(error));
  }

  revalidateGalleries();
  return succeeded("Configuration deleted.");
};

export const placeOrderAction = async (
  _previous: FormState,
  formData: FormData
): Promise<FormState> => {
  const raw = fields(formData);

  const parsedOrder = orderSchema.safeParse({
    firstName: raw.firstName,
    lastName: raw.lastName,
    email: raw.email,
    location: { street: raw.street, postalCode: raw.postalCode },
    paymentMethod: { type: raw.paymentType, cardNumber: raw.cardNumber },
  });
  if (!parsedOrder.success) return failed(firstIssue(parsedOrder.error));

  const parsedConfig = configBodySchema.safeParse(raw);
  if (!parsedConfig.success) return failed(firstIssue(parsedConfig.error));

  const { name, ...colors } = parsedConfig.data;
  const user = await getCurrentUser();

  try {
    await placeOrder({
      order: parsedOrder.data,
      config: { name, colors },
      ownerId: user?._id ?? null,
    });
  } catch (error) {
    return failed(describeError(error));
  }

  revalidateGalleries();
  return succeeded("Your order has been created successfully!");
};
