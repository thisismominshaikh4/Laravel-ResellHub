import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, Users, ShoppingCart, Percent, Heart } from 'lucide-react';

export default function AdminAnalytics({ cards, charts }) {
    const { totalUsers, totalProducts, totalOrders, totalRevenue, completedOrders } = cards;
    const { userGrowth, monthlyOrders, categoryPerformance } = charts;

    return (
        <AuthenticatedLayout>
            <Head title="Platform Metrics" />

            <div className="max-w-6xl mx-auto mt-6 space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    <div className="bg-white border border-slate-200/80 rounded-3xl p-5 dark:bg-slate-900 dark:border-slate-800 shadow-sm flex items-center gap-4">
                        <div className="h-10 w-10 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
                            <DollarSign className="h-5 w-5" />
                        </div>
                        <div>
                            <span className="text-[10px] text-slate-400 block font-semibold">Total Revenue</span>
                            <span className="text-xl font-black text-slate-800 dark:text-white">${totalRevenue}</span>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200/80 rounded-3xl p-5 dark:bg-slate-900 dark:border-slate-800 shadow-sm flex items-center gap-4">
                        <div className="h-10 w-10 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500">
                            <Users className="h-5 w-5" />
                        </div>
                        <div>
                            <span className="text-[10px] text-slate-400 block font-semibold">Platform Users</span>
                            <span className="text-xl font-black text-slate-800 dark:text-white">{totalUsers}</span>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200/80 rounded-3xl p-5 dark:bg-slate-900 dark:border-slate-800 shadow-sm flex items-center gap-4">
                        <div className="h-10 w-10 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500">
                            <ShoppingCart className="h-5 w-5" />
                        </div>
                        <div>
                            <span className="text-[10px] text-slate-400 block font-semibold">Active Products</span>
                            <span className="text-xl font-black text-slate-800 dark:text-white">{totalProducts}</span>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200/80 rounded-3xl p-5 dark:bg-slate-900 dark:border-slate-800 shadow-sm flex items-center gap-4">
                        <div className="h-10 w-10 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500">
                            <Percent className="h-5 w-5" />
                        </div>
                        <div>
                            <span className="text-[10px] text-slate-400 block font-semibold">Total Orders</span>
                            <span className="text-xl font-black text-slate-800 dark:text-white">{totalOrders}</span>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200/80 rounded-3xl p-5 dark:bg-slate-900 dark:border-slate-800 shadow-sm flex items-center gap-4">
                        <div className="h-10 w-10 bg-violet-500/10 rounded-2xl flex items-center justify-center text-violet-500">
                            <Heart className="h-5 w-5" />
                        </div>
                        <div>
                            <span className="text-[10px] text-slate-400 block font-semibold">Delivered</span>
                            <span className="text-xl font-black text-slate-800 dark:text-white">{completedOrders}</span>
                        </div>
                    </div>
                </div>

                {/* Growth Trends Chart */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 dark:bg-slate-900 dark:border-slate-800 shadow-sm">
                        <h2 className="font-extrabold text-base text-slate-800 dark:text-white mb-6">User Sign-up Trends</h2>
                        <div className="h-72 w-full text-xs font-semibold">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={userGrowth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#818cf8" stopOpacity={0.2}/>
                                            <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.1} />
                                    <XAxis dataKey="month" stroke="#64748b" />
                                    <YAxis stroke="#64748b" />
                                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#f8fafc' }} />
                                    <Area type="monotone" dataKey="users" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 dark:bg-slate-900 dark:border-slate-800 shadow-sm">
                        <h2 className="font-extrabold text-base text-slate-800 dark:text-white mb-6">Monthly Order Volumes</h2>
                        <div className="h-72 w-full text-xs font-semibold">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={monthlyOrders} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.1} />
                                    <XAxis dataKey="month" stroke="#64748b" />
                                    <YAxis stroke="#64748b" />
                                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#f8fafc' }} />
                                    <Bar dataKey="ordersCount" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Category performance */}
                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 dark:bg-slate-900 dark:border-slate-800 shadow-sm">
                    <h2 className="font-extrabold text-base text-slate-800 dark:text-white mb-6">Active Categories Breakdown</h2>
                    <div className="h-72 w-full text-xs font-semibold">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={categoryPerformance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.1} />
                                <XAxis dataKey="category" stroke="#64748b" />
                                <YAxis stroke="#64748b" />
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#f8fafc' }} />
                                <Bar dataKey="count" fill="#10b981" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
