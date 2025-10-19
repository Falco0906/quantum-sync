import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HRDashboard from './pages/HRDashboard';
import FinanceDashboard from './pages/FinanceDashboard';
import TestConnection from './pages/TestConnection';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/hr" replace />} />
          <Route path="/hr" element={<HRDashboard />} />
          <Route path="/finance" element={<FinanceDashboard />} />
          <Route path="/test" element={<TestConnection />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
