"use client"

import { useRouter } from "next/navigation"
import "../styles/nav.css"
import Spark from "@/public/gemini.svg"

export default function Navbar() {
    const router = useRouter()

    const handleLogout = () => {
        // Clear session cookies
        document.cookie = "careersync_user_id=; path=/; max-age=0";
        document.cookie = "careersync_submitted=; path=/; max-age=0";

        // Redirect home or to login
        router.push("/")
    }

    return (
        <div className="head-grp">

            <div className="nav-bar">
                <Spark />
                <button className="btn-txt" onClick={handleLogout}>Logout</button>
            </div>

            {/* divider line matching header style but no progress logic */}
            <div className="progress-bar-track">
                <div className="progress-bar-fill" style={{ width: "0%" }} />
            </div>

        </div>
    )
}