"use client"

import { useRouter } from "next/navigation";
import ThemeToggle from "../components/themetoggle";
import "../styles/login.css"

export default function Login() {
    return (
        <>
            <ThemeToggle />
            <section className="login-signup-section">
                <h1 className="title-txt">Login</h1>
                <form className="login-signup-card">
                    <label>
                        <input type="text" placeholder="Username" />
                    </label>
                    <label>
                        <input type="password" placeholder="Password" />
                    </label>
                    <span className="caption-txt">Don't have an account? Sign in.</span>
                    <button type="submit">Login</button>
                </form>
            </section>
        </>
    );
}