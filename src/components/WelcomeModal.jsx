import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function WelcomeModal({ isOpen, onClose, config }) {
  if (!isOpen) return null;

  const profileHandle = config?.profileHandle || "Magical Private Server";
  const profileTitle = config?.profileTitle || "Best Growtopia Private Server 🚀";
  const avatarUrl = config?.avatarUrl || "/logo.png";
  const bannerImgUrl = (config?.bannerUrl && !config.bannerUrl.endsWith('.mp4')) ? config.bannerUrl : "/banner.png";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto overflow-x-hidden no-scrollbar">
        {/* Fullscreen Blurred Artwork Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 filter blur-md scale-110 pointer-events-none"
          style={{ backgroundImage: `url(${bannerImgUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#090518]/90 via-[#130a2a]/95 to-[#050212]/95 pointer-events-none" />

        <motion.div
          initial={{ scale: 0.88, opacity: 0, y: 25 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.88, opacity: 0, y: 25 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="relative w-full max-w-sm sm:max-w-md bg-gradient-to-b from-[#140a2d] via-[#100826] to-[#09041a] rounded-3xl p-5 sm:p-6 border-2 border-purple-500/60 text-center shadow-2xl overflow-hidden z-10 my-auto"
        >
          {/* Top Banner Artwork Box */}
          <div className="relative w-full h-36 sm:h-44 rounded-2xl overflow-hidden border-2 border-purple-400/80 mb-4 bg-black/50 shadow-inner">
            <img
              src={bannerImgUrl}
              alt="MAGICAL Theme"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#140a2d] via-transparent to-black/30" />
            
            {/* Badge overlay on banner */}
            <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/50 text-[10px] font-black text-amber-300 flex items-center gap-1 uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span>MAGICAL PS</span>
            </div>
          </div>

          {/* Avatar Profile Overlapping */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto -mt-14 mb-3 rounded-full p-1 bg-gradient-to-tr from-violet-500 via-purple-500 to-indigo-400 shadow-xl shadow-purple-950/60 z-20">
            <img
              src={avatarUrl}
              alt={profileHandle}
              className="w-full h-full rounded-full object-cover border-2 border-purple-950"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Server Handle & Title */}
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-heading leading-tight">
            {profileHandle}
          </h2>
          <p className="text-xs sm:text-sm font-bold text-purple-200 mt-1">
            {profileTitle}
          </p>

          {/* Description Text */}
          <div className="mt-3 space-y-1.5 text-xs sm:text-sm text-purple-100/90 font-medium leading-relaxed bg-black/30 p-3 rounded-xl border border-white/20">
            <p className="font-semibold">
              Selamat datang di portal resmi <strong className="text-amber-300 font-bold">{profileHandle}</strong>!
            </p>
            <p className="text-purple-100/80 text-[11px] sm:text-xs">
              Tempat terbaik untuk melihat katalog Role Store eksklusif, panduan koneksi GTPS untuk Android, iOS & Windows, serta link komunitas official kami.
            </p>
          </div>

          {/* Enter Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="w-full py-3.5 px-5 mt-4 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-black text-sm sm:text-base rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-purple-500/30 border-2 border-white/80"
          >
            <span>CONTINUE</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </motion.button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
