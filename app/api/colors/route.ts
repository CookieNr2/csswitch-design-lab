import { NextResponse } from "next/server";
import { getColors } from "@/lib/server/queries";

export const GET = async () => {
  return NextResponse.json(await getColors());
};
