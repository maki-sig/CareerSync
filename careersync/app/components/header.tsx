"use client"

import { useRouter } from "next/navigation"
import ThemeToggle from "./themetoggle"
import "../styles/nav.css"
import Spark from "@/public/gemini.svg"

export default function Header() {
    const router = useRouter()

    const handleRestart = () => {
        router.push("/")
    }

    return (
        <div className="head-grp">

            <div className="nav-bar">
                <Spark />
                <button className="btn-txt" onClick={handleRestart}>Restart</button>
            </div>

            <ThemeToggle />

        </div>
    )
}