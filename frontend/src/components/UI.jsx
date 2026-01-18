import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

export const Card = ({ children, className, title, subtitle, action }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={clsx(
                "bg-surface border border-border rounded-xl overflow-hidden relative group",
                "shadow-lg hover:shadow-xl transition-shadow duration-300",
                className
            )}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />

            {(title || action) && (
                <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-surfaceHighlight/20">
                    <div>
                        {title && <h3 className="font-semibold text-gray-100">{title}</h3>}
                        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
                    </div>
                    {action && <div>{action}</div>}
                </div>
            )}

            <div className="p-6 relative z-10">
                {children}
            </div>
        </motion.div>
    );
};

export const StatCard = ({ title, value, change, icon: Icon, trend }) => (
    <Card className="hover:border-primary/30 transition-colors">
        <div className="flex items-start justify-between mb-4">
            <div className="p-2 rounded-lg bg-surfaceHighlight border border-white/5">
                <Icon size={20} className="text-gray-400" />
            </div>
            {change && (
                <div className={clsx(
                    "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full border",
                    trend === 'up'
                        ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
                        : "text-rose-400 bg-rose-400/10 border-rose-400/20"
                )}>
                    {trend === 'up' ? '+' : ''}{change}
                </div>
            )}
        </div>
        <div className="text-2xl font-bold text-white mb-1 tracking-tight">{value}</div>
        <div className="text-sm text-gray-500">{title}</div>
    </Card>
);

export const Button = ({ children, variant = 'primary', className, onClick, icon: Icon, isLoading, ...props }) => {
    const variants = {
        primary: "bg-primary hover:bg-primary-hover text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] border-transparent",
        secondary: "bg-surfaceHighlight hover:bg-gray-700 text-gray-200 border-border",
        outline: "bg-transparent border-border hover:border-gray-500 text-gray-400 hover:text-white"
    };

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            disabled={isLoading}
            className={clsx(
                "px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 border",
                variants[variant],
                isLoading && "opacity-70 cursor-not-allowed",
                className
            )}
            {...props}
        >
            {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
                Icon && <Icon size={16} />
            )}
            {children}
        </motion.button>
    );
};
