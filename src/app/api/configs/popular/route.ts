import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { badRequest } from "@/lib/server/api";
import { getPopularConfigs } from "@/lib/server/configs";
import { firstIssue } from "@/lib/schemas";

/** `?limit=` caps the list (default 6); `?limit=0` returns every distinct design. */
const querySchema = z.object({
  limit: z.coerce.number().int().min(0).max(100).default(6),
});

export const GET = async (request: NextRequest) => {
  const parsed = querySchema.safeParse({
    limit: request.nextUrl.searchParams.get("limit") ?? undefined,
  });
  if (!parsed.success) return badRequest(firstIssue(parsed.error));

  return NextResponse.json(await getPopularConfigs(parsed.data.limit));
};
