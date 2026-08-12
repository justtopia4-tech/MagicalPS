import React from 'react';
import { X, Copy, ShieldCheck, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CopyHostModal({ isOpen, onClose, config, onCopyText, onDownloadTxt, onDownloadApk, copyToast }) {
  if (!isOpen) return null;

  const hostsContent = `${config.hostIp} ${config.hostDomain}\n${config.hostIp} www.growtopia2.com`;

  const getAbsUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    const origin = (typeof window !== 'undefined' && window.location.origin && window.location.origin !== 'null') ? window.location.origin : 'https://magicalps.vercel.app';
    return `${origin}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  const androidUrl = getAbsUrl(config.vhostAndroidUrl);
  const iosUrl = getAbsUrl(config.vhostIosUrl);

  const handleDownloadHostTxt = () => {
    if (onDownloadTxt) {
      onDownloadTxt();
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
      if (onCopyText) onCopyText("", "Downloading Magical - GTPSHOST.txt!");
    }
  };

  const handleDownloadApkFile = () => {
    if (onDownloadApk) {
      onDownloadApk();
    } else {
      const apkLink = config.apkUrl || "https://www.mediafire.com/file/3t16viuv6konhwd/magical+5.48.apk/file";
      window.open(apkLink, "_blank");
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        {/* Backdrop overlay trigger */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Modal Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="relative w-full max-w-md bg-[#130a2e] rounded-3xl p-5 sm:p-6 border-2 border-purple-500/80 text-left z-10 overflow-hidden shadow-2xl"
        >
          {/* Toast Notification Popup */}
          {copyToast && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-purple-600 text-white font-extrabold text-xs border border-white z-20">
              {copyToast}
            </div>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-purple-900/80 text-white hover:bg-purple-800 transition-colors cursor-pointer border border-white/60"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-purple-900/90 text-white flex items-center justify-center shrink-0 border-2 border-white/60">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white font-heading leading-tight">
                IP Host & Link HOST
              </h3>
              <p className="text-xs text-purple-100/90 font-medium">
                Salin konfigurasi IP untuk Windows/macOS atau HOST URL Android/iOS.
              </p>
            </div>
          </div>

          {/* Top Quick Download Buttons Grid */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button
              onClick={handleDownloadHostTxt}
              className="py-2.5 px-3 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-black text-xs rounded-xl flex items-center justify-center gap-1.5 border-2 border-white shadow-md transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-white shrink-0" />
              <span>DOWNLOAD .TXT 📄</span>
            </button>

            <button
              onClick={handleDownloadApkFile}
              className="py-2.5 px-3 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-stone-950 font-black text-xs rounded-xl flex items-center justify-center gap-1.5 border-2 border-white shadow-md transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-stone-950 shrink-0" />
              <span>DOWNLOAD APK 🚀</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-black/60 border border-white/50">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-black text-purple-300 font-heading">
                  WINDOWS / MACOS HOST
                </span>
                <button
                  onClick={() => onCopyText(hostsContent, "Host entries copied!")}
                  className="py-1 px-2.5 bg-purple-600 hover:bg-purple-500 text-white font-black text-[11px] rounded-lg flex items-center gap-1 transition-colors cursor-pointer border border-white/70"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy Hosts</span>
                </button>
              </div>
              <pre className="p-2.5 rounded-xl bg-black/80 text-purple-200 font-mono text-[11px] leading-relaxed border border-white/30 overflow-x-auto">
                {hostsContent}
              </pre>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/60 border border-white/50">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-black text-purple-300 font-heading">
                  ANDROID HOST (POWERTUNNEL)
                </span>
                <button
                  onClick={() => onCopyText(androidUrl, "Android HOST URL copied!")}
                  className="py-1 px-2.5 bg-purple-600 hover:bg-purple-500 text-white font-black text-[11px] rounded-lg flex items-center gap-1 transition-colors cursor-pointer border border-white/70"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy URL</span>
                </button>
              </div>
              <div className="p-2 rounded-xl bg-black/80 text-purple-200 font-mono text-[11px] truncate border border-white/30">
                {androidUrl}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/60 border border-white/50">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-black text-purple-300 font-heading">
                  IOS HOST (SURGE 5)
                </span>
                <button
                  onClick={() => onCopyText(iosUrl, "iOS HOST URL copied!")}
                  className="py-1 px-2.5 bg-purple-600 hover:bg-purple-500 text-white font-black text-[11px] rounded-lg flex items-center gap-1 transition-colors cursor-pointer border border-white/70"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy URL</span>
                </button>
              </div>
              <div className="p-2 rounded-xl bg-black/80 text-purple-200 font-mono text-[11px] truncate border border-white/30">
                {iosUrl}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="mt-5 pt-3 border-t border-white/30 flex justify-end">
            <button
              onClick={onClose}
              className="py-2 px-4 bg-purple-950 hover:bg-purple-900 text-white font-black text-xs rounded-xl transition-colors cursor-pointer border border-white/70 tracking-wider uppercase"
            >
              CLOSE
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
