import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Wrench, Shield, CheckCircle, Clock, DollarSign, Box } from 'lucide-react';
import { api } from '../utils/api';
import { Card } from '../components/UI';

const ProcurementStrategy = () => {
    const [strategy, setStrategy] = useState(null);

    useEffect(() => {
        loadStrategy();
    }, []);

    const loadStrategy = async () => {
        try {
            const data = await api.getMakeVsBuy();
            setStrategy(data.strategy);
        } catch (error) {
            console.error('Error loading strategy:', error);
        }
    };

    if (!strategy) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-3xl font-bold text-white tracking-tight">Procurement Strategy</h2>
                <p className="text-gray-400 mt-1">Strategic Make vs. Buy decisions for supersonic fighter jet development</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* MAKE - In-House */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                            <Wrench className="text-indigo-400" size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">In-House Development</h3>
                            <p className="text-sm text-gray-500">Core IP & Strategic Differentiation</p>
                        </div>
                    </div>

                    {strategy.make.map((item, idx) => (
                        <Card key={item.id} className="border-l-2 border-l-indigo-500">
                            <div className="flex justify-between items-start mb-3">
                                <h4 className="text-lg font-bold text-white">{item.name}</h4>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${item.priority === 'critical' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                                        'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                                    }`}>
                                    {item.priority}
                                </span>
                            </div>

                            <p className="text-sm text-gray-400 mb-4 leading-relaxed">{item.rationale}</p>

                            <div className="grid grid-cols-2 gap-4 text-xs">
                                <div>
                                    <div className="text-gray-500 mb-1">TEAM SIZE</div>
                                    <div className="font-mono text-gray-200">{item.teamSize}</div>
                                </div>
                                <div>
                                    <div className="text-gray-500 mb-1">INVESTMENT</div>
                                    <div className="font-mono text-indigo-400 font-bold">{item.investment}</div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* BUY - Outsourced */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                            <ShoppingCart className="text-cyan-400" size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Outsourced Procurement</h3>
                            <p className="text-sm text-gray-500">Leveraging Tier 1 Supplier Scale</p>
                        </div>
                    </div>

                    {strategy.buy.map((item, idx) => (
                        <Card key={item.id} className="border-l-2 border-l-cyan-500">
                            <div className="flex justify-between items-start mb-3">
                                <h4 className="text-lg font-bold text-white">{item.name}</h4>
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                                    {item.model}
                                </span>
                            </div>

                            <p className="text-sm text-gray-400 mb-4 leading-relaxed">{item.rationale}</p>

                            <div className="grid grid-cols-2 gap-4 text-xs">
                                <div>
                                    <div className="text-gray-500 mb-1">SUPPLIER</div>
                                    <div className="font-mono text-cyan-400 font-bold">{item.supplier}</div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock size={12} className="text-gray-500" />
                                    <span className="text-gray-300">{item.leadTime}</span>
                                </div>
                                <div>
                                    <div className="text-gray-500 mb-1">UNIT COST</div>
                                    <div className="font-mono text-white">{item.unitCost}</div>
                                </div>
                                <div>
                                    <div className="text-gray-500 mb-1">QUANTITY</div>
                                    <div className="font-mono text-gray-300">{item.quantity}</div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            <Card className="mt-8 bg-gradient-to-r from-indigo-900/20 to-cyan-900/20 border-primary/20">
                <div className="flex gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl h-fit">
                        <Shield className="text-primary" size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2">Strategic Rationale</h3>
                        <p className="text-gray-300 text-sm leading-relaxed max-w-4xl">
                            Our hybrid strategy focuses internal resources on the "Brain & Shape" (Autonomy, Stealth, Aero) where
                            we can generate 10x differentiation, while leveraging the "Muscle" (Engines, Actuators) from the
                            established industrial base. This reduces CapEx by 65% and accelerates TTM by 18 months.
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ProcurementStrategy;
