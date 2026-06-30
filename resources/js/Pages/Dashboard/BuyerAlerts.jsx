import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Bell, Trash2, Tag, Eye } from 'lucide-react';

export default function BuyerAlerts({ alerts }) {
    return (
        <AuthenticatedLayout>
            <Head title="My Alerts" />

            <div className="max-w-6xl mx-auto mt-6 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 dark:bg-slate-900 dark:border-slate-800 shadow-sm">
                <div>
                    <h1 className="font-extrabold text-xl text-slate-800 dark:text-white">Active Product Alerts</h1>
                    <p className="text-xs text-slate-500 mt-1 font-semibold">Monitor price drops and stock changes for tracked items</p>
                </div>

                <div className="mt-6 overflow-x-auto">
                    {alerts.length === 0 ? (
                        <div className="text-center py-16 text-slate-400 font-bold">
                            <Bell className="h-12 w-12 text-slate-350 dark:text-slate-750 mx-auto mb-4 animate-pulse" />
                            You are not tracking any products. Click 'Enable Alert' on product pages to track price drops!
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                    <th className="pb-3">Product Name</th>
                                    <th className="pb-3">Alert Settings</th>
                                    <th className="pb-3">Date Tracked</th>
                                    <th className="pb-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                                {alerts.map((alert) => (
                                    <tr key={alert.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10">
                                        <td className="py-4 pr-3">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 bg-slate-100 dark:bg-slate-950 rounded-xl overflow-hidden flex-shrink-0">
                                                    {alert.product_image ? (
                                                        <img src={alert.product_image} alt={alert.product_title} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                            <Tag className="h-5 w-5" />
                                                        </div>
                                                    )}
                                                </div>
                                                <span className="font-bold text-slate-805 dark:text-slate-100 block">{alert.product_title}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 text-xs font-semibold space-y-1">
                                            <div className="flex items-center gap-1.5 text-slate-500">
                                                <span className={`h-2 w-2 rounded-full ${alert.notify_on_price_drop ? 'bg-indigo-500' : 'bg-slate-600'}`}></span>
                                                <span>Price Drops: {alert.notify_on_price_drop ? 'On' : 'Off'}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-slate-500">
                                                <span className={`h-2 w-2 rounded-full ${alert.notify_on_availability ? 'bg-indigo-500' : 'bg-slate-600'}`}></span>
                                                <span>Availability: {alert.notify_on_availability ? 'On' : 'Off'}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 text-slate-500 font-semibold">
                                            {new Date(alert.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={route('product.show', alert.product_id)}
                                                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-800 dark:hover:text-white rounded-xl transition"
                                                >
                                                    <Eye className="h-4.5 w-4.5" />
                                                </Link>
                                                <Link
                                                    href={route('alert.destroy', alert.id)}
                                                    method="delete"
                                                    as="button"
                                                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-red-500 rounded-xl transition"
                                                >
                                                    <Trash2 className="h-4.5 w-4.5" />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
