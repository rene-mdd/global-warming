require("dotenv").config();
const withImages = require("next-images");

module.exports = withImages({
  i18n: {
    locales: ["en", "de"],
    defaultLocale: "en",
    // Off so "/" is never redirected by Accept-Language: crawlers and
    // visitors always get the URL they asked for. middleware.js redirects
    // only on an explicit choice stored in the NEXT_LOCALE cookie.
    localeDetection: false,
  },
});
