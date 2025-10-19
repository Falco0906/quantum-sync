import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IconUsers, IconReceipt2, IconBrain, IconPlugConnected } from '@tabler/icons-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <nav className="fixed top-0 left-0 h-screen w-64 bg-slate-800/50 backdrop-blur-md border-r border-slate-700 p-4">
        <div className="flex items-center gap-2 mb-8">
          <IconBrain className="text-indigo-500 w-8 h-8" />
          <h1 className="text-2xl font-bold text-white">QuantumSync</h1>
        </div>
        <ul className="space-y-2">
          <li>
            <Link
              to="/hr"
              className={`flex items-center gap-2 p-3 rounded-lg transition-colors ${
                location.pathname === '/hr'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              <IconUsers className="w-5 h-5" />
              HR Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/finance"
              className={`flex items-center gap-2 p-3 rounded-lg transition-colors ${
                location.pathname === '/finance'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              <IconReceipt2 className="w-5 h-5" />
              Finance Dashboard
            </Link>
          </li>
        </ul>
        
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-3">
            <p className="text-xs text-slate-400 mb-1">Webhook URL:</p>
            <p className="text-xs text-indigo-400 truncate">falco.app.n8n.cloud</p>
          </div>
        </div>
      </nav>
      <main className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;