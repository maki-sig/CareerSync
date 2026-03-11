"use client"

import { useRouter } from "next/navigation"
import Spark from "@/public/gemini.svg"
import "../styles/results.css"
import ThemeToggle from "../components/themetoggle"
export default function Results() {
    const router = useRouter()

    const handleRestart = () => {
        router.push("/")
    }

    return(
        <>
        <ThemeToggle />
        <div className="results-section">
            <Spark />
            <h1 className="title-txt">
                You Synced as 
            </h1>
            <div className="results-card">
                <span className="option-txt">Reasoning here</span>
                <span className="caption-txt">Confidence here</span>
            </div>
            <button className="submit-btn btn-txt" onClick={handleRestart}>
                CareerSync
            </button>
        </div>
        </>
    )
}