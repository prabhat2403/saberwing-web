import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { Activity, TrendingUp, AlertTriangle, Cpu, DollarSign, Clock, Shield, Zap } from 'lucide-react';
import { api } from '../utils/api';
import { Card, StatCard, Button } from '../components/UI';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const InventoryAI = () => {
    const [macroParams, setMacroParams] = useState({
        conflictIndex: 5,
        inflationRate: 3.0,
        defenseBudget: 100,
        flightHours: 250,
        testPhase: 'Normal'
    });

    const [predictions, setPredictions] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSliderChange = (e) => {
        setMacroParams({
            ...macroParams,
            [e.target.name]: parseFloat(e.target.value)
        });
    };

    const runAnalysis = async () => {
        setLoading(true);
        try {
            const result = await api.runMLPrediction(macroParams);
            console.log('API RESPONSE IN FRONTEND:', result);
            setPredictions(result);
        } catch (error) {
            console.error('Analysis failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const chartData = {
        labels: predictions ? predictions.predictions.map(i => i.component.split(' ')[0]) : [],
        datasets: [
            {
                label: 'Current Stock',
                data: predictions ? predictions.predictions.map(i => i.currentStock) : [],
                backgroundColor: 'rgba(99, 102, 241, 0.5)',
                borderColor: '#6366f1',
                borderWidth: 1,
                borderRadius: 4,
            },
            {
                label: 'AI Recommendation',
                data: predictions ? predictions.predictions.map(i => i.recommendedQuantity) : [],
                backgroundColor: 'rgba(6, 182, 212, 0.5)',
                borderColor: '#06b6d4',
                borderWidth: 1,
                borderRadius: 4,
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: { color: '#9ca3af', usePointStyle: true, boxWidth: 6 }
            },
            tooltip: {
                backgroundColor: '#1f2937',
                titleColor: '#f3f4f6',
                bodyColor: '#d1d5db',
                borderColor: '#374151',
                borderWidth: 1,
                padding: 10,
                cornerRadius: 8,
            }
        },
        scales: {
            y: {
                grid: { color: 'rgba(255, 255, 255, 0.05)' },
                ticks: { color: '#6b7280' }
            },
            x: {
                grid: { display: false },
                ticks: { color: '#6b7280' }
            }
        }
    };

    const SliderControl = ({ label, name, value, min, max, step, suffix = '', icon: Icon }) => (
        <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <Icon size={16} className="text-primary" />
                    {label}
                </div>
                <span className="text-primary font-bold font-mono bg-primary/10 px-2 py-0.5 rounded text-xs">
                    {value}{suffix}
                </span>
            </div>
            <input
                type="range"
                name={name}
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={handleSliderChange}
                className="w-full h-1.5 bg-surfaceHighlight rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary-hover"
            />
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Intelligent Inventory</h2>
                    <p className="text-gray-400 mt-1">AI-powered procurement based on geopolitical & economic macros.</p>
                </motion.div>
                <div className="hidden lg:block">
                    {!predictions && (
                        <Button onClick={runAnalysis} isLoading={loading} icon={Zap}>
                            {loading ? 'Processing...' : 'Run ML Analysis'}
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Control Panel */}
                <Card title="Macro Parameters" subtitle="Adjust simulation variables" className="lg:col-span-1 h-fit">
                    <div className="space-y-2">
                        <SliderControl icon={Shield} label="Global Conflict Index" name="conflictIndex" value={macroParams.conflictIndex} min={1} max={10} step={1} suffix="/10" />
                        <SliderControl icon={TrendingUp} label="Inflation Rate" name="inflationRate" value={macroParams.inflationRate} min={0} max={15} step={0.5} suffix="%" />
                        <SliderControl icon={DollarSign} label="Defense Budget" name="defenseBudget" value={macroParams.defenseBudget} min={50} max={200} step={10} suffix="B" />
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="text-xs text-gray-500 font-semibold uppercase mb-1 block">Flight Hours</label>
                                <input
                                    type="number"
                                    name="flightHours"
                                    value={macroParams.flightHours}
                                    onChange={handleSliderChange}
                                    className="w-full bg-surfaceHighlight border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 font-semibold uppercase mb-1 block">Test Phase</label>
                                <select
                                    name="testPhase"
                                    value={macroParams.testPhase}
                                    onChange={handleSliderChange}
                                    className="w-full bg-surfaceHighlight border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                >
                                    <option>Normal</option>
                                    <option>High-G</option>
                                    <option>Weapons</option>
                                    <option>Carrier</option>
                                </select>
                            </div>
                        </div>
                        <Button onClick={runAnalysis} className="w-full mt-4" icon={Zap} isLoading={loading}>
                            {loading ? 'Running Simulation...' : 'Run Analysis'}
                        </Button>
                    </div>
                </Card>

                {/* Results Area */}
                <div className="lg:col-span-2 space-y-6">
                    {predictions ? (
                        <>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <StatCard title="Total Cost" value={predictions.summary.total_procurement_cost} icon={DollarSign} change="12%" trend="up" />
                                <StatCard title="Total Units" value={predictions.summary.total_units} icon={Cpu} />
                                <StatCard title="Avg Lead Time" value={predictions.summary.average_lead_time} icon={Clock} change="5 Days" trend="down" />
                                <StatCard title="Critical Items" value={predictions.summary.critical_items_count} icon={AlertTriangle} change="2" trend="up" />
                            </div>

                            <Card title="Stock vs Recommendation" subtitle="AI-driven inventory optimization">
                                <Bar data={chartData} options={chartOptions} height={200} />
                            </Card>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {predictions.predictions.map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className={`p-4 rounded-xl border ${item.status === 'critical' ? 'bg-rose-500/10 border-rose-500/30' :
                                            item.status === 'reorder' ? 'bg-amber-500/10 border-amber-500/30' :
                                                'bg-surface border-border'
                                            }`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-semibold text-white">{item.component}</h4>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${item.status === 'critical' ? 'bg-rose-500 text-white' :
                                                item.status === 'reorder' ? 'bg-amber-500 text-black' :
                                                    'bg-emerald-500/20 text-emerald-400'
                                                }`}>
                                                {item.status}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm mt-3">
                                            <div>
                                                <div className="text-gray-500 text-xs uppercase">Current</div>
                                                <div className="font-mono text-white">{item.currentStock}</div>
                                            </div>
                                            <div>
                                                <div className="text-gray-500 text-xs uppercase">Target</div>
                                                <div className="font-mono text-primary font-bold">{item.recommendedQuantity}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-gray-500 text-xs uppercase">Lead Time</div>
                                                <div className="font-mono text-gray-300">{item.leadTimeDays}d</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <Card className="h-full flex flex-col items-center justify-center min-h-[400px] text-center">
                            <div className="w-16 h-16 rounded-full bg-surfaceHighlight flex items-center justify-center mb-4 animate-pulse">
                                <Activity size={32} className="text-gray-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Ready for Analysis</h3>
                            <p className="text-gray-500 max-w-sm mx-auto mt-2">
                                Adjust the macro parameters on the left and click "Run Analysis" to generate AI-powered procurement recommendations.
                            </p>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InventoryAI;
