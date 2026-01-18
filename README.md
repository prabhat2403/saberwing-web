# SaberWing Command - Defense Aviation Inventory Management

Full-stack web application for managing defense aviation inventory with AI-powered procurement predictions.

![Tech Stack](https://img.shields.io/badge/Backend-Flask-lightgrey) ![Frontend](https://img.shields.io/badge/Frontend-React-blue) ![ML](https://img.shields.io/badge/ML-3--Tier%20Engine-green)

---

## 🚀 Features

### Backend (Python/Flask)
- **RESTful API** with CORS support
- **3-Tier ML Simulation Engine**:
  - Tier 1: Random Forest need detection
  - Tier 2: XGBoost quantity prediction
  - Tier 3: Non-linear lead time regression
- **Macro adjustment** layer for economic factors

### Frontend (React + Vite)
- **Multi-page routing** with React Router
- **Three main pages**:
  1. **Supplier Network**: Interactive D3 force-directed graph
  2. **Procurement Strategy**: Make vs. Buy comparison
  3. **Inventory AI**: ML-powered predictions with real-time charts
- **Stealth fighter cockpit design** with glassmorphism
- **Chart.js** visualizations
- **Tailwind CSS** styling

---

## 📁 Project Structure

```
saberwing-web/
├── backend/
│   ├── app.py                 # Flask API server
│   ├── ml_engine.py          # 3-tier ML simulation
│   └── requirements.txt       # Python dependencies
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── SupplierNetwork.jsx
    │   │   ├── ProcurementStrategy.jsx
    │   │   └── InventoryAI.jsx
    │   ├── components/
    │   │   ├── Navigation.jsx
    │   │   └── GlassCard.jsx
    │   ├── utils/
    │   │   ├── api.js
    │   │   └── constants.js
    │   └── App.jsx
    └── package.json
```

---

## 🛠️ Installation & Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- npm or yarn

### Backend Setup

```bash
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Run Flask server
python3 app.py
```

Server will start at `http://127.0.0.1:5000`

### Frontend Setup

```bash
cd frontend

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

Frontend will start at `http://localhost:5173`

---

## 🎯 Usage

1. **Start Backend**: `cd backend && python3 app.py`
2. **Start Frontend**: `cd frontend && npm run dev`
3. **Open Browser**: Navigate to `http://localhost:5173`

### Pages

#### 1. Supplier Network (`/`)
- Interactive D3 visualization of supplier relationships
- Click nodes to view contract details
- Real-time stats dashboard

#### 2. Procurement Strategy (`/procurement`)
- Side-by-side comparison of Make vs. Buy decisions
- Detailed rationale for each component
- Investment breakdown

#### 3. Inventory AI (`/inventory`)
- **Macro controls**: Adjust conflict index, inflation, defense budget
- **Run ML Analysis**: Click button to generate predictions
- **View Results**: Charts and cards show recommendations
- **3-Tier ML Engine**: Automatic procurement optimization

---

## 📊 API Endpoints

### `GET /api/suppliers`
Returns supplier network data for visualization

### `GET /api/inventory`
Returns current inventory levels

### `GET /api/make-vs-buy`
Returns procurement strategy data

### `POST /api/ml-predict`
Runs 3-tier ML analysis

**Request Body**:
```json
{
  "macroParams": {
    "conflictIndex": 7,
    "inflationRate": 5.5,
    "defenseBudget": 120,
    "flightHours": 350,
    "testPhase": "High-G"
  }
}
```

**Response**:
```json
{
  "predictions": [...],
  "summary": {
    "totalCost": 450000000,
    "totalQuantity": 85,
    "averageLeadTime": 512,
    "criticalItems": 2
  }
}
```

---

## 🧠 ML Engine Details

### Tier 1: Random Forest (Need Detection)
- Analyzes flight hours and test phase
- High-G testing adds 40% probability boost
- Returns boolean: Need / No Need

### Tier 2: XGBoost (Quantity Calculation)
- Calculates optimal order quantity
- Uses BOM explosion × historical consumption
- Applies safety factors by criticality

### Tier 3: Lead Time Regression
- **Formula**: `LeadTime = BaseTime × (ConflictIndex ^ 1.8)`
- Exponential scaling for geopolitical impact
- Example: Conflict 9 → 2.8× longer delays

### Macro Adjustment
- Adjusts for government spending multiplier
- Inflation hedge: orders more during high inflation
- Final optimization across all parameters

---

## 🎨 Design System

### Colors
- **Background**: `#020617` (Deep slate)
- **Accents**: `#22d3ee` (Cyan), `#3b82f6` (Blue)
- **Status**: Green (Healthy), Yellow (Reorder), Red (Critical)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: 700-800 weight
- **Technical Data**: Monospace

### UI Effects
- **Glassmorphism**: `backdrop-filter: blur(20px)`
- **Animations**: Pulse glow, float, smooth transitions
- **Hover effects**: Lift and glow on cards

---

## 🔧 Development

### Build for Production

```bash
# Frontend
cd frontend
npm run build

# Output in frontend/dist/
```

### Environment Variables

Create `.env` if needed:
```
VITE_API_URL=http://127.0.0.1:5000
```

---

## 📈 Future Enhancements

- [ ] Real-time WebSocket updates
- [ ] Historical trend analysis dashboard
- [ ] PDF/Excel export functionality
- [ ] Multi-currency support
- [ ] Mobile responsive improvements
- [ ] Authentication & user roles
- [ ] Database integration (PostgreSQL)
- [ ] Docker containers for deployment

---

## 🤝 Contributing

This is a demonstration project for defense aviation inventory management.

---

## 📄 License

Proprietary - Company Confidential

---

**Built with ❤️ for Defense Aviation Innovation**

*Classification: Company Confidential*  
*Version: 2.0*  
*Last Updated: January 15, 2026*
