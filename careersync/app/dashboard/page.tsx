import "../styles/dashboard.css"
import ThemeToggle from "../components/themetoggle"
import Nav from "../components/navbar"

export default function Dashboard() {
    return (
        <>
            <Nav />
            <ThemeToggle />
            <section className="dashboard-section">

                <div className="stat-row">
                    <div className="stat-card">
                        <span className="caption-txt">Total quizzes</span>
                    </div>
                    <div className="stat-card">
                        <span className="caption-txt">Top match</span>
                    </div>
                    <div className="stat-card">
                        <span className="caption-txt">Best confidence</span>
                    </div>
                    <div className="stat-card">
                        <span className="caption-txt">Est. salary range</span>
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
        </>
    )
}