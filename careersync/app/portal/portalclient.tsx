"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

import "../styles/login.css"
import Loginicon from "@/public/login.svg"
import EyeIcon from "@/public/eye.svg"
import EyeOffIcon from "@/public/eye-off.svg"
import { createClient } from "@/utils/supabase/client";
import Nav from "../components/navbar"

/* ── Helpers ────────────────────────────────────────────── */
async function hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

function validateUsername(username: string): string | null {
    if (username.trim().length < 3)
        return "Username must be at least 3 characters.";
    if (username.trim().length > 20)
        return "Username must be at most 20 characters.";
    if (!/^[a-zA-Z0-9_]+$/.test(username))
        return "Username can only contain letters, numbers, and underscores.";
    return null;
}

function validatePassword(password: string): string | null {
    if (password.length < 8)
        return "Password must be at least 8 characters.";
    if (!/[A-Z]/.test(password))
        return "Password must contain at least one uppercase letter.";
    if (!/[0-9]/.test(password))
        return "Password must contain at least one number.";
    if (!/[^a-zA-Z0-9]/.test(password))
        return "Password must contain at least one special character.";
    return null;
}

const MAX_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

/* ── Login Form ─────────────────────────────────────────── */
export function LoginForm({ onSwitch }: { onSwitch: () => void }) {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);

        const form = e.currentTarget;
        const username = (form.elements.namedItem("login-username") as HTMLInputElement).value.trim();
        const password = (form.elements.namedItem("login-password") as HTMLInputElement).value;

        if (!username || !password) {
            setError("Please fill in all fields.");
            return;
        }

        setLoading(true);
        const supabase = createClient();

        // ── Fetch user ───────────────────────────────────────
        const { data: user, error: fetchError } = await supabase
            .from("User")
            .select("userID, password, failedAttemptCount, lastFailedAttempt")
            .eq("username", username)
            .maybeSingle();

        if (fetchError || !user) {
            setError("Invalid username or password.");
            setLoading(false);
            return;
        }

        // ── Check lockout ────────────────────────────────────
        if (user.failedAttemptCount >= MAX_ATTEMPTS && user.lastFailedAttempt) {
            const lastFailed = new Date(user.lastFailedAttempt).getTime();
            const minutesSince = (Date.now() - lastFailed) / 1000 / 60;

            if (minutesSince < LOCKOUT_MINUTES) {
                const remaining = Math.ceil(LOCKOUT_MINUTES - minutesSince);
                setError(`Account locked. Try again in ${remaining} minute${remaining !== 1 ? "s" : ""}.`);
                setLoading(false);
                return;
            }

            // lockout expired, reset count
            await supabase
                .from("User")
                .update({ failedAttemptCount: 0, lastFailedAttempt: null })
                .eq("userID", user.userID);
        }

        // ── Verify password ──────────────────────────────────
        const hashedPassword = await hashPassword(password);

        if (hashedPassword !== user.password) {
            const newCount = (user.failedAttemptCount ?? 0) + 1;
            await supabase
                .from("User")
                .update({
                    failedAttemptCount: newCount,
                    lastFailedAttempt: new Date().toISOString(),
                })
                .eq("userID", user.userID);

            const remaining = MAX_ATTEMPTS - newCount;
            if (remaining > 0) {
                setError(`Invalid username or password. ${remaining} attempt${remaining !== 1 ? "s" : ""} remaining.`);
            } else {
                setError(`Account locked for ${LOCKOUT_MINUTES} minutes due to too many failed attempts.`);
            }

            setLoading(false);
            return;
        }

        // ── Success — reset failed attempts ──────────────────
        await supabase
            .from("User")
            .update({ failedAttemptCount: 0, lastFailedAttempt: null })
            .eq("userID", user.userID);

        document.cookie = `careersync_user_id=${user.userID}; path=/; max-age=${60 * 60 * 24 * 7}`; // 1 week session
        router.push("/dashboard/forms");
    }

    return (
        <>
            <h1 className="title-txt">Login</h1>
            <form className="login-signup-card" onSubmit={handleSubmit} suppressHydrationWarning>
                <div className="input-wrapper option-txt">
                    <input
                        type="text"
                        id="login-username"
                        name="login-username"
                        placeholder=" "
                        className="option-txt"
                        required
                        suppressHydrationWarning
                    />
                    <label htmlFor="login-username">Username</label>
                </div>
                <div className="input-wrapper option-txt">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="login-password"
                        name="login-password"
                        placeholder=" "
                        className="option-txt"
                        required
                        suppressHydrationWarning
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
                {error && <span className="caption-txt error-txt">{error}</span>}
                <span className="caption-txt">
                    Don't have an account?{" "}
                    <a href="#" onClick={(e) => { e.preventDefault(); onSwitch(); }}>Sign up.</a>
                </span>
                <button type="submit" className="btn-txt" disabled={loading}>
                    <Loginicon />
                    {loading ? "Signing in..." : "Login"}
                </button>
            </form>
        </>
    );
}

