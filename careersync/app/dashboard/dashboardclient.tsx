"use client"

import { useEffect, useState, useCallback } from "react"
import { useProgress } from "./layout"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import ViewIcon from "@/public/eye.svg"
import DeleteIcon from "@/public/delete.svg"
import "../styles/dashboard.css"

interface CareerData {
    careerID: string
    role: string
    summary: string
    reason: string
    confidence: number
    keySkills: string
    careerPath: string
    salaryMin: number
    salaryMax: number
    created_at: string
}

export default function DashboardClient() {
    const router = useRouter()
    const { setProgress } = useProgress()
    const [stats, setStats] = useState({
        total: 0,
        topRole: "N/A",
        bestConfidence: 0,
        avgSalary: "N/A"
    })
    const [history, setHistory] = useState<CareerData[]>([])
    const [loading, setLoading] = useState(true)

    const fetchStatsData = useCallback(async () => {
        setLoading(true)
        const supabase = createClient()
        
        // Get user ID from cookie
        const cookies = document.cookie.split("; ")
        const userCookie = cookies.find(c => c.startsWith("careersync_user_id="))
        const userID = userCookie?.split("=")[1]

        if (!userID) {
            setLoading(false)
            return
        }

        const { data, error } = await supabase
            .from("Career")
            .select("*")
            .eq("userID", userID)
            .order("created_at", { ascending: false })

        if (error) {
            console.error("Fetch stats error:", error)
            setLoading(false)
            return
        }

        const results = data as CareerData[] ?? []
        setHistory(results)
        
        if (results.length > 0) {
            const total = results.length
            
            // ── Calculate role metrics ───────────────────────
            const roleStats: { [key: string]: { count: number, sumConfidence: number, avgConfidence: number } } = {}
            results.forEach(r => {
                const role = r.role.trim()
                if (!roleStats[role]) {
                    roleStats[role] = { count: 0, sumConfidence: 0, avgConfidence: 0 }
                }
                roleStats[role].count++
                roleStats[role].sumConfidence += r.confidence
            })
            
            // Calculate averages
            for (const role in roleStats) {
                roleStats[role].avgConfidence = Math.round(roleStats[role].sumConfidence / roleStats[role].count)
            }
            
            // ── Find Top Match (Highest recurrence, then highest avg confidence) ──
            let topRole = ""
            let maxCount = 0
            let maxAvgConf = 0
            
            for (const role in roleStats) {
                const rs = roleStats[role]
                // Primary: highest count. Secondary: highest avg confidence
                if (rs.count > maxCount || (rs.count === maxCount && rs.avgConfidence > maxAvgConf)) {
                    maxCount = rs.count
                    maxAvgConf = rs.avgConfidence
                    topRole = role
                }
            }
            
            // ── Display Salary Range for Top Role ────────────
            const latestOfTop = results.find(r => r.role.trim() === topRole) ?? results[0]
            const avgSalaryDisplay = `PHP ${latestOfTop.salaryMin.toLocaleString()} – ${latestOfTop.salaryMax.toLocaleString()}`

            setStats({
                total,
                topRole: topRole.replace(/^an? /i, ""),
                bestConfidence: maxAvgConf,
                avgSalary: avgSalaryDisplay
            })
        } else {
            setStats({
                total: 0,
                topRole: "N/A",
                bestConfidence: 0,
                avgSalary: "N/A"
            })
        }
        setLoading(false)
    }, [])

    useEffect(() => {
        // Reset progress bar on dash view
        setProgress(0)
        fetchStatsData()
    }, [setProgress, fetchStatsData])

    const handleDelete = async (careerID: string, role: string) => {
        if (!window.confirm(`Are you sure you want to delete the recommendation for ${role}?`)) {
            return
        }

        const supabase = createClient()
        const { error } = await supabase
            .from("Career")
            .delete()
            .eq("careerID", careerID)

        if (error) {
            alert("Failed to delete result: " + error.message)
            return
        }

        // Refresh list
        fetchStatsData()
    }

    const handleView = (careerID: string) => {
        router.push(`/dashboard/results/${careerID}`)
    }

    return (
        <section className="dashboard-section">
            <div className="stat-row">
                <div className="stat-card">
                    <span className="caption-txt">Total quizzes</span>
                    <span className="question-txt">{loading ? "..." : stats.total}</span>
                    <span className="caption-txt">{loading ? "Fetching..." : "Completed profiles"}</span>
                </div>
                <div className="stat-card">
                    <span className="caption-txt">Top match</span>
                    <span className="question-txt">{loading ? "..." : stats.topRole}</span>
                    <span className="caption-txt">{loading ? "Fetching..." : "Most recurring role"}</span>
                </div>
                <div className="stat-card">
                    <span className="caption-txt">Best confidence</span>
                    <span className="question-txt">{loading ? "..." : `${stats.bestConfidence}%`}</span>
                    <span className="caption-txt">{loading ? "Fetching..." : "Avg. match accuracy"}</span>
                </div>
                <div className="stat-card">
                    <span className="caption-txt">Est. salary range</span>
                    <span className="question-txt" style={{ fontSize: "1rem", lineHeight: "1.4" }}>
                        {loading ? "..." : stats.avgSalary}
                    </span>
                    <span className="caption-txt">{loading ? "Fetching..." : "Based on top role"}</span>
                </div>
            </div>

            <div className="analytics-row">
                <div className="analytics-card">
                    <span className="option-txt">Confidence per result</span>
                    <div className="scroll-container" style={{ marginTop: "10px" }}>
                        {loading ? (
                            <span className="caption-txt">Loading trends...</span>
                        ) : history.length > 0 ? (
                            history.map((item, idx) => (
                                <div key={item.careerID || idx} className="list-item">
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <span className="caption-txt">{item.role}</span>
                                        <span className="caption-txt">{item.confidence}%</span>
                                    </div>
                                    <div className="confidence-track">
                                        <div className="confidence-fill" style={{ width: `${item.confidence}%` }} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <span className="caption-txt">No data yet.</span>
                        )}
                    </div>
                </div>
                <div className="analytics-card">
                    <span className="option-txt">Latest Recommendation Summary</span>
                    <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "12px" }}>
                        {loading ? (
                            <span className="caption-txt">Loading summary...</span>
                        ) : history.length > 0 ? (
                            <>
                                <span className="question-txt" style={{ fontSize: "1.1rem" }}>{history[0].role}</span>
                                <span className="caption-txt" style={{ lineHeight: "1.5" }}>{history[0].summary}</span>
                                <div style={{ marginTop: "10px" }}>
                                    <span className="caption-txt" style={{ display: "block", marginBottom: "4px", color: "var(--primary-btn-border)" }}>Why you fit:</span>
                                    <span className="caption-txt" style={{ fontStyle: "italic" }}>"{history[0].reason}"</span>
                                </div>
                            </>
                        ) : (
                            <span className="caption-txt">Complete a quiz to see your analysis.</span>
                        )}
                    </div>
                </div>
            </div>

            <div className="history-card">
                <span className="option-txt">Recommendations History</span>
                <div className="table-wrapper" style={{ marginTop: "10px" }}>
                    {loading ? (
                        <span className="caption-txt">Loading history...</span>
                    ) : history.length > 0 ? (
                        <table className="history-table">
                            <thead>
                                <tr>
                                    <th className="caption-txt">Career Recommendation</th>
                                    <th className="caption-txt date-col">Generated On</th>
                                    <th className="caption-txt" style={{ textAlign: "right" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.map((item, idx) => (
                                    <tr key={item.careerID || idx}>
                                        <td className="option-txt">
                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                {item.role}
                                                <span className="caption-txt mobile-date">{new Date(item.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </td>
                                        <td className="caption-txt date-col">{new Date(item.created_at).toLocaleDateString()}</td>
                                        <td>
                                            <div className="action-grp">
                                                <button 
                                                    className="action-btn view-btn" 
                                                    onClick={() => handleView(item.careerID)}
                                                    aria-label="View Result"
                                                >
                                                    <ViewIcon />
                                                </button>
                                                <button 
                                                    className="action-btn delete-btn" 
                                                    onClick={() => handleDelete(item.careerID, item.role)}
                                                    aria-label="Delete Result"
                                                >
                                                    <DeleteIcon />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <span className="caption-txt">No history found. Start your first sync!</span>
                    )}
                </div>
            </div>
        </section>
    )
}