import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';

export default function Success({ order }) {
    return (
        <AuthenticatedLayout>
            <Head title="Order Success" />

            <div className="max-w-md mx-auto text-center mt-10 bg-white border border-slate-200/80 rounded-3xl p-8 dark:bg-slate-900 dark:border-slate-800 shadow-sm">
                <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-4 animate-bounce" />
                <h1 className="font-extrabold text-2xl text-slate-800 dark:text-white">Order Confirmed!</h1>
                <p className="text-slate-500 text-sm mt-2 font-semibold">Thank you for your purchase. Your transaction has been recorded.</p>

                <div className="my-6 p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800/80 text-left space-y-2">
                    <div className="flex justify-between text-xs text-slate-500 font-bold">
                        <span>Order ID:</span>
                        <span>#{order.id}</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 font-bold">
                        <span>Product:</span>
                        <span className="line-clamp-1 max-w-[150px]">{order.product_title}</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 font-bold">
                        <span>Payment Status:</span>
                        <span className="uppercase text-blue-500">{order.payment_status}</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 font-bold">
                        <span>Transaction ID:</span>
                        <span className="text-[10px] break-all">{order.transaction_id || 'COD - Pending'}</span>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <Link
                        href={route('buyer.orders')}
                        className="py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition flex items-center justify-center gap-1.5"
                    >
                        View My Orders <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                        href={route('product.index')}
                        className="py-3 bg-slate-105 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-305 font-bold rounded-xl transition"
                    >
                        Back to Marketplace
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
