import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { User, ShieldAlert, CheckCircle, Ban } from 'lucide-react';

export default function AdminUsers({ users }) {
    return (
        <AuthenticatedLayout>
            <Head title="Platform Users" />

            <div className="max-w-6xl mx-auto mt-6 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 dark:bg-slate-900 dark:border-slate-800 shadow-sm">
                <div>
                    <h1 className="font-extrabold text-xl text-slate-800 dark:text-white">Manage Platform Users</h1>
                    <p className="text-xs text-slate-500 mt-1 font-semibold">Moderate accounts, block users, and inspect credentials</p>
                </div>

                <div className="mt-6 overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                <th className="pb-3">User</th>
                                <th className="pb-3">Role</th>
                                <th className="pb-3">Account Status</th>
                                <th className="pb-3">Join Date</th>
                                <th className="pb-3 text-right">Moderation Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                            {users.map((u) => (
                                <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10">
                                    <td className="py-4 pr-3">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 bg-slate-105 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-650 dark:text-slate-300">
                                                <User className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <span className="font-bold text-slate-808 dark:text-slate-100 block">{u.name}</span>
                                                <span className="text-xs text-slate-400 block mt-0.5">{u.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-md ${
                                            u.role === 'admin' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/25' :
                                            u.role === 'seller' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/25' :
                                            'bg-slate-500/10 text-slate-400 border border-slate-700/25'
                                        }`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="py-4">
                                        <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-md ${
                                            u.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                                        }`}>
                                            {u.status}
                                        </span>
                                    </td>
                                    <td className="py-4 text-slate-500 font-semibold">
                                        {new Date(u.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="py-4 text-right">
                                        {u.role !== 'admin' ? (
                                            <Link
                                                href={route('admin.user.toggle', u.id)}
                                                method="patch"
                                                as="button"
                                                className={`px-3 py-1.5 font-bold text-xs rounded-xl transition inline-flex items-center gap-1 ${
                                                    u.status === 'active'
                                                        ? 'bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500'
                                                        : 'bg-emerald-500/10 hover:bg-emerald-500 hover:text-white text-emerald-500'
                                                }`}
                                            >
                                                {u.status === 'active' ? (
                                                    <>
                                                        <Ban className="h-3.5 w-3.5" /> Block Account
                                                    </>
                                                ) : (
                                                    <>
                                                        <CheckCircle className="h-3.5 w-3.5" /> Unblock User
                                                    </>
                                                )}
                                            </Link>
                                        ) : (
                                            <span className="text-xs text-slate-400 italic">No Action</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
