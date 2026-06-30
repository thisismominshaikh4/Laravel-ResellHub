import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { ShieldAlert, CheckCircle, Eye } from 'lucide-react';

export default function AdminReports({ reports }) {
    return (
        <AuthenticatedLayout>
            <Head title="Reported Listings" />

            <div className="max-w-6xl mx-auto mt-6 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 dark:bg-slate-900 dark:border-slate-800 shadow-sm">
                <div>
                    <h1 className="font-extrabold text-xl text-slate-800 dark:text-white">Moderate User Reports</h1>
                    <p className="text-xs text-slate-500 mt-1 font-semibold">Inspect reports filed by buyers against questionable listings</p>
                </div>

                <div className="mt-6 overflow-x-auto">
                    {reports.length === 0 ? (
                        <div className="text-center py-16 text-slate-400 font-bold">
                            <ShieldAlert className="h-12 w-12 text-slate-350 dark:text-slate-750 mx-auto mb-4" />
                            No reports filed by users. Safe and clean marketplace!
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                    <th className="pb-3">Listing Info</th>
                                    <th className="pb-3">Reporter</th>
                                    <th className="pb-3">Complaint Reason</th>
                                    <th className="pb-3">Status</th>
                                    <th className="pb-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                                {reports.map((rep) => (
                                    <tr key={rep.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10">
                                        <td className="py-4 pr-3">
                                            <span className="font-bold text-slate-805 dark:text-slate-100 block">{rep.product_title}</span>
                                            <span className="text-xs text-slate-400 block mt-0.5">Product ID: #{rep.product_id}</span>
                                        </td>
                                        <td className="py-4 pr-3 font-semibold text-slate-700 dark:text-slate-300">
                                            <div>{rep.reporter_name}</div>
                                            <div className="text-[10px] text-slate-400 font-normal">{rep.reporter_email}</div>
                                        </td>
                                        <td className="py-4">
                                            <span className="text-slate-800 dark:text-slate-205 font-bold block">{rep.reason}</span>
                                            <span className="text-[11px] text-slate-400 block mt-0.5">{rep.details || 'No extra details provided.'}</span>
                                        </td>
                                        <td className="py-4">
                                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                                                rep.status === 'resolved' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                                            }`}>
                                                {rep.status}
                                            </span>
                                        </td>
                                        <td className="py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={route('product.show', rep.product_id)}
                                                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-800 dark:hover:text-white rounded-xl transition"
                                                >
                                                    <Eye className="h-4.5 w-4.5" />
                                                </Link>
                                                {rep.status === 'pending' ? (
                                                    <Link
                                                        href={route('admin.report.resolve', rep.id)}
                                                        method="patch"
                                                        as="button"
                                                        className="px-3.5 py-1.5 bg-emerald-500/10 hover:bg-emerald-500 hover:text-white text-emerald-500 text-xs font-bold rounded-xl transition flex items-center gap-1"
                                                    >
                                                        <CheckCircle className="h-3.5 w-3.5" /> Resolve
                                                    </Link>
                                                ) : (
                                                    <span className="text-xs text-slate-400 italic font-semibold">Resolved</span>
                                                )}
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
