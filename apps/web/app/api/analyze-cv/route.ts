import { proxyToAI } from "@/lib/api";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  return proxyToAI("/analyze-cv", payload);
}
