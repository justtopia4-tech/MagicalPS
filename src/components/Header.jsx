import React, { useState } from 'react';
import { Volume2, VolumeX, MessageSquare, Copy, PhoneCall, CheckCircle2, Users, Activity, Lock, Download, ShieldCheck, ChevronDown, ExternalLink, X, Server, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getWhatsAppUrl } from '../utils/whatsapp';

function DiscordIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function WhatsAppIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
    </svg>
  );
}

export default function Header({ config, isAudioPlaying, toggleAudio, onOpenCopyModal, onOpenSettingsModal, onOpenSettingsPage, onExecuteAction }) {
  const [isLogoMenuOpen, setIsLogoMenuOpen] = useState(false);

  const handleDownloadTxtFile = () => {
    if (onExecuteAction) {
      onExecuteAction('downloadTxt');
    } else {
      const textContent = config.hostTxtContent || `${config.hostIp} ${config.hostDomain}\n${config.hostIp} www.growtopia2.com\n# Magical ~ delivered by gtpshost.com`;
      const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Magical - GTPSHOST.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
    setIsLogoMenuOpen(false);
  };

  const handleDownloadApk = () => {
    if (onExecuteAction) {
      onExecuteAction('downloadApk');
    } else {
      window.open(config.apkUrl || "https://www.mediafire.com/file/3t16viuv6konhwd/magical+5.48.apk/file", "_blank");
    }
    setIsLogoMenuOpen(false);
  };

  return (
    <>
      {/* Sticky Top Navigation Bar */}
      <nav className="sticky top-0 z-40 w-full bg-gradient-to-r from-[#140833]/95 via-[#1b0a42]/95 to-[#0f0529]/95 backdrop-blur-md px-3 sm:px-6 py-2 border-b-2 border-purple-500/50 shadow-purple-950/50 shadow-xl">
        <div className="w-full max-w-5xl xl:max-w-6xl mx-auto flex items-center justify-between">
          {/* Top Left Logo & Avatar Button */}
          <button
            onClick={() => setIsLogoMenuOpen(prev => !prev)}
            className="flex items-center gap-2.5 p-1 rounded-2xl hover:bg-purple-900/40 border border-transparent hover:border-purple-400/40 transition-all cursor-pointer text-left select-none group shrink-0"
            title="Klik untuk membuka menu Magical"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-purple-400/80 shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <img
                src={config.avatarUrl}
                alt={config.profileHandle}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="font-black text-white text-xs sm:text-sm lg:text-base font-heading leading-tight flex items-center gap-1">
                {config.profileHandle}
                <CheckCircle2 className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-purple-400 fill-purple-400/20" />
                <ChevronDown className={`w-3.5 h-3.5 lg:w-4 lg:h-4 text-purple-300 transition-transform duration-200 ${isLogoMenuOpen ? 'rotate-180' : ''}`} />
              </h3>
            </div>
          </button>

          {/* Top Right Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">

            <button
              onClick={toggleAudio}
              className="py-2 px-3 sm:px-4 rounded-xl bg-[#180e38] hover:bg-[#22144d] text-purple-300 hover:text-purple-200 border-2 border-purple-500/40 cursor-pointer transition-all flex items-center gap-1.5 text-xs sm:text-sm font-extrabold shadow-sm active:scale-95 select-none"
              title={isAudioPlaying ? "Musik Latar: ON" : "Musik Latar: OFF"}
            >
              {isAudioPlaying ? (
                <>
                  <Volume2 className="w-4 h-4 text-amber-300 animate-bounce" />
                  <span className="hidden sm:inline">Music ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-stone-300" />
                  <span className="hidden sm:inline">Music OFF</span>
                </>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Floating Logo Quick Menu Popover (Positioned safely outside nav) */}
      <AnimatePresence>
        {isLogoMenuOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-start p-3 sm:p-4 pt-14 sm:pt-16 pointer-events-none">
            {/* Backdrop overlay */}
            <div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] pointer-events-auto"
              onClick={() => setIsLogoMenuOpen(false)}
            />

            {/* Popover Menu Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative w-full max-w-xs sm:max-w-sm bg-[#0d0724] border-2 border-purple-500 rounded-3xl p-4 shadow-2xl z-50 text-left space-y-2 pointer-events-auto mt-1"
            >
              {/* Header with Title and Close X */}
              <div className="flex items-center justify-between border-b border-purple-500/30 pb-2.5 mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-purple-400 shrink-0">
                    <img src={config.avatarUrl} alt={config.profileHandle} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-black text-white text-xs sm:text-sm font-heading flex items-center gap-1">
                      {config.profileHandle}
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 fill-purple-400/20" />
                    </h4>
                  </div>
                </div>
                <button
                  onClick={() => setIsLogoMenuOpen(false)}
                  className="p-1.5 rounded-full bg-purple-950 text-purple-200 hover:bg-purple-900 border border-purple-400/50 cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Menu Actions List */}
              <div className="space-y-2">

                {/* Menu Item 1: Download APK */}
                <button
                  onClick={handleDownloadApk}
                  className="w-full p-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black text-xs flex items-center gap-2.5 cursor-pointer transition-all border border-white/60 shadow-md text-left"
                >
                  <Download className="w-4 h-4 text-stone-950 shrink-0" />
                  <div>
                    <div className="leading-tight font-black">DOWNLOAD APK MAGICAL 🚀</div>
                    <div className="text-[10px] font-semibold text-stone-900/80 leading-tight mt-0.5">Unduh installer APK GTPS 5.48 langsung</div>
                  </div>
                </button>

                {/* Menu Item 2: Download Host TXT */}
                <button
                  onClick={handleDownloadTxtFile}
                  className="w-full p-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-black text-xs flex items-center gap-2.5 cursor-pointer transition-all border border-white/60 shadow-md text-left"
                >
                  <Download className="w-4 h-4 text-white shrink-0" />
                  <div>
                    <div className="leading-tight font-black">DOWNLOAD MAGICAL.TXT 📄</div>
                    <div className="text-[10px] font-semibold text-purple-100/90 leading-tight mt-0.5">Unduh file konfigurasi Host .txt</div>
                  </div>
                </button>

                {/* Menu Item 3: Copy IP Host & Link HOST */}
                <button
                  onClick={() => {
                    onOpenCopyModal();
                    setIsLogoMenuOpen(false);
                  }}
                  className="w-full p-2.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 text-white font-extrabold text-xs flex items-center gap-2.5 cursor-pointer transition-all border border-purple-400/50 text-left"
                >
                  <ShieldCheck className="w-4 h-4 text-purple-300 shrink-0" />
                  <div>
                    <div className="leading-tight font-black text-white">IP Host & Link HOST</div>
                    <div className="text-[10px] font-medium text-purple-200/90 leading-tight mt-0.5">Salin IP Windows/macOS & URL PowerTunnel</div>
                  </div>
                </button>

                {/* Menu Item 4: Discord */}
                <a
                  href={config.discordInvite}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsLogoMenuOpen(false)}
                  className="w-full p-2.5 rounded-xl bg-indigo-900/80 hover:bg-indigo-800 text-indigo-100 font-extrabold text-xs flex items-center gap-2.5 cursor-pointer transition-all border border-indigo-400/50 text-left"
                >
                  <DiscordIcon className="w-4 h-4 text-indigo-200 shrink-0" />
                  <div className="flex-1">
                    <div className="leading-tight font-black text-white flex items-center gap-1">
                      Discord Community
                      <ExternalLink className="w-3 h-3 text-indigo-300 ml-auto" />
                    </div>
                    <div className="text-[10px] font-medium text-indigo-200/90 leading-tight mt-0.5">Gabung komunitas Discord resmi Magical</div>
                  </div>
                </a>

                {/* Menu Item 5: Group WhatsApp */}
                <a
                  href={config.whatsappGroupLink || "https://chat.whatsapp.com/BQYUgwp07bT5FgzTCR2x7X"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsLogoMenuOpen(false)}
                  className="w-full p-2.5 rounded-xl bg-emerald-900/80 hover:bg-emerald-800 text-emerald-100 font-extrabold text-xs flex items-center gap-2.5 cursor-pointer transition-all border border-emerald-400/50 text-left"
                >
                  <WhatsAppIcon className="w-4 h-4 text-emerald-300 shrink-0" />
                  <div className="flex-1">
                    <div className="leading-tight font-black text-white flex items-center gap-1">
                      Group WhatsApp
                      <ExternalLink className="w-3 h-3 text-emerald-300 ml-auto" />
                    </div>
                    <div className="text-[10px] font-medium text-emerald-200/90 leading-tight mt-0.5">Grup diskusi WhatsApp antar pemain</div>
                  </div>
                </a>

                {/* Menu Item 6: Hubungi Admin */}
                <a
                  href={getWhatsAppUrl(config.whatsappNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsLogoMenuOpen(false)}
                  className="w-full p-2.5 rounded-xl bg-gradient-to-r from-red-950 via-red-900 to-rose-950 hover:from-red-900 hover:to-rose-900 text-white font-extrabold text-xs flex items-center gap-2.5 cursor-pointer transition-all border border-red-400/80 text-left"
                >
                  <PhoneCall className="w-4 h-4 text-white shrink-0" />
                  <div className="flex-1">
                    <div className="leading-tight font-black text-white flex items-center gap-1">
                      Hubungi Admin WhatsApp
                      <ExternalLink className="w-3 h-3 text-red-300 ml-auto" />
                    </div>
                    <div className="text-[10px] font-medium text-red-100/90 leading-tight mt-0.5">Chat langsung dengan Admin / Owner</div>
                  </div>
                </a>

              </div>

              {/* Popover Footer */}
              <div className="pt-2.5 border-t border-purple-500/30 text-center">
                <p className="text-[10px] text-purple-300 font-mono font-semibold">
                  Magical GTPS • Dedicated Web System
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Hero Banner Section */}
      <div className="relative w-full flex flex-col items-center pt-3 sm:pt-6 px-3 sm:px-6 max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto">
        {/* Banner Card - Centered Image */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: -10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="relative w-full rounded-2xl overflow-hidden border-2 border-purple-500/80 shadow-2xl shadow-purple-500/30 flex items-center justify-center"
        >
          <div className="relative w-full overflow-hidden flex items-center justify-center">
            {config.bannerUrl && (config.bannerUrl.endsWith('.mp4') || config.bannerUrl.includes('.mp4')) ? (
              <video
                src={config.bannerUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto max-h-64 sm:max-h-72 lg:max-h-80 xl:max-h-96 object-cover object-center block mx-auto rounded-xl"
              />
            ) : (
              <img
                src={config.bannerUrl}
                alt="Server Banner"
                className="w-full h-auto max-h-64 sm:max-h-72 lg:max-h-80 xl:max-h-96 object-cover object-center block mx-auto"
                referrerPolicy="no-referrer"
                loading="eager"
                decoding="async"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

            {/* Badge overlay on banner matching Welcome Modal */}
            <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/50 text-[10px] sm:text-xs font-black text-amber-300 flex items-center gap-1 sm:gap-1.5 uppercase tracking-wider shadow-md z-10">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 fill-amber-400" />
              <span>MAGICAL PS</span>
            </div>
          </div>
        </motion.div>

        {/* Avatar Circle Overlapping Banner */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 220 }}
          className="-mt-14 sm:-mt-16 relative z-10 flex flex-col items-center"
        >
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full p-1 bg-gradient-to-tr from-violet-500 via-purple-500 to-indigo-400 shadow-2xl border-2 border-purple-400/80 cursor-pointer hover:scale-105 transition-all shadow-purple-500/40">
            <div className="w-full h-full rounded-full overflow-hidden bg-white">
              <img
                src={config.avatarUrl}
                alt={config.profileHandle}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </motion.div>

        {/* Profile Info Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mt-2 px-2 flex flex-col items-center w-full"
        >
          <div className="flex items-center gap-1.5 justify-center">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight font-heading">
              {config.profileHandle}
            </h1>
            <CheckCircle2 className="w-4 h-4 lg:w-5 lg:h-5 text-purple-400 fill-purple-400/20" />
          </div>

          <p className="text-xs sm:text-sm lg:text-base font-extrabold text-amber-300 mt-1 flex items-center justify-center gap-1 font-mono">
            {config.profileTitle}
          </p>

          <p className="text-xs sm:text-sm text-purple-100/90 font-semibold mt-1 max-w-md lg:max-w-xl">
            {config.tagline}
          </p>

          {/* Social & Copy Action Buttons Responsive Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5 mt-4 w-full max-w-md md:max-w-2xl lg:max-w-3xl">
            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              href={config.discordInvite}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-2 sm:px-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-[11px] min-[380px]:text-xs rounded-xl flex items-center justify-center gap-1 sm:gap-1.5 transition-all border-2 border-indigo-400/90 cursor-pointer shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50"
            >
              <DiscordIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" />
              <span className="truncate">Community Discord</span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              href={config.whatsappGroupLink || "https://chat.whatsapp.com/BQYUgwp07bT5FgzTCR2x7X"}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-2 sm:px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[11px] min-[380px]:text-xs rounded-xl flex items-center justify-center gap-1 sm:gap-1.5 transition-all border-2 border-emerald-400/90 cursor-pointer shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" />
              <span className="truncate">WhatsApp Group</span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              href={getWhatsAppUrl(config.whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-2 sm:px-3 bg-purple-950/90 hover:bg-purple-900 text-white font-black text-[11px] min-[380px]:text-xs rounded-xl flex items-center justify-center gap-1 sm:gap-1.5 transition-all border-2 border-purple-500/80 cursor-pointer shadow-lg shadow-purple-950/60 hover:shadow-purple-500/30"
            >
              <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-300 shrink-0" />
              <span className="truncate font-black text-white">Contact Nopy</span>
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenCopyModal}
              className="py-2.5 px-2 sm:px-3 bg-black hover:bg-zinc-900 text-white font-black text-[11px] min-[380px]:text-xs rounded-xl flex items-center justify-center gap-1 sm:gap-1.5 transition-all border-2 border-white/90 cursor-pointer shadow-lg shadow-black/80 hover:shadow-white/20"
            >
              <Server className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" />
              <span className="truncate font-black text-white">Link Host</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
