✅ **Backend is running successfully on http://127.0.0.1:5001**

## Issue
Your Node.js version (18.15.0) is too old for Vite 7 which requires Node 20.19+

## Solutions

### Option 1: Upgrade Node.js (Recommended)
```bash
# Install nvm (Node Version Manager) if you don't have it
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install Node 20
nvm install 20
nvm use 20

# Then run the frontend
cd /Users/prabhatshukla/.gemini/antigravity/scratch/saberwing-web/frontend
npm run dev
```

### Option 2: Use a simpler build tool
I can convert the project to use a simpler setup that works with Node 18.

### Option 3: View the backend API directly
The backend is fully functional! You can test the API endpoints:

```bash
# Get suppliers
curl http://127.0.0.1:5001/api/suppliers

# Get inventory
curl http://127.0.0.1:5001/api/inventory

# Get make vs buy
curl http://127.0.0.1:5001/api/make-vs-buy

# Run ML prediction
curl -X POST http://127.0.0.1:5001/api/ml-predict \
  -H "Content-Type: application/json" \
  -d '{
    "macroParams": {
      "conflictIndex": 7,
      "inflationRate": 5.5,
      "defenseBudget": 120,
      "flightHours": 350,
      "testPhase": "High-G"
    }
  }'
```

## Current Status
- ✅ Backend (Flask + ML Engine): **RUNNING** on port 5001
- ❌ Frontend (React): Requires Node 20+

Would you like me to:
1. Help you upgrade Node.js?
2. Create a simpler frontend that works with Node 18?
3. Show you how to test the backend APIs?
