"use client"

import { useRouter, usePathname } from "next/navigation"
import { useDashboard } from "../dashboard/layout"
import "../styles/nav.css"
import Spark from "@/public/gemini.svg"
import ResetIcon from "@/public/reset.svg"
import ToggleTheme from "./themetoggle"

interface NavbarProps {
    progress?: number // 0 to 100
}

function MenuIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

export default function Navbar({ progress = 0 }: NavbarProps) {
    const { setSidebarOpen, resetSurvey } = useDashboard()
    const router = useRouter()
    const pathname = usePathname()
    const isFormsPage = pathname?.includes("/dashboard/forms")

    const handleReset = () => {
        if (window.confirm("Are you sure you want to reset your survey progress?")) {
            // Clear persistent data
            sessionStorage.removeItem("careersync_results")
            sessionStorage.removeItem("careersync_data")
            document.cookie = "careersync_submitted=; path=/; max-age=0"
            
            // Trigger internal reset in FormsClient via context
            resetSurvey()
            
            // Navigate back to start (Landing step in Forms)
            router.push("/dashboard/forms")
        }
    }

    return (
        <div className="head-grp">

            <div className="nav-bar">
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <button className="menu-toggle" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
                        <MenuIcon />
                    </button>
                    <Spark />
                </div>
                
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                    {isFormsPage && (
                        <button 
                            className="reset-btn" 
                            onClick={handleReset} 
                            title="Reset Progress"
                            aria-label="Reset Survey"
                        >
                            <ResetIcon />
                        </button>
                    )}
                    <ToggleTheme />
                </div>
            </div>

            {/* divider line with optional progress */}
            <div className="progress-bar-track">
                <div 
                    className={`progress-bar-fill ${progress === 0 ? "resetting" : ""}`}
                    style={{ width: `${progress}%` }} 
                />
            </div>

        </div>
    )
}