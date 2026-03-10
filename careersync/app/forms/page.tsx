"use client"

import { useState } from "react"
import Header from "../components/header"
import "../styles/forms.css"

type WorkStyle = "Collaborative" | "Independent" | null
type SoftSkill = "Logical and systematic thinker" | "Efficiency and performance driven" | "Fast-acting and highly adaptive" | "Clear and effective communicator" | null

const SUBJECTS_IT = [
    "Networking & Infrastructure",
    "Cybersecurity",
    "Database Administration",
    "Systems Administration",
    "Web Development",
    "Cloud Computing",
    "IT Project Management",
    "Technical Support",
    "Network Security",
    "IT Service Management",
]

const SUBJECTS_CS = [
    "Data Structures & Algorithms",
    "Operating Systems",
    "Software Engineering",
    "Artificial Intelligence",
    "Machine Learning",
    "Computer Architecture",
    "Programming Languages",
    "Discrete Mathematics",
    "Computer Graphics",
    "Theory of Computation",
]

const HOBBIES  = ["Puzzles","Visual arts","Fitness","Music","Reading","Outdoor exploration","Socializing","Self-reflecting","Craft & building","Collecting data & trends"]

export default function Forms() {
    const [page, setPage] = useState<1 | 2 | 3 | 4>(1)

    // Page 1 — Workflow Mode
    const [workStyle, setWorkStyle] = useState<WorkStyle>(null)

    // Page 2 — Core Domains
    const [subjects, setSubjects] = useState<string[]>([])

    // Page 3 — Professional DNA (Soft Skills)
    const [softSkill, setSoftSkill] = useState<SoftSkill>(null)

    // Page 4 — Side Quests
    const [hobbies, setHobbies] = useState<string[]>([])

    const toggleCheckbox = (
        value: string,
        list: string[],
        setter: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
        setter(list.includes(value) ? list.filter(v => v !== value) : [...list, value])
    }

    const handleSubmit = () => {
        const formData = { workStyle, subjects, softSkill, hobbies }
        console.log("Submitted:", formData)
        // TODO: handle submission (e.g. API call)
    }

    const handleRestart = () => {
        setPage(1)
        setWorkStyle(null)
        setSubjects([])
        setSoftSkill(null)
        setHobbies([])
    }

    return (
        <>
            <Header />

            <form className="forms">

                {/* ── PAGE 1: Workflow Mode ── */}
                {page === 1 && (
                    <div className="workstyle-section">
                        <h1 className="category-txt">Workflow Mode</h1>

                        <div className="workstyle-card">
                            <span className="question-txt">How do you achieve your peak performance?</span>
                            <span className="caption-txt">Choose the work environment where you feel most in the zone</span>

                            <div className="workstyle-btn-grp">
                                {(["Collaborative", "Independent"] as WorkStyle[]).map(option => (
                                    <label
                                        key={option!}
                                        className={`option-txt workstyle-option ${workStyle === option ? "selected" : ""}`}
                                    >
                                        <input
                                            type="radio"
                                            name="workstyle"
                                            value={option!}
                                            checked={workStyle === option}
                                            onChange={() => setWorkStyle(option)}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="nav-btn-grp">
                            <button
                                type="button"
                                className="secondary-btn btn-txt"
                                onClick={() => setPage(2)}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {/* ── PAGE 2: Core Domains ── */}
                {page === 2 && (
                    <div className="subjects-section">
                        <h1 className="category-txt">Core Domains</h1>

                        <div className="subjects-card">
                            <span className="question-txt">Which technical subjects have you mastered or enjoyed most?</span>
                            <span className="caption-txt">Select the areas where you feel most confident or find the highest level of interest</span>

                            <div className="subjects-checkbox-grp">
                                {SUBJECTS_CS.map(subject => (
                                    <label key={subject} className="option-txt checkbox-option">
                                        <input
                                            type="checkbox"
                                            checked={subjects.includes(subject)}
                                            onChange={() => toggleCheckbox(subject, subjects, setSubjects)}
                                        />
                                        <span className="checkbox-box" />
                                        {subject}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="nav-btn-grp">
                            <button type="button" className="secondary-btn btn-txt" onClick={() => setPage(1)}>Back</button>
                            <button type="button" className="secondary-btn btn-txt" onClick={() => setPage(3)}>Next</button>
                        </div>
                    </div>
                )}

                {/* ── PAGE 3: Professional DNA (Soft Skills) ── */}
                {page === 3 && (
                    <div className="softskills-section">
                        <h1 className="category-txt">Professional DNA</h1>

                        <div className="softskills-card">
                            <span className="question-txt">What is your primary interpersonal strength?</span>
                            <span className="caption-txt">Choose the one strength that most defines your contribution to a technical team</span>

                            <div className="softskills-btn-grp">
                                {([
                                    "Logical and systematic thinker",
                                    "Efficiency and performance driven",
                                    "Fast-acting and highly adaptive",
                                    "Clear and effective communicator",
                                ] as SoftSkill[]).map(option => (
                                    <label
                                        key={option!}
                                        className={`option-txt softskill-option ${softSkill === option ? "selected" : ""}`}
                                    >
                                        <input
                                            type="radio"
                                            name="softskill"
                                            value={option!}
                                            checked={softSkill === option}
                                            onChange={() => setSoftSkill(option)}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="nav-btn-grp">
                            <button type="button" className="secondary-btn btn-txt" onClick={() => setPage(2)}>Back</button>
                            <button type="button" className="secondary-btn btn-txt" onClick={() => setPage(4)}>Next</button>
                        </div>
                    </div>
                )}

                {/* ── PAGE 4: Side Quests ── */}
                {page === 4 && (
                    <div className="hobbies-section">
                        <h1 className="category-txt">Side Quests</h1>

                        <div className="hobbies-card">
                            <span className="question-txt">Where does your curiosity wander off-academics?</span>
                            <span className="caption-txt">Select activities that fuel your creative energy</span>

                            <div className="hobbies-checkbox-grp">
                                {HOBBIES.map(hobby => (
                                    <label key={hobby} className="option-txt checkbox-option">
                                        <input
                                            type="checkbox"
                                            checked={hobbies.includes(hobby)}
                                            onChange={() => toggleCheckbox(hobby, hobbies, setHobbies)}
                                        />
                                        <span className="checkbox-box" />
                                        {hobby}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="nav-btn-grp">
                            <button type="button" className="secondary-btn btn-txt" onClick={() => setPage(3)}>Back</button>
                            <button type="button" className="submit-btn btn-txt" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                )}

            </form>
        </>
    )
}