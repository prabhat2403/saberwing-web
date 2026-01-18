"""
SaberWing Command - 3-Tier ML Simulation Engine
Advanced procurement prediction system for defense aviation

Tier 1: Random Forest Logic - Need Detection
Tier 2: XGBoost Simulation - Quantity Calculation  
Tier 3: Quantile Regression - Lead Time Prediction
"""

import numpy as np
from typing import Dict, List, Any


class MLSimulationEngine:
    """
    3-Tier ML Pipeline for Procurement Intelligence
    Simulates complex ML behavior without requiring trained models
    """
    
    def __init__(self):
        self.tier1_threshold_boost = {
            'high': 1.0,
            'medium': 1.3,
            'low': 1.6,
        }
    
    # =========================================================================
    # TIER 1: RANDOM FOREST LOGIC - NEED DETECTION
    # =========================================================================
    
    def tier1_need_detection(
        self, 
        flight_hours: float,
        test_phase: str,
        criticality: str
    ) -> bool:
        """
        Simulates Random Forest decision tree ensemble
        
        Determines if component needs ordering based on:
        - Flight hours accumulated
        - Current test phase intensity
        - Component criticality level
        
        Args:
            flight_hours: Cumulative flight test hours
            test_phase: 'Normal', 'High-G', 'Weapons', or 'Carrier'
            criticality: 'high', 'medium', or 'low'
        
        Returns:
            Boolean indicating if component needs to be ordered
        """
        
        # Base threshold varies by criticality
        # High criticality → lower threshold → orders more frequently
        thresholds = {
            'high': 100,
            'medium': 200,
            'low': 300,
        }
        
        threshold = thresholds.get(criticality, 200)
        
        # Calculate base need score (0-1 scale)
        if flight_hours > threshold:
            need_score = min(0.9, 0.5 + (flight_hours - threshold) / threshold)
        else:
            need_score = flight_hours / threshold
        
        # Test phase multipliers (High-G is 40% more demanding)
        phase_multipliers = {
            'Normal': 1.0,
            'High-G': 1.4,    # 40% boost as specified
            'Weapons': 1.25,
            'Carrier': 1.3,
        }
        
        multiplier = phase_multipliers.get(test_phase, 1.0)
        need_score *= multiplier
        
        # Add random forest variance (simulates ensemble voting)
        variance = np.random.uniform(-0.1, 0.1)
        need_score += variance
        
        # Decision boundary at 0.5
        return need_score > 0.5
    
    # =========================================================================
    # TIER 2: XGBOOST LOGIC - QUANTITY CALCULATION
    # =========================================================================
    
    def tier2_quantity_calculation(
        self,
        need_detected: bool,
        bom_explosion: float,
        historical_consumption: float,
        criticality: str
    ) -> int:
        """
        Simulates XGBoost gradient boosting for quantity prediction
        
        If Tier 1 detects need, calculates optimal order quantity based on:
        - Bill of Materials explosion factor
        - Historical consumption patterns
        - Safety stock requirements
        
        Args:
            need_detected: Output from Tier 1
            bom_explosion: Parts per aircraft multiplier
            historical_consumption: Average quarterly demand
            criticality: Component criticality level
        
        Returns:
            Recommended order quantity (integer)
        """
        
        if not need_detected:
            return 0
        
        # Safety factors by criticality (buffer inventory)
        safety_factors = {
            'high': 1.5,   # 50% safety stock
            'medium': 1.3, # 30% safety stock
            'low': 1.15,   # 15% safety stock
        }
        
        safety_factor = safety_factors.get(criticality, 1.2)
        
        # Base calculation: BOM * Consumption * Safety
        base_quantity = bom_explosion * historical_consumption * safety_factor
        
        # Add XGBoost-style residual adjustments
        # Simulates boosting iterations improving predictions
        residual = np.random.normal(0, 0.1) * base_quantity
        adjusted_quantity = base_quantity + residual
        
        # Round up to nearest integer
        quantity = max(2, int(np.ceil(adjusted_quantity)))
        
        # Apply minimum order quantity (MOQ) constraints
        if criticality == 'high' and quantity < 5:
            quantity = 5
        
        return quantity
    
    # =========================================================================
    # TIER 3: LEAD TIME REGRESSION - NON-LINEAR CONFLICT SCALING
    # =========================================================================
    
    def tier3_lead_time_prediction(
        self,
        base_lead_time_months: int,
        conflict_index: float
    ) -> int:
        """
        Quantile regression for lead time with exponential conflict scaling
        
        CRITICAL FORMULA: LeadTime = BaseTime * (ConflictIndex ^ 1.8)
        
        As geopolitical conflict rises, shipping delays compound exponentially.
        Examples:
        - Conflict 1: minimal impact (~1.0x)
        - Conflict 5: moderate delay (~1.5x)  
        - Conflict 9: severe delay (~2.8x)
        
        Args:
            base_lead_time_months: Normal lead time
            conflict_index: Geopolitical tension (1-10 scale)
        
        Returns:
            Predicted lead time in days
        """
        
        # Convert months to days
        base_days = base_lead_time_months * 30
        
        # Normalize conflict to 0-1 scale
        conflict_normalized = conflict_index / 10.0
        
        # Non-linear exponential scaling: conflict^1.8
        # This creates the disproportionate delay effect
        conflict_multiplier = 1.0 + (conflict_normalized ** 1.8) * 2.0
        
        # Calculate impacted lead time
        lead_time_days = base_days * conflict_multiplier
        
        # Add supply chain variance (±15%)
        variance_factor = np.random.uniform(0.85, 1.15)
        lead_time_days *= variance_factor
        
        # Quantile regression adjustment (simulate 75th percentile prediction)
        # Conservative estimate to avoid stockouts
        quantile_adjustment = 1.1
        lead_time_days *= quantile_adjustment
        
        return int(np.round(lead_time_days))
    
    # =========================================================================
    # MACRO ADJUSTMENT LAYER
    # =========================================================================
    
    def macro_adjustment(
        self,
        base_demand: int,
        government_spending_billions: float,
        inflation_rate: float
    ) -> int:
        """
        Adjusts final inventory targets based on macroeconomic factors
        
        Args:
            base_demand: Quantity from Tier 2
            government_spending_billions: Defense budget ($50B-$200B)
            inflation_rate: Inflation percentage (0-15%)
        
        Returns:
            Adjusted inventory target
        """
        
        # Government spending multiplier
        # $100B = baseline (1.0x)
        # Higher budget → higher production → higher demand
        spending_multiplier = government_spending_billions / 100.0
        
        # Inflation adjustment
        # Higher inflation → order more now to hedge future price increases
        inflation_adjustment = 1.0 + (inflation_rate / 100.0) * 0.5
        
        # Combined macro effect
        adjusted_demand = base_demand * spending_multiplier * inflation_adjustment
        
        return int(np.ceil(adjusted_demand))
    
    # =========================================================================
    # MAIN PIPELINE
    # =========================================================================
    
    def run_full_analysis(
        self,
        inventory_items: List[Dict[str, Any]],
        macro_params: Dict[str, Any]
    ) -> List[Dict[str, Any]]:
        """
        Execute complete 3-tier ML pipeline for all inventory items
        
        Args:
            inventory_items: List of component dictionaries
            macro_params: Macroeconomic parameters
        
        Returns:
            List of predictions with recommendations
        """
        
        conflict_index = macro_params.get('conflictIndex', 5)
        inflation_rate = macro_params.get('inflationRate', 3.0)
        defense_budget = macro_params.get('defenseBudget', 100.0)
        flight_hours = macro_params.get('flightHours', 250)
        test_phase = macro_params.get('testPhase', 'Normal')
        
        predictions = []
        
        for item in inventory_items:
            # TIER 1: Need Detection
            need_detected = self.tier1_need_detection(
                flight_hours=flight_hours,
                test_phase=test_phase,
                criticality=item['criticality']
            )
            
            # TIER 2: Quantity Calculation
            bom_explosion = 1.2  # Average 1.2 parts per aircraft
            historical_consumption = 15  # Average 15 aircraft/quarter
            
            base_quantity = self.tier2_quantity_calculation(
                need_detected=need_detected,
                bom_explosion=bom_explosion,
                historical_consumption=historical_consumption,
                criticality=item['criticality']
            )
            
            # MACRO ADJUSTMENT
            recommended_quantity = self.macro_adjustment(
                base_demand=base_quantity,
                government_spending_billions=defense_budget,
                inflation_rate=inflation_rate
            )
            
            # TIER 3: Lead Time Prediction
            lead_time_days = self.tier3_lead_time_prediction(
                base_lead_time_months=item['leadTimeBase'],
                conflict_index=conflict_index
            )
            
            # Calculate costs
            procurement_cost = recommended_quantity * item['unitCost']
            storage_cost = item['storageCostPerDay'] * lead_time_days
            total_cost = procurement_cost + storage_cost
            
            # Determine status based on stock ratio
            stock_ratio = item['currentStock'] / item['minStock']
            if stock_ratio < 1.2:
                status = 'critical'
            elif stock_ratio < 1.5:
                status = 'reorder'
            else:
                status = 'healthy'
            
            predictions.append({
                'id': item['id'],
                'component': item['component'],
                'supplier': item['supplier'],
                'currentStock': item['currentStock'],
                'minStock': item['minStock'],
                'recommendedQuantity': recommended_quantity,
                'needDetected': need_detected,
                'leadTimeDays': lead_time_days,
                'procurementCost': procurement_cost,
                'storageCost': storage_cost,
                'totalCost': total_cost,
                'status': status,
                'criticality': item['criticality'],
                'unitCost': item['unitCost'],
            })
        
        return predictions
    
    def calculate_summary(self, predictions: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Calculate aggregate statistics from predictions"""
        
        total_procurement = sum(p['procurementCost'] for p in predictions)
        total_storage = sum(p['storageCost'] for p in predictions)
        total_quantity = sum(p['recommendedQuantity'] for p in predictions)
        critical_items = len([p for p in predictions if p['status'] == 'critical'])
        avg_lead_time = int(np.mean([p['leadTimeDays'] for p in predictions]))
        
        return {
            'totalProcurementCost': total_procurement,
            'totalStorageCost': total_storage,
            'totalCost': total_procurement + total_storage,
            'totalQuantity': total_quantity,
            'criticalItems': critical_items,
            'averageLeadTime': avg_lead_time,
        }
