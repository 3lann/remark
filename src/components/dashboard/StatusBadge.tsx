"use client";

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; dot: string }> = {
    pending: { label: "قيد الانتظار", bg: "bg-amber-500/10", text: "text-amber-400", dot: "bg-amber-400" },
    confirmed: { label: "مؤكد", bg: "bg-blue-500/10", text: "text-blue-400", dot: "bg-blue-400" },
    shipped: { label: "تم الشحن", bg: "bg-violet-500/10", text: "text-violet-400", dot: "bg-violet-400" },
    delivered: { label: "تم التسليم", bg: "bg-emerald-500/10", text: "text-emerald-400", dot: "bg-emerald-400" },
    cancelled: { label: "ملغي", bg: "bg-red-500/10", text: "text-red-400", dot: "bg-red-400" },
};

export default function StatusBadge({ status }: { status: string }) {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${config.bg} ${config.text} border border-current/10`}>
            <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
            {config.label}
        </span>
    );
}
