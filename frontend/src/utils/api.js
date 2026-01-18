import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5001';

export const api = {
    // Get all suppliers
    getSuppliers: async () => {
        const response = await axios.get(`${API_BASE_URL}/api/suppliers`);
        return response.data;
    },

    // Get inventory
    getInventory: async () => {
        const response = await axios.get(`${API_BASE_URL}/api/inventory`);
        return response.data;
    },

    // Get make vs buy strategy
    getMakeVsBuy: async () => {
        const response = await axios.get(`${API_BASE_URL}/api/make-vs-buy`);
        return response.data;
    },

    // Run ML prediction
    runMLPrediction: async (macroParams) => {
        const response = await axios.post(`${API_BASE_URL}/api/ml-predict`, {
            macroParams,
        });
        return response.data;
    },
};
