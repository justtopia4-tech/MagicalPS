import React, { useState } from 'react';
import { Smartphone, Monitor, Apple, Terminal, Copy, CheckCircle2, ChevronRight, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ConnectionGuide({ guides, onExecuteAction, config }) {
  const [selectedOs, setSelectedOs] = useState('android');

  const osList = [
    { id: 'android', name: 'Android', icon: Smartphone },
    { id: 'windows', name: 'Windows', icon: Monitor },
    { id: 'ios', name: 'iOS', icon: Apple },
    { id: 'macos', name: 'APK GTPS', icon: Smartphone }
  ];

  const currentSteps = guides[selectedOs] || [];

  const guideTitle = config?.guideTitle 
    ? config.guideTitle 
    : (config?.profileHandle ? `Cara Bermain ${config.profileHandle.split(' ')[0]} PS` : 'Cara Bermain Magical PS');

  return (
    <div className="w-full max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto px-3 sm:px-4 mt-6">
      {/* Title Header */}
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#1d0b42] via-[#280e5b] to-[#14072e] border-2 border-purple-400/60 mb-2 shadow-md">
          <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 fill-purple-400/20" />
          <span className="text-[11px] font-extrabold text-purple-300 tracking-wide uppercase">
            HowToPlay
          </span>
          <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 fill-purple-400/20" />
        </div>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight font-heading">
          {guideTitle}
        </h2>
        <p className="text-xs sm:text-sm lg:text-base text-purple-100 font-medium mt-1 max-w-md mx-auto">
          Pilih jenis OS perangkat kamu untuk petunjuk installasi & IP host.
        </p>
      </div>

      {/* OS Selector Pills */}
      <div className="grid grid-cols-4 gap-1 p-1 bg-gradient-to-r from-[#140833]/95 via-[#1b0a42]/95 to-[#0f0529]/95 backdrop-blur-md rounded-2xl mb-5 border-2 border-purple-500/50 relative shadow-xl max-w-xl mx-auto">
        {osList.map((os) => {
          const Icon = os.icon;
          const isSelected = selectedOs === os.id;

          return (
            <button
              key={os.id}
              onClick={() => setSelectedOs(os.id)}
              className={`relative py-2 sm:py-2.5 px-1 sm:px-2 rounded-xl flex items-center justify-center gap-1 sm:gap-1.5 text-[10px] min-[380px]:text-xs sm:text-sm font-extrabold transition-all cursor-pointer z-10 select-none ${
                isSelected
                  ? 'text-white font-black shadow-sm'
                  : 'text-purple-200 font-extrabold hover:text-white hover:bg-white/10'
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="osIndicator"
                  className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-xl border-2 border-white shadow-[0_0_15px_rgba(147,51,234,0.5)] -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isSelected ? 'text-white' : 'text-purple-300'}`} />
              <span className="font-heading tracking-tight whitespace-nowrap">{os.name}</span>
            </button>
          );
        })}
      </div>

      {/* Steps List */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedOs}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10"
        >
          {currentSteps.map((step, idx) => (
            <motion.div
              key={step.number || idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * idx }}
              className="p-3.5 sm:p-5 rounded-2xl bg-gradient-to-r from-[#140a2d]/95 via-[#100826]/95 to-[#09041a] border-2 border-purple-500/30 shadow-xl flex items-start gap-3 sm:gap-3.5 relative overflow-hidden"
            >
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white font-black text-xs sm:text-sm flex items-center justify-center shrink-0 border-2 border-white font-mono shadow-md">
                {step.number}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base lg:text-lg font-black text-white font-heading leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-sky-100 font-medium mt-1 leading-relaxed">
                  {step.description}
                </p>

                {step.code && (
                  <div className="mt-2.5 p-2.5 sm:p-3 rounded-xl bg-black/70 border border-white/50 text-xs sm:text-sm font-mono text-amber-300 font-bold select-all break-all shadow-inner">
                    {step.code}
                  </div>
                )}

                {/* Multiple Actions Grid */}
                {step.actions ? (
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    {step.actions.map((act, aIdx) => (
                      <motion.button
                        key={aIdx}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onExecuteAction(act.type)}
                        className={`py-2 px-2.5 sm:px-3.5 font-black text-[11px] sm:text-xs rounded-xl flex items-center gap-1.5 cursor-pointer border-2 shadow-md transition-all ${
                          act.type === 'downloadTxt' || act.type === 'downloadApk'
                            ? 'bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white border-white shadow-purple-500/30'
                            : 'bg-slate-900 hover:bg-slate-800 text-white border-white/80'
                        }`}
                      >
                        {act.type === 'downloadTxt' || act.type === 'downloadApk' ? (
                          <Download className="w-3.5 h-3.5 text-white shrink-0" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-purple-300 shrink-0" />
                        )}
                        <span>{act.label}</span>
                      </motion.button>
                    ))}
                  </div>
                ) : step.actionType ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onExecuteAction(step.actionType)}
                    className={`mt-3 py-2.5 px-4 font-black text-xs sm:text-sm rounded-xl flex items-center gap-2 cursor-pointer border-2 shadow-md transition-all ${
                      step.actionType === 'downloadApk' || step.actionType === 'downloadTxt'
                        ? 'bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white border-white shadow-purple-500/30'
                        : 'bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 hover:from-purple-500 hover:to-indigo-600 text-white border-white/80'
                    }`}
                  >
                    {step.actionType === 'downloadApk' || step.actionType === 'downloadTxt' ? (
                      <>
                        <Download className="w-4 h-4 text-stone-950 shrink-0" />
                        <span>{step.buttonLabel || "DOWNLOAD FILE"}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-sky-200 shrink-0" />
                        <span>Copy URL / Hosts</span>
                      </>
                    )}
                  </motion.button>
                ) : null}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
