import React, { useState, useEffect } from 'react';
import { X, Lock, KeyRound, Save, Download, Copy, CheckCircle2, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SettingsModal({ isOpen, onClose, config, onUpdateConfig, triggerToast }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [securityPin, setSecurityPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');
  
  // Local form state
  const [formData, setFormData] = useState({
    hostIp: '',
    hostDomain: '',
    vhostAndroidUrl: '',
    vhostIosUrl: '',
    apkUrl: '',
    hostTxtContent: '',
    whatsappNumber: '',
    whatsappGroupLink: '',
    discordInvite: '',
    profileHandle: '',
    profileTitle: ''
  });

  // Only sync from config when modal is first opened (not on every config change)
  useEffect(() => {
    if (isOpen && config) {
      setFormData({
        hostIp: config.hostIp || '',
        hostDomain: config.hostDomain || '',
        vhostAndroidUrl: config.vhostAndroidUrl || '',
        vhostIosUrl: config.vhostIosUrl || '',
        apkUrl: config.apkUrl || '',
        hostTxtContent: config.hostTxtContent || '54.196.114.129 www.growtopia1.com\n54.196.114.129 www.growtopia2.com\n# Magical ~ delivered by gtpshost.com',
        whatsappNumber: config.whatsappNumber || '',
        whatsappGroupLink: config.whatsappGroupLink || '',
        discordInvite: config.discordInvite || '',
        profileHandle: config.profileHandle || '',
        profileTitle: config.profileTitle || ''
      });
      setIsUnlocked(false);
      setSecurityPin('');
      setPinError('');
      setSaveSuccessMsg('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const DEFAULT_PIN = "1234";

  const handleUnlock = (e) => {
    e.preventDefault();
    if (securityPin.trim() === "nopyasik991") {
      setIsUnlocked(true);
      setPinError('');
    } else {
      setPinError('PIN salah! Hubungi Admin untuk mendapatkan kunci akses.');
    }
  };

  const handleInputChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    if (onUpdateConfig) {
      onUpdateConfig({ [field]: value });
    }
  };

  const handleSaveConfig = () => {
    let cleanWa = formData.whatsappNumber ? formData.whatsappNumber.trim().replace(/\D/g, '') : '';
    if (cleanWa.startsWith('0')) {
      cleanWa = '62' + cleanWa.slice(1);
    }
    const finalFormData = {
      ...formData,
      whatsappNumber: cleanWa || formData.whatsappNumber
    };
    setFormData(finalFormData);
    if (onUpdateConfig) onUpdateConfig(finalFormData);
    const msg = 'Config sudah tersimpan!';
    setSaveSuccessMsg(msg);
    if (triggerToast) triggerToast(`✅ ${msg}`);
    setTimeout(() => {
      setSaveSuccessMsg('');
    }, 4000);
  };

  // Generate plain config.txt format string
  const generateConfigText = () => {
    return `# ====================================================
# CONFIGURATION FILE FOR MAGICAL WEBSITE
# Edit parameter di bawah ini untuk menganti IP, Link Host, WhatsApp, Discord, dll.
# ====================================================

# IP Server & Domain Host
HOST_IP=${formData.hostIp}
HOST_DOMAIN=${formData.hostDomain}

# Link HOST Android (PowerTunnel), iOS (Surge 5) & APK GTPS
VHOST_ANDROID_URL=${formData.vhostAndroidUrl}
VHOST_IOS_URL=${formData.vhostIosUrl}
APK_URL=${formData.apkUrl || ''}
HOST_TXT_CONTENT=${(formData.hostTxtContent || '').replace(/\n/g, '\\n')}

# Kontak & Komunitas
WHATSAPP_NUMBER=${formData.whatsappNumber}
WHATSAPP_GROUP_LINK=${formData.whatsappGroupLink}
DISCORD_INVITE=${formData.discordInvite}

# Profil Server
PROFILE_HANDLE=${formData.profileHandle}
PROFILE_TITLE=${formData.profileTitle}
TAGLINE=${config.tagline || 'Experience the ultimate GTPS gameplay with exclusive features! ⚡'}
CATEGORIES=${config.categories || 'Growtopia • Magical Private Server • Community'}
COPYRIGHT_TEXT=${config.copyrightText || '© 2026 Copyright by Magical Private Server'}
GUIDE_TITLE=${config.guideTitle || 'Cara Bermain Magical PS'}

# URL Gambar & Musik Latar (Opsional)
BANNER_URL=${config.bannerUrl || '/banner.png'}
AVATAR_URL=${config.avatarUrl || '/logo.png'}
AUDIO_URL=${config.audioUrl || '/bgm.mp3'}
`;
  };

  const handleDownloadConfigFile = () => {
    const textContent = generateConfigText();
    const element = document.createElement("a");
    const file = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = "config.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    if (triggerToast) triggerToast("File config.txt berhasil didownload!");
  };

  const handleCopyConfigText = () => {
    const textContent = generateConfigText();
    navigator.clipboard.writeText(textContent);
    if (triggerToast) triggerToast("Teks config.txt berhasil disalin!");
  };


  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="relative w-full max-w-md lg:max-w-xl xl:max-w-2xl bg-gradient-to-b from-[#140a2d] via-[#100826] to-[#09041a] rounded-3xl p-5 sm:p-6 border-2 border-purple-500/60 text-left z-10 overflow-hidden my-auto shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-purple-950/80 text-purple-300 hover:bg-purple-900 transition-colors cursor-pointer border border-purple-400/50 z-20"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center shrink-0 border-2 border-white shadow-md">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white font-heading leading-tight">
                SETTINGS & Host Editor
              </h3>
              <p className="text-xs text-purple-100/90 font-medium">
                Ubah IP Host, Domain, vHost URL, dan Kontak Server.
              </p>
            </div>
          </div>

          {!isUnlocked ? (
            /* PIN / Password Auth Screen */
            <form onSubmit={handleUnlock} className="space-y-4 my-2">
              <div className="p-4 rounded-2xl bg-black/50 border border-white/40 text-center">
                <KeyRound className="w-10 h-10 text-amber-300 mx-auto mb-2" />
                <h4 className="text-sm font-black text-white">Masukkan Kunci Akses Admin</h4>
                <p className="text-xs text-purple-200/80 mt-1">
                  Masukkan PIN kunci admin untuk membuka menu setting pengubahan Host & URL.
                </p>

                <input
                  type="password"
                  value={securityPin}
                  onChange={(e) => setSecurityPin(e.target.value)}
                  placeholder="Masukkan PIN Admin"
                  className="w-full mt-3 px-4 py-2.5 rounded-xl bg-black/80 border-2 border-white/60 text-white text-center font-mono font-bold tracking-widest focus:outline-none focus:border-amber-400"
                />

                {pinError && (
                  <p className="text-xs text-rose-300 font-semibold mt-2 flex items-center justify-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>{pinError}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-stone-950 font-black text-sm rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer border-2 border-white shadow-md"
              >
                <KeyRound className="w-4 h-4" />
                <span>BUKA SETTINGS</span>
              </button>
            </form>
          ) : (
            /* Unlocked Config Form Editor */
            <div className="space-y-3.5 max-h-[65vh] overflow-y-auto pr-1">
              <div className="px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-400/60 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Akses SETTINGS Terbuka! Silakan ubah data di bawah ini:</span>
              </div>

              {/* Form Input Group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-black text-white mb-1">HOST IP SERVER:</label>
                  <input
                    type="text"
                    value={formData.hostIp}
                    onChange={(e) => handleInputChange('hostIp', e.target.value)}
                    placeholder="Contoh: 54.196.114.129"
                    className="w-full px-3 py-2 rounded-xl bg-black/70 border border-white/50 text-amber-300 font-mono font-semibold focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block font-black text-white mb-1">HOST DOMAIN:</label>
                  <input
                    type="text"
                    value={formData.hostDomain}
                    onChange={(e) => handleInputChange('hostDomain', e.target.value)}
                    placeholder="Contoh: www.growtopia1.com"
                    className="w-full px-3 py-2 rounded-xl bg-black/70 border border-white/50 text-purple-200 font-mono font-semibold focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block font-black text-white mb-1">URL HOST ANDROID (PowerTunnel):</label>
                  <input
                    type="text"
                    value={formData.vhostAndroidUrl}
                    onChange={(e) => handleInputChange('vhostAndroidUrl', e.target.value)}
                    placeholder="https://gtpshost.com/raw/..."
                    className="w-full px-3 py-2 rounded-xl bg-black/70 border border-white/50 text-white font-mono font-semibold focus:outline-none focus:border-white text-[11px]"
                  />
                </div>

                <div>
                  <label className="block font-black text-white mb-1">URL HOST IOS (Surge 5):</label>
                  <input
                    type="text"
                    value={formData.vhostIosUrl}
                    onChange={(e) => handleInputChange('vhostIosUrl', e.target.value)}
                    placeholder="https://gtpshost.com/ios/..."
                    className="w-full px-3 py-2 rounded-xl bg-black/70 border border-white/50 text-white font-mono font-semibold focus:outline-none focus:border-white text-[11px]"
                  />
                </div>

                <div>
                  <label className="block font-black text-amber-300 mb-1">LINK DOWNLOAD APK GTPS (MediaFire):</label>
                  <input
                    type="text"
                    value={formData.apkUrl || ''}
                    onChange={(e) => handleInputChange('apkUrl', e.target.value)}
                    placeholder="https://www.mediafire.com/file/..."
                    className="w-full px-3 py-2 rounded-xl bg-black/70 border border-amber-400/60 text-amber-300 font-mono font-semibold focus:outline-none focus:border-amber-300 text-[11px]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-black text-purple-300 mb-1">ISI FILE HOST (.TXT DOWNLOAD):</label>
                  <textarea
                    rows={3}
                    value={formData.hostTxtContent || ''}
                    onChange={(e) => handleInputChange('hostTxtContent', e.target.value)}
                    placeholder="54.196.114.129 www.growtopia1.com..."
                    className="w-full px-3 py-2 rounded-xl bg-black/70 border border-purple-500/60 text-purple-200 font-mono text-[11px] leading-snug focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block font-black text-white mb-1">NOMOR WHATSAPP ADMIN:</label>
                  <input
                    type="text"
                    value={formData.whatsappNumber}
                    onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                    placeholder="Contoh: 6281234567890"
                    className="w-full px-3 py-2 rounded-xl bg-black/70 border border-white/50 text-emerald-300 font-mono font-semibold focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block font-black text-white mb-1">LINK GROUP WHATSAPP:</label>
                  <input
                    type="text"
                    value={formData.whatsappGroupLink}
                    onChange={(e) => handleInputChange('whatsappGroupLink', e.target.value)}
                    placeholder="https://chat.whatsapp.com/..."
                    className="w-full px-3 py-2 rounded-xl bg-black/70 border border-white/50 text-white font-mono font-semibold focus:outline-none focus:border-white text-[11px]"
                  />
                </div>

                <div>
                  <label className="block font-black text-white mb-1">LINK DISCORD INVITE:</label>
                  <input
                    type="text"
                    value={formData.discordInvite}
                    onChange={(e) => handleInputChange('discordInvite', e.target.value)}
                    placeholder="https://discord.gg/..."
                    className="w-full px-3 py-2 rounded-xl bg-black/70 border border-white/50 text-white font-mono font-semibold focus:outline-none focus:border-white text-[11px]"
                  />
                </div>

                <div>
                  <label className="block font-black text-white mb-1">NAMA SERVER (HANDLE):</label>
                  <input
                    type="text"
                    value={formData.profileHandle}
                    onChange={(e) => handleInputChange('profileHandle', e.target.value)}
                    placeholder="Magical Private Server"
                    className="w-full px-3 py-2 rounded-xl bg-black/70 border border-white/50 text-white font-semibold focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block font-black text-white mb-1">TITLE SERVER:</label>
                  <input
                    type="text"
                    value={formData.profileTitle}
                    onChange={(e) => handleInputChange('profileTitle', e.target.value)}
                    placeholder="Best Growtopia Private Server 🚀"
                    className="w-full px-3 py-2 rounded-xl bg-black/70 border border-white/50 text-white font-semibold focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                {saveSuccessMsg && (
                  <div className="p-3 bg-emerald-500/90 border-2 border-white rounded-xl text-white font-black text-center text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg">
                    <CheckCircle2 className="w-5 h-5 text-amber-300" />
                    <span>{saveSuccessMsg}</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleSaveConfig}
                  className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-black text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer border-2 border-white/80 shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>SIMPAN PERUBAHAN KE WEB</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleDownloadConfigFile}
                    className="flex-1 py-2 px-3 bg-indigo-700 hover:bg-indigo-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-white/60"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download config.txt</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyConfigText}
                    className="flex-1 py-2 px-3 bg-purple-800 hover:bg-purple-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-white/60"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Config.txt</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
