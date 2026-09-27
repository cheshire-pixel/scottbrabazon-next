export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-EM2PVR54X0';

export function trackEvent(name, parameters) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  try {
    window.gtag('event', name, parameters);
  } catch {
    // Measurement must never interrupt navigation or enquiries.
  }
}
