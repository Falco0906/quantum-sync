import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IconFileInvoice, IconChartBar, IconShieldLock, IconReceiptDollar, IconClock, IconChecks } from '@tabler/icons-react';
import type { InvoiceData } from '../services/api';
import { api } from '../services/api';
import StatCard from '../components/StatCard';
import Toast from '../components/Toast';

const FinanceDashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info'; isVisible: boolean }>({
    message: '',
    type: 'info',
    isVisible: false
  });
  const [invoice, setInvoice] = useState<InvoiceData>({
    vendor: '',
    amount: 0,
    date: '',
    lineItems: [],
    invoiceNumber: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.submitInvoice(invoice);
      setInvoice({ vendor: '', amount: 0, date: '', lineItems: [], invoiceNumber: '' });
      setToast({ message: 'Invoice submitted successfully!', type: 'success', isVisible: true });
      setTimeout(() => setToast(prev => ({ ...prev, isVisible: false })), 3000);
    } catch (error) {
      setToast({ message: 'Error submitting invoice', type: 'error', isVisible: true });
      setTimeout(() => setToast(prev => ({ ...prev, isVisible: false })), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Finance Dashboard</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="ai-button flex items-center gap-2"
          onClick={() => document.getElementById('invoiceForm')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <IconFileInvoice className="w-5 h-5" />
          Add Invoice
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Invoices"
          value="0"
          icon={<IconFileInvoice className="w-8 h-8" />}
          color="bg-indigo-500/20 text-indigo-400"
          delay={0}
        />
        <StatCard
          title="Auto-Approved (<$500)"
          value="0"
          icon={<IconChecks className="w-8 h-8" />}
          color="bg-green-500/20 text-green-400"
          delay={0.1}
        />
        <StatCard
          title="Pending Approval"
          value="0"
          icon={<IconClock className="w-8 h-8" />}
          color="bg-yellow-500/20 text-yellow-400"
          delay={0.2}
        />
        <StatCard
          title="Total Amount"
          value="$0"
          icon={<IconReceiptDollar className="w-8 h-8" />}
          color="bg-blue-500/20 text-blue-400"
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="ai-card"
        >
          <IconChartBar className="w-8 h-8 text-indigo-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Invoice Processing</h3>
          <p className="text-slate-400 mb-4">Automated invoice processing with AI-powered data extraction.</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">&lt; $500 (Auto-Approve)</span>
              <span className="text-green-400 font-medium">0</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">$500 - $5K (Manager)</span>
              <span className="text-yellow-400 font-medium">0</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">≥ $5K (CFO)</span>
              <span className="text-red-400 font-medium">0</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="ai-card"
        >
          <IconShieldLock className="w-8 h-8 text-indigo-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Fraud Detection</h3>
          <p className="text-slate-400 mb-4">AI-powered fraud detection and risk analysis for all invoices.</p>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Duplicate Check</span>
                <span className="text-green-400">✓ Active</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Risk Analysis</span>
                <span className="text-green-400">✓ Active</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Audit Trail</span>
                <span className="text-green-400">✓ Active</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <form id="invoiceForm" onSubmit={handleSubmit} className="ai-card mt-8">
        <h2 className="text-2xl font-semibold mb-6">Add New Invoice</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Vendor Name</label>
            <input
              type="text"
              className="ai-input w-full"
              value={invoice.vendor}
              onChange={(e) => setInvoice({ ...invoice, vendor: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Invoice Number</label>
            <input
              type="text"
              className="ai-input w-full"
              value={invoice.invoiceNumber}
              onChange={(e) => setInvoice({ ...invoice, invoiceNumber: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Amount ($)</label>
            <input
              type="number"
              className="ai-input w-full"
              value={invoice.amount}
              onChange={(e) => setInvoice({ ...invoice, amount: Number(e.target.value) })}
              required
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Date</label>
            <input
              type="date"
              className="ai-input w-full"
              value={invoice.date}
              onChange={(e) => setInvoice({ ...invoice, date: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Line Items (comma-separated)</label>
            <textarea
              className="ai-input w-full h-24"
              value={invoice.lineItems.join('\n')}
              onChange={(e) => setInvoice({ ...invoice, lineItems: e.target.value.split('\n').filter(item => item.trim()) })}
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="ai-button w-full"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Submit Invoice'}
          </motion.button>
        </div>
      </form>
      </div>
    </>
  );
};

export default FinanceDashboard;