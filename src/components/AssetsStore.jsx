import React, { useState } from 'react';
import { Package, ShoppingCart, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AssetsStore({ categories, assets, onOrderAsset }) {
  const [activeCategory, setActiveCategory] = useState('title');

  const filteredAssets = activeCategory === 'all'
    ? assets
    : assets.filter(item => item.category === activeCategory);

  return (
    <div className="w-full max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto px-3 sm:px-4 mt-6">
      {/* Title Header */}
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#1d0b42] via-[#280e5b] to-[#14072e] border-2 border-purple-400/60 mb-2 shadow-md">
          <Package className="w-3.5 h-3.5 text-purple-400 fill-purple-400/20" />
          <span className="text-[11px] font-extrabold text-purple-300 tracking-wide uppercase">
            GTPS Title Store
          </span>
          <Package className="w-3.5 h-3.5 text-purple-400 fill-purple-400/20" />
        </div>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight font-heading">
          Daftar Title GTPS
        </h2>
        <p className="text-xs sm:text-sm lg:text-base text-purple-100 font-medium mt-1 max-w-md mx-auto">
          Temukan Title & Badge exklusif untuk server kamu.
        </p>
      </div>

      {/* Assets Grid / List */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filteredAssets.map((asset, idx) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * idx, type: "spring", stiffness: 350, damping: 25 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#140a2d]/95 via-[#100826]/95 to-[#09041a] border-2 border-purple-500/40 hover:border-purple-400 transition-all text-left overflow-hidden relative shadow-2xl hover:shadow-purple-500/30 flex flex-col justify-between h-full"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-black/70 text-xl flex items-center justify-center shrink-0 border-2 border-purple-400/40 shadow-inner">
                    {asset.itemIcon}
                  </div>
                  <div>
                    <div className="text-xs font-black text-purple-300 tracking-wider uppercase">
                      {asset.categoryTitle}
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-white tracking-tight font-heading leading-tight mt-0.5">
                      {asset.name}
                    </h3>

                    {/* Details list */}
                    <div className="space-y-1.5 mt-2">
                      {asset.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-1.5 text-xs sm:text-sm text-purple-100 font-bold">
                          <CheckCircle2 className="w-4 h-4 text-purple-400 fill-purple-400/20 shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Badge if available */}
                {asset.badge && (
                  <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-amber-400 text-stone-950 border border-white shrink-0">
                    {asset.badge}
                  </span>
                )}
              </div>

              {/* Price & Action Button Footer */}
              <div className="mt-4 pt-3 border-t border-purple-400/30 flex items-center justify-between gap-2">
                <div>
                  <span className="text-xs text-purple-200 font-bold block">HARGA ITEM</span>
                  <span className="text-base sm:text-lg lg:text-xl font-black text-amber-300 font-mono">
                    {asset.price}
                  </span>
                </div>

                <button
                  onClick={() => onOrderAsset(asset)}
                  className="py-2 px-4 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-black text-xs rounded-xl flex items-center gap-1.5 transition-colors border-2 border-white cursor-pointer shadow-md"
                >
                  <ShoppingCart className="w-4 h-4 text-white" />
                  <span>Buy Title</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
