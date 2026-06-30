import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { PlusCircle, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        category: 'Electronics',
        condition: 'Used',
        price: '',
        description: '',
        location: '',
        stock_quantity: 1,
        images_input: '',
    });

    const submit = (e) => {
        e.preventDefault();

        // Convert image URLs split by newline to an array
        const imagesList = data.images_input
            ? data.images_input.split('\n').map(url => url.trim()).filter(Boolean)
            : [];

        post(route('product.store'), {
            ...data,
            images: imagesList
        });
    };

    const categoriesList = ['Electronics', 'Books', 'Clothing', 'Furniture', 'Sports', 'Toys', 'Other'];
    const conditionsList = ['New', 'Like New', 'Used', 'Refurbished', 'Good', 'Fair', 'Poor'];

    return (
        <AuthenticatedLayout>
            <Head title="List New Product" />

            <div className="max-w-3xl mx-auto mt-6">
                <Link
                    href={route('dashboard')}
                    className="inline-flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white transition mb-6"
                >
                    <ArrowLeft className="h-4 w-4" /> Back to Dashboard
                </Link>

                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 dark:bg-slate-900 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                        <PlusCircle className="h-6 w-6 text-blue-500" />
                        <h1 className="font-extrabold text-xl text-slate-850 dark:text-white">List Product for Sale</h1>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Title */}
                        <div>
                            <InputLabel htmlFor="title" value="Product Title" />
                            <TextInput
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="mt-1 block w-full"
                                required
                                isFocused
                                placeholder="e.g. iPhone 13 Pro 128GB Midnight Blue"
                            />
                            <InputError message={errors.title} className="mt-2" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Category */}
                            <div>
                                <InputLabel htmlFor="category" value="Category" />
                                <select
                                    id="category"
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600"
                                    required
                                >
                                    {categoriesList.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                                <InputError message={errors.category} className="mt-2" />
                            </div>

                            {/* Condition */}
                            <div>
                                <InputLabel htmlFor="condition" value="Condition" />
                                <select
                                    id="condition"
                                    value={data.condition}
                                    onChange={(e) => setData('condition', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600"
                                    required
                                >
                                    {conditionsList.map((cond) => (
                                        <option key={cond} value={cond}>{cond}</option>
                                    ))}
                                </select>
                                <InputError message={errors.condition} className="mt-2" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Price */}
                            <div>
                                <InputLabel htmlFor="price" value="Price ($)" />
                                <TextInput
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                    placeholder="450.00"
                                />
                                <InputError message={errors.price} className="mt-2" />
                            </div>

                            {/* Stock quantity */}
                            <div>
                                <InputLabel htmlFor="stock_quantity" value="Quantity Available" />
                                <TextInput
                                    id="stock_quantity"
                                    type="number"
                                    value={data.stock_quantity}
                                    onChange={(e) => setData('stock_quantity', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                    placeholder="1"
                                />
                                <InputError message={errors.stock_quantity} className="mt-2" />
                            </div>
                        </div>

                        {/* Location */}
                        <div>
                            <InputLabel htmlFor="location" value="Location" />
                            <TextInput
                                id="location"
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                                className="mt-1 block w-full"
                                placeholder="e.g. Dhaka, Bangladesh"
                            />
                            <InputError message={errors.location} className="mt-2" />
                        </div>

                        {/* Images list (URLs split by newline) */}
                        <div>
                            <InputLabel htmlFor="images_input" value="Product Image URLs (One per line)" />
                            <textarea
                                id="images_input"
                                rows="3"
                                value={data.images_input}
                                onChange={(e) => setData('images_input', e.target.value)}
                                placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600 p-2 text-sm focus:outline-none"
                            />
                            <p className="text-xs text-slate-500 mt-1 font-semibold">Provide public URLs to host items correctly. If empty, a placeholder icon will display.</p>
                        </div>

                        {/* Description */}
                        <div>
                            <InputLabel htmlFor="description" value="Product Details & Description" />
                            <textarea
                                id="description"
                                rows="5"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600 p-2.5 text-sm focus:outline-none"
                                required
                                placeholder="Describe the item condition, usage period, package accessories, and reasons for selling..."
                            />
                            <InputError message={errors.description} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
                            <Link
                                href={route('dashboard')}
                                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm rounded-xl transition"
                            >
                                Cancel
                                </Link>
                            <PrimaryButton disabled={processing}>
                                Create Listing
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
