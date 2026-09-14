import { NextResponse } from "next/server";
import { badRequest, readJson } from "@/lib/server/api";
import { getCurrentUser } from "@/lib/server/auth";
import { describeError } from "@/lib/server/errors";
import { createOrder } from "@/lib/server/orders";
import { firstIssue, orderBodySchema } from "@/lib/schemas";

export const POST = async (request: Request) => {
  // Anonymous orders are allowed, as in the configurator.
  const user = await getCurrentUser();

  const parsed = orderBodySchema.safeParse(await readJson(request));
  if (!parsed.success) return badRequest(firstIssue(parsed.error));

  const { switchConfig, ...order } = parsed.data;
  const switchConfigId = typeof switchConfig === "string" ? switchConfig : switchConfig._id;

  try {
    const id = await createOrder(user, order, switchConfigId);
    return NextResponse.json({ _id: id }, { status: 201 });
  } catch (error) {
    return badRequest(describeError(error));
  }
};
