import { NextResponse } from "next/server";
import { endSession } from "@/lib/server/auth";

export const POST = async () => {
  await endSession();
  return new NextResponse(null, { status: 204 });
};
