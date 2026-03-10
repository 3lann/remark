"use client";

import { useState, useEffect } from "react";

const DASHBOARD_PASSWORD = "remark2024";
const AUTH_KEY = "dashboard_auth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const [authenticated, setAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem(AUTH_KEY);
        if (stored === "true") setAuthenticated(true);
        setChecking(false);
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === DASHBOARD_PASSWORD) {
            localStorage.setItem(AUTH_KEY, "true");
            setAuthenticated(true);
            setError(false);
        } else {
            setError(true);
        }
    };

    if (checking) {
        return (
            <div className="min-h-screen bg-[#080816] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!authenticated) {
        return (
            <div className="min-h-screen bg-[#080816] flex items-center justify-center px-4">
                <div className="w-full max-w-sm">
                    <form onSubmit={handleLogin} className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_0_60px_rgba(139,92,246,0.1)]">
                        {/* Lock icon */}
                        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center">
                            <svg className="w-8 h-8 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-white text-center mb-2">لوحة التحكم</h1>
                        <p className="text-white/40 text-sm text-center mb-6">أدخل كلمة المرور للمتابعة</p>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setError(false); }}
                            placeholder="كلمة المرور"
                            className="w-full px-4 py-3 bg-white/[0.06] border border-white/[0.12] rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/40 backdrop-blur-sm transition-all mb-4 text-center text-lg tracking-widest"
                            dir="ltr"
                            autoFocus
                        />

                        {error && (
                            <p className="text-red-400 text-sm text-center mb-3 animate-pulse">كلمة المرور غير صحيحة</p>
                        )}

                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] active:scale-[0.98]"
                        >
                            دخول
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
