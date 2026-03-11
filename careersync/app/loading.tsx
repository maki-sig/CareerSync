import "../app/styles/results.css"

export default function Loading() {
    return (
        <div className="results-section">
            <div className="loading-grp">
                <span className="loading-label question-txt">Analyzing...</span>
                <div className="loading-bar-track">
                    <div className="loading-bar-fill" />
                </div>
            </div>
        </div>
    )
}