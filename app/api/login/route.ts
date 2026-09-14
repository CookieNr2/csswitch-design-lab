import { NextResponse } from "next/server";
import { signSessionToken, startSession } from "@/lib/server/auth";
import { authenticate } from "@/lib/server/mutations";
import { badRequest, readJson } from "@/lib/server/api";
import { firstIssue, loginSchema } from "@/lib/schemas";

export const POST = async (request: Request) => {
  const parsed = loginSchema.safeParse(await readJson(request));
  if (!parsed.success) return badRequest(firstIssue(parsed.error));

  const userId = await authenticate(parsed.data.email, parsed.data.password);
  if (!userId) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  // Cookie for the app, token in the body for API clients.
  await startSession(userId);
  return NextResponse.json({ accessToken: await signSessionToken(userId) });
};
