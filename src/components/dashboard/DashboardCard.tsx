"use client";

interface DashboardCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color?: "violet" | "cyan" | "amber" | "emerald";
}

const colorMap = {
    violet: {
        bg: "from-violet-500/15 to-violet-600/5",
        border: "border-violet-500/20",
        text: "text-violet-400",
        glow: "shadow-[0_0_30px_rgba(139,92,246,0.15)]",
    },
    cyan: {
        bg: "from-cyan-500/15 to-cyan-600/5",
        border: "border-cyan-500/20",
        text: "text-cyan-400",
        glow: "shadow-[0_0_30px_rgba(6,182,212,0.15)]",
    },
    amber: {
        bg: "from-amber-500/15 to-amber-600/5",
        border: "border-amber-500/20",
        text: "text-amber-400",
        glow: "shadow-[0_0_30px_rgba(245,158,11,0.15)]",
    },
    emerald: {
        bg: "from-emerald-500/15 to-emerald-600/5",
        border: "border-emerald-500/20",
        text: "text-emerald-400",
        glow: "shadow-[0_0_30px_rgba(16,185,129,0.15)]",
    },
};

export default function DashboardCard({ title, value, icon, color = "violet" }: DashboardCardProps) {
    const c = colorMap[color];

    return (
        <div className={`bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/[0.06] transition-all duration-300 ${c.glow} group`}>
            <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.bg} border ${c.border} flex items-center justify-center ${c.text} group-hover:scale-110 transition-transform duration-300`}>
                    {icon}
                </div>
            </div>
            <p className="text-3xl font-extrabold text-white mb-1">{value}</p>
            <p className="text-white/40 text-sm font-medium">{title}</p>
        </div>
    );
}
