import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';
import { Network, Globe, DollarSign, Clock, CheckCircle } from 'lucide-react';
import { api } from '../utils/api';
import { Card, StatCard } from '../components/UI';

const SupplierNetwork = () => {
    const svgRef = useRef(null);
    const [supplierData, setSupplierData] = useState(null);
    const [selectedNode, setSelectedNode] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await api.getSuppliers();
            // Transform API data to graph format
            const graphData = {
                nodes: [
                    { id: 'Fighter Jet', label: 'Fighter Jet', type: 'hub' },
                    ...data.suppliers.map(s => ({
                        id: s.id,
                        label: s.name,
                        component: s.component,
                        contractValue: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(s.contractValue),
                        leadTime: `${s.leadTime} months`,
                        location: s.location,
                        type: 'supplier'
                    }))
                ],
                links: data.suppliers.map(s => ({ source: s.id, target: 'Fighter Jet' }))
            };
            setSupplierData(graphData);
            initGraph(graphData);
        } catch (error) {
            console.error('Error loading suppliers:', error);
        }
    };

    const initGraph = (data) => {
        if (!data || !data.nodes) return;

        const width = 800;
        const height = 500;

        // Clear previous graph
        d3.select(svgRef.current).selectAll("*").remove();

        const svg = d3.select(svgRef.current)
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', [0, 0, width, height]);

        // Simulation setup
        const simulation = d3.forceSimulation(data.nodes)
            .force('link', d3.forceLink(data.links).id(d => d.id).distance(150))
            .force('charge', d3.forceManyBody().strength(-400))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('collide', d3.forceCollide().radius(60));

        // Links
        const link = svg.append('g')
            .selectAll('line')
            .data(data.links)
            .join('line')
            .attr('stroke', '#374151')
            .attr('stroke-width', 1.5)
            .attr('stroke-opacity', 0.6);

        // Nodes
        const node = svg.append('g')
            .selectAll('g')
            .data(data.nodes)
            .join('g')
            .call(d3.drag()
                .on('start', dragstarted)
                .on('drag', dragged)
                .on('end', dragended));

        // Node Circles
        node.append('circle')
            .attr('r', d => d.id === 'Fighter Jet' ? 40 : 25)
            .attr('fill', d => d.id === 'Fighter Jet' ? '#6366f1' : '#1f2937')
            .attr('stroke', d => d.id === 'Fighter Jet' ? 'rgba(99, 102, 241, 0.5)' : '#374151')
            .attr('stroke-width', d => d.id === 'Fighter Jet' ? 0 : 2)
            .attr('class', 'cursor-pointer transition-all duration-300')
            .on('click', (event, d) => {
                setSelectedNode(d);
                event.stopPropagation();
            });

        // Add glow effect to center node
        const defs = svg.append('defs');
        const filter = defs.append('filter').attr('id', 'glow');
        filter.append('feGaussianBlur').attr('stdDeviation', '4.5').attr('result', 'coloredBlur');
        const feMerge = filter.append('feMerge');
        feMerge.append('feMergeNode').attr('in', 'coloredBlur');
        feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

        svg.selectAll('circle').filter(d => d.id === 'Fighter Jet')
            .style('filter', 'url(#glow)');

        // Icons/Text labels inside nodes
        node.append('text')
            .text(d => d.id === 'Fighter Jet' ? '✈️' : '🏭')
            .attr('dy', 5)
            .attr('text-anchor', 'middle')
            .attr('font-size', d => d.id === 'Fighter Jet' ? 24 : 16)
            .style('pointer-events', 'none');

        // Labels below nodes
        node.append('text')
            .text(d => d.label)
            .attr('dy', d => d.id === 'Fighter Jet' ? 55 : 40)
            .attr('text-anchor', 'middle')
            .attr('fill', '#9ca3af')
            .attr('font-size', 10)
            .attr('font-weight', 'bold')
            .style('pointer-events', 'none');

        simulation.on('tick', () => {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);

            node.attr('transform', d => `translate(${d.x},${d.y})`);
        });

        function dragstarted(event) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }

        function dragged(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }

        function dragended(event) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }
    };

    return (
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h2 className="text-3xl font-bold text-white tracking-tight">Supplier Network</h2>
                        <p className="text-gray-400 mt-1">Tier 1 global supply chain visualization</p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-xs font-bold text-emerald-500">NETWORK ACTIVE</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Graph Area */}
                    <Card className="lg:col-span-3 h-[600px] bg-surface relative overflow-hidden" padding="0">
                        <svg ref={svgRef} className="w-full h-full"></svg>
                        <div className="absolute bottom-4 left-4 text-xs text-gray-500">
                            * Drag nodes to rearrange • Click for details
                        </div>
                    </Card>

                    {/* Sidebar / Details */}
                    <div className="space-y-4">
                        <StatCard
                            title="Total Suppliers"
                            value={supplierData?.nodes?.length - 1 || 0}
                            icon={Globe}
                            change={supplierData ? "Global" : ""}
                        />

                        {selectedNode && selectedNode.id !== 'Fighter Jet' ? (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={selectedNode.id}
                            >
                                <Card title="Supplier Details" className="border-primary/50">
                                    <div className="mb-4">
                                        <h3 className="text-xl font-bold text-white">{selectedNode.label}</h3>
                                        <div className="text-indigo-400 text-sm font-mono">{selectedNode.component}</div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                                            <span className="text-gray-500 text-xs uppercase">Contract Value</span>
                                            <span className="text-white font-mono font-bold">{selectedNode.contractValue}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                                            <span className="text-gray-500 text-xs uppercase">Location</span>
                                            <div className="flex items-center gap-1.5">
                                                <Globe size={12} className="text-gray-400" />
                                                <span className="text-gray-300 text-sm">{selectedNode.location}</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                                            <span className="text-gray-500 text-xs uppercase">Lead Time</span>
                                            <div className="flex items-center gap-1.5">
                                                <Clock size={12} className="text-gray-400" />
                                                <span className="text-gray-300 text-sm">{selectedNode.leadTime}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ) : (
                            <Card className="border-dashed border-gray-700 bg-transparent flex items-center justify-center min-h-[200px]">
                                <div className="text-center text-gray-500">
                                    <Network size={32} className="mx-auto mb-2 opacity-50" />
                                    <p className="text-sm">Select a node to view<br />contract details</p>
                                </div>
                            </Card>
                        )}

                        <StatCard
                            title="Total Value"
                            value="$613M"
                            icon={DollarSign}
                            trend="up"
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default SupplierNetwork;
