import { NextResponse } from "next/server";
import { getColors } from "@/lib/server/catalog";

export const GET = async () => {
  return NextResponse.json(await getColors());
};
