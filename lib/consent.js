// lib/consent.js — per-vendor consent from consentmanager
//
// Third-party content that transmits the visitor's IP address or reads the
// device (reCAPTCHA) needs consent under § 25(1) TDDDG, so it is rendered
// only once its consentmanager vendor has consent, either from the banner or
// from the button next to the blocked content.

import { useCallback, useEffect, useRef, useState } from "react";

// consentmanager vendor IDs. A vendor missing from the CMP's vendor list
// still loads after the button click, but that click is not stored, so it is
// asked again on the next page view.
export const VENDORS = {
  recaptcha: "s1409",
};

/* eslint-disable no-underscore-dangle -- __cmp is consentmanager's API */
export function cmpAvailable() {
  return typeof window !== "undefined" && typeof window.__cmp === "function";
}

export function hasVendorConsent(vendorId) {
  if (!vendorId || !cmpAvailable()) return false;
  const data = window.__cmp("getCMPData");
  return Boolean(data?.vendorConsents?.[vendorId]);
}

// Returns [consent, grant]. consent is null until the first check after
// mount, so server-rendered HTML contains neither the content nor the notice.
// The CMP fires "consent" both when a visitor decides and when a stored
// decision is found, so a choice made in the banner applies without a reload.
export function useVendorConsent(vendorId) {
  const [consent, setConsent] = useState(null);
  // A click on the button counts even if the CMP doesn't record it (unknown
  // vendor, CMP blocked), so a later "consent" event can't take it back.
  const granted = useRef(false);

  useEffect(() => {
    const check = () =>
      setConsent(granted.current || hasVendorConsent(vendorId));
    check();
    if (!cmpAvailable()) return undefined;
    window.__cmp("addEventListener", ["consent", check, false], null);
    return () =>
      window.__cmp("removeEventListener", ["consent", check, false], null);
  }, [vendorId]);

  // Clicking the button after reading the notice is the consent; it is
  // recorded in the CMP so the visitor can revoke it in the CMP settings.
  const grant = useCallback(() => {
    granted.current = true;
    if (vendorId && cmpAvailable()) {
      window.__cmp("setVendorConsent", [vendorId, 1]);
    }
    setConsent(true);
  }, [vendorId]);

  return [consent, grant];
}
/* eslint-enable no-underscore-dangle */
