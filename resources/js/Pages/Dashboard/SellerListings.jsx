import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Tag, Edit, Trash2, Eye, PlusCircle } from 'lucide-react';

export default function SellerListings({ products }) {
    return (
        <AuthenticatedLayout>
            <Head title="My Listings" />

            <div className="max-w-6xl mx-auto mt-6 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 dark:bg-slate-900 dark:border-slate-800 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-slate-100 dark:border-slate-800 gap-4">
                    <div>
                        <h1 className="font-extrabold text-xl text-slate-800 dark:text-white">My Product Listings</h1>
                        <p className="text-xs text-slate-500 mt-1 font-semibold">Manage your marketplace sales items</p>
                    </div>
                    <Link
                        href={route('product.create')}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition shadow-lg shadow-blue-500/10"
                    >
                        <PlusCircle className="h-4.5 w-4.5" /> Add New Listing
                    </Link>
                </div>

                <div className="mt-6 overflow-x-auto">
                    {products.length === 0 ? (
                        <div className="text-center py-16">
                            <Tag className="h-12 w-12 text-slate-350 dark:text-slate-750 mx-auto mb-4" />
                            <p className="text-slate-400 font-bold">You haven't listed any products yet.</p>
                            <Link href={route('product.create')} className="text-sm font-bold text-blue-500 hover:underline mt-2 inline-block">Create your first listing</Link>
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                    <th className="pb-3">Product Info</th>
                                    <th className="pb-3">Category</th>
                                    <th className="pb-3">Price</th>
                                    <th className="pb-3">Stock</th>
                                    <th className="pb-3">Status</th>
                                    <th className="pb-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                                {products.map((prod) => (
                                    <tr key={prod.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10">
                                        <td className="py-4 pr-3">
                                            <div className="flex items-center gap-3">
                                                <div className="h-12 w-12 bg-slate-100 dark:bg-slate-950 rounded-xl overflow-hidden flex-shrink-0">
                                                    {prod.images && prod.images.length > 0 ? (
                                                        <img src={prod.images[0]} alt={prod.title} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                            <Tag className="h-5 w-5" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <span className="font-bold text-slate-800 dark:text-slate-100 block max-w-xs truncate">{prod.title}</span>
                                                    <span className="text-xs text-slate-400 block mt-0.5">Condition: {prod.condition}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 text-slate-500 font-semibold">{prod.category}</td>
                                        <td className="py-4 font-extrabold text-blue-500">${prod.price}</td>
                                        <td className="py-4 font-bold text-slate-600 dark:text-slate-400">{prod.stock_quantity} available</td>
                                        <td className="py-4">
                                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                                                prod.status === 'available' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                                            }`}>
                                                {prod.status}
                                            </span>
                                        </td>
                                        <td className="py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={route('product.show', prod.id)}
                                                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-800 dark:hover:text-white rounded-xl transition"
                                                >
                                                    <Eye className="h-4.5 w-4.5" />
                                                </Link>
                                                <Link
                                                    href={route('product.edit', prod.id)}
                                                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-blue-500 rounded-xl transition"
                                                >
                                                    <Edit className="h-4.5 w-4.5" />
                                                </Link>
                                                <Link
                                                    href={route('product.destroy', prod.id)}
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
