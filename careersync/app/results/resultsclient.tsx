"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Spark from "@/public/gemini.svg"
import "../styles/results.css"
import ThemeToggle from "../components/themetoggle"

interface ResultsData {
    role: string
    summary: string
    reason: string
    confidence: number
    keySkills: string[]
    careerPath: string[]
    salaryMin: number
    salaryMax: number
    error?: "quota_exceeded" | "api_error"
}

export default function Results() {
    const router = useRouter()
    const [data, setData] = useState<ResultsData | null>(null)

    useEffect(() => {
        const raw = sessionStorage.getItem("careersync_results")
        if (!raw) { router.push("/"); return }
        try {
            setData(JSON.parse(raw))
        } catch {
            router.push("/")
        }
    }, [router])

    const handleRestart = () => {
        sessionStorage.removeItem("careersync_results")
        sessionStorage.removeItem("careersync_data")
        document.cookie = "careersync_submitted=; path=/; max-age=0"
        router.push("/")
    }

    const handlePrint = () => {
        window.print()
    }

    if (!data) return null

    if (data.error === "quota_exceeded") {
        return (
            <>
                <ThemeToggle />
                <div className="results-section">
                    <Spark />
                    <h1 className="title-txt">Service Unavailable</h1>
                    <div className="results-card error-card">
                        <span className="option-txt">We've temporarily hit our API limit. Please try again in a few minutes.</span>
                        <span className="caption-txt">Please try again later.</span>
                    </div>
                    <button className="submit-btn btn-txt" onClick={handleRestart}>Try Again</button>
                </div>
            </>
        )
    }

    if (data.error === "api_error") {
        return (
            <>
                <ThemeToggle />
                <div className="results-section">
                    <Spark />
                    <h1 className="title-txt">Something Went Wrong</h1>
                    <div className="results-card error-card">
                        <span className="option-txt">We ran into an unexpected error while analyzing your results.</span>
                        <span className="caption-txt">Please try again later.</span>
                    </div>
                    <button className="submit-btn btn-txt" onClick={handleRestart}>Try Again</button>
                </div>
            </>
        )
    }

    return (
        <>
            <ThemeToggle />
            <div className="results-section">
                <Spark />
                <div className="results-row">

                    <div className="results-card">
                        <h1 className="question-txt">You are {data.role}</h1>
                        {data.salaryMin && data.salaryMax && (
                            <span className="caption-txt">
                                PHP {data.salaryMin.toLocaleString()} – PHP {data.salaryMax.toLocaleString()} / year
                            </span>
                        )}
                        <span className="option-txt">{data.summary}</span>
                        <span className="option-txt">{data.reason}</span>
                        <span className="caption-txt confidence">{data.confidence}% confidence match</span>
                        <div className="confidence-track">
                            <div className="confidence-fill" style={{ width: `${data.confidence}%` }} />
                        </div>
                    </div>

                    <div className="path-card">
                        <span className="option-txt sub-label">How to Become {data.role}</span>
                        {(data.careerPath ?? []).map((step, i) => (
                            <span key={i} className="caption-txt">
                                <span className="caption-txt">{String(i + 1).padStart(2, "0")}. </span>
                                {step}
                            </span>
                        ))}
                    </div>

                    <div className="key-card">
                        <span className="option-txt sub-label">Key Skills to Learn</span>
                        <div className="skill-grid">
                            {(data.keySkills ?? []).map((skill, i) => (
                                <span key={i} className="caption-txt">
                                    <span className="caption-txt">{String(i + 1).padStart(2, "0")}. </span>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>

                <div className="btn-row">
                    <button className="retry-btn btn-txt" onClick={handleRestart}>
                        Retry
                    </button>
                    <button className="submit-btn btn-txt" onClick={handlePrint}>
                        Print
                    </button>
                </div>
            </div>
        </>
    )
}