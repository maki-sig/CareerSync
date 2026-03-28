import "../styles/dashboard.css"
import ThemeToggle from "../components/themetoggle"
import Nav from "../components/navbar"

export default function Dashboard() {
    return (
        <>
            <Nav />
            <ThemeToggle />
            <section className="dashboard-section">
                test
            </section>
        </>
    )
}