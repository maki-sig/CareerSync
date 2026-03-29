import "../styles/dashboard.css"
import ThemeToggle from "../components/themetoggle"
import Nav from "../components/navbar"
import Side from "../components/sidebar"

export default function Dashboard() {
    return (
        <>
            <Nav />
            <main className="dashboard-main">
                <Side />
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

                    <button className="submit-btn btn-txt">Sync with a Career</button>
                </section>
            </main>

        </>
    )
}