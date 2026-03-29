"use client"

import { useRouter } from "next/navigation"
import { useDashboard } from "../dashboard/layout"
import "../styles/nav.css"
import Spark from "@/public/gemini.svg"
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
    const { setSidebarOpen } = useDashboard()

    return (
        <div className="head-grp">

            <div className="nav-bar">
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <button className="menu-toggle" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
                        <MenuIcon />
                    </button>
                    <Spark />
                </div>
                <ToggleTheme />
            </div>

            {/* divider line with optional progress */}
            <div className="progress-bar-track">
                <div 
                    className="progress-bar-fill" 
                    style={{ width: `${progress}%` }} 
                />
            </div>

        </div>
    )
}