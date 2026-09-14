import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { badRequest, readJson, unauthorized } from "@/lib/server/api";
import { getCurrentUser } from "@/lib/server/auth";
import { CONFIGS_TAG, createConfig, getUserConfigs } from "@/lib/server/configs";
import { describeError } from "@/lib/server/errors";
import { configBodySchema, firstIssue } from "@/lib/schemas";

/** The signed-in user's own designs. */
export const GET = async () => {
  const user = await getCurrentUser();
  if (!user) return unauthorized();

  return NextResponse.json(await getUserConfigs(user));
};

export const POST = async (request: Request) => {
  // Anonymous saves are allowed: a design can be ordered without an account.
  const user = await getCurrentUser();

  const parsed = configBodySchema.safeParse(await readJson(request));
  if (!parsed.success) return badRequest(firstIssue(parsed.error));

  const { name, ...colors } = parsed.data;

  try {
    const id = await createConfig(user, { name, colors });
    revalidateTag(CONFIGS_TAG, "max");
    return NextResponse.json({ _id: id }, { status: 201 });
  } catch (error) {
    return badRequest(describeError(error));
  }
};
