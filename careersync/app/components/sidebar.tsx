"use client"

import { useRouter } from "next/navigation"
import "../styles/nav.css"

export default function Sidebar() {
    const router = useRouter()

    const handleSync = () => {
        router.push("/forms")
    }

    const handleLogout = () => {
        document.cookie = "careersync_user_id=; path=/; max-age=0";
        document.cookie = "careersync_submitted=; path=/; max-age=0";
        router.push("/")
    }

    return (
        <div className="side-bar">
            <button className="submit-btn btn-txt" onClick={handleSync}>
                Sync with a Career
            </button>
            <span className="option-txt" onClick={() => router.push("/dashboard")}>
                Dashboard
            </span>
            <span className="option-txt" onClick={() => router.push("/forms")}>
                Forms
            </span>
        </div>
    )
}