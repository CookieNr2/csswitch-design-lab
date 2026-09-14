import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { badRequest, noContent, notFound, readJson, unauthorized } from "@/lib/server/api";
import { getCurrentUser } from "@/lib/server/auth";
import { CONFIGS_TAG, deleteConfig, getUserConfig, updateConfig } from "@/lib/server/configs";
import { describeError } from "@/lib/server/errors";
import { configBodySchema, firstIssue, partColorsSchema } from "@/lib/schemas";

type Context = { params: Promise<{ id: string }> };

const NOT_FOUND = "Configuration not found";

/** Every method here works on the caller's own designs only. */
export const GET = async (_request: Request, { params }: Context) => {
  const user = await getCurrentUser();
  if (!user) return unauthorized();

  const config = await getUserConfig(user, (await params).id);
  return config ? NextResponse.json(config) : notFound(NOT_FOUND);
};

export const PATCH = async (request: Request, { params }: Context) => {
  const user = await getCurrentUser();
  if (!user) return unauthorized();

  const { id } = await params;
  const parsed = configBodySchema.partial().safeParse(await readJson(request));
  if (!parsed.success) return badRequest(firstIssue(parsed.error));

  const { name, ...someColors } = parsed.data;
  // Colours are all-or-nothing: a partial set would leave the design invalid.
  const colors = partColorsSchema.safeParse(someColors);
  if (Object.keys(someColors).length > 0 && !colors.success) {
    return badRequest("Send a colour for every part, or none.");
  }

  try {
    const updated = await updateConfig(user, id, {
      name,
      colors: colors.success ? colors.data : undefined,
    });
    if (!updated) return notFound(NOT_FOUND);

    revalidateTag(CONFIGS_TAG, "max");
    return NextResponse.json(await getUserConfig(user, id));
  } catch (error) {
    return badRequest(describeError(error));
  }
};

export const DELETE = async (_request: Request, { params }: Context) => {
  const user = await getCurrentUser();
  if (!user) return unauthorized();

  const deleted = await deleteConfig(user, (await params).id);
  if (!deleted) return notFound(NOT_FOUND);

  revalidateTag(CONFIGS_TAG, "max");
  return noContent();
};
