import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import NavigationTabs from './components/NavigationTabs';
import ConnectionGuide from './components/ConnectionGuide';
import RoleStore from './components/RoleStore';
import AssetsStore from './components/AssetsStore';
import CopyHostModal from './components/CopyHostModal';
import OrderModal from './components/OrderModal';
import WelcomeModal from './components/WelcomeModal';
import SettingsModal from './components/SettingsModal';
import SettingsPage from './components/SettingsPage';
import ShootingStarsBackground from './components/ShootingStarsBackground';
import Footer from './components/Footer';

import {
  siteConfig,
  connectionGuides,
  roleStoreData,
  assetCategories,
  assetsData
} from './data/gtpsData';

function parseConfigText(text) {
  const configMap = {};
  text.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const value = trimmed.slice(idx + 1).trim();
        configMap[key] = value;
      }
    }
  });
  return configMap;
}

const roleThemeMap = {
  purple: {
    border: "border-purple-500/80",
    text: "text-purple-400",
    badgeBg: "bg-purple-950/80 text-purple-300 border-purple-500/50",
    glow: "shadow-purple-500/20",
    iconBg: "bg-purple-600 text-white",
    codeBg: "bg-purple-950/40 border-purple-800/60"
  },
  yellow: {
    border: "border-yellow-500/80",
    text: "text-yellow-400",
    badgeBg: "bg-yellow-950/80 text-yellow-300 border-yellow-500/50",
    glow: "shadow-yellow-500/20",
    iconBg: "bg-yellow-500 text-stone-950",
    codeBg: "bg-yellow-950/40 border-yellow-800/60"
  },
  orange: {
    border: "border-orange-500/80",
    text: "text-orange-400",
    badgeBg: "bg-orange-950/80 text-orange-300 border-orange-500/50",
    glow: "shadow-orange-500/20",
    iconBg: "bg-orange-500 text-stone-950",
    codeBg: "bg-orange-950/40 border-orange-800/60"
  },
  sky: {
    border: "border-sky-500/80",
    text: "text-sky-400",
    badgeBg: "bg-sky-950/80 text-sky-300 border-sky-500/50",
    glow: "shadow-sky-500/20",
    iconBg: "bg-sky-500 text-stone-950",
    codeBg: "bg-sky-950/40 border-sky-800/60"
  },
  indigo: {
    border: "border-indigo-500/80",
    text: "text-indigo-400",
    badgeBg: "bg-indigo-950/80 text-indigo-300 border-indigo-500/50",
    glow: "shadow-indigo-500/20",
    iconBg: "bg-indigo-500 text-white",
    codeBg: "bg-indigo-950/40 border-indigo-800/60"
  },
  emerald: {
    border: "border-emerald-500/80",
    text: "text-emerald-400",
    badgeBg: "bg-emerald-950/80 text-emerald-300 border-emerald-500/50",
    glow: "shadow-emerald-500/20",
    iconBg: "bg-emerald-500 text-stone-950",
    codeBg: "bg-emerald-950/40 border-emerald-800/60"
  }
};

