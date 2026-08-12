import React from 'react';
import { Wrench, Shield, ShoppingBag, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NavigationTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'guide', label: 'HowToPlay', icon: Wrench },
    { id: 'roles', label: 'Role Store', icon: Shield },
    { id: 'assets', label: 'Title Store', icon: ShoppingBag }
  ];

  return (
    <div className="w-full max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto px-3 sm:px-4 mt-6">
      <div className="grid grid-cols-3 gap-2 p-2 bg-gradient-to-r from-[#140833]/95 via-[#1b0a42]/95 to-[#0f0529]/95 backdrop-blur-md rounded-2xl border-2 border-purple-500/50 shadow-purple-950/50 shadow-xl relative">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative py-2.5 sm:py-3 lg:py-3.5 px-1 sm:px-3 lg:px-6 rounded-xl flex items-center justify-center gap-1 sm:gap-2 lg:gap-2.5 text-[11px] min-[380px]:text-xs sm:text-sm lg:text-base font-extrabold font-heading transition-all cursor-pointer z-10 select-none text-center w-full ${
                isActive
                  ? 'text-white font-black'
                  : 'text-purple-200 hover:text-white hover:bg-white/10'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-xl border-2 border-white shadow-[0_0_20px_rgba(147,51,234,0.5)] -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 ${isActive ? 'text-white' : 'text-purple-300'} shrink-0`} />
              <span className="truncate tracking-tight sm:tracking-wide text-center">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
