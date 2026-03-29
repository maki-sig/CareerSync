"use client"

import { useRouter } from "next/navigation"
import { useDashboard } from "../dashboard/layout"
import "../styles/nav.css"

export default function Sidebar() {
    const router = useRouter()
    const { sidebarOpen, setSidebarOpen } = useDashboard()

    const handleLogout = () => {
        // Clear session cookies
        document.cookie = "careersync_user_id=; path=/; max-age=0";
        document.cookie = "careersync_submitted=; path=/; max-age=0";

        // Redirect home or to login
        router.push("/")
        setSidebarOpen(false)
    }

    const navigate = (path: string) => {
        router.push(path)
        setSidebarOpen(false)
    }

    return (
        <div className={`side-bar ${sidebarOpen ? "is-open" : ""}`}>
            <div className="side-bar-top">
                <button 
                    className="submit-btn btn-txt" 
                    onClick={() => navigate("/dashboard/forms")}
                >
                    Sync with a Career
                </button>
                <button 
                    className="secondary-btn btn-txt" 
                    onClick={() => navigate("/dashboard")}
                >
                    Dashboard
                </button>
            </div>
            
            <button className="btn-txt logout-btn" onClick={handleLogout}>
                Logout
            </button>
        </div>
    )
}