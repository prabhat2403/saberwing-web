import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, ShoppingCart, Network, Cpu, Settings, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

const SidebarItem = ({ icon: Icon, label, path, active }) => (
    <Link to={path}>
        <motion.div
            whileHover={{ x: 4 }}
            className={clsx(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 mb-1",
                active
                    ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                    : "text-gray-400 hover:text-gray-100 hover:bg-white/5"
            )}
        >
            <Icon size={20} className={active ? "text-primary" : "text-gray-500"} />
            <span className="font-medium text-sm">{label}</span>
            {active && (
                <motion.div
                    layoutId="active-pill"
                    className="absolute left-0 w-1 h-8 bg-primary rounded-r-full"
                />
            )}
        </motion.div>
    </Link>
);

const Sidebar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <div className="w-64 h-screen fixed left-0 top-0 bg-surface border-r border-border flex flex-col z-50">
            {/* Logo */}
            <div className="p-6 border-b border-border">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <Cpu size={18} className="text-white" />
                    </div>
                    <div>
                        <h1 className="font-bold text-gray-100 leading-none">SaberWing</h1>
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Command Center</span>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 py-6 px-3">
                <div className="mb-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Main Menu</div>
                <SidebarItem
                    icon={Network}
                    label="Supplier Network"
                    path="/"
                    active={isActive('/')}
                />
                <SidebarItem
                    icon={ShoppingCart}
                    label="Procurement"
                    path="/procurement"
                    active={isActive('/procurement')}
                />
                <SidebarItem
                    icon={LayoutDashboard}
                    label="Inventory AI"
                    path="/inventory"
                    active={isActive('/inventory')}
                />
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border bg-surfaceHighlight/30">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-700 to-gray-600 border border-white/10" />
                    <div className="flex-1">
                        <div className="text-sm font-medium text-gray-200">System Admin</div>
                        <div className="text-xs text-green-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            Online
                        </div>
                    </div>
                    <Settings size={16} className="text-gray-500 cursor-pointer hover:text-white transition-colors" />
                </div>
            </div>
        </div>
    );
};

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-background text-gray-100 font-sans selection:bg-indigo-500/30">
            <Sidebar />
            <main className="pl-64 min-h-screen">
                <div className="max-w-7xl mx-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
