"use client"

import { useState } from "react";
import ThemeToggle from "../components/themetoggle";
import "../styles/login.css"
import Loginicon from "@/public/login.svg"
import EyeIcon from "@/public/eye.svg"
import EyeOffIcon from "@/public/eye-off.svg"

export function LoginForm({ onSwitch }: { onSwitch: () => void }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <h1 className="title-txt">Login</h1>
            <form className="login-signup-card">
                <div className="input-wrapper option-txt">
                    <input type="text" id="login-username" placeholder=" " className="option-txt"/>
                    <label htmlFor="login-username">Username</label>
                </div>
                <div className="input-wrapper option-txt">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="login-password"
                        placeholder=" "
                        className="option-txt"
                    />
                    <label htmlFor="login-password">Password</label>
                    <button
                        type="button"
                        className="toggle-password"
                        onClick={() => setShowPassword(prev => !prev)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                </div>
                <span className="caption-txt">
                    Don't have an account?{" "}
                    <a href="#" onClick={(e) => { e.preventDefault(); onSwitch(); }}>Sign up.</a>
                </span>
                <button type="submit" className="btn-txt">
                    <Loginicon />
                    Login
                </button>
            </form>
        </>
    );
}

export function SignupForm({ onSwitch }: { onSwitch: () => void }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <>
            <h1 className="title-txt">Create Account</h1>
            <form className="login-signup-card">
                <div className="input-wrapper option-txt">
                    <input type="text" id="signup-username" placeholder=" " className="option-txt"/>
                    <label htmlFor="signup-username">Username</label>
                </div>
                <div className="input-wrapper option-txt">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="signup-password"
                        placeholder=" "
                        className="option-txt"
                    />
                    <label htmlFor="signup-password">Password</label>
                    <button
                        type="button"
                        className="toggle-password"
                        onClick={() => setShowPassword(prev => !prev)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                </div>
                <div className="input-wrapper option-txt">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirm-password"
                        placeholder=" "
                        className="option-txt"
                    />
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <button
                        type="button"
                        className="toggle-password"
                        onClick={() => setShowConfirmPassword(prev => !prev)}
                        aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                    >
                        {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                </div>
                <span className="caption-txt">
                    Already have an account?{" "}
                    <a href="#" onClick={(e) => { e.preventDefault(); onSwitch(); }}>Sign in.</a>
                </span>
                <button type="submit" className="btn-txt">
                    <Loginicon />
                    Sign Up
                </button>
            </form>
        </>
    );
}

export default function Portal() {
    const [view, setView] = useState<"login" | "signup">("login");

    return (
        <>
            <ThemeToggle />
            <section className="login-signup-section">
                {view === "login"
                    ? <LoginForm onSwitch={() => setView("signup")} />
                    : <SignupForm onSwitch={() => setView("login")} />
                }
            </section>
        </>
    );
}