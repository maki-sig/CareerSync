"use client";

import "../styles/toggle.css";
import DarkIcon from "@/public/dark.svg";
import LightIcon from "@/public/light.svg";
import { useEffect, useState } from "react";

export default function ToggleTheme() {
    const [isDark, setIsDark] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const dark = saved ? saved === "dark" : prefersDark;
        setIsDark(dark);
        document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
        setMounted(true);
    }, []);

    const toggle = () => {
        const next = !isDark;
        setIsDark(next);
        const theme = next ? "dark" : "light";
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute("data-theme", theme);
    };

    if (!mounted) return (
        <div className="program-toggle-div" style={{ cursor: "wait" }}>
            <div style={{ width: "20px", height: "20px" }} />
        </div>
    );

    return (
        <div 
            className="program-toggle-div" 
            onClick={toggle}
            role="button"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            {isDark ? <LightIcon /> : <DarkIcon />}
        </div>
    );
}