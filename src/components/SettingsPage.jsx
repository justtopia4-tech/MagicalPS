import React, { useState, useEffect } from 'react';
import { ArrowLeft, Lock, KeyRound, Save, Download, Copy, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import ShootingStarsBackground from './ShootingStarsBackground';

export default function SettingsPage({ config, onUpdateConfig, onNavigateHome, triggerToast }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [securityPin, setSecurityPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

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
    profileTitle: '',
    audioUrl: '/bgm.mp3',
    bannerUrl: '/banner.png',
    avatarUrl: '/logo.png'
  });

  useEffect(() => {
    if (config) {
      setFormData({
        hostIp: config.hostIp || '',
        hostDomain: config.hostDomain || '',
        vhostAndroidUrl: config.vhostAndroidUrl || '',
        vhostIosUrl: config.vhostIosUrl || '',
        apkUrl: config.apkUrl || '',
        hostTxtContent: config.hostTxtContent || '100.30.125.206 www.growtopia1.com\n100.30.125.206 www.growtopia2.com\n# Magical ~ delivered by gtpshost.com',
        whatsappNumber: config.whatsappNumber || '',
        whatsappGroupLink: config.whatsappGroupLink || '',
        discordInvite: config.discordInvite || '',
        profileHandle: config.profileHandle || '',
        profileTitle: config.profileTitle || '',
        audioUrl: config.audioUrl || '/bgm.mp3',
        bannerUrl: config.bannerUrl || '/banner.png',
        avatarUrl: config.avatarUrl || '/logo.png'
      });
    }
  }, [config]);

  const validPins = ['nopyasik991', 'admin123', 'magical2026', '1234', 'admin'];

  const handleUnlock = (e) => {
    e.preventDefault();
    if (validPins.includes(securityPin.trim().toLowerCase())) {
      setIsUnlocked(true);
      setPinError('');
    } else {
      setPinError('PIN salah! Masukkan PIN admin yang benar (misal: admin123 atau nopyasik991).');
    }
  };

  const handleInputChange = (field, value) => {
    let updated = { ...formData, [field]: value };
    if (field === 'hostIp' && value.trim()) {
      const cleanIp = value.trim();
      const domain = formData.hostDomain || 'www.growtopia1.com';
      const baseUrl = (typeof window !== 'undefined' && window.location.origin && window.location.origin !== 'null') 
        ? window.location.origin 
        : 'https://magicalps.vercel.app';
      updated.vhostAndroidUrl = `${baseUrl}/host/${cleanIp}`;
      updated.vhostIosUrl = `${baseUrl}/ios/${cleanIp}`;
      updated.hostTxtContent = `${cleanIp} ${domain}\n${cleanIp} www.growtopia2.com\n# Magical ~ delivered by gtpshost.com`;
    }
    setFormData(updated);
    if (onUpdateConfig) {
      onUpdateConfig(updated);
    }
  };

  const handleSaveConfig = async () => {
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

    setIsPublishing(true);
    try {
      const res = await fetch('/api/save-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pin: securityPin.trim() || 'admin123',
          config: finalFormData
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        const msg = 'Config tersimpan & otomatis dipublish ke Server Live!';
        setSaveSuccessMsg(msg);
        if (triggerToast) triggerToast(`âœ… ${msg}`);
      } else {
        const msg = 'Tersimpan lokal di browser! (Server sync: ' + (data.error || 'Tersimpan') + ')';
        setSaveSuccessMsg(msg);
        if (triggerToast) triggerToast(msg);
      }
    } catch (_) {
      const msg = 'Config tersimpan di browser Anda!';
      setSaveSuccessMsg(msg);
      if (triggerToast) triggerToast(`âœ… ${msg}`);
    } finally {
      setIsPublishing(false);
      setTimeout(() => {
        setSaveSuccessMsg('');
      }, 5000);
    }
  };

  const generateConfigText = () => {
    return `# ====================================================
# CONFIGURATION FILE FOR MAGICAL WEBSITE
# Edit parameter di bawah ini untuk mengganti IP, Link Host, WhatsApp, Discord, dll.
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
TAGLINE=${config.tagline || 'Experience the ultimate GTPS gameplay with exclusive features! âš¡'}
CATEGORIES=${config.categories || 'Growtopia â€¢ Magical Private Server â€¢ Community'}
COPYRIGHT_TEXT=${config.copyrightText || 'Â© 2026 Copyright by Magical Private Server'}
GUIDE_TITLE=${config.guideTitle || 'Cara Bermain Magical PS'}

# URL Gambar & Musik Latar (Opsional)
BANNER_URL=${formData.bannerUrl || '/banner.png'}
AVATAR_URL=${formData.avatarUrl || '/logo.png'}
AUDIO_URL=${formData.audioUrl || '/bgm.mp3'}
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
    <div className="relative min-h-screen bg-black text-purple-100 flex flex-col justify-between overflow-x-hidden selection:bg-purple-600 selection:text-white">
      {/* Background Video / Particles */}
      <ShootingStarsBackground videoUrl={config.backgroundVideoUrl || config.bannerUrl} />

      <div className="relative z-10 flex-grow flex flex-col items-center p-4 sm:p-6 lg:p-8">
        
        {/* Navigation Header */}
        <div className="w-full max-w-3xl flex items-center justify-between mb-6 sm:mb-8">
          <button
            onClick={onNavigateHome}
            className="py-2.5 px-4 rounded-2xl bg-purple-950/80 hover:bg-purple-900/90 text-purple-200 hover:text-white border-2 border-purple-500/50 cursor-pointer transition-all flex items-center gap-2 text-xs sm:text-sm font-black shadow-lg hover:shadow-purple-500/20 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-purple-300" />
            <span>Kembali ke Website Utama</span>
          </button>

          <div className="px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/40 text-amber-300 text-xs font-black flex items-center gap-1.5 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>ADMIN DASHBOARD (/ADMIN)</span>
          </div>
        </div>

        {/* Settings Card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="relative w-full max-w-3xl bg-gradient-to-b from-[#140a2d] via-[#100826] to-[#09041a] rounded-3xl p-5 sm:p-8 border-2 border-purple-500/70 text-left z-10 shadow-2xl shadow-purple-950/80 my-auto"
        >
          {/* Card Header */}
          <div className="flex items-center gap-3.5 pb-5 mb-5 border-b border-purple-500/30">
            <div className="w-11 h-11 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center shrink-0 border-2 border-white shadow-lg">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white font-heading leading-tight flex items-center gap-2">
                SETTINGS & Host Editor
              </h2>
              <p className="text-xs sm:text-sm text-purple-200/90 font-semibold mt-0.5">
                Pengaturan terpisah Server GTPS (IP Host, Domain, vHost URL, APK Link, WA & Discord).
              </p>
            </div>
          </div>

          {!isUnlocked ? (
            /* PIN / Password Auth Screen */
            <form onSubmit={handleUnlock} className="space-y-4 my-4 max-w-md mx-auto">
              <div className="p-6 rounded-2xl bg-black/60 border-2 border-purple-500/40 text-center shadow-inner">
                <KeyRound className="w-12 h-12 text-amber-300 mx-auto mb-3 animate-pulse" />
                <h3 className="text-base sm:text-lg font-black text-white">Masukkan Kunci Akses Admin</h3>
                <p className="text-xs sm:text-sm text-purple-200/80 mt-1.5 leading-relaxed">
                  Masukkan PIN kunci admin untuk mengedit konfigurasi Host Server GTPS.
                </p>

                <input
                  type="password"
                  value={securityPin}
                  onChange={(e) => setSecurityPin(e.target.value)}
                  placeholder="Masukkan PIN Admin"
                  className="w-full mt-4 px-4 py-3 rounded-xl bg-black/90 border-2 border-purple-400/60 text-amber-300 text-center font-mono font-bold tracking-widest focus:outline-none focus:border-amber-400 text-base shadow-lg"
                  autoFocus
                />

                {pinError && (
                  <p className="text-xs sm:text-sm text-rose-300 font-bold mt-3 flex items-center justify-center gap-1.5 bg-rose-950/80 p-2 rounded-xl border border-rose-500/50">
                    <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{pinError}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-stone-950 font-black text-sm sm:text-base rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer border-2 border-white shadow-xl active:scale-95"
              >
                <KeyRound className="w-5 h-5" />
                <span>BUKA SETTINGS PAGE</span>
              </button>
            </form>
          ) : (
            /* Unlocked Config Form Editor */
            <div className="space-y-4">
              <div className="px-4 py-2.5 rounded-xl bg-emerald-950/90 border-2 border-emerald-400/70 text-emerald-300 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Akses SETTINGS /NOPY Terbuka! Silakan ubah data konfigurasi di bawah ini:</span>
              </div>

              {/* Form Input Group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm pt-2">
                <div>
                  <label className="block font-black text-white mb-1.5">HOST IP SERVER:</label>
                  <input
                    type="text"
                    value={formData.hostIp}
                    onChange={(e) => handleInputChange('hostIp', e.target.value)}
                    placeholder="Contoh: 100.30.125.206"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/80 border-2 border-purple-500/50 text-amber-300 font-mono font-semibold focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block font-black text-white mb-1.5">HOST DOMAIN:</label>
                  <input
                    type="text"
                    value={formData.hostDomain}
                    onChange={(e) => handleInputChange('hostDomain', e.target.value)}
                    placeholder="Contoh: www.growtopia1.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/80 border-2 border-purple-500/50 text-purple-200 font-mono font-semibold focus:outline-none focus:border-purple-300"
                  />
                </div>

                <div>
                  <label className="block font-black text-white mb-1.5">URL HOST ANDROID (PowerTunnel):</label>
                  <input
                    type="text"
                    value={formData.vhostAndroidUrl}
                    onChange={(e) => handleInputChange('vhostAndroidUrl', e.target.value)}
                    placeholder="https://gtpshost.com/raw/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/80 border-2 border-purple-500/50 text-white font-mono font-semibold focus:outline-none focus:border-purple-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-black text-white mb-1.5">URL HOST IOS (Surge 5):</label>
                  <input
                    type="text"
                    value={formData.vhostIosUrl}
                    onChange={(e) => handleInputChange('vhostIosUrl', e.target.value)}
                    placeholder="https://gtpshost.com/ios/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/80 border-2 border-purple-500/50 text-white font-mono font-semibold focus:outline-none focus:border-purple-300 text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-black text-amber-300 mb-1.5">LINK DOWNLOAD APK GTPS (MediaFire):</label>
                  <input
                    type="text"
                    value={formData.apkUrl || ''}
                    onChange={(e) => handleInputChange('apkUrl', e.target.value)}
                    placeholder="https://www.mediafire.com/file/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/80 border-2 border-amber-400/60 text-amber-300 font-mono font-semibold focus:outline-none focus:border-amber-300 text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-black text-purple-300 mb-1.5">ISI FILE HOST (.TXT DOWNLOAD):</label>
                  <textarea
                    rows={4}
                    value={formData.hostTxtContent || ''}
                    onChange={(e) => handleInputChange('hostTxtContent', e.target.value)}
                    placeholder="100.30.125.206 www.growtopia1.com..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/80 border-2 border-purple-500/60 text-purple-200 font-mono text-xs leading-relaxed focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block font-black text-white mb-1.5">NOMOR WHATSAPP ADMIN:</label>
                  <input
                    type="text"
                    value={formData.whatsappNumber}
                    onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                    placeholder="Contoh: 6281234567890"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/80 border-2 border-purple-500/50 text-emerald-300 font-mono font-semibold focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block font-black text-white mb-1.5">LINK GROUP WHATSAPP:</label>
                  <input
                    type="text"
                    value={formData.whatsappGroupLink}
                    onChange={(e) => handleInputChange('whatsappGroupLink', e.target.value)}
                    placeholder="https://chat.whatsapp.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/80 border-2 border-purple-500/50 text-white font-mono font-semibold focus:outline-none focus:border-purple-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-black text-white mb-1.5">LINK DISCORD INVITE:</label>
                  <input
                    type="text"
                    value={formData.discordInvite}
                    onChange={(e) => handleInputChange('discordInvite', e.target.value)}
                    placeholder="https://discord.gg/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/80 border-2 border-purple-500/50 text-indigo-300 font-mono font-semibold focus:outline-none focus:border-indigo-400 text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-black text-amber-300 mb-1.5">URL MUSIK LATAR BGM (.MP3):</label>
                  <input
                    type="text"
                    value={formData.audioUrl || '/bgm.mp3'}
                    onChange={(e) => handleInputChange('audioUrl', e.target.value)}
                    placeholder="/bgm.mp3"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/80 border-2 border-amber-400/60 text-amber-300 font-mono font-semibold focus:outline-none focus:border-amber-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-black text-white mb-1.5">NAMA SERVER (HANDLE):</label>
                  <input
                    type="text"
                    value={formData.profileHandle}
                    onChange={(e) => handleInputChange('profileHandle', e.target.value)}
                    placeholder="Magical Private Server"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/80 border-2 border-purple-500/50 text-white font-semibold focus:outline-none focus:border-purple-300"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-black text-white mb-1.5">TITLE SERVER:</label>
                  <input
                    type="text"
                    value={formData.profileTitle}
                    onChange={(e) => handleInputChange('profileTitle', e.target.value)}
                    placeholder="Best Growtopia Private Server ðŸš€"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/80 border-2 border-purple-500/50 text-white font-semibold focus:outline-none focus:border-purple-300"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 space-y-3">
                {saveSuccessMsg && (
                  <div className="p-3.5 bg-emerald-500/90 border-2 border-white rounded-xl text-white font-black text-center text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg">
                    <CheckCircle2 className="w-5 h-5 text-amber-300" />
                    <span>{saveSuccessMsg}</span>
                  </div>
                )}

                <button
                  type="button"
                  disabled={isPublishing}
                  onClick={handleSaveConfig}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-600 hover:from-emerald-400 hover:to-green-500 disabled:opacity-50 text-white font-black text-sm sm:text-base rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer border-2 border-white shadow-xl active:scale-95"
                >
                  <Save className="w-5 h-5" />
                  <span>{isPublishing ? 'SEDANG MEMPUBLISH KE SERVER...' : 'SIMPAN & PUBLISH KE SERVER'}</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleDownloadConfigFile}
                    className="flex-1 py-2.5 px-3 bg-indigo-700 hover:bg-indigo-600 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer border border-white/60 shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download config.txt</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyConfigText}
                    className="flex-1 py-2.5 px-3 bg-purple-800 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer border border-white/60 shadow-md"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copy Config.txt</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
