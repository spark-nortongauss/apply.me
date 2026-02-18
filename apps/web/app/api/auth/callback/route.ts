import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const redirectTo = request.nextUrl.searchParams.get("redirect_to") || "/dashboard/candidate";

  if (!code) {
    return NextResponse.redirect(new URL("/?auth=missing_code", request.url));
  }

  // Supabase exchange for session is handled client-side with @supabase/auth-helpers-nextjs.
  return NextResponse.redirect(new URL(redirectTo, request.url));
}
