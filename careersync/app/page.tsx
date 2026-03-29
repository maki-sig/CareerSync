"use client"

import "@/app/styles/landing.css"
import { useRouter } from "next/navigation"
import Reset from "@/public/cycle.svg"
import Nav from "@/app/components/navbar"

export default function LandingClient() {
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
                        Answer a short quiz → Get ai-driven career paths<br />
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

                    {/* ── HERO FEATURES ── */}
                    <div className="hero-features">

                        {/* AI-powered — spark icon */}
                        <div className="hfeat">
                            <div className="hfeat-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                                </svg>
                            </div>
                            <div className="hfeat-text">
                                <span className="hfeat-val">AI-powered</span>
                                <span className="hfeat-label">career matching</span>
                            </div>
                        </div>

                        <div className="hfeat-divider" />

                        {/* PH salary data */}
                        <div className="hfeat">
                            <div className="hfeat-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                                    <line x1="12" y1="1" x2="12" y2="23" />
                                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                </svg>
                            </div>
                            <div className="hfeat-text">
                                <span className="hfeat-val">PH salary data</span>
                                <span className="hfeat-label">local insights</span>
                            </div>
                        </div>

                        <div className="hfeat-divider" />

                        {/* Confidence scores */}
                        <div className="hfeat">
                            <div className="hfeat-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                                </svg>
                            </div>
                            <div className="hfeat-text">
                                <span className="hfeat-val">Confidence scores</span>
                                <span className="hfeat-label">per career match</span>
                            </div>
                        </div>

                        <div className="hfeat-divider" />

                        {/* Re-sync anytime */}
                        <div className="hfeat">
                            <div className="hfeat-icon sync">
                                <Reset />
                            </div>
                            <div className="hfeat-text">
                                <span className="hfeat-val">Re-sync anytime</span>
                                <span className="hfeat-label">unlimited retakes</span>
                            </div>
                        </div>

                        <div className="hfeat-divider" />

                        {/* Fit explanations */}
                        <div className="hfeat">
                            <div className="hfeat-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                </svg>
                            </div>
                            <div className="hfeat-text">
                                <span className="hfeat-val">Fit explanations</span>
                                <span className="hfeat-label">plain-language reasons</span>
                            </div>
                        </div>

                    </div>
                </section>

                {/* ── FEATURES SECTION ── */}
                <section className="features">
                    <div className="features-inner">

                        <div className="features-header">
                            <span className="features-eyebrow">// how it works</span>
                            <h2 className="features-title">
                                From quiz to career,<br />
                                <span>in three steps.</span>
                            </h2>
                            <p className="features-desc">
                                No lengthy forms. No vague advice.<br />
                                Just signal-to-match in under 5 minutes.
                            </p>
                        </div>

                        <div className="features-steps">

                            <div className="fstep">
                                <div className="fstep-icon">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                                        <rect x="3" y="3" width="18" height="18" rx="2" />
                                        <path d="M8 12h8M8 8h5M8 16h3" />
                                    </svg>
                                </div>
                                <h3 className="fstep-title">Answer the quiz</h3>
                                <p className="fstep-body">
                                    A focused set of questions about your skills, interests, and learning style. No fluff — every question feeds the model.
                                </p>
                                <div className="fstep-tag">~3 min</div>
                            </div>

                            <div className="fstep-connector" aria-hidden="true">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </div>

                            <div className="fstep">
                                <div className="fstep-icon">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                                    </svg>
                                </div>
                                <h3 className="fstep-title">AI ranks your paths</h3>
                                <p className="fstep-body">
                                    CareerSync runs your profile against dozens of career blueprints, scoring each one for fit with a confidence percentage.
                                </p>
                                <div className="fstep-tag">instant</div>
                            </div>

                            <div className="fstep-connector" aria-hidden="true">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </div>

                            <div className="fstep">
                                <div className="fstep-icon">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                                    </svg>
                                </div>
                                <h3 className="fstep-title">Get your breakdown</h3>
                                <p className="fstep-body">
                                    View ranked roles, fit explanations, and Philippine salary ranges — saved to your dashboard so you can re-sync anytime.
                                </p>
                                <div className="fstep-tag">PH salary data</div>
                            </div>

                        </div>

                    </div>
                </section>

            </main>

            {/* ── FOOTER ── */}
            <footer className="site-footer">

                <div className="footer-left">
                    <p className="footer-made-by">
                        Made by <span>Marc Botis</span>
                    </p>
                    <div className="footer-socials">
                        <a
                            className="footer-social-link"
                            href="https://github.com/maki-sig"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                            </svg>
                            HelloKinaban
                        </a>

                        <a
                            className="footer-social-link"
                            href="https://tiktok.com/@HelloKinaban"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                            </svg>
                            HelloKinaban
                        </a>
                    </div>
                </div>

                <div className="footer-right">
                    <p className="footer-support">
                        For account issues such as updating your username or changing your password,
                        please reach out to the developer via the socials mentioned.
                    </p>
                </div>

            </footer>
        </>
    )
}