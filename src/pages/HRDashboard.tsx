import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IconUserPlus, IconChartPie, IconFileAnalytics, IconUsers, IconUserCheck, IconUserX } from '@tabler/icons-react';
import type { CandidateData } from '../services/api';
import { api } from '../services/api';
import StatCard from '../components/StatCard';
import Toast from '../components/Toast';

const HRDashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info'; isVisible: boolean }>({
    message: '',
    type: 'info',
    isVisible: false
  });
  const [candidate, setCandidate] = useState<CandidateData>({
    name: '',
    email: '',
    skills: [],
    experience: 0,
    resumeFile: undefined
  });
  const [fileName, setFileName] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.submitCandidate(candidate);
      setCandidate({ name: '', email: '', skills: [], experience: 0, resumeFile: undefined });
      setFileName('');
      setToast({ message: 'Candidate submitted successfully!', type: 'success', isVisible: true });
      setTimeout(() => setToast(prev => ({ ...prev, isVisible: false })), 3000);
    } catch (error) {
      setToast({ message: 'Error submitting candidate', type: 'error', isVisible: true });
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
        <h1 className="text-3xl font-bold text-white">HR Dashboard</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="ai-button flex items-center gap-2"
          onClick={() => document.getElementById('candidateForm')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <IconUserPlus className="w-5 h-5" />
          Add Candidate
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Candidates"
          value="0"
          icon={<IconUsers className="w-8 h-8" />}
          color="bg-indigo-500/20 text-indigo-400"
          delay={0}
        />
        <StatCard
          title="High Score (≥80)"
          value="0"
          icon={<IconUserCheck className="w-8 h-8" />}
          color="bg-green-500/20 text-green-400"
          delay={0.1}
        />
        <StatCard
          title="Medium Score (50-79)"
          value="0"
          icon={<IconChartPie className="w-8 h-8" />}
          color="bg-yellow-500/20 text-yellow-400"
          delay={0.2}
        />
        <StatCard
          title="Low Score (<50)"
          value="0"
          icon={<IconUserX className="w-8 h-8" />}
          color="bg-red-500/20 text-red-400"
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
          <IconChartPie className="w-8 h-8 text-indigo-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Candidate Pipeline</h3>
          <p className="text-slate-400">Track and manage candidate applications through our AI-powered workflow.</p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Interview Stage</span>
              <span className="text-white font-medium">0</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Under Review</span>
              <span className="text-white font-medium">0</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Rejected</span>
              <span className="text-white font-medium">0</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="ai-card"
        >
          <IconFileAnalytics className="w-8 h-8 text-indigo-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">AI Scoring System</h3>
          <p className="text-slate-400">Automated candidate scoring and ranking based on skills and experience.</p>
          <div className="mt-4 space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Skill Match</span>
                <span className="text-green-400">40%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Experience</span>
                <span className="text-yellow-400">30%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Profile Quality</span>
                <span className="text-indigo-400">30%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <form id="candidateForm" onSubmit={handleSubmit} className="ai-card mt-8">
        <h2 className="text-2xl font-semibold mb-6">Add New Candidate</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Name</label>
            <input
              type="text"
              className="ai-input w-full"
              value={candidate.name}
              onChange={(e) => setCandidate({ ...candidate, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
            <input
              type="email"
              className="ai-input w-full"
              value={candidate.email}
              onChange={(e) => setCandidate({ ...candidate, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Skills (comma-separated)</label>
            <input
              type="text"
              className="ai-input w-full"
              value={candidate.skills.join(', ')}
              onChange={(e) => setCandidate({ ...candidate, skills: e.target.value.split(',').map(s => s.trim()) })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Years of Experience</label>
            <input
              type="number"
              className="ai-input w-full"
              value={candidate.experience}
              onChange={(e) => setCandidate({ ...candidate, experience: Number(e.target.value) })}
              required
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Resume (PDF only)
            </label>
            <div className="relative">
              <input
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                id="resumeFile"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    if (file.type !== 'application/pdf') {
                      setToast({ message: 'Please upload a PDF file only', type: 'error', isVisible: true });
                      setTimeout(() => setToast(prev => ({ ...prev, isVisible: false })), 3000);
                      return;
                    }
                    if (file.size > 10 * 1024 * 1024) {
                      setToast({ message: 'File size must be less than 10MB', type: 'error', isVisible: true });
                      setTimeout(() => setToast(prev => ({ ...prev, isVisible: false })), 3000);
                      return;
                    }
                    setCandidate({ ...candidate, resumeFile: file });
                    setFileName(file.name);
                  }
                }}
                required
              />
              <label
                htmlFor="resumeFile"
                className="ai-input w-full cursor-pointer flex items-center justify-between"
              >
                <span className={fileName ? 'text-white' : 'text-slate-400'}>
                  {fileName || 'Click to upload PDF resume...'}
                </span>
                <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </label>
            </div>
            {fileName && (
              <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {fileName}
              </p>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="ai-button w-full"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Submit Candidate'}
          </motion.button>
        </div>
      </form>
      </div>
    </>
  );
};

export default HRDashboard;