import { NextResponse } from "next/server";
import { getSwitchParts } from "@/lib/queries";

export const GET = async () => {
  return NextResponse.json(await getSwitchParts());
};
