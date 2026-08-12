import React, { useState } from 'react';
import { X, ShoppingCart, MessageSquare, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getWhatsAppUrl } from '../utils/whatsapp';

export default function OrderModal({ isOpen, onClose, item, config }) {
  const [growId, setGrowId] = useState('');

  if (!isOpen || !item) return null;

  const handleCheckoutWhatsApp = () => {
    if (!growId.trim()) {
      alert("Harap masukkan GrowID kamu terlebih dahulu!");
      return;
    }

    const message = `Halo Admin ${config.profileHandle},\nSaya ingin membeli item berikut:\n- Item/Role: ${item.name}\n- Harga: ${item.price}\n- GrowID: ${growId.trim()}\n\nMohon diproses, terima kasih!`;
    const waUrl = getWhatsAppUrl(config.whatsappNumber, message);

    window.open(waUrl, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="relative w-full max-w-md bg-[#130a2e] rounded-3xl p-5 sm:p-6 border-2 border-purple-500/80 text-left z-10 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-purple-900/80 text-white hover:bg-purple-800 transition-colors cursor-pointer border border-white/60"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-xl bg-purple-900/90 text-white flex items-center justify-center shrink-0 border-2 border-white/60">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white font-heading leading-tight">
                Checkout Pesanan
              </h3>
              <p className="text-xs text-purple-100/90 font-medium">
                Konfirmasi item dan masukkan GrowID kamu.
              </p>
            </div>
          </div>

          {/* Item Details Box */}
          <div className="p-4 rounded-2xl bg-black/60 border border-white/50 mb-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-black text-purple-200 uppercase tracking-wider block">
                  ITEM YANG DIPILIH
                </span>
                <h4 className="text-base font-black text-white font-heading mt-0.5">
                  {item.name}
                </h4>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-purple-100/70 block">HARGA</span>
                <span className="text-base font-black text-amber-300 font-mono">
                  {item.price}
                </span>
              </div>
            </div>
          </div>

          {/* Input GrowID */}
          <div className="mb-5">
            <label className="block text-xs font-black text-white mb-1.5 font-heading">
              MASUKKAN GROWID KAMU:
            </label>
            <input
              type="text"
              value={growId}
              onChange={(e) => setGrowId(e.target.value)}
              placeholder="Contoh: GrowIDKamu123"
              className="w-full px-4 py-3 rounded-xl bg-black/80 border-2 border-white/60 text-white placeholder:text-purple-200/60 text-sm font-semibold focus:outline-none focus:border-white transition-colors"
            />
            <p className="text-[11px] text-purple-100/80 mt-1 font-medium">
              *Pastikan GrowID sudah benar agar pengiriman item tidak tertunda.
            </p>
          </div>

          {/* WhatsApp Submit Button */}
          <button
            onClick={handleCheckoutWhatsApp}
            className="w-full py-3 px-4 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-black text-sm rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer border-2 border-white/80"
          >
            <MessageSquare className="w-4 h-4" />
            <span>LANJUTKAN KE WHATSAPP ADMIN</span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
