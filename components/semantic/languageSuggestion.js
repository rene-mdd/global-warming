// Suggests the visitor's browser language when this page exists in it.
//
// Rendered only after mount, from navigator.languages, so the server HTML
// (what crawlers index) is identical for every visitor. Hidden for good once
// the visitor picks a language either here or in the menu switcher, since
// both store the choice in the NEXT_LOCALE cookie that middleware.js reads.

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Paper, Typography } from "@mui/material";
import { DICTIONARIES } from "../../lib/i18n";
import {
  DEFAULT_LOCALE,
  browserLocale,
  isTranslated,
  rememberLocale,
  storedLocale,
} from "../../lib/i18n-config";

export default function LanguageSuggestion() {
  const router = useRouter();
  const { locale = DEFAULT_LOCALE, pathname, asPath } = router;
  const [target, setTarget] = useState(null);

  useEffect(() => {
    if (!isTranslated(pathname) || storedLocale()) {
      setTarget(null);
      return;
    }
    const preferred = browserLocale(
      navigator.languages?.length ? navigator.languages : [navigator.language]
    );
    setTarget(preferred && preferred !== locale ? preferred : null);
  }, [locale, pathname]);

  if (!target) return null;
  // Written in the suggested language: that's the one the visitor reads.
  const t = DICTIONARIES[target].banner;

  const switchLanguage = () => {
    rememberLocale(target);
    setTarget(null);
    router.push(asPath, asPath, { locale: target });
  };
  const dismiss = () => {
    rememberLocale(locale);
    setTarget(null);
  };

  return (
    <Paper
      component="aside"
      lang={target}
      aria-label={t.message}
      elevation={6}
      sx={{
        position: "fixed",
        bottom: 16,
        left: "50%",
        transform: "translateX(-50%)",
        width: "calc(100% - 32px)",
        maxWidth: 560,
        zIndex: 1300,
        px: 2,
        py: 1.5,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Typography sx={{ flex: "1 1 220px", fontSize: 15 }}>
        {t.message}
      </Typography>
      <Button variant="contained" onClick={switchLanguage}>
        {t.switch}
      </Button>
      <Button onClick={dismiss}>{t.dismiss}</Button>
    </Paper>
  );
}
