import Head from "next/head";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import {
  DEFAULT_LOCALE,
  LOCALES,
  isTranslated,
  localizedUrl,
} from "../lib/i18n-config";
// import { metadata } from "../pages/about";

const OG_LOCALES = { en: "en_US", de: "de_DE" };

export default function SiteHeader({
  title,
  description,
  keywords,
  websiteUrl,
}) {
  const { locale = DEFAULT_LOCALE, pathname } = useRouter();
  const translated = isTranslated(pathname);
  // `websiteUrl` is the English canonical and is emitted unchanged for
  // English, so existing English URLs keep every ranking signal.
  const canonical = localizedUrl(websiteUrl, pathname, locale);

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="canonical" href={canonical} />
        {/* A /de page that isn't translated yet would be English content
            competing with the English original. */}
        {locale !== DEFAULT_LOCALE && !translated && (
          <meta name="robots" content="noindex, follow" />
        )}
        {translated &&
          LOCALES.map((alt) => (
            <link
              key={`hreflang-${alt}`}
              rel="alternate"
              hrefLang={alt}
              href={localizedUrl(websiteUrl, pathname, alt)}
            />
          ))}
        {translated && (
          <link rel="alternate" hrefLang="x-default" href={websiteUrl} />
        )}
        {translated && (
          <meta property="og:locale" content={OG_LOCALES[locale]} />
        )}
        {translated &&
          LOCALES.filter((alt) => alt !== locale).map((alt) => (
            <meta
              key={`og-locale-${alt}`}
              property="og:locale:alternate"
              content={OG_LOCALES[alt]}
            />
          ))}
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={title} />
        <meta
          property="og:image"
          content="https://global-warming.org/images/logo-planet-image.png"
        />
        <meta property="og:image:width" content="150" />
        <meta property="og:image:height" content="150" />
        <meta property="og:image:type" content="image/png" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
    </>
  );
}
SiteHeader.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  websiteUrl: PropTypes.string,
};

SiteHeader.defaultProps = {
  title: "Global Warming API",
  description:
    "Global warming & climate change up to date APIs, data, graphs, and news. Earth's temperature, carbon dioxide (CO2), methane, nitrous oxide, melted polar ice cap or sea ice extent, and ocean warming.",
  keywords: "Global warming, climate change, API, graphs",
  websiteUrl: "https://global-warming.org/",
};