function parseRolesText(text) {
  const blocks = text.split(/\[ROLE\]/i).filter(b => b.trim().length > 0);
  const roles = blocks.map((block, index) => {
    const lines = block.split('\n');
    let id = `role-${index}`;
    let name = '';
    let price = '';
    let badge = '';
    let color = 'sky';
    let commandsHeader = 'GET PRIVILEGE:';
    let commandsLines = [];
    let privilegesLines = [];
    let mode = null;

    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;

      const upper = trimmed.toUpperCase();
      if (upper.startsWith('COMMANDS=')) {
        mode = 'COMMANDS';
        const rest = line.slice(line.indexOf('=') + 1).trim();
        if (rest) commandsLines.push(rest);
        return;
      }

      if (upper.startsWith('PRIVILEGES=')) {
        mode = 'PRIVILEGES';
        const rest = line.slice(line.indexOf('=') + 1).trim();
        if (rest) privilegesLines.push(rest);
        return;
      }

      if (trimmed.includes('=')) {
        const key = trimmed.split('=')[0].trim().toUpperCase();
        if (['ID', 'NAME', 'PRICE', 'BADGE', 'COLOR', 'COMMANDS_HEADER'].includes(key)) {
          mode = null;
          const value = trimmed.slice(trimmed.indexOf('=') + 1).trim();
          if (key === 'ID') id = value;
          else if (key === 'NAME') name = value;
          else if (key === 'PRICE') price = value;
          else if (key === 'BADGE') badge = value;
          else if (key === 'COLOR') color = value;
          else if (key === 'COMMANDS_HEADER') commandsHeader = value;
          return;
        }
      }

      if (mode === 'COMMANDS') {
        commandsLines.push(line);
      } else if (mode === 'PRIVILEGES') {
        if (trimmed.startsWith('-') || trimmed.startsWith('>')) {
          privilegesLines.push(trimmed.replace(/^[->]\s*/, ''));
        } else {
          privilegesLines.push(trimmed);
        }
      }
    });

    const theme = roleThemeMap[color.toLowerCase()] || roleThemeMap.sky;

    return {
      id,
      name,
      price,
      badge,
      theme,
      commandsHeader,
      commands: commandsLines.join('\n'),
      privileges: privilegesLines
    };
  });

  return roles.filter(r => r.name.length > 0);
}

// Single persistent BGM Audio instance outside React lifecycle
let globalAudioInstance = null;

function getBgmAudio() {
  if (typeof window === 'undefined') return null;
  if (!globalAudioInstance) {
    globalAudioInstance = new Audio('/bgm.mp3');
    globalAudioInstance.loop = true;
  }
  return globalAudioInstance;
}

