"use client"

import { createContext, useContext, useState } from "react"
import Navbar from "../components/navbar"
import Sidebar from "../components/sidebar"

// Context to manage UI states across dashboard
const DashboardContext = createContext<{
    progress: number;
    setProgress: (value: number) => void;
    sidebarOpen: boolean;
    setSidebarOpen: (value: boolean) => void;
}>({
    progress: 0,
    setProgress: () => { },
    sidebarOpen: false,
    setSidebarOpen: () => { },
})

export const useDashboard = () => useContext(DashboardContext)
export const useProgress = () => {
    const { progress, setProgress } = useDashboard()
    return { progress, setProgress }
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [progress, setProgress] = useState(0)
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <DashboardContext.Provider value={{ progress, setProgress, sidebarOpen, setSidebarOpen }}>
            <div className="dashboard-root">
                <Navbar progress={progress} />
                <div className="dashboard-main-container">
                    <Sidebar />
                    {/* Dark overlay for mobile drawer */}
                    <div 
                        className={`sidebar-overlay ${sidebarOpen ? "is-active" : ""}`}
                        onClick={() => setSidebarOpen(false)}
                    />
                    <main className="dashboard-content">
                        {children}
                    </main>
                </div>
            </div>
        </DashboardContext.Provider>
    )
}
