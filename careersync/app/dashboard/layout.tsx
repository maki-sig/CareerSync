"use client"

import { createContext, useContext, useState } from "react"
import Navbar from "../components/navbar"
import Sidebar from "../components/sidebar"

// Context to manage progress bar across dashboard sub-routes
const ProgressContext = createContext<{
    progress: number;
    setProgress: (value: number) => void;
}>({
    progress: 0,
    setProgress: () => {},
})

export const useProgress = () => useContext(ProgressContext)

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [progress, setProgress] = useState(0)

    return (
        <ProgressContext.Provider value={{ progress, setProgress }}>
            <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
                <Navbar progress={progress} />
                <div style={{ display: "flex", flex: 1, position: "relative" }}>
                    <Sidebar />
                    <main style={{ flex: 1, minHeight: "100%", marginLeft: "250px" }}>
                        {children}
                    </main>
                </div>
            </div>
        </ProgressContext.Provider>
    )
}