export default function App() {
  const [activeTab, setActiveTab] = useState('guide');
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(true);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [selectedOrderItem, setSelectedOrderItem] = useState(null);
  const [copyToast, setCopyToast] = useState('');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const isNopyRoute = () => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    return path.includes('nopy') || hash.includes('nopy') || search.includes('nopy');
  };

  const [currentPath, setCurrentPath] = useState(() => {
    return isNopyRoute() ? '/nopy' : '/';
  });

  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentPath(isNopyRoute() ? '/nopy' : '/');
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []);

  const navigateTo = (path) => {
    try {
      window.history.pushState(null, '', path);
    } catch (_) {
      window.location.hash = path === '/nopy' ? 'nopy' : '';
    }
    setCurrentPath(path);
  };
  const [config, setConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('magical_saved_config');
      if (saved) {
        const parsedSaved = JSON.parse(saved);
        if (parsedSaved.bannerUrl === '/banner.mp4') delete parsedSaved.bannerUrl;
        if (parsedSaved.backgroundVideoUrl === '/banner.mp4') delete parsedSaved.backgroundVideoUrl;
        const validAudio = (parsedSaved.audioUrl && parsedSaved.audioUrl.trim()) ? parsedSaved.audioUrl : '/bgm.mp3';
        return { ...siteConfig, ...parsedSaved, audioUrl: validAudio };
      }
    } catch (e) {
      console.warn("Failed to load saved config from localStorage:", e);
    }
    return siteConfig;
  });
  const [roles, setRoles] = useState(roleStoreData);

  const handleUpdateConfig = (newConfig) => {
    setConfig(prev => {
      const updated = {
        ...prev,
        ...newConfig,
        audioUrl: (newConfig && newConfig.audioUrl && newConfig.audioUrl.trim()) ? newConfig.audioUrl : (prev.audioUrl || siteConfig.audioUrl || '/bgm.mp3')
      };
      try {
        localStorage.setItem('magical_saved_config', JSON.stringify(updated));
      } catch (e) {
        console.warn("Failed to save config to localStorage:", e);
      }
      return updated;
    });
  };

  const playBgm = () => {
    const audio = getBgmAudio();
    if (!audio) return;
    if (audio.paused) {
      audio.volume = 0.5;
      audio.play()
        .then(() => setIsAudioPlaying(true))
        .catch((e) => console.warn("BGM Play Notice:", e));
    }
  };

  const pauseBgm = () => {
    if (globalAudioInstance) {
      globalAudioInstance.pause();
    }
    setIsAudioPlaying(false);
  };

  const handleCloseWelcomeModal = () => {
    setIsWelcomeModalOpen(false);
    playBgm();
  };

  // Load dynamic /config.txt on startup with cache busting & multi-endpoint fallback
  useEffect(() => {
    const loadConfig = async () => {
      const endpoints = [
        '/config.txt?t=' + Date.now(),
        `http://${siteConfig.hostIp}/config.txt?t=` + Date.now(),
        'http://127.0.0.1/config.txt?t=' + Date.now(),
        'http://localhost/config.txt?t=' + Date.now()
      ];

      for (const url of endpoints) {
        try {
          const res = await fetch(url, { signal: AbortSignal.timeout(2000) });
          if (res.ok) {
            const text = await res.text();
            if (text && (text.includes('HOST_IP') || text.includes('PROFILE_HANDLE'))) {
              const parsed = parseConfigText(text);
              let saved = {};
              try {
                const savedStr = localStorage.getItem('magical_saved_config');
                if (savedStr) {
                  saved = JSON.parse(savedStr);
                  if (saved.bannerUrl === '/banner.mp4') delete saved.bannerUrl;
                  if (saved.backgroundVideoUrl === '/banner.mp4') delete saved.backgroundVideoUrl;
                }
              } catch (e) {}

              setConfig(prev => {
                const parsedValues = {
                  ...(parsed.HOST_IP ? { hostIp: parsed.HOST_IP } : {}),
                  ...(parsed.HOST_DOMAIN ? { hostDomain: parsed.HOST_DOMAIN } : {}),
                  ...(parsed.VHOST_ANDROID_URL ? { vhostAndroidUrl: parsed.VHOST_ANDROID_URL } : {}),
                  ...(parsed.VHOST_IOS_URL ? { vhostIosUrl: parsed.VHOST_IOS_URL } : {}),
                  ...(parsed.APK_URL ? { apkUrl: parsed.APK_URL } : {}),
                  ...(parsed.HOST_TXT_CONTENT ? { hostTxtContent: parsed.HOST_TXT_CONTENT.replace(/\\n/g, '\n') } : {}),
                  ...(parsed.WHATSAPP_NUMBER !== undefined && parsed.WHATSAPP_NUMBER !== '' ? { whatsappNumber: parsed.WHATSAPP_NUMBER } : {}),
                  ...(parsed.WHATSAPP_GROUP_LINK !== undefined && parsed.WHATSAPP_GROUP_LINK !== '' ? { whatsappGroupLink: parsed.WHATSAPP_GROUP_LINK } : {}),
                  ...(parsed.DISCORD_INVITE ? { discordInvite: parsed.DISCORD_INVITE } : {}),
                  ...(parsed.PROFILE_HANDLE ? { profileHandle: parsed.PROFILE_HANDLE } : {}),
                  ...(parsed.PROFILE_TITLE ? { profileTitle: parsed.PROFILE_TITLE } : {}),
                  ...(parsed.TAGLINE ? { tagline: parsed.TAGLINE } : {}),
                  ...(parsed.CATEGORIES ? { categories: parsed.CATEGORIES } : {}),
                  ...(parsed.COPYRIGHT_TEXT ? { copyrightText: parsed.COPYRIGHT_TEXT } : {}),
                  ...(parsed.GUIDE_TITLE ? { guideTitle: parsed.GUIDE_TITLE } : (parsed.PROFILE_HANDLE ? { guideTitle: `Cara Bermain ${parsed.PROFILE_HANDLE.split(' ')[0]} PS` } : {})),
                  ...(parsed.BANNER_URL && parsed.BANNER_URL !== '/banner.mp4' ? { bannerUrl: parsed.BANNER_URL } : {}),
                  ...(parsed.BACKGROUND_VIDEO_URL && parsed.BACKGROUND_VIDEO_URL !== '/banner.mp4' ? { backgroundVideoUrl: parsed.BACKGROUND_VIDEO_URL } : {}),
                  ...(parsed.AVATAR_URL ? { avatarUrl: parsed.AVATAR_URL } : {}),
                  ...(parsed.AUDIO_URL ? { audioUrl: parsed.AUDIO_URL } : {}),
                };
                const resolvedAudio = (saved.audioUrl && saved.audioUrl.trim()) ? saved.audioUrl : (parsedValues.audioUrl || prev.audioUrl || siteConfig.audioUrl || '/bgm.mp3');
                return { ...prev, ...parsedValues, ...saved, audioUrl: resolvedAudio };
              });
              return;
            }
          }
        } catch (_) {}
      }
    };

    loadConfig();
  }, []);

  // Load dynamic /roles.txt or /role.txt on startup with cache busting & multi-endpoint fallback
  useEffect(() => {
    const loadRoles = async () => {
      const targetIp = config.hostIp || siteConfig.hostIp;
      const endpoints = [
        '/roles.txt?t=' + Date.now(),
        '/role.txt?t=' + Date.now(),
        `http://${targetIp}/roles.txt?t=` + Date.now(),
        `http://${targetIp}/role.txt?t=` + Date.now(),
        'http://127.0.0.1/roles.txt?t=' + Date.now(),
        'http://localhost/roles.txt?t=' + Date.now()
      ];

      for (const url of endpoints) {
        try {
          const res = await fetch(url, { signal: AbortSignal.timeout(2000) });
          if (res.ok) {
            const text = await res.text();
            const parsedRoles = parseRolesText(text);
            if (parsedRoles && parsedRoles.length > 0) {
              setRoles(parsedRoles);
              return;
            }
          }
        } catch (_) {}
      }
    };

    loadRoles();
  }, [config.hostIp]);

  // Initialize & Autoplay BGM Audio
  useEffect(() => {
    const audio = getBgmAudio();
    if (audio) {
      const handlePlay = () => setIsAudioPlaying(true);
      const handlePause = () => setIsAudioPlaying(false);

      audio.addEventListener('play', handlePlay);
      audio.addEventListener('playing', handlePlay);
      audio.addEventListener('pause', handlePause);
      audio.addEventListener('ended', handlePause);

      if (!audio.paused) {
        setIsAudioPlaying(true);
      }

      playBgm();

      const handleUserInteraction = () => {
        playBgm();
      };

      window.addEventListener('click', handleUserInteraction, { passive: true });
      window.addEventListener('touchstart', handleUserInteraction, { passive: true });
      window.addEventListener('keydown', handleUserInteraction, { passive: true });
      window.addEventListener('pointerdown', handleUserInteraction, { passive: true });

      return () => {
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('playing', handlePlay);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('ended', handlePause);
        window.removeEventListener('click', handleUserInteraction);
        window.removeEventListener('touchstart', handleUserInteraction);
        window.removeEventListener('keydown', handleUserInteraction);
        window.removeEventListener('pointerdown', handleUserInteraction);
      };
    }
  }, []);

  // Audio BGM Manual Toggle
  const toggleAudio = () => {
    const audio = getBgmAudio();
    if (!audio) return;
    if (audio.paused) {
      audio.volume = 0.5;
      audio.play()
        .then(() => setIsAudioPlaying(true))
        .catch(err => console.warn("Toggle audio play notice:", err));
    } else {
      pauseBgm();
    }
  };

  // Toast Notification Trigger
  const triggerToast = (msg) => {
    setCopyToast(msg);
    setTimeout(() => {
      setCopyToast('');
    }, 2500);
  };

  // Copy to Clipboard Handler
  const handleCopyText = (text, successMsg) => {
    navigator.clipboard.writeText(text);
    triggerToast(successMsg || "Copied to clipboard!");
  };

  // Connection Guide Action Handler
  const handleExecuteGuideAction = (actionType) => {
    const getAbsUrl = (url) => {
      if (!url) return '';
      if (url.startsWith('http://') || url.startsWith('https://')) return url;
      const origin = (typeof window !== 'undefined' && window.location.origin && window.location.origin !== 'null') ? window.location.origin : 'https://magicalps.vercel.app';
      return `${origin}${url.startsWith('/') ? '' : '/'}${url}`;
    };

    if (actionType === 'copyHosts') {
      const hosts = `${config.hostIp} ${config.hostDomain}\n${config.hostIp} www.growtopia2.com`;
      handleCopyText(hosts, "Host entries copied!");
    } else if (actionType === 'copyVhostAndroid') {
      handleCopyText(getAbsUrl(config.vhostAndroidUrl), "Android HOST URL copied!");
    } else if (actionType === 'copyVhostIos') {
      handleCopyText(getAbsUrl(config.vhostIosUrl), "iOS HOST URL copied!");
    } else if (actionType === 'downloadApk') {
      const apkLink = config.apkUrl || "https://www.mediafire.com/file/3t16viuv6konhwd/magical+5.48.apk/file";
      window.open(apkLink, "_blank");
    } else if (actionType === 'downloadTxt') {
      const textContent = config.hostTxtContent || "100.30.125.206 www.growtopia1.com\n100.30.125.206 www.growtopia2.com\n# Magical ~ delivered by gtpshost.com";
      const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Magical - GTPSHOST.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      triggerToast("Downloading Magical - GTPSHOST.txt!");
    }
  };

  if (currentPath === '/nopy') {
    return (
      <SettingsPage
        config={config}
        onUpdateConfig={handleUpdateConfig}
        onNavigateHome={() => navigateTo('/')}
        triggerToast={triggerToast}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-purple-100 flex flex-col justify-between overflow-x-hidden">
      {/* Clean Sapphire Ambient Background with Banner & Particles */}
      <ShootingStarsBackground videoUrl={config.backgroundVideoUrl || config.bannerUrl} />

      <div className="relative z-10 flex-grow flex flex-col justify-between">
        <div>
          {/* Header */}
        <Header
          config={config}
          isAudioPlaying={isAudioPlaying}
          toggleAudio={toggleAudio}
          onOpenCopyModal={() => setIsCopyModalOpen(true)}
          onExecuteAction={handleExecuteGuideAction}
        />

        {/* Navigation Bar */}
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Active Tab View with Spring Transitions */}
        <main className="pb-8 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
            >
              {activeTab === 'guide' && (
                <ConnectionGuide
                  guides={connectionGuides}
                  onExecuteAction={handleExecuteGuideAction}
                  config={config}
                />
              )}

              {activeTab === 'roles' && (
                <RoleStore
                  roles={roles}
                  onOrderRole={(role) => setSelectedOrderItem(role)}
                />
              )}

              {activeTab === 'assets' && (
                <AssetsStore
                  categories={assetCategories}
                  assets={assetsData}
                  onOrderAsset={(asset) => setSelectedOrderItem(asset)}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
        </div>

        {/* Footer */}
        <Footer config={config} />
      </div>

      {/* Copy Host / URL Modal */}
      <CopyHostModal
        isOpen={isCopyModalOpen}
        onClose={() => setIsCopyModalOpen(false)}
        config={config}
        onCopyText={handleCopyText}
        onDownloadTxt={() => handleExecuteGuideAction('downloadTxt')}
        onDownloadApk={() => handleExecuteGuideAction('downloadApk')}
        copyToast={copyToast}
      />

      {/* Checkout Order Modal */}
      <OrderModal
        isOpen={!!selectedOrderItem}
        onClose={() => setSelectedOrderItem(null)}
        item={selectedOrderItem}
        config={config}
      />

      {/* Welcome Entry Modal */}
      <WelcomeModal
        isOpen={isWelcomeModalOpen}
        onClose={handleCloseWelcomeModal}
        config={config}
      />
    </div>
  );
}
