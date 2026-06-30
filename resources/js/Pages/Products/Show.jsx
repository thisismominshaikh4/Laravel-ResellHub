import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { 
    MapPin, Tag, Star, Eye, ShieldAlert, ArrowLeft, 
    Bell, CheckCircle2, ShoppingCart, User, MessageSquarePlus
} from 'lucide-react';

export default function Show({ auth, product, reviews }) {
    const user = auth.user;
    const Layout = user ? AuthenticatedLayout : ({ children }) => (
        <GuestLayout>
            <div className="py-12 bg-slate-900 min-h-screen text-slate-100 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">{children}</div>
            </div>
        </GuestLayout>
    );

    const [reportReason, setReportReason] = useState('');
    const [reportDetails, setReportDetails] = useState('');
    const [showReportModal, setShowReportModal] = useState(false);
    const [alertSetup, setAlertSetup] = useState(false);

    // Review Form Setup
    const reviewForm = useForm({
        product_id: product.id,
        rating: 5,
        comment: '',
    });

    // Alert Form Setup
    const alertForm = useForm({
        product_id: product.id,
        notify_on_price_drop: true,
        notify_on_availability: true,
    });

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        reviewForm.post(route('review.store'), {
            onSuccess: () => reviewForm.reset('comment'),
        });
    };

    const handleAlertSubmit = (e) => {
        e.preventDefault();
        alertForm.post(route('alert.store'), {
            onSuccess: () => setAlertSetup(true),
        });
    };

    const handleReportSubmit = (e) => {
        e.preventDefault();
        router.post(route('product.report', product.id), {
            reason: reportReason,
            details: reportDetails
        }, {
            onSuccess: () => {
                setShowReportModal(false);
                setReportReason('');
                setReportDetails('');
            }
        });
    };

    return (
        <Layout>
            <Head title={product.title} />

            <div className="max-w-6xl mx-auto mt-6">
                <Link
                    href={route('product.index')}
                    className="inline-flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white transition mb-6"
                >
                    <ArrowLeft className="h-4 w-4" /> Back to Marketplace
                </Link>

                <div className="flex flex-col lg:flex-row gap-8 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 dark:bg-slate-900 dark:border-slate-800 shadow-sm">
                    {/* Image Area */}
                    <div className="flex-1 max-w-xl aspect-video bg-slate-100 dark:bg-slate-950 rounded-2xl overflow-hidden relative">
                        {product.images && product.images.length > 0 ? (
                            <img
                                src={product.images[0]}
                                alt={product.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                                <ShoppingCart className="h-16 w-16" />
                            </div>
                        )}
                        <span className="absolute top-4 right-4 bg-blue-600/90 text-white text-xs font-black uppercase px-3 py-1 rounded-full tracking-wider">
                            {product.condition}
                        </span>
                    </div>

                    {/* Meta info area */}
                    <div className="flex-1 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{product.category}</span>
                                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
                                    <Eye className="h-4 w-4" />
                                    <span>{product.views} views</span>
                                </div>
                            </div>

                            <h1 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white mt-2 leading-tight">
                                {product.title}
                            </h1>

                            <div className="flex items-center gap-1.5 text-sm text-slate-500 mt-2 font-semibold">
                                <MapPin className="h-4 w-4 text-slate-400" />
                                <span>{product.location || 'Bangladesh'}</span>
                            </div>

                            {/* Price */}
                            <div className="mt-6 p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10 flex items-center justify-between">
                                <div>
                                    <span className="text-xs text-slate-400 block font-semibold">Listing Price</span>
                                    <span className="text-3xl font-black text-blue-500 dark:text-blue-400">${product.price}</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs text-slate-400 block font-semibold">Stock Status</span>
                                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                                        product.status === 'available' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                                    }`}>
                                        {product.status === 'available' ? 'In Stock' : 'Sold Out'}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h3 className="font-bold text-slate-800 dark:text-slate-200">Description</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed whitespace-pre-line">
                                    {product.description}
                                </p>
                            </div>
                        </div>

                        {/* Order button & alerts */}
                        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-4">
                            <div className="flex flex-col sm:flex-row gap-3">
                                {product.status === 'available' && (!user || product.seller_id !== user.id) ? (
                                    <Link
                                        href={route('order.checkout', product.id)}
                                        className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-center rounded-xl transition shadow-lg shadow-blue-500/10 flex items-center justify-center gap-1.5"
                                    >
                                        <ShoppingCart className="h-4 w-4" /> Instant Purchase
                                    </Link>
                                ) : product.seller_id === user?.id ? (
                                    <div className="flex-1 py-3.5 bg-slate-100 dark:bg-slate-800 text-slate-400 text-center font-bold text-sm rounded-xl">
                                        Your Listing
                                    </div>
                                ) : (
                                    <div className="flex-1 py-3.5 bg-slate-100 dark:bg-slate-800 text-red-500 text-center font-bold text-sm rounded-xl">
                                        Sold Out
                                    </div>
                                )}

                                {user && product.seller_id !== user.id && (
                                    <button
                                        onClick={() => setShowReportModal(true)}
                                        className="px-5 py-3.5 bg-slate-100 hover:bg-red-50 dark:bg-slate-800 dark:hover:bg-red-950/20 text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 font-bold rounded-xl transition flex items-center justify-center gap-1.5"
                                    >
                                        <ShieldAlert className="h-4 w-4" /> Report
                                    </button>
                                )}
                            </div>

                            {/* Seller Box */}
                            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <span className="text-xs text-slate-400 font-semibold block">Listed By</span>
                                        <span className="font-bold text-sm text-slate-800 dark:text-slate-200">{product.seller?.name || 'Seller'}</span>
                                    </div>
                                </div>
                                {product.seller?.is_verified && (
                                    <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase px-2 py-0.5 rounded-md flex items-center gap-0.5 border border-emerald-500/20">
                                        <CheckCircle2 className="h-3.5 w-3.5" /> Verified
                                    </span>
                                )}
                            </div>

                            {/* Set Alerts block */}
                            {user && product.seller_id !== user.id && (
                                <form onSubmit={handleAlertSubmit} className="p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <Bell className="h-5 w-5 text-indigo-500" />
                                        <div>
                                            <span className="font-bold text-sm text-slate-800 dark:text-slate-200">Track Price Drops</span>
                                            <span className="text-xs text-slate-400 block mt-0.5 font-semibold">Notify me on drops and stock changes</span>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={alertForm.processing || alertSetup}
                                        className={`px-4 py-2 font-bold text-xs rounded-xl transition ${
                                            alertSetup 
                                                ? 'bg-emerald-500/20 text-emerald-400 cursor-default'
                                                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/10'
                                        }`}
                                    >
                                        {alertSetup ? 'Set Active' : 'Enable Alert'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mt-8 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 dark:bg-slate-900 dark:border-slate-800 shadow-sm">
                    <h3 className="font-extrabold text-xl text-slate-800 dark:text-white flex items-center gap-1.5">
                        Seller Reviews ({reviews.length})
                    </h3>

                    {/* Add Review form */}
                    {user && product.seller_id !== user.id && !reviews.some(r => r.reviewer_id === user.id) && (
                        <form onSubmit={handleReviewSubmit} className="mt-6 p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-2xl">
                            <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300 flex items-center gap-1 mb-3">
                                <MessageSquarePlus className="h-4 w-4 text-blue-500" /> Share your experience with the seller
                            </h4>
                            <div className="flex items-center gap-1 mb-4">
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
                            <textarea
                                required
                                rows="3"
                                placeholder="Write your review comments here..."
                                value={reviewForm.data.comment}
                                onChange={(e) => reviewForm.setData('comment', e.target.value)}
                                className="w-full rounded-xl border-slate-200 bg-white p-3 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                            />
                            <div className="flex justify-end mt-3">
                                <button
                                    type="submit"
                                    disabled={reviewForm.processing}
                                    className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition shadow-md shadow-blue-500/10"
                                >
                                    Submit Review
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Reviews List */}
                    <div className="mt-6 space-y-4">
                        {reviews.length === 0 ? (
                            <p className="text-slate-400 text-sm italic">No reviews submitted for this listing seller yet.</p>
                        ) : (
                            reviews.map((rev) => (
                                <div key={rev.id} className="p-4 bg-slate-50/50 border border-slate-100 dark:bg-slate-800/10 dark:border-slate-800/80 rounded-2xl">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-sm text-slate-800 dark:text-slate-200">{rev.reviewer_name}</span>
                                        <div className="flex items-center gap-0.5">
                                            {[1, 2, 3, 4, 5].map((val) => (
                                                <Star key={val} className={`h-3.5 w-3.5 ${rev.rating >= val ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 font-medium">{rev.comment}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Report Modal */}
            {showReportModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
                    <div className="bg-white border border-slate-200/80 dark:bg-slate-900 dark:border-slate-850 max-w-md w-full p-6 rounded-3xl shadow-2xl relative">
                        <h3 className="font-extrabold text-lg text-slate-800 dark:text-white">Report Listing</h3>
                        <p className="text-xs text-slate-400 mt-1 font-semibold">Help us keep the marketplace safe. Provide details below.</p>
                        <form onSubmit={handleReportSubmit} className="mt-4 space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Reason</label>
                                <select
                                    required
                                    value={reportReason}
                                    onChange={(e) => setReportReason(e.target.value)}
                                    className="w-full rounded-xl border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-700 dark:text-slate-300 focus:outline-none focus:border-blue-500"
                                >
                                    <option value="">Select a reason</option>
                                    <option value="Fake or misleading product">Fake or misleading product</option>
                                    <option value="Inappropriate language/images">Inappropriate language/images</option>
                                    <option value="Fraudulent seller behaviour">Fraudulent seller behaviour</option>
                                    <option value="Wrong pricing or duplicate listing">Wrong pricing or duplicate listing</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Details (Optional)</label>
                                <textarea
                                    rows="3"
                                    placeholder="Explain why this listing violates terms..."
                                    value={reportDetails}
                                    onChange={(e) => setReportDetails(e.target.value)}
                                    className="w-full rounded-xl border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-100 placeholder-slate-500 focus:outline-none"
                                />
                            </div>
                            <div className="flex items-center justify-end gap-2.5 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowReportModal(false)}
                                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl transition shadow-md shadow-red-500/10"
                                >
                                    Submit Report
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
}
