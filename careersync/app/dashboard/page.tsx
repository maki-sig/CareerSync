"use client"

import { useEffect } from "react"
import { useProgress } from "./layout"
import "../styles/dashboard.css"

export default function Dashboard() {
    const { setProgress } = useProgress()

    useEffect(() => {
        // Reset progress bar on dash view
        setProgress(0)
    }, [setProgress])

    return (
        <section className="dashboard-section">
            <div className="stat-row">
                <div className="stat-card">
                    <span className="caption-txt">Total quizzes</span>
                    <span className="question-txt">Placeholder</span>
                    <span className="caption-txt">Placeholder</span>
                </div>
                <div className="stat-card">
                    <span className="caption-txt">Top match</span>
                    <span className="question-txt">Placeholder</span>
                    <span className="caption-txt">Placeholder</span>
                </div>
                <div className="stat-card">
                    <span className="caption-txt">Best confidence</span>
                    <span className="question-txt">Placeholder</span>
                    <span className="caption-txt">Placeholder</span>
                </div>
                <div className="stat-card">
                    <span className="caption-txt">Est. salary range</span>
                    <span className="question-txt">Placeholder</span>
                    <span className="caption-txt">Placeholder</span>
                </div>
            </div>

            <div className="analytics-row">
                <div className="analytics-card">
                    <span className="option-txt">Confidence per result</span>
                </div>
                <div className="analytics-card">
                    <span className="option-txt">Best match confidence trend</span>
                </div>
            </div>

            <div className="history-card">
                <span className="option-txt">Your career recommendations</span>
            </div>
        </section>
    )
}