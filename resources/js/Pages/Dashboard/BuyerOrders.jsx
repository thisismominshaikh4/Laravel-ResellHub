import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { ShoppingBag, Star, HelpCircle, AlertCircle } from 'lucide-react';

export default function BuyerOrders({ orders }) {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const reviewForm = useForm({
        product_id: '',
        order_id: '',
        rating: 5,
        comment: '',
    });

    const submitReview = (e) => {
        e.preventDefault();
        reviewForm.post(route('review.store'), {
            onSuccess: () => {
                setSelectedOrder(null);
                reviewForm.reset();
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="My Orders" />

            <div className="max-w-6xl mx-auto mt-6 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 dark:bg-slate-900 dark:border-slate-800 shadow-sm">
                <div>
                    <h1 className="font-extrabold text-xl text-slate-800 dark:text-white">My Purchase Orders</h1>
                    <p className="text-xs text-slate-500 mt-1 font-semibold">Track your bought marketplace items and write reviews</p>
                </div>

                <div className="mt-6 overflow-x-auto">
                    {orders.length === 0 ? (
                        <div className="text-center py-16 text-slate-400 font-bold">
                            <ShoppingBag className="h-12 w-12 text-slate-350 dark:text-slate-750 mx-auto mb-4 animate-pulse" />
                            No purchases recorded yet. Browse the marketplace to buy items!
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                    <th className="pb-3">Order Info</th>
                                    <th className="pb-3">Seller</th>
                                    <th className="pb-3">Total Amount</th>
                                    <th className="pb-3">Order Status</th>
                                    <th className="pb-3 text-right">Review Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                                {orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10">
                                        <td className="py-4 pr-3">
                                            <span className="font-bold text-slate-805 dark:text-slate-100 block">#{order.id} - {order.product_title}</span>
                                            <span className="text-xs text-slate-400 block mt-0.5">Quantity: x{order.quantity} | Method: {order.payment_method}</span>
                                        </td>
                                        <td className="py-4 text-slate-500 font-semibold">{order.seller_name}</td>
                                        <td className="py-4">
                                            <span className="font-extrabold text-blue-500">${(order.price * order.quantity).toFixed(2)}</span>
                                        </td>
                                        <td className="py-4">
                                            <div className="space-y-1">
                                                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md block w-fit ${
                                                    order.order_status === 'delivered' ? 'bg-emerald-500/10 text-emerald-500' :
                                                    order.order_status === 'cancelled' ? 'bg-red-500/10 text-red-500' :
                                                    'bg-blue-500/10 text-blue-500'
                                                }`}>
                                                    Order: {order.order_status}
                                                </span>
                                                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md block w-fit ${
                                                    order.payment_status === 'paid' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                                                }`}>
                                                    Payment: {order.payment_status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 text-right">
                                            {order.order_status === 'delivered' ? (
                                                <button
                                                    onClick={() => {
                                                        setSelectedOrder(order);
                                                        reviewForm.setData({
                                                            product_id: order.product_id,
                                                            order_id: order.id,
                                                            rating: 5,
                                                            comment: '',
                                                        });
                                                    }}
                                                    className="px-3.5 py-1.5 bg-slate-100 hover:bg-amber-500 hover:text-white dark:bg-slate-800 dark:hover:bg-amber-600 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl transition flex items-center gap-1 ml-auto"
                                                >
                                                    <Star className="h-3.5 w-3.5" /> Rate Seller
                                                </button>
                                            ) : (
                                                <span className="text-xs text-slate-400 italic">Deliver to Rate</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Rate Seller Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
                    <div className="bg-white border border-slate-200/80 dark:bg-slate-900 dark:border-slate-850 max-w-md w-full p-6 rounded-3xl shadow-2xl relative">
                        <h3 className="font-extrabold text-lg text-slate-800 dark:text-white">Rate Seller</h3>
                        <p className="text-xs text-slate-400 mt-1 font-semibold">Share feedback for your purchase of {selectedOrder.product_title}.</p>
                        <form onSubmit={submitReview} className="mt-4 space-y-4">
                            <div className="flex items-center gap-1">
                                <span className="text-xs font-bold text-slate-400 mr-2 uppercase tracking-wide">Rating:</span>
                                {[1, 2, 3, 4, 5].map((val) => (
                                    <button
                                        type="button"
                                        key={val}
                                        onClick={() => reviewForm.setData('rating', val)}
                                        className="text-amber-400 hover:scale-110 transition"
                                    >
                                        <Star className={`h-5 w-5 ${reviewForm.data.rating >= val ? 'fill-amber-400' : 'text-slate-400'}`} />
                                    </button>
                                ))}
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Review Comments</label>
                                <textarea
                                    required
                                    rows="3"
                                    placeholder="Write your review comments here..."
                                    value={reviewForm.data.comment}
                                    onChange={(e) => reviewForm.setData('comment', e.target.value)}
                                    className="w-full rounded-xl border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-100 placeholder-slate-500 focus:outline-none"
                                />
                            </div>
                            <div className="flex items-center justify-end gap-2.5 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setSelectedOrder(null)}
                                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={reviewForm.processing}
                                    className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition shadow-md shadow-blue-500/10"
                                >
                                    Submit Review
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
