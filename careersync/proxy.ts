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

    // add auth later
    // here

    if (pathname === "/results") {
        const submitted = request.cookies.get("careersync_submitted")?.value
        if (submitted !== "true") {
            return NextResponse.redirect(new URL("/", request.url))
        }
    }

    return response;
}

export const config = {
    matcher: ["/forms", "/results", "/portal"],
}