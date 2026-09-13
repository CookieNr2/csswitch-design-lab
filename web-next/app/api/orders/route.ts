import { NextResponse } from "next/server";
import { apiUser, badRequest, readJson } from "@/lib/api";
import { createOrder, describeError } from "@/lib/mutations";
import { firstIssue, orderBodySchema } from "@/lib/schemas";

export const POST = async (request: Request) => {
  const user = await apiUser(request);

  const parsed = orderBodySchema.safeParse(await readJson(request));
  if (!parsed.success) return badRequest(firstIssue(parsed.error));

  const { switchConfig, ...order } = parsed.data;
  const switchConfigId = typeof switchConfig === "string" ? switchConfig : switchConfig._id;

  try {
    const id = await createOrder({
      ...order,
      ownerId: user?._id ?? null,
      switchConfigId,
    });
    return NextResponse.json({ _id: id }, { status: 201 });
  } catch (error) {
    return badRequest(describeError(error));
  }
};
