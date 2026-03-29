"use client"

import { useRouter } from "next/navigation"
import "../styles/nav.css"
import Spark from "@/public/gemini.svg"
import ToggleTheme from "./themetoggle"

interface NavbarProps {
    progress?: number // 0 to 100
}

export default function Navbar({ progress = 0 }: NavbarProps) {
    const router = useRouter()

    return (
        <div className="head-grp">

            <div className="nav-bar">
                <Spark />
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