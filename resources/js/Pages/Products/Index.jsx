import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Search, MapPin, Tag, Star, Heart, SlidersHorizontal, LayoutGrid } from 'lucide-react';

export default function Index({ auth, products, queryParams }) {
    const user = auth.user;
    const Layout = user ? AuthenticatedLayout : ({ children }) => (
        <GuestLayout>
            <div className="py-12 bg-slate-900 min-h-screen text-slate-100 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">{children}</div>
            </div>
        </GuestLayout>
    );

    const params = queryParams || {};
    const [search, setSearch] = useState(params.search || '');
    const [category, setCategory] = useState(params.category || 'All');
    const [condition, setCondition] = useState(params.condition || 'All');
    const [minPrice, setMinPrice] = useState(params.minPrice || '');
    const [maxPrice, setMaxPrice] = useState(params.maxPrice || '');
    const [location, setLocation] = useState(params.location || '');
    const [sortBy, setSortBy] = useState(params.sortBy || 'newest');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        applyFilters();
    };

    const applyFilters = () => {
        router.get(route('product.index'), {
            search,
            category,
            condition,
            minPrice,
            maxPrice,
            location,
            sortBy
        }, {
            preserveState: true,
            replace: true
        });
    };

    const resetFilters = () => {
        setSearch('');
        setCategory('All');
        setCondition('All');
        setMinPrice('');
        setMaxPrice('');
        setLocation('');
        setSortBy('newest');
        router.get(route('product.index'));
    };

    const categoriesList = ['All', 'Electronics', 'Books', 'Clothing', 'Furniture', 'Sports', 'Toys', 'Other'];
    const conditionsList = ['All', 'New', 'Like New', 'Used', 'Refurbished', 'Good', 'Fair', 'Poor'];

    return (
        <Layout>
            <Head title="Marketplace Products" />

            <div className="flex flex-col lg:flex-row gap-8 mt-6">
                {/* Filters Sidebar */}
                <div className="w-full lg:w-64 bg-white border border-slate-200/80 p-6 rounded-3xl dark:bg-slate-900 dark:border-slate-800 flex-shrink-0 h-fit">
                    <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                        <SlidersHorizontal className="h-5 w-5 text-blue-500" />
                        <span className="font-extrabold text-lg text-slate-800 dark:text-white">Filters</span>
                    </div>

                    <div className="space-y-6">
                        {/* Category filter */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Category</label>
                            <select
                                value={category}
                                onChange={(e) => { setCategory(e.target.value); setTimeout(applyFilters, 50); }}
                                className="w-full rounded-xl border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-700 dark:text-slate-300 focus:outline-none focus:border-blue-500"
                            >
                                {categoriesList.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        {/* Condition filter */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Condition</label>
                            <select
                                value={condition}
                                onChange={(e) => { setCondition(e.target.value); setTimeout(applyFilters, 50); }}
                                className="w-full rounded-xl border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-700 dark:text-slate-300 focus:outline-none focus:border-blue-500"
                            >
                                {conditionsList.map((cond) => (
                                    <option key={cond} value={cond}>{cond}</option>
                                ))}
                            </select>
                        </div>

                        {/* Location filter */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Location</label>
                            <input
                                type="text"
                                placeholder="City or region"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full rounded-xl border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Price Range filter */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Price Range</label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    className="w-1/2 rounded-xl border-slate-200 bg-slate-50 p-2 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                                />
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    className="w-1/2 rounded-xl border-slate-200 bg-slate-50 p-2 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                            <button
                                onClick={applyFilters}
                                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition shadow-md shadow-blue-500/10"
                            >
                                Apply Filters
                            </button>
                            <button
                                onClick={resetFilters}
                                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm rounded-xl transition"
                            >
                                Reset All
                            </button>
                        </div>
                    </div>
                </div>

                {/* Products Marketplace Grid */}
                <div className="flex-1">
                    {/* Top Panel */}
                    <div className="bg-white border border-slate-200/80 p-4 rounded-3xl dark:bg-slate-900 dark:border-slate-800 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
                        <form onSubmit={handleSearchSubmit} className="relative w-full md:max-w-md">
                            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search keyword..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-2xl border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                            />
                        </form>

                        <div className="flex items-center gap-2 self-end md:self-auto w-full md:w-auto">
                            <span className="text-xs font-bold text-slate-400 whitespace-nowrap">Sort By:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => { setSortBy(e.target.value); setTimeout(applyFilters, 50); }}
                                className="w-full md:w-auto rounded-xl border-slate-200 bg-slate-50 p-2.5 text-sm dark:border-slate-800 dark:bg-slate-950 text-slate-700 dark:text-slate-300 focus:outline-none focus:border-blue-500"
                            >
                                <option value="newest">Newest Listed</option>
                                <option value="oldest">Oldest Listed</option>
                                <option value="priceLowToHigh">Price: Low to High</option>
                                <option value="priceHighToLow">Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    {/* Products Grid */}
                    {products.data.length === 0 ? (
                        <div className="text-center py-20 bg-white border border-slate-200/80 rounded-3xl dark:bg-slate-900 dark:border-slate-800">
                            <Tag className="h-14 w-14 text-slate-300 dark:text-slate-700 mx-auto mb-4 animate-pulse" />
                            <h3 className="font-extrabold text-xl text-slate-800 dark:text-white">No products found</h3>
                            <p className="text-slate-500 text-sm mt-1 max-w-sm mx-auto">Try refining your searches, choosing another category, or removing filters.</p>
                            <button
                                onClick={resetFilters}
                                className="mt-6 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition text-sm"
                            >
                                Reset Search Filters
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.data.map((prod) => (
                                    <div
                                        key={prod.id}
                                        className="bg-white border border-slate-200/80 dark:bg-slate-900 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-3xl overflow-hidden flex flex-col justify-between transition group shadow-sm hover:shadow-md"
                                    >
                                        <div className="relative aspect-video bg-slate-100 dark:bg-slate-950 overflow-hidden">
                                            {prod.images && prod.images.length > 0 ? (
                                                <img
                                                    src={prod.images[0]}
                                                    alt={prod.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                    <LayoutGrid className="h-10 w-10" />
                                                </div>
                                            )}
                                            <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur text-blue-400 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                                                {prod.condition}
                                            </span>
                                        </div>

                                        <div className="p-5 flex-1 flex flex-col justify-between">
                                            <div>
                                                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block">{prod.category}</span>
                                                <h4 className="font-extrabold text-slate-800 dark:text-slate-100 group-hover:text-blue-500 transition mt-1 line-clamp-1">
                                                    <Link href={route('product.show', prod.id)}>{prod.title}</Link>
                                                </h4>
                                                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2 font-semibold">
                                                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                                                    <span>{prod.location || 'Bangladesh'}</span>
                                                </div>
                                            </div>

                                            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                                <div>
                                                    <span className="text-xs text-slate-400 block font-semibold">Price</span>
                                                    <span className="text-xl font-black text-blue-500 dark:text-blue-400">${prod.price}</span>
                                                </div>
                                                <Link
                                                    href={route('product.show', prod.id)}
                                                    className="px-4 py-2 bg-slate-50 hover:bg-blue-600 hover:text-white dark:bg-slate-800 dark:hover:bg-blue-600 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl transition"
                                                >
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination Links */}
                            {products.links.length > 3 && (
                                <div className="flex items-center justify-center gap-1.5 mt-10">
                                    {products.links.map((link, idx) => (
                                        <Link
                                            key={idx}
                                            href={link.url || '#'}
                                            disabled={!link.url}
                                            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition ${
                                                link.active
                                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                                                    : link.url
                                                    ? 'bg-white border border-slate-200/80 hover:bg-slate-50 text-slate-700 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 dark:text-slate-300'
                                                    : 'text-slate-400 cursor-not-allowed dark:text-slate-600'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
}
