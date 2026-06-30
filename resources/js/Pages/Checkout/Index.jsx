import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { CreditCard, ShoppingBag, Truck, ArrowLeft } from 'lucide-react';

export default function Index({ product }) {
    const { data, setData, post, processing, errors } = useForm({
        product_id: product.id,
        buyer_phone: '',
        buyer_address: '',
        quantity: 1,
        payment_method: 'stripe',
        notes: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('order.store'));
    };

    const totalAmount = (product.price * data.quantity).toFixed(2);

    return (
        <AuthenticatedLayout>
            <Head title="Checkout Order" />

            <div className="max-w-4xl mx-auto mt-6">
                <Link
                    href={route('product.show', product.id)}
                    className="inline-flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white transition mb-6"
                >
                    <ArrowLeft className="h-4 w-4" /> Cancel Purchase
                </Link>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Checkout Form */}
                    <form onSubmit={submit} className="flex-1 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 dark:bg-slate-900 dark:border-slate-800 shadow-sm space-y-6">
                        <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
                            <Truck className="h-6 w-6 text-blue-500" />
                            <h1 className="font-extrabold text-xl text-slate-800 dark:text-white">Shipping & Payment</h1>
                        </div>

                        {/* Phone */}
                        <div>
                            <InputLabel htmlFor="buyer_phone" value="Phone Number" />
                            <TextInput
                                id="buyer_phone"
                                value={data.buyer_phone}
                                onChange={(e) => setData('buyer_phone', e.target.value)}
                                className="mt-1 block w-full"
                                required
                                placeholder="+880 17XX XXXXXX"
                            />
                            <InputError message={errors.buyer_phone} className="mt-2" />
                        </div>

                        {/* Address */}
                        <div>
                            <InputLabel htmlFor="buyer_address" value="Shipping Address" />
                            <textarea
                                id="buyer_address"
                                rows="3"
                                value={data.buyer_address}
                                onChange={(e) => setData('buyer_address', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600 p-2 text-sm focus:outline-none"
                                required
                                placeholder="House #, Road #, Sector/Area, City, Bangladesh"
                            />
                            <InputError message={errors.buyer_address} className="mt-2" />
                        </div>

                        {/* Quantity */}
                        <div>
                            <InputLabel htmlFor="quantity" value="Order Quantity" />
                            <TextInput
                                id="quantity"
                                type="number"
                                min="1"
                                max={product.stock_quantity}
                                value={data.quantity}
                                onChange={(e) => setData('quantity', e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors.quantity} className="mt-2" />
                        </div>

                        {/* Payment Method */}
                        <div>
                            <InputLabel value="Payment Method" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                                <label className={`flex items-center gap-3 p-4 border rounded-2xl cursor-pointer transition ${
                                    data.payment_method === 'stripe'
                                        ? 'border-blue-500 bg-blue-500/5 text-blue-500'
                                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                                }`}>
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        value="stripe"
                                        checked={data.payment_method === 'stripe'}
                                        onChange={() => setData('payment_method', 'stripe')}
                                        className="sr-only"
                                    />
                                    <CreditCard className="h-5 w-5" />
                                    <div>
                                        <span className="font-bold text-sm block">Credit / Debit Card</span>
                                        <span className="text-xs text-slate-500 font-semibold block mt-0.5">Pay via Stripe Gateway</span>
                                    </div>
                                </label>

                                <label className={`flex items-center gap-3 p-4 border rounded-2xl cursor-pointer transition ${
                                    data.payment_method === 'cod'
                                        ? 'border-blue-500 bg-blue-500/5 text-blue-500'
                                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                                }`}>
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        value="cod"
                                        checked={data.payment_method === 'cod'}
                                        onChange={() => setData('payment_method', 'cod')}
                                        className="sr-only"
                                    />
                                    <ShoppingBag className="h-5 w-5" />
                                    <div>
                                        <span className="font-bold text-sm block">Cash on Delivery</span>
                                        <span className="text-xs text-slate-500 font-semibold block mt-0.5">Pay upon item delivery</span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Notes */}
                        <div>
                            <InputLabel htmlFor="notes" value="Special Instructions / Order Notes" />
                            <textarea
                                id="notes"
                                rows="2"
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600 p-2 text-sm focus:outline-none"
                                placeholder="Instructions for delivery drivers..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm rounded-xl transition shadow-lg shadow-blue-500/10 flex items-center justify-center gap-1.5"
                        >
                            {data.payment_method === 'stripe' ? 'Proceed to Payment Sheet' : 'Place Cash on Delivery Order'}
                        </button>
                    </form>

                    {/* Summary Area */}
                    <div className="w-full md:w-80 bg-white border border-slate-200/80 rounded-3xl p-6 dark:bg-slate-900 dark:border-slate-800 shadow-sm h-fit">
                        <h3 className="font-extrabold text-base text-slate-800 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">Order Summary</h3>

                        <div className="flex items-center gap-3 py-4">
                            <div className="h-14 w-14 bg-slate-100 dark:bg-slate-950 rounded-xl overflow-hidden flex-shrink-0">
                                {product.images && product.images.length > 0 ? (
                                    <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                                        <ShoppingBag className="h-6 w-6" />
                                    </div>
                                )}
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 line-clamp-2">{product.title}</h4>
                                <span className="text-xs text-slate-400 block mt-0.5">Condition: {product.condition}</span>
                            </div>
                        </div>

                        <div className="py-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                            <div className="flex justify-between text-sm font-semibold text-slate-500">
                                <span>Unit Price</span>
                                <span>${product.price}</span>
                            </div>
                            <div className="flex justify-between text-sm font-semibold text-slate-500">
                                <span>Quantity</span>
                                <span>x{data.quantity}</span>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <span className="font-extrabold text-sm text-slate-800 dark:text-white">Total Amount</span>
                            <span className="text-xl font-black text-blue-500 dark:text-blue-400">${totalAmount}</span>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
