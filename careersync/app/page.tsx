"use client"

import "@/app/styles/landing.css"
import { useRouter } from "next/navigation"

import Nav from "@/app/components/navbar"

export default function Landing() {
    const router = useRouter()

    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <>
            <Nav />
            <main>

                {/* ── HERO ── */}
                <section className="hero">
                    <div className="hero-bg" />

                    <h1>
                        Your career match,<br />
                        <span>quantified.</span>
                    </h1>

                    <p className="hero-sub">
                        answer a short quiz → get ai-ranked career paths<br />
                        with confidence scores, fit explanations &amp; salary data.
                    </p>

                    <div className="hero-actions">
                        <button
                            className="btn-primary"
                            onClick={() => router.push("/portal")}
                        >
                            Sync with a Career
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    <div className="hero-stats">
                        <div className="hstat">
                            <div className="hstat-val">AI</div>
                            <div className="hstat-label">powered matching</div>
                        </div>
                        <div className="hstat">
                            <div className="hstat-val">PH</div>
                            <div className="hstat-label">salary insights</div>
                        </div>
                        <div className="hstat">
                            <div className="hstat-val">∞</div>
                            <div className="hstat-label">re-sync anytime</div>
                        </div>
                    </div>
                </section>

            </main>
        </>
    )
}