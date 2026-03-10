"use client";

import { useState, useEffect } from "react";
import DashboardCard from "@/components/dashboard/DashboardCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { supabase } from "@/lib/supabase";

interface OrderRow {
    id: string;
    customer_name: string;
    customer_phone: string;
    status: string;
    total: number;
    created_at: string;
}

// Demo data when Supabase is not connected
const DEMO_ORDERS: OrderRow[] = [
    { id: "1", customer_name: "أحمد محمد", customer_phone: "0770 123 4567", status: "pending", total: 75000, created_at: new Date().toISOString() },
    { id: "2", customer_name: "فاطمة علي", customer_phone: "0771 234 5678", status: "confirmed", total: 120000, created_at: new Date(Date.now() - 86400000).toISOString() },
    { id: "3", customer_name: "محمد حسن", customer_phone: "0772 345 6789", status: "delivered", total: 45000, created_at: new Date(Date.now() - 172800000).toISOString() },
];

export default function DashboardOverview() {
    const [stats, setStats] = useState({ orders: 0, products: 0, categories: 0, revenue: 0 });
    const [recentOrders, setRecentOrders] = useState<OrderRow[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        if (!supabase) {
            // Demo mode
            setStats({ orders: 3, products: 12, categories: 4, revenue: 240000 });
            setRecentOrders(DEMO_ORDERS);
            setLoading(false);
            return;
        }

        try {
            const [ordersRes, productsRes, categoriesRes] = await Promise.all([
                supabase.from("orders").select("*", { count: "exact" }),
                supabase.from("products").select("*", { count: "exact" }),
                supabase.from("categories").select("*", { count: "exact" }),
            ]);

            const orders = ordersRes.data || [];
            const revenue = orders.reduce((sum: number, o: { total: number }) => sum + (o.total || 0), 0);

            setStats({
                orders: ordersRes.count || 0,
                products: productsRes.count || 0,
                categories: categoriesRes.count || 0,
                revenue,
            });

            const recentRes = await supabase
                .from("orders")
                .select("id, customer_name, customer_phone, status, total, created_at")
                .order("created_at", { ascending: false })
                .limit(5);

            setRecentOrders((recentRes.data as OrderRow[]) || []);
        } catch {
            // fallback to demo
            setStats({ orders: 3, products: 12, categories: 4, revenue: 240000 });
            setRecentOrders(DEMO_ORDERS);
        }

        setLoading(false);
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <DashboardCard
                    title="إجمالي الطلبات"
                    value={stats.orders}
                    color="violet"
                    icon={
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    }
                />
                <DashboardCard
                    title="العطور"
                    value={stats.products}
                    color="cyan"
                    icon={
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                    }
                />
                <DashboardCard
                    title="الأصناف"
                    value={stats.categories}
                    color="amber"
                    icon={
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                    }
                />
                <DashboardCard
                    title="إجمالي الإيرادات"
                    value={`${stats.revenue.toLocaleString()} د.ع`}
                    color="emerald"
                    icon={
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                />
            </div>

            {/* Recent Orders */}
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
                <div className="px-6 py-5 border-b border-white/[0.06] flex items-center justify-between">
                    <h3 className="text-white font-bold text-base">آخر الطلبات</h3>
                    <a href="/dashboard/orders" className="text-violet-400 text-sm font-medium hover:text-violet-300 transition-colors">
                        عرض الكل ←
                    </a>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/[0.04]">
                                <th className="px-6 py-3 text-right text-xs font-bold text-white/30 uppercase tracking-wider">العميل</th>
                                <th className="px-6 py-3 text-right text-xs font-bold text-white/30 uppercase tracking-wider">الهاتف</th>
                                <th className="px-6 py-3 text-right text-xs font-bold text-white/30 uppercase tracking-wider">المبلغ</th>
                                <th className="px-6 py-3 text-right text-xs font-bold text-white/30 uppercase tracking-wider">الحالة</th>
                                <th className="px-6 py-3 text-right text-xs font-bold text-white/30 uppercase tracking-wider">التاريخ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.04]">
                            {recentOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="px-6 py-4 text-sm text-white/80 font-medium">{order.customer_name}</td>
                                    <td className="px-6 py-4 text-sm text-white/50 font-mono" dir="ltr">{order.customer_phone}</td>
                                    <td className="px-6 py-4 text-sm text-white/70">{order.total?.toLocaleString()} د.ع</td>
                                    <td className="px-6 py-4"><StatusBadge status={order.status} /></td>
                                    <td className="px-6 py-4 text-sm text-white/40">{new Date(order.created_at).toLocaleDateString("ar-IQ")}</td>
                                </tr>
                            ))}
                            {recentOrders.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-white/30 text-sm">لا توجد طلبات بعد</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
