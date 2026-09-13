import { NextResponse } from "next/server";
import { badRequest, readJson } from "@/lib/server/api";
import { createUser, describeError } from "@/lib/server/mutations";
import { firstIssue, registerSchema } from "@/lib/schemas";

export const POST = async (request: Request) => {
  const parsed = registerSchema.safeParse(await readJson(request));
  if (!parsed.success) return badRequest(firstIssue(parsed.error));

  try {
    const user = await createUser(parsed.data);
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return badRequest(describeError(error));
  }
};
