import { createSupabaseRouteHandlerClient } from "@/lib/supabase/route-handler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const redirectTo = request.nextUrl.searchParams.get("redirect_to") || "/dashboard/candidate";

  if (!code) {
    return NextResponse.redirect(new URL("/?auth=missing_code", request.url));
  }

  const response = NextResponse.redirect(new URL(redirectTo, request.url));
  const supabase = createSupabaseRouteHandlerClient(request, response);

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(new URL(`/?auth=callback_error&message=${encodeURIComponent(error.message)}`, request.url));
  }

  return response;
}
