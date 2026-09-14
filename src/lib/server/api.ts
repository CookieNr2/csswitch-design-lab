import "server-only";
import { NextResponse } from "next/server";

/** Responses and body parsing shared by the Route Handlers in app/api. */

export const unauthorized = () => {
  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
};

export const notFound = (message = "Not found") => {
  return NextResponse.json({ message }, { status: 404 });
};

export const badRequest = (message: string) => {
  return NextResponse.json({ message }, { status: 400 });
};

export const noContent = () => {
  return new NextResponse(null, { status: 204 });
};

export const readJson = async (request: Request): Promise<Record<string, unknown>> => {
  try {
    const body = await request.json();
    return typeof body === "object" && body !== null
      ? (body as Record<string, unknown>)
      : {};
  } catch {
    return {};
  }
};
