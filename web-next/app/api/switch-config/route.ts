import { NextResponse } from "next/server";
import { apiUser, badRequest, readJson, unauthorized } from "@/lib/api";
import { createConfig, describeError } from "@/lib/mutations";
import { getUserConfigs } from "@/lib/queries";
import { configBodySchema, firstIssue } from "@/lib/schemas";

export const GET = async (request: Request) => {
  const user = await apiUser(request);
  if (!user) return unauthorized();

  return NextResponse.json(await getUserConfigs(user._id));
};

export const POST = async (request: Request) => {
  // Anonymous saves are allowed: a design can be ordered without an account.
  const user = await apiUser(request);

  const parsed = configBodySchema.safeParse(await readJson(request));
  if (!parsed.success) return badRequest(firstIssue(parsed.error));

  const { name, ...colors } = parsed.data;

  try {
    const id = await createConfig({ ownerId: user?._id ?? null, name, colors });
    return NextResponse.json({ _id: id }, { status: 201 });
  } catch (error) {
    return badRequest(describeError(error));
  }
};
