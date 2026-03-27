import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server"

export default async function proxy(request: NextRequest) {
    const { pathname, searchParams } = request.nextUrl

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

    await supabase.auth.getUser(); 
    
    // if (pathname === "/forms") {
    //     const program = searchParams.get("program")
    //     if (program !== "CS" && program !== "IT") {
    //         return NextResponse.redirect(new URL("/", request.url))
    //     }
    // }

    // ── Auth Check ───────────────────────────────────────────
    const userID = request.cookies.get("careersync_user_id")?.value;
    const isApiChat = pathname.startsWith("/api/chat");
    const isProtectedRoute = pathname === "/forms" || pathname === "/results";

    if (!userID) {
        if (isProtectedRoute) {
            return NextResponse.redirect(new URL("/", request.url));
        }
        if (isApiChat) {
            return new NextResponse(
                JSON.stringify({ error: "unauthorized" }),
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }
    }

    if (pathname === "/results") {
        const submitted = request.cookies.get("careersync_submitted")?.value
        if (submitted !== "true") {
            return NextResponse.redirect(new URL("/", request.url))
        }
    }

    return response;
}

export const config = {
    matcher: ["/forms", "/results", "/api/chat/:path*"],
}