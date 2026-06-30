import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { Truck, MapPin, Phone, CreditCard, ChevronRight } from 'lucide-react';

export default function SellerOrders({ orders }) {
    const handleStatusUpdate = (orderId, newStatus) => {
        router.patch(route('order.status', orderId), {
            order_status: newStatus
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Seller Orders" />

            <div className="max-w-6xl mx-auto mt-6 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 dark:bg-slate-900 dark:border-slate-800 shadow-sm">
                <div>
                    <h1 className="font-extrabold text-xl text-slate-800 dark:text-white">Customer Sales Orders</h1>
                    <p className="text-xs text-slate-500 mt-1 font-semibold">Track and manage orders received from buyers</p>
                </div>

                <div className="mt-6 overflow-x-auto">
                    {orders.length === 0 ? (
                        <div className="text-center py-16 text-slate-400 font-bold">
                            <Truck className="h-12 w-12 text-slate-350 dark:text-slate-750 mx-auto mb-4" />
                            No customer orders received yet.
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                    <th className="pb-3">Order Info</th>
                                    <th className="pb-3">Customer details</th>
                                    <th className="pb-3">Total Amount</th>
                                    <th className="pb-3">Status</th>
                                    <th className="pb-3 text-right">Update Order Stage</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                                {orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10">
                                        <td className="py-4 pr-3">
                                            <span className="font-bold text-slate-805 dark:text-slate-100 block">#{order.id} - {order.product_title}</span>
                                            <span className="text-xs text-slate-400 block mt-0.5">Quantity: x{order.quantity}</span>
                                        </td>
                                        <td className="py-4 text-xs text-slate-500 font-semibold space-y-1">
                                            <div className="text-slate-800 dark:text-slate-200 font-bold">{order.buyer_name}</div>
                                            <div className="flex items-center gap-1"><Phone className="h-3 w-3" /> {order.buyer_phone}</div>
                                            <div className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {order.delivery_address}</div>
                                        </td>
                                        <td className="py-4">
                                            <span className="font-extrabold text-blue-500 block">${(order.price * order.quantity).toFixed(2)}</span>
                                            <span className="text-[10px] text-slate-400 block font-semibold mt-0.5 uppercase">Paid via {order.payment_method}</span>
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
                                            <select
                                                value={order.order_status}
                                                onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                                className="rounded-xl border-slate-200 bg-slate-50 p-2 text-xs font-bold dark:border-slate-850 dark:bg-slate-950 text-slate-700 dark:text-slate-300 focus:outline-none"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="accepted">Accepted</option>
                                                <option value="processing">Processing</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>
                                                <option value="refunded">Refunded</option>
                                            </select>
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
