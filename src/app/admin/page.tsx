"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

/* ─── Types ─── */
interface Application {
    id: string;
    created_at: string;
    role: string;
    full_name: string;
    phone: string;
    email: string;
    city: string;
    years_experience: number;
    expected_salary: string;
    strongest_skill: string;
    portfolio_url: string;
    why_join: string;
    cv_url: string;
    status: string;
    notes?: string;
    category?: string;
    level?: string;
    ai_analysis?: string;
    work_type?: string;
}

interface Tag {
    label: string;
    color: string;
}

interface Listing {
    id: string;
    title: string;
    description: string;
    tags: Tag[];
    is_active: boolean;
}

type AdminRole = "super_admin" | "manager" | "viewer";

interface AdminUser {
    id: number;
    username: string;
    role: AdminRole;
    display_name: string;
    is_active: boolean;
    created_at: string;
}

interface ContactSubmission {
    id: number;
    name: string;
    email: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

interface LeadershipMember {
    id: number;
    name: string;
    name_ar: string;
    role: string;
    role_ar: string;
    years: string;
    bio: string;
    bio_ar: string;
    strengths: string[];
    strengths_ar: string[];
    sort_order: number;
    is_active: boolean;
    image_url?: string;
}

/* ─── Constants ─── */
const STATUS_COLORS: Record<string, string> = {
    pending: "bg-amber-500/15 text-amber-400 border-amber-500/20",
    reviewed: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    accepted: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    rejected: "bg-red-500/15 text-red-400 border-red-500/20",
};
const STATUS_OPTIONS = ["pending", "reviewed", "accepted", "rejected"];
const TAG_COLORS = ["violet", "blue", "pink", "emerald", "amber", "cyan"];
const ROLE_LABELS: Record<AdminRole, string> = {
    super_admin: "Super Admin",
    manager: "Manager",
    viewer: "Viewer",
};
const ROLE_COLORS: Record<AdminRole, string> = {
    super_admin: "bg-violet-500/15 text-violet-400 border-violet-500/20",
    manager: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    viewer: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
};

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function formatTime(iso: string) {
    return new Date(iso).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });
}