/* ── Signup Form ────────────────────────────────────────── */
export function SignupForm({ onSwitch }: { onSwitch: () => void }) {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);

        const form = e.currentTarget;
        const username = (form.elements.namedItem("signup-username") as HTMLInputElement).value.trim();
        const password = (form.elements.namedItem("signup-password") as HTMLInputElement).value;
        const confirmPassword = (form.elements.namedItem("confirm-password") as HTMLInputElement).value;

        // ── Validation ───────────────────────────────────────
        const usernameError = validateUsername(username);
        if (usernameError) { setError(usernameError); return; }

        const passwordError = validatePassword(password);
        if (passwordError) { setError(passwordError); return; }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        const supabase = createClient();

        // ── Check if username already exists ─────────────────
        const { data: existing } = await supabase
            .from("User")
            .select("username")
            .eq("username", username)
            .maybeSingle();

        if (existing) {
            setError("Username is already taken.");
            setLoading(false);
            return;
        }

        // ── Hash password & insert ───────────────────────────
        const hashedPassword = await hashPassword(password);

        const { error: insertError } = await supabase
            .from("User")
            .insert({
                username,
                password: hashedPassword,
                failedAttemptCount: 0,
            });

        if (insertError) {
            setError(insertError.message);
            setLoading(false);
            return;
        }

        // Auto-login after signup
        const { data: newUser } = await supabase
            .from("User")
            .select("userID")
            .eq("username", username)
            .single();

        if (newUser) {
            document.cookie = `careersync_user_id=${newUser.userID}; path=/; max-age=${60 * 60 * 24 * 7}`;
        }

        // Redirect directly to the forms survey after successful signup
        router.push("/dashboard/forms");
    }

    return (
        <>
            <h1 className="title-txt">Create Account</h1>
            <form className="login-signup-card" onSubmit={handleSubmit} suppressHydrationWarning>
                <div className="input-wrapper option-txt">
                    <input
                        type="text"
                        id="signup-username"
                        name="signup-username"
                        placeholder=" "
                        className="option-txt"
                        required
                        suppressHydrationWarning
                    />
                    <label htmlFor="signup-username">Username</label>
                </div>
                <div className="input-wrapper option-txt">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="signup-password"
                        name="signup-password"
                        placeholder=" "
                        className="option-txt"
                        required
                        suppressHydrationWarning
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
                        name="confirm-password"
                        placeholder=" "
                        className="option-txt"
                        required
                        suppressHydrationWarning
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
                {error && <span className="caption-txt error-txt">{error}</span>}
                <span className="caption-txt">
                    Already have an account?{" "}
                    <a href="#" onClick={(e) => { e.preventDefault(); onSwitch(); }}>Sign in.</a>
                </span>
                <button type="submit" className="btn-txt" disabled={loading}>
                    <Loginicon />
                    {loading ? "Creating account..." : "Sign Up"}
                </button>
            </form>
        </>
    );
}

/* ── Portal Page ────────────────────────────────────────── */
export default function PortalClient() {
    const [view, setView] = useState<"login" | "signup">("login");

    return (
        <>
            <Nav />
            <section className="login-signup-section">
                {view === "login"
                    ? <LoginForm onSwitch={() => setView("signup")} />
                    : <SignupForm onSwitch={() => setView("login")} />
                }
            </section>
        </>
    );
}