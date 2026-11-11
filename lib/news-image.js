// lib/news-image.js — signed URLs for the news image proxy
//
// News articles on /news and /deforestation link to images on each
// publisher's server. Loading those directly would send every visitor's IP
// address to dozens of third parties, so the pages show them through
// /api/news-image instead. The URL is signed with NEWS_IMAGE_SECRET so the
// route only fetches images this server put on a page and can't be used as an
// open proxy.

import crypto from "crypto";

function sign(url, secret) {
  return crypto.createHmac("sha256", secret).update(url).digest("hex");
}

// Returns the proxy path for an image URL, or null when the URL isn't http(s)
// or no secret is configured; a null image shows the page's fallback image
// rather than a direct third-party request.
export function proxiedImageUrl(url, secret = process.env.NEWS_IMAGE_SECRET) {
  if (!secret || typeof url !== "string" || !/^https?:\/\//i.test(url)) {
    return null;
  }
  return `/api/news-image?u=${encodeURIComponent(url)}&s=${sign(url, secret)}`;
}

export function verifyImageUrl(
  url,
  signature,
  secret = process.env.NEWS_IMAGE_SECRET
) {
  if (!secret || typeof url !== "string" || typeof signature !== "string") {
    return false;
  }
  const expected = Buffer.from(sign(url, secret), "hex");
  const given = Buffer.from(signature, "hex");
  return (
    given.length === expected.length && crypto.timingSafeEqual(given, expected)
  );
}

// Replaces `field` (GNews: "image", NewsCatcher: "media") in each article.
export function proxyArticleImages(articles, field, secret) {
  return articles.map((article) => ({
    ...article,
    [field]: proxiedImageUrl(article?.[field], secret),
  }));
}
