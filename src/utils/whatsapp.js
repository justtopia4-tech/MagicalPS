export function getWhatsAppUrl(whatsappInput, message = '') {
  if (!whatsappInput) return '#';
  const str = String(whatsappInput).trim();
  
  // If user passed a full URL (e.g. https://wa.me/628123... or https://api.whatsapp.com/...)
  if (str.startsWith('http://') || str.startsWith('https://')) {
    if (message) {
      try {
        const u = new URL(str);
        u.searchParams.set('text', message);
        return u.toString();
      } catch (e) {
        return str;
      }
    }
    return str;
  }
  
  // Clean all non-digit characters (removes +, -, spaces, etc.)
  let cleanNumber = str.replace(/\D/g, '');
  
  // Convert local 08... format to international 628...
  if (cleanNumber.startsWith('0')) {
    cleanNumber = '62' + cleanNumber.slice(1);
  }
  
  if (!cleanNumber) return '#';
  
  const textParam = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${cleanNumber}${textParam}`;
}
