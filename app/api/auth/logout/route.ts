import { noContent } from "@/lib/server/api";
import { endSession } from "@/lib/server/auth";

export const POST = async () => {
  await endSession();
  return noContent();
};
