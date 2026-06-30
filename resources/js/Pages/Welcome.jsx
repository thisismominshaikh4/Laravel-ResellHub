import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    Search, 
    ShoppingBag, 
    Users, 
    CheckCircle2, 
    ArrowRight, 
    Tag, 
    MapPin, 
    Smartphone, 
    BookOpen, 
    Shirt, 
    Armchair, 
    Gamepad2, 
    Dribbble, 
    ChevronRight,
    Star
} from 'lucide-react';

export default function Welcome({ auth, featuredProducts, stats, categories }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Helper to map category names to Lucide icons
    const getCategoryIcon = (name) => {
        switch (name.toLowerCase()) {
            case 'electronics': return <Smartphone className="h-6 w-6" />;
            case 'books': return <BookOpen className="h-6 w-6" />;
            case 'clothing': return <Shirt className="h-6 w-6" />;
            case 'furniture': return <Armchair className="h-6 w-6" />;
            case 'toys': return <Gamepad2 className="h-6 w-6" />;
            case 'sports': return <Dribbble className="h-6 w-6" />;
            default: return <Tag className="h-6 w-6" />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
            <Head title="Welcome to ResellHub" />

            {/* Navbar */}
            <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="h-10 w-10 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <ShoppingBag className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xl font-black tracking-wider bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
                            ReSell Hub
                        </span>
                    </Link>

                    <div className="flex items-center space-x-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-flex items-center px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition shadow-lg shadow-blue-600/20"
                            >
                                Dashboard <ArrowRight className="ml-1.5 h-4 w-4" />
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="text-sm font-semibold text-slate-400 hover:text-white transition"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition shadow-lg shadow-blue-600/20"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative py-20 lg:py-32 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none mb-6">
                        Buy & Sell Pre-Loved Goods <br />
                        <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-indigo-500 bg-clip-text text-transparent">
                            Safely & Instantly
                        </span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-slate-400 mb-10">
                        Bangladesh's premium community marketplace for second-hand items. Buy verified electronics, clothes, furniture and more directly from trusted sellers.
                    </p>

                    {/* Search Bar */}
                    <form 
                        action={route('product.index')} 
                        method="GET"
                        className="max-w-3xl mx-auto p-2 bg-slate-800/80 border border-slate-700/60 rounded-2xl flex flex-col sm:flex-row items-center gap-2 shadow-2xl backdrop-blur"
                    >
                        <div className="w-full flex items-center pl-3">
                            <Search className="h-5 w-5 text-slate-400 mr-2 flex-shrink-0" />
                            <input
                                type="text"
                                name="search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="What are you looking for today? (e.g. iPhone, IELTS Book...)"
                                className="w-full py-3 bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none text-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition flex items-center justify-center gap-1.5 shadow-lg shadow-blue-600/10"
                        >
                            <Search className="h-4 w-4" /> Search
                        </button>
                    </form>
                </div>
            </section>

            {/* Stats section */}
            <section className="py-12 border-y border-slate-800 bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-3xl sm:text-4xl font-extrabold text-blue-400 mb-1">
                            {stats.totalProducts}+
                        </div>
                        <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500">Active Listings</div>
                    </div>
                    <div>
                        <div className="text-3xl sm:text-4xl font-extrabold text-indigo-400 mb-1">
                            {stats.totalSellers}+
                        </div>
                        <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500">Verified Sellers</div>
                    </div>
                    <div>
                        <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 mb-1">
                            {stats.totalBuyers}+
                        </div>
                        <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500">Registered Buyers</div>
                    </div>
                    <div>
                        <div className="text-3xl sm:text-4xl font-extrabold text-violet-400 mb-1">
                            {stats.completedOrders}+
                        </div>
                        <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500">Orders Delivered</div>
                    </div>
                </div>
            </section>

            {/* Categories section */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-black">Browse by Category</h2>
                        <p className="text-slate-400 text-sm mt-1">Explore listings filtered by primary product categories</p>
                    </div>
                    <Link
                        href={route('product.index')}
                        className="text-sm font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition"
                    >
                        View All Listings <ChevronRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map((cat, idx) => (
                        <Link
                            key={idx}
                            href={route('product.index', { category: cat.name })}
                            className="p-6 bg-slate-800/40 border border-slate-800 hover:border-blue-500/50 rounded-2xl flex flex-col items-center justify-center text-center transition group hover:bg-slate-800/70"
                        >
                            <div className="h-12 w-12 bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition mb-4">
                                {getCategoryIcon(cat.name)}
                            </div>
                            <span className="font-bold text-sm text-slate-200 group-hover:text-white transition">{cat.name}</span>
                            <span className="text-xs text-slate-500 mt-1 font-semibold">{cat.count} listings</span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured Listings Section */}
            <section className="py-20 bg-slate-950/40 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-black">Featured Products</h2>
                            <p className="text-slate-400 text-sm mt-1">Handpicked quality listings recommended for you</p>
                        </div>
                        <Link
                            href={route('product.index')}
                            className="text-sm font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition"
                        >
                            Explore Marketplace <ChevronRight className="h-4 w-4" />
                        </Link>
                    </div>

                    {featuredProducts.length === 0 ? (
                        <div className="text-center py-16 bg-slate-900/50 rounded-3xl border border-slate-800">
                            <Tag className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                            <p className="text-slate-400 font-bold">No active listings available right now.</p>
                            <p className="text-slate-500 text-sm mt-1">Be the first to list a product for sale!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredProducts.map((prod) => (
                                <div
                                    key={prod.id}
                                    className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl overflow-hidden flex flex-col transition group hover:shadow-xl hover:shadow-slate-950/50"
                                >
                                    <div className="relative aspect-video bg-slate-800 overflow-hidden">
                                        {prod.images && prod.images.length > 0 ? (
                                            <img
                                                src={prod.images[0]}
                                                alt={prod.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-600">
                                                <ShoppingBag className="h-10 w-10" />
                                            </div>
                                        )}
                                        {prod.is_featured && (
                                            <span className="absolute top-3 left-3 bg-amber-500/90 text-slate-950 text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-md flex items-center gap-0.5">
                                                <Star className="h-3 w-3 fill-slate-950" /> Featured
                                            </span>
                                        )}
                                        <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur text-blue-400 text-[10px] font-bold px-2.5 py-1 rounded-full">
                                            {prod.condition}
                                        </span>
                                    </div>

                                    <div className="p-5 flex-1 flex flex-col justify-between">
                                        <div>
                                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{prod.category}</span>
                                            <h3 className="font-bold text-slate-100 hover:text-blue-400 transition mt-1 line-clamp-1">
                                                <Link href={route('product.show', prod.id)}>{prod.title}</Link>
                                            </h3>
                                            <div className="flex items-center gap-1 text-xs text-slate-400 mt-2 font-semibold">
                                                <MapPin className="h-3.5 w-3.5 text-slate-500" />
                                                <span>{prod.location || 'Bangladesh'}</span>
                                            </div>
                                        </div>

                                        <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                                            <div>
                                                <span className="text-xs text-slate-500 block font-semibold">Price</span>
                                                <span className="text-lg font-black text-blue-400">${prod.price}</span>
                                            </div>
                                            <Link
                                                href={route('product.show', prod.id)}
                                                className="px-4 py-2 bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-300 text-xs font-bold rounded-xl transition flex items-center gap-1"
                                            >
                                                Details <ChevronRight className="h-3 w-3" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-950 py-12 border-t border-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <ShoppingBag className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-black tracking-wider text-slate-200">ReSell Hub</span>
                    </div>
                    <p className="text-xs text-slate-500">
                        &copy; 2026 ReSell Hub. All rights reserved. Created for optimal Railway deployments.
                    </p>
                </div>
            </footer>
        </div>
    );
}
