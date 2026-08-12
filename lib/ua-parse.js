// lib/ua-parse.js
//
// Deliberately tiny User-Agent classifier - no dependency, no fingerprinting.
// It answers "roughly what browser / OS / form factor", which is all the
// dashboard charts need. If you want full accuracy later, swap the internals
// for the `ua-parser-js` package; the returned shape is the same.

const BOT_PATTERN =
  /bot|crawler|spider|crawl|slurp|curl|wget|python-requests|axios|node-fetch|headless|lighthouse|pingdom|uptime|monitor|preview|facebookexternalhit|semrush|ahrefs|bingpreview|vercel-screenshot/i;

export function parseUserAgent(uaInput) {
  const ua = Array.isArray(uaInput) ? uaInput[0] : uaInput;
  if (!ua || typeof ua !== "string") {
    return { browser: "Unknown", os: "Unknown", device: "Unknown", isBot: false };
  }

  const isBot = BOT_PATTERN.test(ua);

  // --- Browser. Order matters: the specific ones masquerade as the generic. ---
  let browser = "Other";
  if (isBot) browser = "Bot / crawler";
  else if (/Edg\//i.test(ua)) browser = "Edge";
  else if (/OPR\/|Opera/i.test(ua)) browser = "Opera";
  else if (/SamsungBrowser/i.test(ua)) browser = "Samsung Internet";
  else if (/Firefox\//i.test(ua)) browser = "Firefox";
  else if (/Chrome\//i.test(ua)) browser = "Chrome";
  else if (/Safari\//i.test(ua) && /Version\//i.test(ua)) browser = "Safari";
  else if (/Safari\//i.test(ua)) browser = "Safari";

  // --- OS ---
  let os = "Other";
  if (/Windows NT/i.test(ua)) os = "Windows";
  else if (/iPhone|iPad|iPod/i.test(ua)) os = "iOS";
  else if (/Mac OS X|Macintosh/i.test(ua)) os = "macOS";
  else if (/Android/i.test(ua)) os = "Android";
  else if (/CrOS/i.test(ua)) os = "ChromeOS";
  else if (/Linux/i.test(ua)) os = "Linux";

  // --- Form factor ---
  let device = "Desktop";
  if (isBot) device = "Bot";
  else if (/iPad|Tablet/i.test(ua)) device = "Tablet";
  else if (/Mobi|iPhone|Android.*Mobile|Windows Phone/i.test(ua)) device = "Mobile";

  return { browser, os, device, isBot };
}
