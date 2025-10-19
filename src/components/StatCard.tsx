import React from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="ai-card relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 opacity-10">
        {icon}
      </div>
      <div className="relative z-10">
        <div className={`inline-flex p-3 rounded-lg mb-4 ${color}`}>
          {icon}
        </div>
        <h3 className="text-3xl font-bold mb-1">{value}</h3>
        <p className="text-slate-400 text-sm">{title}</p>
      </div>
    </motion.div>
  );
};

export default StatCard;