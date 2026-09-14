import { NextResponse } from "next/server";
import { getSwitchParts } from "@/lib/server/catalog";

export const GET = async () => {
  return NextResponse.json(await getSwitchParts());
};
