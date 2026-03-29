"use client"

import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"
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
            <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default function Navbar({ progress = 0 }: NavbarProps) {
    const { sidebarOpen, setSidebarOpen, resetSurvey } = useDashboard()
    const router = useRouter()
    const pathname = usePathname()
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    // Logic for conditional states
    const isRootPage = pathname === "/"
    const isFormsPage = pathname?.includes("/dashboard/forms")
    const isPortalPage = pathname === "/portal"

    const handleReset = () => {
        if (window.confirm("Are you sure you want to reset your survey progress?")) {
            sessionStorage.removeItem("careersync_results")
            sessionStorage.removeItem("careersync_data")
            document.cookie = "careersync_submitted=; path=/; max-age=0"
            resetSurvey()
            router.push("/dashboard/forms")
        }
    }

    return (
        <div className="head-grp">
            <div className="nav-bar">
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {/* Hide Menu Button if at root or portal on mobile */}
                    {!isRootPage && !(isPortalPage && isMobile) && (
                        <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle menu">
                            <MenuIcon />
                        </button>
                    )}

                    {/* Conditional Branding: Link if not at root, plain div if at root */}
                    {isRootPage ? (
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", opacity: 0.8 }}>
                            <Spark />
                            <span className="option-txt">CareerSync</span>
                        </div>
                    ) : (
                        <Link
                            href="/"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                textDecoration: "none",
                                color: "inherit",
                                cursor: "pointer"
                            }}
                        >
                            <Spark />
                            <span className="option-txt">CareerSync</span>
                        </Link>
                    )}
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

            <div className="progress-bar-track">
                <div
                    className={`progress-bar-fill ${progress === 0 ? "resetting" : ""}`}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    )
}