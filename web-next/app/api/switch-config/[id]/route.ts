import { NextResponse } from "next/server";
import { apiUser, badRequest, notFound, readJson, unauthorized } from "@/lib/api";
import { deleteConfig, describeError, updateConfig } from "@/lib/mutations";
import { getConfigById } from "@/lib/queries";
import { configBodySchema, firstIssue } from "@/lib/schemas";

type Context = { params: Promise<{ id: string }> };

export const GET = async (request: Request, { params }: Context) => {
  const user = await apiUser(request);
  if (!user) return unauthorized();

  const { id } = await params;
  const config = await getConfigById(id);
  return config ? NextResponse.json(config) : notFound("Configuration not found");
};

export const PATCH = async (request: Request, { params }: Context) => {
  const user = await apiUser(request);
  if (!user) return unauthorized();

  const { id } = await params;
  const parsed = configBodySchema.partial().safeParse(await readJson(request));
  if (!parsed.success) return badRequest(firstIssue(parsed.error));

  const { name, ...rest } = parsed.data;
  // Colours are all-or-nothing: a partial set would leave the design invalid.
  const complete = configBodySchema.omit({ name: true }).safeParse(rest);

  try {
    const updated = await updateConfig(user._id, id, {
      name,
      colors: complete.success ? complete.data : undefined,
    });
    return updated
      ? NextResponse.json(await getConfigById(id))
      : notFound("Configuration not found");
  } catch (error) {
    return badRequest(describeError(error));
  }
};

export const DELETE = async (request: Request, { params }: Context) => {
  const user = await apiUser(request);
  if (!user) return unauthorized();

  const { id } = await params;
  const deleted = await deleteConfig(user._id, id);
  return deleted
    ? new NextResponse(null, { status: 204 })
    : notFound("Configuration not found");
};
