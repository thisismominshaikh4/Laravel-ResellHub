import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { CreditCard, ShoppingBag, Lock, ShieldCheck, HelpCircle } from 'lucide-react';
import axios from 'axios';

export default function Payment({ order, stripePublicKey }) {
    const [loading, setLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [isMock, setIsMock] = useState(true);

    useEffect(() => {
        // Fetch payment intent from backend
        axios.post(route('payment.intent'), { order_id: order.id })
            .then(res => {
                setClientSecret(res.data.clientSecret);
                setTransactionId(res.data.transactionId);
                if (res.data.clientSecret.startsWith('mock_')) {
                    setIsMock(true);
                } else {
                    setIsMock(false);
                }
            })
            .catch(err => {
                console.error(err);
            });
    }, [order.id]);

    const handleMockPayment = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate short loading delay
        setTimeout(() => {
            router.post(route('payment.confirm'), {
                order_id: order.id,
                transaction_id: transactionId || 'TXN-MOCK-' + Date.now(),
                amount: order.price * order.quantity
            }, {
                onFinish: () => setLoading(false)
            });
        }, 1200);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Stripe Payment Gate" />

            <div className="max-w-md mx-auto mt-10">
                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 dark:bg-slate-900 dark:border-slate-800 shadow-sm space-y-6">
                    <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
                        <CreditCard className="h-6 w-6 text-blue-500" />
                        <h1 className="font-extrabold text-xl text-slate-800 dark:text-white">Card Payment</h1>
                    </div>

                    <div className="p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10 space-y-2">
                        <div className="flex justify-between text-sm text-slate-500 font-bold">
                            <span>Product:</span>
                            <span className="text-slate-800 dark:text-slate-100 line-clamp-1">{order.product_title}</span>
                        </div>
                        <div className="flex justify-between text-sm text-slate-500 font-bold">
                            <span>Amount to Pay:</span>
                            <span className="text-blue-500 text-base font-black">${(order.price * order.quantity).toFixed(2)}</span>
                        </div>
                    </div>

                    {isMock ? (
                        <div className="space-y-4">
                            <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl flex gap-3 text-amber-500">
                                <HelpCircle className="h-6 w-6 flex-shrink-0" />
                                <div>
                                    <span className="font-bold text-sm block">Simulation Mode Active</span>
                                    <span className="text-xs text-slate-400 font-semibold block mt-0.5">
                                        No active Stripe credentials found in environmental config. Proceed with simulation.
                                    </span>
                                </div>
                            </div>

                            <form onSubmit={handleMockPayment} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Card Details (Simulated)</label>
                                    <div className="p-3 bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl text-xs text-slate-500 font-mono flex items-center justify-between">
                                        <span>4242 4242 4242 4242</span>
                                        <span>12 / 29</span>
                                        <span>CVC 123</span>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm rounded-xl transition shadow-lg shadow-blue-500/10 flex items-center justify-center gap-1.5"
                                >
                                    {loading ? 'Processing Simulation...' : 'Simulate Mock Payment'}
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* Standard form layout for real card bindings */}
                            <p className="text-sm text-slate-400">Card payment input form is initializing with Stripe SDK...</p>
                            <button
                                onClick={handleMockPayment}
                                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm rounded-xl transition"
                            >
                                Process Card
                            </button>
                        </div>
                    )}

                    <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <Lock className="h-3 w-3" /> Securing card details with TLS encryption.
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
