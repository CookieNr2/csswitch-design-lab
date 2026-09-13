import { NextResponse } from "next/server";
import { getPopularConfigs } from "@/lib/queries";

export const GET = async () => {
  return NextResponse.json(await getPopularConfigs(0));
};
