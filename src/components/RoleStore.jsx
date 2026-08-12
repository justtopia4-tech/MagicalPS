import React from 'react';
import { ShieldCheck, CheckCircle2, ShoppingCart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RoleStore({ roles, onOrderRole }) {
  return (
    <div className="w-full max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto px-3 sm:px-4 mt-6">
      {/* Title Header */}
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#1d0b42] via-[#280e5b] to-[#14072e] border-2 border-purple-400/60 mb-2 shadow-md">
          <ShieldCheck className="w-3.5 h-3.5 text-purple-400 fill-purple-400/20" />
          <span className="text-[11px] font-extrabold text-purple-300 tracking-wide uppercase">
            Role Store
          </span>
          <ShieldCheck className="w-3.5 h-3.5 text-purple-400 fill-purple-400/20" />
        </div>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight font-heading">
          Daftar Akses & Role GTPS
        </h2>
        <p className="text-xs sm:text-sm lg:text-base text-purple-100 font-medium mt-1 max-w-md mx-auto">
          Beli role resmi untuk mendapatkan perintah khusus, title unik, dan keuntungan Discord.
        </p>
      </div>

      {/* Role Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
        {roles.map((role, idx) => {
          const { theme } = role;

          return (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 * idx, type: "spring", stiffness: 350, damping: 25 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#140a2d]/95 via-[#100826]/95 to-[#09041a] border-2 border-purple-500/40 hover:border-purple-400 transition-all text-left overflow-hidden relative shadow-2xl hover:shadow-purple-500/30 flex flex-col justify-between h-full"
            >
              {/* Header Title & Price */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className={`w-10 h-10 rounded-xl ${theme.iconBg} font-black text-lg flex items-center justify-center shrink-0 border-2 border-white shadow-md`}>
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-white tracking-tight font-heading leading-tight flex items-center gap-1.5">
                      <span>{role.name}</span>
                    </h3>
                    <div className="text-xs sm:text-sm font-bold text-sky-200 flex items-center gap-1.5 mt-0.5">
                      <span>Harga:</span>
                      <span className="text-amber-300 font-black text-sm sm:text-base font-mono">{role.price}</span>
                    </div>
                  </div>
                </div>

                {role.badge && (
                  <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-amber-400 text-amber-950 border-2 border-white shrink-0 shadow-sm uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-950 fill-amber-950" />
                    <span>{role.badge}</span>
                  </span>
                )}
              </div>

              {/* Commands Code Box */}
              {role.commands && (
                <div className="space-y-1.5 my-3 bg-black/70 p-3 rounded-xl border border-purple-400/40 shadow-inner">
                  <div className="text-xs font-black tracking-wider uppercase mb-1 text-purple-200">
                    {role.commandsHeader}
                  </div>
                  <pre className="text-amber-300 font-bold whitespace-pre-line text-xs leading-relaxed font-mono select-all">
                    {role.commands}
                  </pre>
                </div>
              )}

              {/* Privilege Items */}
              <div className="space-y-2 my-3 pl-1">
                {role.privileges.map((priv, pIdx) => (
                  <div key={pIdx} className="flex items-center gap-2 text-xs sm:text-sm text-sky-100 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-950 shrink-0" />
                    <span>{priv}</span>
                  </div>
                ))}
              </div>

              {/* Order Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onOrderRole(role)}
                className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer border-2 border-white shadow-lg"
              >
                <ShoppingCart className="w-4 h-4 text-white" />
                <span>ORDER {role.name}</span>
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
