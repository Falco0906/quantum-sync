import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IconPlugConnected, IconAlertCircle, IconCheck } from '@tabler/icons-react';
import { api } from '../services/api';

const TestConnection: React.FC = () => {
  const [hrStatus, setHrStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [financeStatus, setFinanceStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [hrMessage, setHrMessage] = useState('');
  const [financeMessage, setFinanceMessage] = useState('');

  const testHREndpoint = async () => {
    setHrStatus('testing');
    setHrMessage('Testing...');
    
    try {
      const testData = {
        name: 'Test Candidate',
        email: 'test@example.com',
        skills: ['React', 'TypeScript'],
        experience: 3,
        resumeUrl: 'https://example.com/resume.pdf'
      };
      
      const response = await api.submitCandidate(testData);
      setHrStatus('success');
      setHrMessage('HR endpoint connected successfully!');
      console.log('HR Response:', response);
    } catch (error: any) {
      setHrStatus('error');
      setHrMessage(error.message || 'Connection failed');
    }
  };

  const testFinanceEndpoint = async () => {
    setFinanceStatus('testing');
    setFinanceMessage('Testing...');
    
    try {
      const testData = {
        vendor: 'Test Vendor',
        amount: 100,
        date: '2025-10-19',
        lineItems: ['Test Item 1', 'Test Item 2'],
        invoiceNumber: 'TEST-001'
      };
      
      const response = await api.submitInvoice(testData);
      setFinanceStatus('success');
      setFinanceMessage('Finance endpoint connected successfully!');
      console.log('Finance Response:', response);
    } catch (error: any) {
      setFinanceStatus('error');
      setFinanceMessage(error.message || 'Connection failed');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-400 border-green-500 bg-green-500/20';
      case 'error':
        return 'text-red-400 border-red-500 bg-red-500/20';
      case 'testing':
        return 'text-yellow-400 border-yellow-500 bg-yellow-500/20';
      default:
        return 'text-slate-400 border-slate-700 bg-slate-800/50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <IconCheck className="w-6 h-6" />;
      case 'error':
        return <IconAlertCircle className="w-6 h-6" />;
      default:
        return <IconPlugConnected className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <IconPlugConnected className="w-8 h-8 text-indigo-500" />
        <h1 className="text-3xl font-bold text-white">Test n8n Connection</h1>
      </div>

      <div className="ai-card">
        <p className="text-slate-300 mb-6">
          Use this page to test your n8n webhook endpoints. Click the buttons below to send test data to each endpoint.
        </p>
        
        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 mb-6">
          <p className="text-sm text-slate-400 mb-2">
            <strong className="text-white">Single Webhook URL (Both HR & Finance):</strong>
          </p>
          <code className="text-indigo-400 text-sm break-all">
            https://falco.app.n8n.cloud/webhook/automation
          </code>
          <p className="text-xs text-slate-500 mt-2">
            ℹ️ The workflow uses a "type" field to route between HR and Finance processing
          </p>
        </div>

        <div className="space-y-4">
          {/* HR Endpoint Test */}
          <motion.div
            className={`border rounded-lg p-6 transition-all ${getStatusColor(hrStatus)}`}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {getStatusIcon(hrStatus)}
                <div>
                  <h3 className="text-lg font-semibold">HR Endpoint</h3>
                  <p className="text-sm opacity-75">/hr</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={testHREndpoint}
                disabled={hrStatus === 'testing'}
                className="ai-button"
              >
                {hrStatus === 'testing' ? 'Testing...' : 'Test Connection'}
              </motion.button>
            </div>
            {hrMessage && (
              <div className="text-sm">
                {hrMessage}
              </div>
            )}
          </motion.div>

          {/* Finance Endpoint Test */}
          <motion.div
            className={`border rounded-lg p-6 transition-all ${getStatusColor(financeStatus)}`}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {getStatusIcon(financeStatus)}
                <div>
                  <h3 className="text-lg font-semibold">Finance Endpoint</h3>
                  <p className="text-sm opacity-75">/finance</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={testFinanceEndpoint}
                disabled={financeStatus === 'testing'}
                className="ai-button"
              >
                {financeStatus === 'testing' ? 'Testing...' : 'Test Connection'}
              </motion.button>
            </div>
            {financeMessage && (
              <div className="text-sm">
                {financeMessage}
              </div>
            )}
          </motion.div>
        </div>

        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <p className="text-sm text-blue-300">
            <strong>Note:</strong> Make sure your n8n workflows are activated before testing. 
            Check the browser console (F12) for detailed request/response logs.
          </p>
        </div>
      </div>

      <div className="ai-card">
        <h2 className="text-xl font-semibold mb-4">Troubleshooting</h2>
        <div className="space-y-3 text-sm text-slate-300">
          <div className="flex items-start gap-2">
            <span className="text-indigo-400 font-bold">1.</span>
            <span>Ensure your n8n workflows are <strong className="text-white">activated</strong> (toggle switch in n8n)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-indigo-400 font-bold">2.</span>
            <span>Verify webhook path: <code className="text-indigo-400">automation</code> (single endpoint for both HR and Finance)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-indigo-400 font-bold">3.</span>
            <span>Check CORS settings in n8n if you see network errors</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-indigo-400 font-bold">4.</span>
            <span>Open browser DevTools (F12) → Network tab to see detailed errors</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-indigo-400 font-bold">5.</span>
            <span>Check n8n Executions tab to see if webhooks are receiving data</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestConnection;