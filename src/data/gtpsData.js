export const siteConfig = {
  profileHandle: "Magical Private Server",
  profileTitle: "Best Growtopia Private Server 🚀",
  tagline: "🌟 Mulai Petualangan Baru Kamu di Magical GTPS! Nikmati Sensasi Main Growtopia Tanpa Batas, Fitur Role Keren, Komunitas Ramah & Admin Fast Response 24 Jam. Ayo Ajak Teman-Temanmu Dan Join Sekarang!",
  categories: "Growtopia • Magical Private Server • Community",
  bannerUrl: "/banner.png",
  backgroundVideoUrl: "/banner.png",
  avatarUrl: "/logo.png",
  audioUrl: "/bgm.mp3",
  copyrightText: "© 2026 Copyright by Magical Private Server",
  whatsappNumber: "6283147539636",
  whatsappGroupLink: "https://chat.whatsapp.com/BQYUgwp07bT5FgzTCR2x7X",
  discordInvite: "https://discord.gg/hWu4yWy79x",
  hostIp: "100.30.125.206",
  hostDomain: "www.growtopia1.com",
  vhostAndroidUrl: "/host/100.30.125.206",
  vhostIosUrl: "/ios/100.30.125.206",
  apkUrl: "https://www.mediafire.com/file/3t16viuv6konhwd/magical+5.48.apk/file",
  hostTxtContent: "100.30.125.206 www.growtopia1.com\n100.30.125.206 www.growtopia2.com\n# Magical ~ delivered by gtpshost.com"
};

export const connectionGuides = {
  android: [
    {
      number: "01",
      title: "Install PowerTunnel",
      description: "Download from official releases and install the APK on your device."
    },
    {
      number: "02",
      title: "Configure Host Settings",
      description: "Open PowerTunnel → ☰ → Host Settings → Host list URL"
    },
    {
      number: "03",
      title: "Magical - GTPSHOST",
      description: "Unduh file Magical - GTPSHOST.txt atau salin HOST URL di bawah ini untuk dimasukkan ke PowerTunnel.",
      actions: [
        { type: "downloadTxt", label: "DOWNLOAD MAGICAL.TXT 📄" },
        { type: "copyVhostAndroid", label: "Copy HOST URL" }
      ]
    },
    {
      number: "04",
      title: "Start",
      description: "Set Update period to On start, then press Start."
    },
    {
      number: "05",
      title: "Launch Growtopia",
      description: "Open Growtopia and click Play."
    }
  ],
  windows: [
    {
      number: "01",
      title: "Run Notepad as Administrator",
      description: 'Right-click Notepad and choose "Run as Administrator".'
    },
    {
      number: "02",
      title: "Open hosts file",
      description: "Go to File → Open and navigate to:",
      code: "C:\\Windows\\System32\\drivers\\etc\\hosts"
    },
    {
      number: "03",
      title: "Add entries",
      description: "Click Copy Hosts, paste the two lines at the bottom of the file, then Save (Ctrl + S).",
      actionType: "copyHosts"
    },
    {
      number: "04",
      title: "Launch Growtopia",
      description: "Open Growtopia and click Play."
    }
  ],
  ios: [
    {
      number: "01",
      title: "Install Surge 5",
      description: "Download and install Surge 5 from the App Store."
    },
    {
      number: "02",
      title: "Import Profile",
      description: "Open Default.conf → tap IMPORT → Download Profile from URL."
    },
    {
      number: "03",
      title: "Paste URL and Setup",
      description: "Click Copy URL, paste into Surge, then tap SETUP and allow the VPN profile.",
      actionType: "copyVhostIos"
    },
    {
      number: "04",
      title: "Launch Growtopia",
      description: "Open Growtopia and click Play."
    }
  ],
  macos: [
    {
      number: "01",
      title: "Download APK GTPS 5.48",
      description: "Unduh file APK GTPS resmi (Magical 5.48) langsung melalui MediaFire.",
      actionType: "downloadApk",
      buttonLabel: "DOWNLOAD APK MAGICAL 5.48 🚀"
    },
    {
      number: "02",
      title: "Izinkan Sumber Tidak Dikenal",
      description: "Buka Pengaturan HP → Keamanan → Izinkan Install dari Sumber Tidak Dikenal (Unknown Sources)."
    },
    {
      number: "03",
      title: "Install APK GTPS",
      description: "Buka file APK yang telah diunduh lalu klik Install hingga selesai."
    },
    {
      number: "04",
      title: "Buka & Mainkan",
      description: "Buka aplikasi APK GTPS di HP kamu dan langsung klik Play untuk masuk server."
    }
  ]
};

export const roleStoreData = [
  {
    id: "owner-dev",
    name: "DEVELOPER ROLE",
    price: "500.000IDR",
    badge: "POPULAR",
    theme: {
      border: "border-purple-500/80",
      text: "text-purple-400",
      badgeBg: "bg-purple-950/80 text-purple-300 border-purple-500/50",
      glow: "shadow-purple-500/20",
      iconBg: "bg-purple-600 text-white",
      codeBg: "bg-purple-950/40 border-purple-800/60"
    },
    commandsHeader: "GET PRIVILEGE:",
    commands: `> Can Use COMMAND Dev : \n> /status, /giverank, /addgvt, /weather, /bgl, /dl, /wl\n> /find, /god, /ghost, /give, /nick, /skin, /title\n> Include Role Mod, Dev, Sdev, Reseller\n> Get Title Of Legend, SSUP, Mentor\n> Have Verified Blue In Game`,
    privileges: [
      "Include Role Mod, Dev, Sdev, Reseller",
      "Get Title Of Legend, SSUP, Mentor",
      "Get Title [ DEV ] in game",
      "Get Role Discord Developer"
    ]
  },
  {
    id: "sdev-role",
    name: "SUPER DEV ROLE",
    price: "400.000IDR",
    badge: "HOT",
    theme: {
      border: "border-yellow-500/80",
      text: "text-yellow-400",
      badgeBg: "bg-yellow-950/80 text-yellow-300 border-yellow-500/50",
      glow: "shadow-yellow-500/20",
      iconBg: "bg-yellow-500 text-stone-950",
      codeBg: "bg-yellow-950/40 border-yellow-800/60"
    },
    commandsHeader: "GET PRIVILEGE:",
    commands: `> Can Use COMMAND SDEV :\n> /giverank, /weather, /bgl, /dl, /wl, /find\n> /god, /ghost, /give, /nick, /skin\n> Include Role Mod, Dev, Sdev\n> Get Title Of Legend & SSUP`,
    privileges: [
      "Include Role Mod, Dev, Sdev",
      "Get Title Of Legend & SSUP",
      "Get Title [ SDEV ] on game",
      "Get Role Discord Super Developer"
    ]
  },
  {
    id: "unli-role",
    name: "UNLI ROLE",
    price: "250.000IDR",
    badge: "BEST VALUE",
    theme: {
      border: "border-orange-500/80",
      text: "text-orange-400",
      badgeBg: "bg-orange-950/80 text-orange-300 border-orange-500/50",
      glow: "shadow-orange-500/20",
      iconBg: "bg-orange-500 text-stone-950",
      codeBg: "bg-orange-950/40 border-orange-800/60"
    },
    commandsHeader: "GET PRIVILEGE:",
    commands: `> Can Use COMMAND Unli :\n> /bgl, /dl, /wl, /find, /god, /ghost, /give, /nick\n> Unlimited Item Spawn Access\n> NO INCLUDE ROLE SDEV, DEV, MODS`,
    privileges: [
      "NO INCLUDE ROLE SDEV, DEV, MODS",
      "Get Title [ UNLI ] on game",
      "Get Role Discord Unli",
      "Unlimited Item Spawn Access"
    ]
  },
  {
    id: "reseller-role",
    name: "RESELLER ROLE",
    price: "150.000IDR",
    badge: "RECOMMENDED",
    theme: {
      border: "border-sky-500/80",
      text: "text-sky-400",
      badgeBg: "bg-sky-950/80 text-sky-300 border-sky-500/50",
      glow: "shadow-sky-500/20",
      iconBg: "bg-sky-500 text-stone-950",
      codeBg: "bg-sky-950/40 border-sky-800/60"
    },
    commandsHeader: "GET PRIVILEGE:",
    commands: `> Can Create & Sell Private Server Items\n> Special Discount Rate 20%\n> Get Reseller Exclusive Discord Access`,
    privileges: [
      "Special Reseller Discount",
      "Get Title [ RESELLER ] on game",
      "Get Role Discord Reseller",
      "Access to Exclusive Items Market"
    ]
  },
  {
    id: "midman-role",
    name: "MIDLEMAN ROLE",
    price: "120.000IDR",
    theme: {
      border: "border-indigo-500/80",
      text: "text-indigo-400",
      badgeBg: "bg-indigo-950/80 text-indigo-300 border-indigo-500/50",
      glow: "shadow-indigo-500/20",
      iconBg: "bg-indigo-500 text-white",
      codeBg: "bg-indigo-950/40 border-indigo-800/60"
    },
    commandsHeader: "GET PRIVILEGE:",
    commands: `> Get UNTRD BOX\n> Can Open Jasa Midman Tax Up To You\n> Include Privilege RESELLER`,
    privileges: [
      "Include Privilege RESELLER",
      "Get Title Of Legend, SSUP, Mentor",
      "Get Title [ MIDMAN ] in game",
      "Get Role Discord MIDMAN"
    ]
  },
  {
    id: "moderator-role",
    name: "MODERATOR ROLE",
    price: "80.000IDR",
    theme: {
      border: "border-emerald-500/80",
      text: "text-emerald-400",
      badgeBg: "bg-emerald-950/80 text-emerald-300 border-emerald-500/50",
      glow: "shadow-emerald-500/20",
      iconBg: "bg-emerald-500 text-stone-950",
      codeBg: "bg-emerald-950/40 border-emerald-800/60"
    },
    commandsHeader: "GET PRIVILEGE:",
    commands: `> /mute, /unmute, /kick, /pull, /warp, /ghost\n> Keep Server Safe and Active\n> Include Role Moderator`,
    privileges: [
      "Include Role Moderator",
      "Get Mentor Title",
      "Get Title [ MODS ] on game",
      "Get Role Discord Moderator"
    ]
  }
];

