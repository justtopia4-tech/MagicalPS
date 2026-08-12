import React from 'react';

export default function Footer({ config }) {
  return (
    <footer className="w-full mt-10 py-6 px-4 border-t-2 border-purple-500/50 bg-gradient-to-r from-[#140833]/95 via-[#1b0a42]/95 to-[#0f0529]/95 backdrop-blur-md text-center relative z-20">
      <div className="max-w-5xl mx-auto space-y-1.5">
        <p className="text-xs sm:text-sm font-black text-white tracking-wide">
          {config.copyrightText || "© 2026 Copyright by GTPS Community"}
        </p>
        <p className="text-xs sm:text-sm text-purple-300 font-extrabold font-mono">
          {config.categories || "Growtopia • Private Server • Community"}
        </p>
      </div>
    </footer>
  );
}
