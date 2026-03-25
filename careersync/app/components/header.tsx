"use client"

import { useRouter } from "next/navigation"
import ThemeToggle from "./themetoggle"
import "../styles/nav.css"
import Spark from "@/public/gemini.svg"

interface HeaderProps {
    page?: number
    totalPages?: number
    onRestart?: () => void
}

export default function Header({ page = 1, totalPages = 4, onRestart }: HeaderProps) {
    const router = useRouter()

    const handleRestart = () => {
        if (onRestart) {
            onRestart()
            return
        }
    }

    const progress = (page / totalPages) * 100

    return (
        <div className="head-grp">

            <div className="nav-bar">
                <Spark />
                <button className="btn-txt" onClick={handleRestart}>Restart</button>
            </div>

            <div className="progress-bar-track">
                <div
                    className="progress-bar-fill"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <ThemeToggle />

        </div>
    )
}