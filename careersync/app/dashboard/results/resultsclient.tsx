"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useProgress } from "../layout"
import { createClient } from "@/utils/supabase/client"
import Loading from "@/app/loading"
import PrintIcon from "@/public/print.svg"
import "../../styles/results.css"

interface ResultsData {
    role: string
    summary: string
    reason: string
    confidence: number
    keySkills: string[]
    careerPath: string[]
    salaryMin: number
    salaryMax: number
    error?: "quota_exceeded" | "api_error" | "not_found"
}

export default function Results() {
    const router = useRouter()
    const params = useParams()
    const careerID = params?.id as string

    const { setProgress } = useProgress()
    const [data, setData] = useState<ResultsData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Set progress to max on results page
        setProgress(100)

        async function loadData() {
            setLoading(true)
            const supabase = createClient()

            // 1. If we have a careerID, fetch from Supabase
            if (careerID) {
                const { data: dbData, error } = await supabase
                    .from("Career")
                    .select("*")
                    .eq("careerID", careerID)
                    .single()

                if (error || !dbData) {
                    console.error("Fetch career error:", error)
                    setData({ error: "not_found" } as any)
                    setLoading(false)
                    return
                }

                setData({
                    role: dbData.role,
                    summary: dbData.summary,
                    reason: dbData.reason,
                    confidence: dbData.confidence,
                    keySkills: dbData.keySkills.split(", "),
                    careerPath: dbData.careerPath.split("\n"),
                    salaryMin: dbData.salaryMin,
                    salaryMax: dbData.salaryMax
                })
                setLoading(false)
                return
            }

            // 2. If no ID, check sessionStorage (fresh result)
            const raw = sessionStorage.getItem("careersync_results")
            if (!raw) { router.push("/dashboard/forms"); return }
            try {
                setData(JSON.parse(raw))
            } catch {
                router.push("/dashboard/forms")
            }
            setLoading(false)
        }

        loadData()
    }, [router, setProgress, careerID])

    const handleRestart = () => {
        sessionStorage.removeItem("careersync_results")
        sessionStorage.removeItem("careersync_data")
        document.cookie = "careersync_submitted=; path=/; max-age=0"
        router.push("/dashboard/forms")
    }

    const handlePrint = () => {
        window.print()
    }

    const handleBack = () => {
        router.push("/dashboard")
    }

    if (loading) return <Loading />

    if (!data) return null

    if (data.error === "not_found") {
        return (
            <div className="results-section">
                <h1 className="title-txt">Career Not Found</h1>
                <div className="results-card error-card">
                    <span className="option-txt">This career recommendation might have been deleted or moved.</span>
                </div>
                <button className="secondary-btn btn-txt" onClick={handleBack}>Back</button>
            </div>
        )
    }

    if (data.error === "quota_exceeded") {
        return (
            <div className="results-section">
                <h1 className="title-txt">Service Unavailable</h1>
                <div className="results-card error-card">
                    <span className="option-txt">We've temporarily hit our API limit. Please try again in a few minutes.</span>
                    <span className="caption-txt">Please try again later.</span>
                </div>
                <button className="secondary-btn btn-txt" onClick={handleRestart}>Try Again</button>
            </div>
        )
    }

    if (data.error === "api_error") {
        return (
            <div className="results-section">
                <h1 className="title-txt">Something Went Wrong</h1>
                <div className="results-card error-card">
                    <span className="option-txt">We ran into an unexpected error while analyzing your results.</span>
                    <span className="caption-txt">Please try again later.</span>
                </div>
                <button className="secondary-btn btn-txt" onClick={handleRestart}>Try Again</button>
            </div>
        )
    }

    return (
        <div className="results-section">
            <div className="results-row">

                <div className="results-card">
                    <h1 className="question-txt">You synced with {data.role}</h1>
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
                    <span className="option-txt sub-label">{data.role} - Path Guide</span>
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
                <button className="secondary-btn btn-txt" onClick={careerID ? handleBack : handleRestart}>
                    {careerID ? "Back" : "Retry"}
                </button>
                <button className="submit-btn btn-txt" style={{ display: "flex", alignItems: "center", gap: "10px" }} onClick={handlePrint}>
                    <PrintIcon style={{ width: "20px", height: "20px" }} />
                    Save as PDF
                </button>
            </div>
        </div>
    )
}
