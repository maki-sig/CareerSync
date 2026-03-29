"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useDashboard } from "../dashboard/layout"
import { createClient } from "@/utils/supabase/client"
import "../styles/nav.css"

export default function Sidebar() {
    const router = useRouter()
    const { sidebarOpen, setSidebarOpen } = useDashboard()
    const [username, setUsername] = useState<string>("User")

    useEffect(() => {
        async function fetchUser() {
            const supabase = createClient()
            
            // Get user ID from cookie for consistency with dashboard fetching
            const cookies = document.cookie.split("; ")
            const userCookie = cookies.find(c => c.startsWith("careersync_user_id="))
            const userID = userCookie?.split("=")[1]
            
            if (userID) {
                // Fetch specialized username from 'User' table
                const { data: profile, error } = await supabase
                    .from("User")
                    .select("username")
                    .eq("userID", userID)
                    .single()

                if (!error && profile?.username) {
                    setUsername(profile.username)
                    return // Found custom username, exit
                }
            }

            // Fallback to auth identity if no custom profile found
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                if (user.user_metadata?.full_name) {
                    setUsername(user.user_metadata.full_name)
                } else if (user.email) {
                    setUsername(user.email.split("@")[0])
                }
            }
        }
        fetchUser()
    }, [])

    const handleLogout = () => {
        // Clear session cookies
        document.cookie = "careersync_user_id=; path=/; max-age=0";
        document.cookie = "careersync_submitted=; path=/; max-age=0";

        // Redirect home or to login
        router.push("/")
        setSidebarOpen(false)
    }

    const navigate = (path: string) => {
        router.push(path)
        setSidebarOpen(false)
    }

    return (
        <div className={`side-bar ${sidebarOpen ? "is-open" : ""}`}>
            <div className="side-bar-top">
                <button 
                    className="submit-btn btn-txt" 
                    onClick={() => navigate("/dashboard/forms")}
                >
                    Sync with a Career
                </button>
                <button 
                    className="secondary-btn btn-txt" 
                    onClick={() => navigate("/dashboard")}
                >
                    Dashboard
                </button>
            </div>
            
            <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "10px" }}>
                <span 
                    className="caption-txt" 
                    style={{ 
                        display: "block", 
                        opacity: 0.7 
                    }}
                >
                    Signed in as - <span style={{ fontWeight: 600 }}>{username}</span>
                </span>
                <button className="btn-txt logout-btn" style={{ width: "100%" }} onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    )
}