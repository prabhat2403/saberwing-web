import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SupplierNetwork from './pages/SupplierNetwork';
import ProcurementStrategy from './pages/ProcurementStrategy';
import InventoryAI from './pages/InventoryAI';
import './styles/index.css';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<SupplierNetwork />} />
          <Route path="/procurement" element={<ProcurementStrategy />} />
          <Route path="/inventory" element={<InventoryAI />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
