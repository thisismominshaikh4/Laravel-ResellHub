import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition">
            <nav className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-sm sticky top-0 z-40">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/" className="flex items-center space-x-2">
                                    <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                        <ShoppingBag className="h-5 w-5 text-white" />
                                    </div>
                                    <span className="text-md font-black tracking-wider bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
                                        ReSell Hub
                                    </span>
                                </Link>
                            </div>

                            {/* Role based navigation links */}
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('product.index')} active={route().current('product.index')}>
                                    Marketplace
                                </NavLink>

                                {user.role === 'buyer' && (
                                    <>
                                        <NavLink href={route('buyer.orders')} active={route().current('buyer.orders')}>
                                            My Orders
                                        </NavLink>
                                        <NavLink href={route('buyer.alerts')} active={route().current('buyer.alerts')}>
                                            My Alerts
                                        </NavLink>
                                    </>
                                )}

                                {user.role === 'seller' && (
                                    <>
                                        <NavLink href={route('seller.listings')} active={route().current('seller.listings')}>
                                            My Listings
                                        </NavLink>
                                        <NavLink href={route('product.create')} active={route().current('product.create')}>
                                            List Product
                                        </NavLink>
                                        <NavLink href={route('seller.orders')} active={route().current('seller.orders')}>
                                            Sales Orders
                                        </NavLink>
                                        <NavLink href={route('seller.analytics')} active={route().current('seller.analytics')}>
                                            Sales Analytics
                                        </NavLink>
                                    </>
                                )}

                                {user.role === 'admin' && (
                                    <>
                                        <NavLink href={route('admin.users')} active={route().current('admin.users')}>
                                            Manage Users
                                        </NavLink>
                                        <NavLink href={route('admin.reports')} active={route().current('admin.reports')}>
                                            Manage Reports
                                        </NavLink>
                                        <NavLink href={route('admin.analytics')} active={route().current('admin.analytics')}>
                                            Platform Analytics
                                        </NavLink>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm font-bold text-slate-700 hover:text-slate-900 transition dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:text-white"
                                            >
                                                {user.name} ({user.role})
                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>
                                            Profile Settings
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Dropdown */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink href={route('product.index')} active={route().current('product.index')}>
                            Marketplace
                        </ResponsiveNavLink>

                        {user.role === 'buyer' && (
                            <>
                                <ResponsiveNavLink href={route('buyer.orders')} active={route().current('buyer.orders')}>
                                    My Orders
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route('buyer.alerts')} active={route().current('buyer.alerts')}>
                                    My Alerts
                                </ResponsiveNavLink>
                            </>
                        )}

                        {user.role === 'seller' && (
                            <>
                                <ResponsiveNavLink href={route('seller.listings')} active={route().current('seller.listings')}>
                                    My Listings
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route('product.create')} active={route().current('product.create')}>
                                    List Product
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route('seller.orders')} active={route().current('seller.orders')}>
                                    Sales Orders
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route('seller.analytics')} active={route().current('seller.analytics')}>
                                    Sales Analytics
                                </ResponsiveNavLink>
                            </>
                        )}

                        {user.role === 'admin' && (
                            <>
                                <ResponsiveNavLink href={route('admin.users')} active={route().current('admin.users')}>
                                    Manage Users
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route('admin.reports')} active={route().current('admin.reports')}>
                                    Manage Reports
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route('admin.analytics')} active={route().current('admin.analytics')}>
                                    Platform Analytics
                                </ResponsiveNavLink>
                            </>
                        )}
                    </div>

                    <div className="border-t border-slate-200 pb-1 pt-4 dark:border-slate-800">
                        <div className="px-4">
                            <div className="text-base font-bold text-slate-800 dark:text-slate-200">{user.name}</div>
                            <div className="text-sm text-slate-500">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile Settings</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white border-b border-slate-200/80 dark:bg-slate-900 dark:border-slate-800">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="py-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
