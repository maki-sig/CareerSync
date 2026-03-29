import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server"

export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // ── Supabase session refresh ─────────────────────────────
    let response = NextResponse.next({ request });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() { return request.cookies.getAll(); },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // Refresh auth token
    await supabase.auth.getUser(); 
    
    // ── Auth Logic ───────────────────────────────────────────
    const userID = request.cookies.get("careersync_user_id")?.value;
    const isDashboard = pathname.startsWith("/dashboard");
    const isPortal = pathname.startsWith("/portal");
    const isApiChat = pathname.startsWith("/api/chat");

    // 1. GUEST ACCESS: Redirect from dashboard back to portal
    if (!userID) {
        if (isDashboard) {
            return NextResponse.redirect(new URL("/portal", request.url));
        }
        if (isApiChat) {
            return new NextResponse(
                JSON.stringify({ error: "unauthorized" }),
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }
    }

    // 2. AUTHENTICATED ACCESS: Redirect from portal back to dashboard
    if (userID && isPortal) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // 3. RESULTS PROTECTION: Ensure user submitted survey before viewing fresh results
    // We allow access if it's a specific historical result (has an ID in pathname) OR if it's a fresh submission (has submitted cookie)
    const isResultsPage = pathname.startsWith("/dashboard/results") || pathname.startsWith("/results");
    const isSpecificResult = pathname.split("/").length > 3; // e.g., /dashboard/results/[id]

    if (isResultsPage && !isSpecificResult) {
        const submitted = request.cookies.get("careersync_submitted")?.value
        if (submitted !== "true") {
            return NextResponse.redirect(new URL("/dashboard", request.url))
        }
    }

    return response;
}

export const config = {
    matcher: ["/dashboard/:path*", "/portal/:path*", "/api/chat/:path*"],
}