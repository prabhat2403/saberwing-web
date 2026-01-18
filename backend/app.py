"""
Saber Wing Command - Flask Backend API
Defense Aviation Inventory Management System

Endpoints:
- GET  /api/suppliers - Supplier network data
- GET  /api/inventory - Current inventory levels
- GET  /api/make-vs-buy - Procurement strategy
- POST /api/ml-predict - Run ML procurement analysis
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
from ml_engine import MLSimulationEngine
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Initialize ML engine
ml_engine = MLSimulationEngine()

# =========================================================================
# DATA MODELS
# =========================================================================

SUPPLIERS = [
    {
        'id': 'ge',
        'name': 'GE Aerospace',
        'component': 'F414 Engine Cores',
        'unitCost': 5000000,
        'leadTime': 18,
        'status': 'active',
        'contractValue': 250000000,
        'location': 'Lynn, MA',
    },
    {
        'id': 'raytheon',
        'name': 'Raytheon Technologies',
        'component': 'APG-79 AESA Radar',
        'unitCost': 3000000,
        'leadTime': 15,
        'status': 'active',
        'contractValue': 180000000,
        'location': 'El Segundo, CA',
    },
    {
        'id': 'martin-baker',
        'name': 'Martin-Baker',
        'component': 'Mk18 Ejection Seats',
        'unitCost': 500000,
        'leadTime': 9,
        'status': 'active',
        'contractValue': 45000000,
        'location': 'Denham, UK',
    },
    {
        'id': 'safran',
        'name': 'Safran Landing Systems',
        'component': 'Landing Gear Systems',
        'unitCost': 1000000,
        'leadTime': 14,
        'status': 'active',
        'contractValue': 68000000,
        'location': 'Vélizy, France',
    },
    {
        'id': 'honeywell',
        'name': 'Honeywell Aerospace',
        'component': 'HG9900 INS/GPS',
        'unitCost': 230000,
        'leadTime': 8,
        'status': 'active',
        'contractValue': 28000000,
        'location': 'Phoenix, AZ',
    },
    {
        'id': 'elbit',
        'name': 'Elbit Systems',
        'component': 'HMDS Gen 3',
        'unitCost': 500000,
        'leadTime': 12,
        'status': 'active',
        'contractValue': 42000000,
        'location': 'Haifa, Israel',
    },
]

MAKE_VS_BUY = {
    'make': [
        {
            'id': 'aero',
            'name': 'Aerodynamic Design & Airframe',
            'category': 'Shape',
            'rationale': 'Proprietary designs enable superior performance, stealth profiles, and competitive differentiation. This is the foundational IP.',
            'teamSize': '25-30 engineers',
            'timeline': '24-36 months',
            'investment': '$50M',
            'priority': 'critical',
        },
        {
            'id': 'fcs',
            'name': 'Flight Control Software',
            'category': 'Brain',
            'rationale': 'Mission-critical safety system. In-house ensures no vendor lock-in and enables rapid iteration.',
            'teamSize': '15-20 engineers',
            'timeline': '18-24 months',
            'investment': '$30M',
            'priority': 'critical',
        },
        {
            'id': 'autonomy',
            'name': 'Mission Planning & Autonomy',
            'category': 'Brain',
            'rationale': 'Core IP for autonomous operations, threat assessment, and tactical decision-making. Critical for export differentiation.',
            'teamSize': '20-25 engineers',
            'timeline': '24-30 months',
            'investment': '$40M',
            'priority': 'high',
        },
        {
            'id': 'stealth',
            'name': 'Stealth Coatings & RAM',
            'category': 'Shape',
            'rationale': 'Proprietary radar-absorbent materials provide critical competitive advantage. Formulations are highly classified.',
            'teamSize': '10-12 scientists',
            'timeline': '12-18 months',
            'investment': '$15M',
            'priority': 'high',
        },
        {
            'id': 'avionics',
            'name': 'Avionics Integration Architecture',
            'category': 'Brain',
            'rationale': 'Custom integration layer ensures optimal performance and prevents dependency on integrators.',
            'teamSize': '12-15 engineers',
            'timeline': '18-24 months',
            'investment': '$25M',
            'priority': 'medium',
        },
    ],
    'buy': [
        {
            'id': 'engines',
            'name': 'Turbofan Engines',
            'supplier': 'GE Aerospace',
            'model': 'F414-GE-400',
            'unitCost': '$5.0M',
            'rationale': 'Mature technology. Dual-source strategy with P&W reduces supply chain risk.',
            'leadTime': '18 months',
            'quantity': '2 per aircraft',
        },
        {
            'id': 'radar',
            'name': 'AESA Radar',
            'supplier': 'Raytheon Technologies',
            'model': 'APG-79',
            'unitCost': '$3.0M',
            'rationale': 'Proven technology with 1000+ T/R modules. Global support network available.',
            'leadTime': '15 months',
            'quantity': '1 per aircraft',
        },
        {
            'id': 'seats',
            'name': 'Ejection Seats',
            'supplier': 'Martin-Baker',
            'model': 'Mk18',
            'unitCost': '$500K',
            'rationale': 'Safety-critical with proven 0-0 capability. Industry-leading track record.',
            'leadTime': '9 months',
            'quantity': '1-2 per aircraft',
        },
        {
            'id': 'landing-gear',
            'name': 'Landing Gear',
            'supplier': 'Safran Landing Systems',
            'model': 'Custom',
            'unitCost': '$1.0M',
            'rationale': 'Heavy structural integration expertise. Carrier variant experience essential.',
            'leadTime': '14 months',
            'quantity': '1 set per aircraft',
        },
        {
            'id': 'ins',
            'name': 'INS/GPS Navigation',
            'supplier': 'Honeywell Aerospace',
            'model': 'HG9900',
            'unitCost': '$230K',
            'rationale': 'Ring laser gyro with GPS-aided positioning. SAASM encryption for secure ops.',
            'leadTime': '8 months',
            'quantity': '1 per aircraft',
        },
        {
            'id': 'hmd',
            'name': 'Helmet Mounted Display',
            'supplier': 'Elbit Systems',
            'model': 'HMDS Gen 3',
            'unitCost': '$500K',
            'rationale': 'Wide FOV with night vision integration. Critical for situational awareness.',
            'leadTime': '12 months',
            'quantity': '2 per aircraft',
        },
    ]
}

INVENTORY_ITEMS = [
    {
        'id': 'engines',
        'component': 'GE F414 Engine Cores',
        'supplier': 'GE Aerospace',
        'currentStock': 45,
        'minStock': 20,
        'unitCost': 5000000,
        'storageCostPerDay': 1200,
        'leadTimeBase': 18,
        'criticality': 'high',
    },
    {
        'id': 'radars',
        'component': 'APG-79 AESA Radar Units',
        'supplier': 'Raytheon Technologies',
        'currentStock': 28,
        'minStock': 15,
        'unitCost': 3000000,
        'storageCostPerDay': 850,
        'leadTimeBase': 15,
        'criticality': 'high',
    },
    {
        'id': 'seats',
        'component': 'Mk18 Ejection Seats',
        'supplier': 'Martin-Baker',
        'currentStock': 62,
        'minStock': 30,
        'unitCost': 500000,
        'storageCostPerDay': 200,
        'leadTimeBase': 9,
        'criticality': 'medium',
    },
    {
        'id': 'landing-gear',
        'component': 'Landing Gear Systems',
        'supplier': 'Safran Landing Systems',
        'currentStock': 34,
        'minStock': 18,
        'unitCost': 1000000,
        'storageCostPerDay': 450,
        'leadTimeBase': 14,
        'criticality': 'medium',
    },
    {
        'id': 'ins',
        'component': 'HG9900 INS/GPS Units',
        'supplier': 'Honeywell Aerospace',
        'currentStock': 52,
        'minStock': 25,
        'unitCost': 230000,
        'storageCostPerDay': 120,
        'leadTimeBase': 8,
        'criticality': 'low',
    },
    {
        'id': 'hmd',
        'component': 'HMDS Gen 3',
        'supplier': 'Elbit Systems',
        'currentStock': 48,
        'minStock': 20,
        'unitCost': 500000,
        'storageCostPerDay': 180,
        'leadTimeBase': 12,
        'criticality': 'low',
    },
]

# =========================================================================
# API ENDPOINTS
# =========================================================================

@app.route('/')
def home():
    """Health check endpoint"""
    return jsonify({
        'status': 'online',
        'service': 'SaberWing Command API',
        'version': '2.0',
        'endpoints': [
            '/api/suppliers',
            '/api/inventory',
            '/api/make-vs-buy',
            '/api/ml-predict [POST]',
        ]
    })

@app.route('/api/suppliers', methods=['GET'])
def get_suppliers():
    """Get supplier network data for graph visualization"""
    return jsonify({
        'suppliers': SUPPLIERS,
        'totalContractValue': sum(s['contractValue'] for s in SUPPLIERS),
    })

@app.route('/api/inventory', methods=['GET'])
def get_inventory():
    """Get current inventory levels"""
    
    total_value = sum(
        item['currentStock'] * item['unitCost'] 
        for item in INVENTORY_ITEMS
    )
    
    return jsonify({
        'inventory': INVENTORY_ITEMS,
        'totalInventoryValue': total_value,
        'itemCount': len(INVENTORY_ITEMS),
    })

@app.route('/api/make-vs-buy', methods=['GET'])
def get_make_vs_buy():
    """Get procurement strategy (Make vs Buy decisions)"""
    
    total_make_investment = sum(
        float(item['investment'].replace('$', '').replace('M', '')) 
        for item in MAKE_VS_BUY['make']
    )
    
    return jsonify({
        'strategy': MAKE_VS_BUY,
        'totalMakeInvestment': total_make_investment,
        'makeCount': len(MAKE_VS_BUY['make']),
        'buyCount': len(MAKE_VS_BUY['buy']),
    })

@app.route('/api/ml-predict', methods=['POST'])
def ml_predict():
    """
    Run 3-tier ML procurement analysis
    
    Request body:
    {
        "macroParams": {
            "conflictIndex": 7,
            "inflationRate": 5.5,
            "defenseBudget": 120,
            "flightHours": 350,
            "testPhase": "High-G"
        }
    }
    """
    
    try:
        data = request.get_json()
        
        if not data or 'macroParams' not in data:
            return jsonify({'error': 'Missing macroParams in request'}), 400
        
        macro_params = data['macroParams']
        
        # Validate parameters
        conflict_index = macro_params.get('conflictIndex', 5)
        if not (1 <= conflict_index <= 10):
            return jsonify({'error': 'conflictIndex must be between 1 and 10'}), 400
        
        inflation_rate = macro_params.get('inflationRate', 3.0)
        if not (0 <= inflation_rate <= 15):
            return jsonify({'error': 'inflationRate must be between 0 and 15'}), 400
        
        defense_budget = macro_params.get('defenseBudget', 100.0)
        if not (50 <= defense_budget <= 200):
            return jsonify({'error': 'defenseBudget must be between 50 and 200'}), 400
        
        # Run ML analysis
        predictions = ml_engine.run_full_analysis(
            inventory_items=INVENTORY_ITEMS,
            macro_params=macro_params
        )
        
        # Calculate summary statistics
        summary = ml_engine.calculate_summary(predictions)
        
        return jsonify({
            'predictions': predictions,
            'summary': summary,
            'macroParams': macro_params,
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# =========================================================================
# MAIN
# =========================================================================

if __name__ == '__main__':
    print("\n" + "="*60)
    print("🚀 SaberWing Command Backend API")
    print("="*60)
    print("📡 Server: http://127.0.0.1:5001")
    print("🧠 ML Engine: 3-Tier Simulation Ready")
    print("="*60 + "\n")
    
    app.run(host='0.0.0.0', port=5001, debug=True)
