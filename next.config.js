require("dotenv").config();
const withImages = require("next-images");

module.exports = withImages({
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
});