export const assetCategories = [
  { id: "title", label: "Asset Title", icon: "🗝️" }
];

export const assetsData = [
  {
    id: "title-1",
    category: "title",
    categoryTitle: "ASSET TITLE",
    categoryIcon: "🗝️",
    name: "LEGENDARY TITLE",
    itemIcon: "🟡",
    details: ["Get exclusive Legendary Title badge in game"],
    price: "IDR 65.000"
  },
  {
    id: "title-2",
    category: "title",
    categoryTitle: "ASSET TITLE",
    categoryIcon: "🗝️",
    name: "SUPER SUPPORTER",
    itemIcon: "🔧",
    details: ["Get Super Supporter badge & privilege"],
    price: "IDR 40.000"
  },
  {
    id: "title-3",
    category: "title",
    categoryTitle: "ASSET TITLE",
    categoryIcon: "🗝️",
    name: "CHEAT PERMA",
    itemIcon: "📟",
    details: ["Permanent Cheat Access Title"],
    price: "IDR 25.000"
  },
  {
    id: "title-4",
    category: "title",
    categoryTitle: "ASSET TITLE",
    categoryIcon: "🗝️",
    name: "REQUEST TITLE [ TITLE ]",
    itemIcon: "🪧",
    details: ["Custom Request Name Title in Game"],
    price: "IDR 45.000",
    badge: "CUSTOM"
  }
];
