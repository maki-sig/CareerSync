"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Landing() {
    const router = useRouter()

    useEffect(() => {
        // Redirect logic on root entry
        const cookies = document.cookie.split("; ")
        const userCookie = cookies.find(c => c.startsWith("careersync_user_id="))
        const userID = userCookie?.split("=")[1]

        if (userID) {
            router.push("/dashboard/forms")
        } else {
            router.push("/portal")
        }
    }, [router])

    return (
        <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyItems: "center", backgroundColor: "var(--main-bg)" }}>
            {/* Minimal loading state while redirecting */}
        </div>
    )
}