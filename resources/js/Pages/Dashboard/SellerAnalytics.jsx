import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, ShoppingCart, Percent, Hourglass } from 'lucide-react';

export default function SellerAnalytics({ cards, charts }) {
    const { totalProducts, totalSales, totalRevenue, pendingOrders } = cards;
    const { monthlySalesTrend, topSellingProducts } = charts;

    return (
        <AuthenticatedLayout>
            <Head title="Seller Sales Analytics" />

            <div className="max-w-6xl mx-auto mt-6 space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 dark:bg-slate-900 dark:border-slate-800 shadow-sm flex items-center gap-4">
                        <div className="h-12 w-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
                            <DollarSign className="h-6 w-6" />
                        </div>
                        <div>
                            <span className="text-xs text-slate-400 block font-semibold">Total Revenue</span>
                            <span className="text-2xl font-black text-slate-800 dark:text-white">${totalRevenue}</span>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 dark:bg-slate-900 dark:border-slate-800 shadow-sm flex items-center gap-4">
                        <div className="h-12 w-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500">
                            <ShoppingCart className="h-6 w-6" />
                        </div>
                        <div>
                            <span className="text-xs text-slate-400 block font-semibold">Total Units Sold</span>
                            <span className="text-2xl font-black text-slate-800 dark:text-white">{totalSales}</span>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 dark:bg-slate-900 dark:border-slate-800 shadow-sm flex items-center gap-4">
                        <div className="h-12 w-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500">
                            <Percent className="h-6 w-6" />
                        </div>
                        <div>
                            <span className="text-xs text-slate-400 block font-semibold">My Products</span>
                            <span className="text-2xl font-black text-slate-800 dark:text-white">{totalProducts}</span>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 dark:bg-slate-900 dark:border-slate-800 shadow-sm flex items-center gap-4">
                        <div className="h-12 w-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500">
                            <Hourglass className="h-6 w-6" />
                        </div>
                        <div>
                            <span className="text-xs text-slate-400 block font-semibold">Pending Orders</span>
                            <span className="text-2xl font-black text-slate-800 dark:text-white">{pendingOrders}</span>
                        </div>
                    </div>
                </div>

                {/* Sales Chart */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-3xl p-6 dark:bg-slate-900 dark:border-slate-800 shadow-sm">
                        <h2 className="font-extrabold text-base text-slate-800 dark:text-white mb-6">Sales Trend (Last 6 Months)</h2>
                        <div className="h-72 w-full text-xs font-semibold">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={monthlySalesTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.1} />
                                    <XAxis dataKey="month" stroke="#64748b" />
                                    <YAxis stroke="#64748b" />
                                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#f8fafc' }} />
                                    <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Top selling products list */}
                    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 dark:bg-slate-900 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                        <div>
                            <h2 className="font-extrabold text-base text-slate-800 dark:text-white mb-4">Top Selling Products</h2>
                            <div className="space-y-4">
                                {topSellingProducts.length === 0 ? (
                                    <p className="text-sm text-slate-400 italic">No products sold yet.</p>
                                ) : (
                                    topSellingProducts.map((p, idx) => (
                                        <div key={idx} className="flex items-center justify-between pb-3 border-b border-slate-50 dark:border-slate-800/80 last:border-0 last:pb-0">
                                            <div>
                                                <span className="font-bold text-sm text-slate-805 dark:text-slate-100 block line-clamp-1 max-w-[160px]">{p.product_title}</span>
                                                <span className="text-[10px] text-slate-400 block font-semibold">Sold: {p.quantity_sold} units</span>
                                            </div>
                                            <span className="font-extrabold text-blue-500">${p.total_revenue}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