/* ═══════════════════════════════════════════════ */
/* ─── Application Detail Modal ─── */
/* ═══════════════════════════════════════════════ */
function ApplicationModal({
    app,
    roleLabels,
    canEdit,
    onClose,
    onStatusChange,
}: {
    app: Application;
    roleLabels: Record<string, string>;
    canEdit: boolean;
    onClose: () => void;
    onStatusChange: (id: string, status: string) => void;
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <div
                className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#0c0c20]/95 border border-white/[0.08] rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.6)] p-8"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">✕</button>

                <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-2xl shrink-0">👤</div>
                    <div>
                        <h2 className="text-xl font-bold text-white">{app.full_name}</h2>
                        <p className="text-white/40 text-sm">{roleLabels[app.role] || app.role}</p>
                        <p className="text-white/30 text-xs mt-1">Applied {formatDate(app.created_at)} at {formatTime(app.created_at)}</p>
                    </div>
                </div>

                {canEdit && (
                    <div className="flex items-center gap-2 mb-6 p-3 bg-white/[0.02] border border-white/[0.06] rounded-xl">
                        <span className="text-xs text-white/40 font-medium mr-2">STATUS:</span>
                        {STATUS_OPTIONS.map((s) => (
                            <button key={s} onClick={() => onStatusChange(app.id, s)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold border capitalize transition-all ${app.status === s ? STATUS_COLORS[s] : "bg-white/[0.03] text-white/30 border-white/[0.06] hover:bg-white/[0.06] hover:text-white/50"}`}>{s}</button>
                        ))}
                    </div>
                )}
                {!canEdit && (
                    <div className="flex items-center gap-2 mb-6 p-3 bg-white/[0.02] border border-white/[0.06] rounded-xl">
                        <span className="text-xs text-white/40 font-medium mr-2">STATUS:</span>
                        <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold border capitalize ${STATUS_COLORS[app.status] || "bg-white/5 text-white/40 border-white/10"}`}>{app.status}</span>
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4 mb-6">
                    {[{ label: "Email", value: app.email, icon: "📧" }, { label: "Phone", value: app.phone, icon: "📱" }, { label: "City", value: app.city, icon: "📍" }, { label: "Experience", value: `${app.years_experience} years`, icon: "⏳" }, { label: "Expected Salary", value: app.expected_salary || "—", icon: "💰" }, { label: "Strongest Skill", value: app.strongest_skill || "—", icon: "⚡" }, { label: "Category", value: app.category || "—", icon: "📊" }, { label: "Level", value: app.level || "—", icon: "⭐" }].map((f) => (
                        <div key={f.label} className="p-3 bg-white/[0.02] border border-white/[0.06] rounded-xl flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-1"><span className="text-sm">{f.icon}</span><span className="text-[10px] text-white/30 uppercase tracking-wider font-semibold">{f.label}</span></div>
                                <p className="text-sm text-white/80 font-medium">{f.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {app.ai_analysis && (
                    <div className="mb-6 p-4 bg-violet-500/5 border border-violet-500/20 rounded-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 blur-[40px] rounded-full pointer-events-none" />
                        <span className="flex items-center gap-2 text-[10px] text-violet-300 uppercase tracking-wider font-bold mb-2">
                            <span>🤖</span> AI Analysis
                        </span>
                        <p className="text-sm text-white/80 leading-relaxed font-medium relative z-10 whitespace-pre-wrap">
                            {app.ai_analysis.split('|').map((part, i) => (
                                <span key={i} className="block mb-2 last:mb-0">{part.trim()}</span>
                            ))}
                        </p>
                    </div>
                )}

                {app.portfolio_url && (
                    <div className="mb-4 p-3 bg-white/[0.02] border border-white/[0.06] rounded-xl">
                        <span className="text-[10px] text-white/30 uppercase tracking-wider font-semibold">Portfolio</span>
                        <a href={app.portfolio_url} target="_blank" rel="noopener noreferrer" className="block text-sm text-cyan-400 hover:text-cyan-300 mt-1 truncate">{app.portfolio_url}</a>
                    </div>
                )}

                <div className="mb-6 p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl">
                    <span className="text-[10px] text-white/30 uppercase tracking-wider font-semibold">Why they want to join</span>
                    <p className="text-sm text-white/70 mt-2 leading-relaxed">{app.why_join}</p>
                </div>

                {app.cv_url && (
                    <a href={app.cv_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 text-violet-300 rounded-xl text-sm font-semibold transition-all">📄 Download CV</a>
                )}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════ */
/* ─── Add Listing Modal ─── */
/* ═══════════════════════════════════════════════ */
function AddListingModal({
    onClose,
    onCreated,
}: {
    onClose: () => void;
    onCreated: (listing: Listing) => void;
}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState<Tag[]>([]);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const addTag = () => {
        if (!tagInput.trim()) return;
        const color = TAG_COLORS[tags.length % TAG_COLORS.length];
        setTags((prev) => [...prev, { label: tagInput.trim(), color }]);
        setTagInput("");
    };

    const removeTag = (i: number) => setTags((prev) => prev.filter((_, idx) => idx !== i));

    const handleSave = async () => {
        if (!title || !description) {
            setError("Title and description are required");
            return;
        }
        setSaving(true);
        setError("");
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        try {
            const res = await fetch("/api/admin/listings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, title, description, tags }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed");
            onCreated(data.listing);
            onClose();
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Failed to create listing");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <div className="relative w-full max-w-lg bg-[#0c0c20]/95 border border-white/[0.08] rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.6)] p-8" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">✕</button>

                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-lg">➕</span>
                    New Job Listing
                </h2>

                {error && <div className="mb-4 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">{error}</div>}

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-white/60 mb-2">Job Title *</label>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.1] rounded-xl text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition-all" placeholder="e.g. UI/UX Designer" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white/60 mb-2">Description *</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.1] rounded-xl text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition-all resize-none" placeholder="A brief description of the role..." />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white/60 mb-2">Tags</label>
                        <div className="flex gap-2">
                            <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} className="flex-1 px-4 py-2.5 bg-white/[0.05] border border-white/[0.1] rounded-xl text-white placeholder-white/25 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition-all" placeholder="Add tag & press Enter" />
                            <button onClick={addTag} className="px-4 py-2.5 bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 text-violet-300 rounded-xl text-sm font-medium transition-all">Add</button>
                        </div>
                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                {tags.map((t, i) => (
                                    <span key={i} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-${t.color}-500/15 text-${t.color}-400 border border-${t.color}-500/20`}>
                                        {t.label}
                                        <button onClick={() => removeTag(i)} className="text-white/40 hover:text-white ml-1">×</button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <button onClick={handleSave} disabled={saving} className="w-full mt-6 py-3 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all shadow-[0_4px_20px_rgba(124,58,237,0.3)] disabled:opacity-50">
                    {saving ? "Creating..." : "Create Listing"}
                </button>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════ */
/* ─── Add Leader Modal ─── */
/* ═══════════════════════════════════════════════ */
function AddLeaderModal({
    onClose,
    onCreated,
}: {
    onClose: () => void;
    onCreated: (leader: LeadershipMember) => void;
}) {
    const [name, setName] = useState("");
    const [nameAr, setNameAr] = useState("");
    const [role, setRole] = useState("");
    const [roleAr, setRoleAr] = useState("");
    const [years, setYears] = useState("");
    const [bio, setBio] = useState("");
    const [bioAr, setBioAr] = useState("");
    const [strengthsStr, setStrengthsStr] = useState("");
    const [strengthsArStr, setStrengthsArStr] = useState("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const handleSave = async () => {
        if (!name || !role) { setError("Name and role are required"); return; }
        setSaving(true);
        setError("");
        try {
            const strengths = strengthsStr.split(",").map(s => s.trim()).filter(Boolean);
            const strengths_ar = strengthsArStr.split(",").map(s => s.trim()).filter(Boolean);
            const res = await fetch("/api/admin/leadership", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, name_ar: nameAr, role, role_ar: roleAr, years: years || "1", bio, bio_ar: bioAr, strengths, strengths_ar }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed");
            onCreated(data.member);
            onClose();
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Failed to add leader");
        } finally { setSaving(false); }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <div className="relative w-full max-w-lg bg-[#0c0c20]/95 border border-white/[0.08] rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.6)] p-8 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">✕</button>
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-lg">👑</span>
                    Add Leader
                </h2>
                {error && <div className="mb-4 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">{error}</div>}
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-white/60 mb-2">Name (EN) *</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder-white/30 focus:border-violet-500/40 focus:outline-none transition-all" placeholder="John Doe" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white/60 mb-2">Name (AR)</label>
                            <input value={nameAr} onChange={(e) => setNameAr(e.target.value)} className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder-white/30 focus:border-violet-500/40 focus:outline-none transition-all" placeholder="الاسم بالعربي" dir="rtl" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-white/60 mb-2">Role (EN) *</label>
                            <input value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder-white/30 focus:border-violet-500/40 focus:outline-none transition-all" placeholder="CEO & Founder" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white/60 mb-2">Role (AR)</label>
                            <input value={roleAr} onChange={(e) => setRoleAr(e.target.value)} className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder-white/30 focus:border-violet-500/40 focus:outline-none transition-all" placeholder="المدير التنفيذي" dir="rtl" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white/60 mb-2">Years of Experience</label>
                        <input value={years} onChange={(e) => setYears(e.target.value)} className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder-white/30 focus:border-violet-500/40 focus:outline-none transition-all" placeholder="5+" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white/60 mb-2">Bio (EN)</label>
                        <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder-white/30 focus:border-violet-500/40 focus:outline-none transition-all resize-none" placeholder="Short bio..." />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white/60 mb-2">Bio (AR)</label>
                        <textarea value={bioAr} onChange={(e) => setBioAr(e.target.value)} rows={3} className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder-white/30 focus:border-violet-500/40 focus:outline-none transition-all resize-none" placeholder="نبذة مختصرة..." dir="rtl" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white/60 mb-2">Strengths (EN, comma-separated)</label>
                        <input value={strengthsStr} onChange={(e) => setStrengthsStr(e.target.value)} className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder-white/30 focus:border-violet-500/40 focus:outline-none transition-all" placeholder="Leadership, Strategy, Marketing" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white/60 mb-2">Strengths (AR, comma-separated)</label>
                        <input value={strengthsArStr} onChange={(e) => setStrengthsArStr(e.target.value)} className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder-white/30 focus:border-violet-500/40 focus:outline-none transition-all" placeholder="القيادة، الاستراتيجية، التسويق" dir="rtl" />
                    </div>
                </div>
                <button onClick={handleSave} disabled={saving} className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/20 transition-all disabled:opacity-50">
                    {saving ? "Adding..." : "Add Leader"}
                </button>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════ */
/* ─── Add User Modal ─── */
/* ═══════════════════════════════════════════════ */
function AddUserModal({
    onClose,
    onCreated,
}: {
    onClose: () => void;
    onCreated: (user: AdminUser) => void;
}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [role, setRole] = useState<AdminRole>("viewer");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const handleSave = async () => {
        if (!username || !password || !displayName) { setError("All fields are required"); return; }
        if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
        setSaving(true);
        setError("");
        try {
            const res = await fetch("/api/admin/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, role, displayName }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed");
            onCreated(data.user);
            onClose();
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Failed to create user");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <div className="relative w-full max-w-lg bg-[#0c0c20]/95 border border-white/[0.08] rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.6)] p-8" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">✕</button>

                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-lg">👤</span>
                    Add Team Member
                </h2>

                {error && <div className="mb-4 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">{error}</div>}

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-white/60 mb-2">Display Name *</label>
                        <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.1] rounded-xl text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition-all" placeholder="e.g. John Doe" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white/60 mb-2">Username *</label>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.1] rounded-xl text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition-all" placeholder="e.g. johndoe" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white/60 mb-2">Password *</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.1] rounded-xl text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition-all" placeholder="Min 6 characters" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white/60 mb-2">Role *</label>
                        <div className="grid grid-cols-3 gap-2">
                            {(["viewer", "manager", "super_admin"] as AdminRole[]).map((r) => (
                                <button key={r} type="button" onClick={() => setRole(r)} className={`py-3 px-2 rounded-xl text-sm font-semibold border transition-all text-center ${role === r ? ROLE_COLORS[r] : "bg-white/[0.03] text-white/30 border-white/[0.06] hover:bg-white/[0.06]"}`}>
                                    {ROLE_LABELS[r]}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <button onClick={handleSave} disabled={saving} className="w-full mt-6 py-3 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all shadow-[0_4px_20px_rgba(124,58,237,0.3)] disabled:opacity-50">
                    {saving ? "Creating..." : "Add User"}
                </button>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════ */
/* ─── Change Password Modal ─── */
/* ═══════════════════════════════════════════════ */
function ChangePasswordModal({
    onClose,
}: {
    onClose: () => void;
}) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSave = async () => {
        if (!currentPassword || !newPassword) { setError("All fields are required"); return; }
        if (newPassword.length < 6) { setError("New password must be at least 6 characters"); return; }
        setSaving(true);
        setError("");
        try {
            const res = await fetch("/api/admin/users/password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed");
            setSuccess(true);
            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Failed to change password");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <div className="relative w-full max-w-sm bg-[#0c0c20]/95 border border-white/[0.08] rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.6)] p-8" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">✕</button>

                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-lg">🔑</span>
                    Change Password
                </h2>

                {error && <div className="mb-4 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">{error}</div>}
                {success && <div className="mb-4 px-4 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm">Password updated successfully!</div>}

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-white/60 mb-2">Current Password</label>
                        <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.1] rounded-xl text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition-all" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white/60 mb-2">New Password</label>
                        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.1] rounded-xl text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition-all" />
                    </div>
                </div>

                {!success && (
                    <button onClick={handleSave} disabled={saving} className="w-full mt-6 py-3 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all shadow-[0_4px_20px_rgba(124,58,237,0.3)] disabled:opacity-50">
                        {saving ? "Updating..." : "Update Password"}
                    </button>
                )}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════ */
/* ─── Main Dashboard Page ─── */
/* ═══════════════════════════════════════════════ */
export default function AdminDashboardPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"applications" | "listings" | "access" | "contacts" | "leadership">("applications");
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

    /* ── Current User (RBAC) ── */
    const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
    const myRole: AdminRole = currentUser?.role || "viewer";
    const canEdit = myRole === "super_admin" || myRole === "manager";
    const isSuperAdmin = myRole === "super_admin";

    /* ── Applications State ── */
    const [applications, setApplications] = useState<Application[]>([]);
    const [appLoading, setAppLoading] = useState(true);
    const [appError, setAppError] = useState("");
    const [search, setSearch] = useState("");
    const [filterRole, setFilterRole] = useState("all");
    const [filterStatus, setFilterStatus] = useState("all");
    const [selectedApp, setSelectedApp] = useState<Application | null>(null);
    const [expandedAppId, setExpandedAppId] = useState<string | null>(null);

    /* ── Listings State ── */
    const [listings, setListings] = useState<Listing[]>([]);
    const [listLoading, setListLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);

    /* ── Access (Team) State ── */
    const [teamUsers, setTeamUsers] = useState<AdminUser[]>([]);
    const [teamLoading, setTeamLoading] = useState(false);
    const [showAddUserModal, setShowAddUserModal] = useState(false);

    /* ── Contacts State ── */
    const [contacts, setContacts] = useState<ContactSubmission[]>([]);
    const [contactsLoading, setContactsLoading] = useState(false);

    /* ── Leadership State ── */
    const [leaders, setLeaders] = useState<LeadershipMember[]>([]);
    const [leadersLoading, setLeadersLoading] = useState(false);
    const [showAddLeaderModal, setShowAddLeaderModal] = useState(false);

    /* ── Role Labels (from listings) ── */
    const roleLabels: Record<string, string> = {};
    listings.forEach((l) => { roleLabels[l.id] = l.title; });

    /* ── Fetch Current User ── */
    const fetchCurrentUser = useCallback(async () => {
        try {
            const res = await fetch("/api/admin/users?me=true");
            if (res.status === 401) { router.push("/admin/login"); return; }
            if (res.ok) {
                const d = await res.json();
                setCurrentUser(d.user);
            }
        } catch { /* ignore */ }
    }, [router]);

    /* ── Fetch Applications ── */
    const fetchApplications = useCallback(async () => {
        try {
            const res = await fetch("/api/admin/applications");
            if (res.status === 401) { router.push("/admin/login"); return; }
            if (!res.ok) { const d = await res.json(); setAppError(d.error || "Failed"); return; }
            const d = await res.json();
            setApplications(d.applications || []);
        } catch { setAppError("Connection error"); }
        finally { setAppLoading(false); }
    }, [router]);

    /* ── Fetch Listings ── */
    const fetchListings = useCallback(async () => {
        try {
            const res = await fetch("/api/admin/listings");
            if (res.ok) { const d = await res.json(); setListings(d.listings || []); }
        } catch { /* ignore */ }
        finally { setListLoading(false); }
    }, []);

    /* ── Fetch Team Users ── */
    const fetchTeamUsers = useCallback(async () => {
        setTeamLoading(true);
        try {
            const res = await fetch("/api/admin/users");
            if (res.ok) { const d = await res.json(); setTeamUsers(d.users || []); }
        } catch { /* ignore */ }
        finally { setTeamLoading(false); }
    }, []);

    /* ── Fetch Contacts ── */
    const fetchContacts = useCallback(async () => {
        setContactsLoading(true);
        try {
            const res = await fetch("/api/admin/contacts");
            if (res.ok) { const d = await res.json(); setContacts(d.submissions || []); }
        } catch { /* ignore */ }
        finally { setContactsLoading(false); }
    }, []);

    /* ── Fetch Leadership ── */
    const fetchLeaders = useCallback(async () => {
        setLeadersLoading(true);
        try {
            const res = await fetch("/api/admin/leadership");
            if (res.ok) { const d = await res.json(); setLeaders(d.members || []); }
        } catch { /* ignore */ }
        finally { setLeadersLoading(false); }
    }, []);

    useEffect(() => {
        fetchCurrentUser();
        fetchApplications();
        fetchListings();
    }, [fetchCurrentUser, fetchApplications, fetchListings]);

    useEffect(() => {
        if (isSuperAdmin && activeTab === "access") fetchTeamUsers();
        if (isSuperAdmin && activeTab === "contacts") fetchContacts();
        if (isSuperAdmin && activeTab === "leadership") fetchLeaders();
    }, [isSuperAdmin, activeTab, fetchTeamUsers, fetchContacts, fetchLeaders]);

    const handleLogout = async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
    };

    const handleStatusChange = async (id: string, status: string) => {
        if (!canEdit) return;
        const res = await fetch("/api/admin/applications", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status }),
        });
        if (res.ok) {
            setApplications((p) => p.map((a) => (a.id === id ? { ...a, status } : a)));
            if (selectedApp?.id === id) setSelectedApp((p) => (p ? { ...p, status } : null));
        }
    };

    const handleToggleListing = async (id: string, is_active: boolean) => {
        if (!canEdit) return;
        const res = await fetch("/api/admin/listings", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, is_active: !is_active }),
        });
        if (res.ok) {
            setListings((p) => p.map((l) => (l.id === id ? { ...l, is_active: !is_active } : l)));
        }
    };

    const handleDeleteListing = async (id: string) => {
        if (!canEdit) return;
        if (!confirm("Delete this listing?")) return;
        const res = await fetch("/api/admin/listings", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
        if (res.ok) setListings((p) => p.filter((l) => l.id !== id));
    };

    const handleChangeUserRole = async (userId: number, newRole: AdminRole) => {
        const res = await fetch("/api/admin/users", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: userId, role: newRole }),
        });
        if (res.ok) {
            setTeamUsers((p) => p.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
        }
    };

    const handleToggleUserActive = async (userId: number, isActive: boolean) => {
        const res = await fetch("/api/admin/users", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: userId, isActive: !isActive }),
        });
        if (res.ok) {
            setTeamUsers((p) => p.map((u) => (u.id === userId ? { ...u, is_active: !isActive } : u)));
        }
    };

    const handleDeleteUser = async (userId: number) => {
        if (!confirm("Remove this team member?")) return;
        const res = await fetch(`/api/admin/users?id=${userId}`, { method: "DELETE" });
        if (res.ok) setTeamUsers((p) => p.filter((u) => u.id !== userId));
    };

    /* ── Contact Handlers ── */
    const handleToggleRead = async (id: number, is_read: boolean) => {
        const res = await fetch("/api/admin/contacts", {
            method: "PATCH", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, is_read: !is_read }),
        });
        if (res.ok) setContacts((p) => p.map((c) => (c.id === id ? { ...c, is_read: !is_read } : c)));
    };

    const handleDeleteContact = async (id: number) => {
        if (!confirm("Delete this message?")) return;
        const res = await fetch(`/api/admin/contacts?id=${id}`, { method: "DELETE" });
        if (res.ok) setContacts((p) => p.filter((c) => c.id !== id));
    };

    /* ── Leadership Handlers ── */
    const handleToggleLeader = async (id: number, is_active: boolean) => {
        const res = await fetch("/api/admin/leadership", {
            method: "PATCH", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, is_active: !is_active }),
        });
        if (res.ok) setLeaders((p) => p.map((l) => (l.id === id ? { ...l, is_active: !is_active } : l)));
    };

    const handleDeleteLeader = async (id: number) => {
        if (!confirm("Remove this leader?")) return;
        const res = await fetch(`/api/admin/leadership?id=${id}`, { method: "DELETE" });
        if (res.ok) setLeaders((p) => p.filter((l) => l.id !== id));
    };

    const handleUploadLeaderImage = async (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("id", id.toString());
        formData.append("image", file);

        const res = await fetch("/api/admin/leadership/image", { method: "POST", body: formData });
        if (res.ok) {
            const data = await res.json();
            setLeaders((p) => p.map(l => l.id === id ? data.member : l));
        } else {
            alert("Failed to upload image");
        }
    };

    /* ── Filters ── */
    const filtered = applications.filter((app) => {
        const matchSearch = !search || app.full_name.toLowerCase().includes(search.toLowerCase()) || app.email.toLowerCase().includes(search.toLowerCase());
        const matchRole = filterRole === "all" || app.role === filterRole;
        const matchStatus = filterStatus === "all" || app.status === filterStatus;
        return matchSearch && matchRole && matchStatus;
    });

    const stats = {
        total: applications.length,
        pending: applications.filter((a) => a.status === "pending").length,
        reviewed: applications.filter((a) => a.status === "reviewed").length,
        accepted: applications.filter((a) => a.status === "accepted").length,
        rejected: applications.filter((a) => a.status === "rejected").length,
    };

    const uniqueRoles = [...new Set(applications.map((a) => a.role))];

    /* ── Build tabs based on role ── */
    const unreadContacts = contacts.filter((c) => !c.is_read).length;
    const tabs: { key: "applications" | "listings" | "access" | "contacts" | "leadership"; label: string; icon: string; count: number }[] = [
        { key: "applications", label: "Applications", icon: "📋", count: applications.length },
    ];
    if (canEdit) tabs.push({ key: "listings", label: "Job Listings", icon: "💼", count: listings.length });
    if (isSuperAdmin) {
        tabs.push({ key: "contacts", label: "Contacts", icon: "📩", count: unreadContacts });
        tabs.push({ key: "leadership", label: "Leadership", icon: "👑", count: leaders.length });
        tabs.push({ key: "access", label: "Access", icon: "🔐", count: teamUsers.length });
    }

    return (
        <div className="min-h-screen bg-[#080816]">
            {/* Background */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-violet-600/[0.06] rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-500/[0.06] rounded-full blur-[120px]" />
            </div>

            {/* Top Bar */}
            <header className="sticky top-0 z-40 bg-[#080816]/80 backdrop-blur-xl border-b border-white/[0.06]">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center"><span className="text-lg">🛡️</span></div>
                        <div>
                            <h1 className="text-lg font-bold text-white">Admin Dashboard</h1>
                            <p className="text-[10px] text-white/30 uppercase tracking-widest font-semibold">Management Console</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        {currentUser && (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-xl">
                                <span className="text-sm text-white/60 font-medium">{currentUser.display_name}</span>
                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider border ${ROLE_COLORS[myRole]}`}>
                                    {ROLE_LABELS[myRole]}
                                </span>
                            </div>
                        )}
                        <button onClick={() => setShowChangePasswordModal(true)} className="px-4 py-2 bg-white/[0.04] hover:bg-violet-500/20 border border-white/[0.08] hover:border-violet-500/40 rounded-xl text-white/50 hover:text-violet-300 text-sm font-medium transition-all">Password</button>
                        <button onClick={handleLogout} className="px-4 py-2 bg-white/[0.04] hover:bg-red-500/10 border border-white/[0.08] hover:border-red-500/20 rounded-xl text-white/50 hover:text-red-400 text-sm font-medium transition-all">Sign Out</button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Tabs */}
                <div className="flex gap-2 mb-8">
                    {tabs.map((tab) => (
                        <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all ${activeTab === tab.key ? "bg-violet-500/15 text-violet-300 border-violet-500/20" : "bg-white/[0.02] text-white/40 border-white/[0.06] hover:bg-white/[0.04] hover:text-white/60"}`}>
                            <span>{tab.icon}</span> {tab.label}
                            <span className={`ml-1 px-2 py-0.5 rounded-md text-xs ${activeTab === tab.key ? "bg-violet-500/20 text-violet-300" : "bg-white/[0.04] text-white/30"}`}>{tab.count}</span>
                        </button>
                    ))}
                </div>

                {/* ═══ APPLICATIONS TAB ═══ */}
                {activeTab === "applications" && (
                    <>
                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                            {[
                                { label: "Total", value: stats.total, icon: "📋" },
                                { label: "Pending", value: stats.pending, icon: "⏳" },
                                { label: "Reviewed", value: stats.reviewed, icon: "👁️" },
                                { label: "Accepted", value: stats.accepted, icon: "✅" },
                                { label: "Rejected", value: stats.rejected, icon: "❌" },
                            ].map((s) => (
                                <div key={s.label} className="p-4 bg-white/[0.03] border border-white/[0.06] rounded-2xl hover:bg-white/[0.05] transition-all cursor-default group">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-lg group-hover:scale-110 transition-transform">{s.icon}</span>
                                        <span className="text-[10px] text-white/30 uppercase tracking-widest font-semibold">{s.label}</span>
                                    </div>
                                    <p className="text-3xl font-bold text-white">{s.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Filters */}
                        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 mb-6 p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl">
                            <div className="relative flex-1">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25">🔍</span>
                                <input type="text" placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white placeholder-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 transition-all" />
                            </div>
                            <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white/70 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 appearance-none cursor-pointer min-w-[160px]">
                                <option value="all" className="bg-[#0c0c20]">All Roles</option>
                                {uniqueRoles.map((r) => <option key={r} value={r} className="bg-[#0c0c20]">{roleLabels[r] || r}</option>)}
                            </select>
                            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white/70 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 appearance-none cursor-pointer min-w-[140px]">
                                <option value="all" className="bg-[#0c0c20]">All Status</option>
                                {STATUS_OPTIONS.map((s) => <option key={s} value={s} className="bg-[#0c0c20]">{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                            </select>
                        </div>

                        {/* Applications Table */}
                        {appLoading ? (
                            <div className="flex items-center justify-center py-20"><div className="flex flex-col items-center gap-4"><div className="w-8 h-8 border-2 border-violet-500/30 border-t-violet-400 rounded-full animate-spin" /><p className="text-white/30 text-sm">Loading applications...</p></div></div>
                        ) : appError ? (
                            <div className="flex items-center justify-center py-20"><div className="text-center p-8 bg-red-500/5 border border-red-500/10 rounded-2xl max-w-md"><span className="text-3xl mb-3 block">⚠️</span><p className="text-red-400 text-sm font-medium">{appError}</p></div></div>
                        ) : filtered.length === 0 ? (
                            <div className="flex items-center justify-center py-20"><div className="text-center"><span className="text-4xl mb-3 block">📭</span><p className="text-white/40 text-sm">No applications found</p></div></div>
                        ) : (
                            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead><tr className="border-b border-white/[0.06]">{["Applicant", "Role", "City", "Experience", "Category", "Status", "CV", ""].map((h) => <th key={h} className="px-5 py-4 text-left text-[10px] text-white/30 uppercase tracking-widest font-semibold">{h}</th>)}</tr></thead>
                                        <tbody>
                                            {filtered.map((app) => (
                                                <React.Fragment key={app.id}>
                                                    <tr onClick={() => setExpandedAppId(expandedAppId === app.id ? null : app.id)} className={`border-b border-white/[0.03] hover:bg-white/[0.04] cursor-pointer transition-colors group ${expandedAppId === app.id ? "bg-white/[0.02]" : ""}`}>
                                                        <td className="px-5 py-4"><p className="text-white font-medium group-hover:text-violet-300 transition-colors">{app.full_name}</p><p className="text-white/30 text-xs mt-0.5">{app.email}</p></td>
                                                        <td className="px-5 py-4 text-white/60">
                                                            {roleLabels[app.role] || app.role}
                                                            {app.work_type && <span className="block mt-1 text-[10px] uppercase font-semibold text-violet-400/70">{app.work_type}</span>}
                                                        </td>
                                                        <td className="px-5 py-4 text-white/50">{app.city}</td>
                                                        <td className="px-5 py-4 text-white/50">{app.years_experience}y</td>
                                                        <td className="px-5 py-4">
                                                            {app.category && <span className="inline-block px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold">{app.category}</span>}
                                                            {app.level && <span className="inline-block ml-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">{app.level}</span>}
                                                        </td>
                                                        <td className="px-5 py-4"><span className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold border capitalize ${STATUS_COLORS[app.status] || "bg-white/5 text-white/40 border-white/10"}`}>{app.status}</span></td>
                                                        <td className="px-5 py-4">{app.cv_url && <a href={app.cv_url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-cyan-400 hover:text-cyan-300 text-xs font-medium transition-colors">📄 Download</a>}</td>
                                                        <td className="px-5 py-4 text-right text-white/30 text-xs">{expandedAppId === app.id ? "▲" : "▼"}</td>
                                                    </tr>
                                                    {expandedAppId === app.id && (
                                                        <tr className="bg-white/[0.01] border-b border-white/[0.03]">
                                                            <td colSpan={8} className="p-6">
                                                                <div className="flex flex-col lg:flex-row gap-6">
                                                                    <div className="flex-1 space-y-4">
                                                                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                                                            {[{ label: "Phone", value: app.phone, icon: "📱" }, { label: "Expected Salary", value: app.expected_salary || "—", icon: "💰" }, { label: "Strongest Skill", value: app.strongest_skill || "—", icon: "⚡" }].map((f) => (
                                                                                <div key={f.label} className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl">
                                                                                    <div className="flex items-center gap-2 mb-1"><span className="text-sm">{f.icon}</span><span className="text-[10px] text-white/30 uppercase tracking-wider font-semibold">{f.label}</span></div>
                                                                                    <p className="text-sm text-white/80 font-medium">{f.value}</p>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                        {app.why_join && (
                                                                            <div className="p-4 bg-white/[0.02] border border-white/[0.04] rounded-xl">
                                                                                <span className="text-[10px] text-white/30 uppercase tracking-wider font-semibold block mb-2">Why join / Additional Notes</span>
                                                                                <p className="text-sm text-white/70 leading-relaxed">{app.why_join}</p>
                                                                            </div>
                                                                        )}
                                                                        {app.portfolio_url && (
                                                                            <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl">
                                                                                <span className="text-[10px] text-white/30 uppercase tracking-wider font-semibold block mb-1">Portfolio</span>
                                                                                <a href={app.portfolio_url} target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-400 hover:text-cyan-300 truncate block">{app.portfolio_url}</a>
                                                                            </div>
                                                                        )}
                                                                    </div>

                                                                    {app.ai_analysis && (
                                                                        <div className="flex-1 p-5 bg-violet-500/5 border border-violet-500/20 rounded-2xl relative overflow-hidden">
                                                                            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 blur-[40px] rounded-full pointer-events-none" />
                                                                            <span className="flex items-center gap-2 text-[10px] text-violet-300 uppercase tracking-wider font-bold mb-3"><span>🤖</span> AI Analysis</span>
                                                                            <p className="text-sm text-white/80 leading-relaxed font-medium relative z-10 whitespace-pre-wrap">
                                                                                {app.ai_analysis.split('|').map((part, i) => (
                                                                                    <span key={i} className="block mb-2">{part.trim()}</span>
                                                                                ))}
                                                                            </p>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {canEdit && (
                                                                    <div className="mt-6 flex items-center gap-3 pt-6 border-t border-white/[0.04]">
                                                                        <span className="text-xs text-white/40 font-medium mr-2">CHANGE STATUS:</span>
                                                                        {STATUS_OPTIONS.map((s) => (
                                                                            <button key={s} onClick={() => handleStatusChange(app.id, s)} className={`px-4 py-2 rounded-xl text-xs font-semibold border capitalize transition-all ${app.status === s ? STATUS_COLORS[s] : "bg-white/[0.03] text-white/40 border-white/[0.06] hover:bg-white/[0.06] hover:text-white/70"}`}>
                                                                                {s}
                                                                            </button>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="px-5 py-3 border-t border-white/[0.04]"><p className="text-white/20 text-xs">Showing {filtered.length} of {applications.length} applications</p></div>
                            </div>
                        )}
                    </>
                )}

                {/* ═══ LISTINGS TAB ═══ */}
                {activeTab === "listings" && canEdit && (
                    <>
                        {/* Add Button */}
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-white/40 text-sm">{listings.length} job listing{listings.length !== 1 ? "s" : ""}</p>
                            <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-semibold rounded-xl text-sm transition-all shadow-[0_4px_20px_rgba(124,58,237,0.3)]">
                                ➕ Add Listing
                            </button>
                        </div>

                        {listLoading ? (
                            <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-2 border-violet-500/30 border-t-violet-400 rounded-full animate-spin" /></div>
                        ) : listings.length === 0 ? (
                            <div className="flex items-center justify-center py-20"><div className="text-center"><span className="text-4xl mb-3 block">💼</span><p className="text-white/40 text-sm">No listings yet</p></div></div>
                        ) : (
                            <div className="grid gap-4">
                                {listings.map((listing) => (
                                    <div key={listing.id} className={`p-5 bg-white/[0.02] border rounded-2xl transition-all ${listing.is_active ? "border-white/[0.06] hover:bg-white/[0.04]" : "border-white/[0.03] opacity-50"}`}>
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-white font-semibold text-lg">{listing.title}</h3>
                                                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider ${listing.is_active ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20" : "bg-red-500/15 text-red-400 border border-red-500/20"}`}>
                                                        {listing.is_active ? "Active" : "Inactive"}
                                                    </span>
                                                </div>
                                                <p className="text-white/50 text-sm mb-3 leading-relaxed">{listing.description}</p>
                                                {listing.tags && listing.tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-2">
                                                        {listing.tags.map((t: Tag, i: number) => (
                                                            <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/[0.05] text-white/50 border border-white/[0.08]">{t.label}</span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 shrink-0">
                                                <button onClick={() => handleToggleListing(listing.id, listing.is_active)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${listing.is_active ? "bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20"}`}>
                                                    {listing.is_active ? "Deactivate" : "Activate"}
                                                </button>
                                                <button onClick={() => handleDeleteListing(listing.id)} className="px-3 py-1.5 rounded-lg text-xs font-semibold border bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20 transition-all">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {/* ═══ TEAM TAB (Super Admin Only) ═══ */}
                {activeTab === "access" && isSuperAdmin && (
                    <>
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-white/40 text-sm">{teamUsers.length} team member{teamUsers.length !== 1 ? "s" : ""}</p>
                            <button onClick={() => setShowAddUserModal(true)} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-semibold rounded-xl text-sm transition-all shadow-[0_4px_20px_rgba(124,58,237,0.3)]">
                                ➕ Add Member
                            </button>
                        </div>

                        {teamLoading ? (
                            <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-2 border-violet-500/30 border-t-violet-400 rounded-full animate-spin" /></div>
                        ) : teamUsers.length === 0 ? (
                            <div className="flex items-center justify-center py-20"><div className="text-center"><span className="text-4xl mb-3 block">👥</span><p className="text-white/40 text-sm">No team members yet</p></div></div>
                        ) : (
                            <div className="grid gap-4">
                                {teamUsers.map((user) => {
                                    const isMe = currentUser?.id === user.id;
                                    return (
                                        <div key={user.id} className={`p-5 bg-white/[0.02] border rounded-2xl transition-all ${user.is_active ? "border-white/[0.06] hover:bg-white/[0.04]" : "border-white/[0.03] opacity-50"}`}>
                                            <div className="flex items-center justify-between gap-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-xl">
                                                        {user.role === "super_admin" ? "👑" : user.role === "manager" ? "⚙️" : "👁️"}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <h3 className="text-white font-semibold">{user.display_name}</h3>
                                                            {isMe && <span className="px-2 py-0.5 rounded-md text-[9px] font-semibold bg-cyan-500/15 text-cyan-400 border border-cyan-500/20 uppercase">You</span>}
                                                        </div>
                                                        <p className="text-white/30 text-xs mt-0.5">@{user.username} · Joined {formatDate(user.created_at)}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    {/* Role selector */}
                                                    <select
                                                        value={user.role}
                                                        onChange={(e) => handleChangeUserRole(user.id, e.target.value as AdminRole)}
                                                        disabled={isMe}
                                                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border appearance-none cursor-pointer ${ROLE_COLORS[user.role]} ${isMe ? "opacity-50 cursor-not-allowed" : ""}`}
                                                    >
                                                        <option value="viewer" className="bg-[#0c0c20] text-white">Viewer</option>
                                                        <option value="manager" className="bg-[#0c0c20] text-white">Manager</option>
                                                        <option value="super_admin" className="bg-[#0c0c20] text-white">Super Admin</option>
                                                    </select>

                                                    {!isMe && (
                                                        <>
                                                            <button onClick={() => handleToggleUserActive(user.id, user.is_active)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${user.is_active ? "bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20"}`}>
                                                                {user.is_active ? "Disable" : "Enable"}
                                                            </button>
                                                            <button onClick={() => handleDeleteUser(user.id)} className="px-3 py-1.5 rounded-lg text-xs font-semibold border bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20 transition-all">
                                                                Remove
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </>
                )}

                {/* ═══ CONTACTS TAB (Super Admin Only) ═══ */}
                {activeTab === "contacts" && isSuperAdmin && (
                    <>
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-white/40 text-sm">{contacts.length} message{contacts.length !== 1 ? "s" : ""} · {unreadContacts} unread</p>
                        </div>
                        {contactsLoading ? (
                            <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-2 border-violet-500/30 border-t-violet-400 rounded-full animate-spin" /></div>
                        ) : contacts.length === 0 ? (
                            <div className="flex items-center justify-center py-20"><div className="text-center"><span className="text-4xl mb-3 block">📩</span><p className="text-white/40 text-sm">No messages yet</p></div></div>
                        ) : (
                            <div className="grid gap-4">
                                {contacts.map((c) => (
                                    <div key={c.id} className={`p-5 bg-white/[0.02] border rounded-2xl transition-all ${c.is_read ? "border-white/[0.04] opacity-60" : "border-violet-500/20 bg-violet-500/[0.02]"}`}>
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-white font-semibold">{c.name}</h3>
                                                    {!c.is_read && <span className="px-2 py-0.5 rounded-md text-[9px] font-semibold bg-violet-500/15 text-violet-400 border border-violet-500/20 uppercase">New</span>}
                                                    <span className="text-white/30 text-xs">{formatDate(c.created_at)}</span>
                                                </div>
                                                <p className="text-cyan-400 text-xs mb-2">{c.email}</p>
                                                <p className="text-white/60 text-sm leading-relaxed">{c.message}</p>
                                            </div>
                                            <div className="flex items-center gap-2 shrink-0">
                                                <button onClick={() => handleToggleRead(c.id, c.is_read)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${c.is_read ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"}`}>
                                                    {c.is_read ? "Mark Unread" : "Mark Read"}
                                                </button>
                                                <button onClick={() => handleDeleteContact(c.id)} className="px-3 py-1.5 rounded-lg text-xs font-semibold border bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20 transition-all">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {/* ═══ LEADERSHIP TAB (Super Admin Only) ═══ */}
                {activeTab === "leadership" && isSuperAdmin && (
                    <>
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-white/40 text-sm">{leaders.length} leader{leaders.length !== 1 ? "s" : ""}</p>
                            <button onClick={() => setShowAddLeaderModal(true)} className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-violet-500/20 transition-all flex items-center gap-2">+ Add Leader</button>
                        </div>
                        {leadersLoading ? (
                            <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-2 border-violet-500/30 border-t-violet-400 rounded-full animate-spin" /></div>
                        ) : leaders.length === 0 ? (
                            <div className="flex items-center justify-center py-20"><div className="text-center"><span className="text-4xl mb-3 block">👑</span><p className="text-white/40 text-sm">No leadership members</p></div></div>
                        ) : (
                            <div className="grid gap-4">
                                {leaders.map((l) => (
                                    <div key={l.id} className={`p-5 bg-white/[0.02] border rounded-2xl transition-all ${l.is_active ? "border-white/[0.06] hover:bg-white/[0.04]" : "border-white/[0.03] opacity-50"}`}>
                                        <div className="flex items-start justify-between gap-4">
                                            {l.image_url && (
                                                <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/[0.05] border border-white/10 shrink-0">
                                                    <img src={l.image_url} alt={l.name} className="w-full h-full object-cover" />
                                                </div>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h3 className="text-white font-semibold text-lg">{l.name}</h3>
                                                    <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-violet-500/15 text-violet-400 border border-violet-500/20">{l.years} YRS</span>
                                                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase ${l.is_active ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20" : "bg-red-500/15 text-red-400 border border-red-500/20"}`}>{l.is_active ? "Visible" : "Hidden"}</span>

                                                    {/* Upload Image Button */}
                                                    <label className="cursor-pointer ml-auto px-2py-1 text-xs text-white/40 hover:text-violet-300 transition-colors flex items-center gap-1">
                                                        <span>📸</span> Image
                                                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUploadLeaderImage(l.id, e)} />
                                                    </label>
                                                </div>
                                                <p className="text-violet-400 text-sm font-medium mb-1">{l.role}</p>
                                                {l.name_ar && <p className="text-white/30 text-xs mb-2">{l.name_ar} · {l.role_ar}</p>}
                                                <p className="text-white/50 text-sm leading-relaxed">{l.bio}</p>
                                                {l.strengths && l.strengths.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mt-3">
                                                        {l.strengths.map((s, i) => (
                                                            <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/[0.05] text-white/50 border border-white/[0.08]">{s}</span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 shrink-0">
                                                <button onClick={() => handleToggleLeader(l.id, l.is_active)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${l.is_active ? "bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20"}`}>
                                                    {l.is_active ? "Hide" : "Show"}
                                                </button>
                                                <button onClick={() => handleDeleteLeader(l.id)} className="px-3 py-1.5 rounded-lg text-xs font-semibold border bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20 transition-all">Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </main>

            {/* Modals */}
            {selectedApp && <ApplicationModal app={selectedApp} roleLabels={roleLabels} canEdit={canEdit} onClose={() => setSelectedApp(null)} onStatusChange={handleStatusChange} />}
            {showAddModal && <AddListingModal onClose={() => setShowAddModal(false)} onCreated={(l) => setListings((p) => [...p, l])} />}
            {showAddUserModal && <AddUserModal onClose={() => setShowAddUserModal(false)} onCreated={(u) => setTeamUsers((p) => [...p, u])} />}
            {showAddLeaderModal && <AddLeaderModal onClose={() => setShowAddLeaderModal(false)} onCreated={(l) => setLeaders((p) => [...p, l])} />}
            {showChangePasswordModal && <ChangePasswordModal onClose={() => setShowChangePasswordModal(false)} />}
        </div>
    );
}

