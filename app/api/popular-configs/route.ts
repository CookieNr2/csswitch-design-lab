import { NextResponse } from "next/server";
import { getPopularConfigs } from "@/lib/server/queries";

export const GET = async () => {
  return NextResponse.json(await getPopularConfigs(6));
};
