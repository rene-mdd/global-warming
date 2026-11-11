// pages/api/news-image.js — serves news article images from our own origin
//
// See lib/news-image.js: the publisher only ever sees this server, never the
// visitor. Only URLs signed by getServerSideProps on /news and /deforestation
// are fetched.

import { verifyImageUrl } from "../../lib/news-image";

const TIMEOUT_MS = 8000;
const MAX_BYTES = 5 * 1024 * 1024;
// SVG can carry scripts, and this route serves from our own origin, so only
// raster formats pass.
const ALLOWED_TYPES = /^image\/(jpeg|png|gif|webp|avif)$/i;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).end();
  }
  const { u: url, s: signature } = req.query;
  if (!verifyImageUrl(url, signature)) return res.status(403).end();

  let upstream;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    upstream = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: "image/avif,image/webp,image/png,image/jpeg,*/*;q=0.5",
      },
    });
    const type = (upstream.headers.get("content-type") || "").split(";")[0];
    const length = Number(upstream.headers.get("content-length") || 0);
    if (!upstream.ok || !ALLOWED_TYPES.test(type) || length > MAX_BYTES) {
      return res.status(502).end();
    }

    // content-length can be missing or wrong, so the size is enforced while
    // reading as well.
    const chunks = [];
    let total = 0;
    const reader = upstream.body.getReader();
    for (;;) {
      // eslint-disable-next-line no-await-in-loop
      const { done, value } = await reader.read();
      if (done) break;
      total += value.length;
      if (total > MAX_BYTES) {
        controller.abort();
        return res.status(502).end();
      }
      chunks.push(value);
    }

    res.setHeader("Content-Type", type);
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Content-Security-Policy", "default-src 'none'; sandbox");
    // A signed URL always names the same image, so the CDN can keep it.
    res.setHeader(
      "Cache-Control",
      "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400"
    );
    return res.status(200).send(Buffer.concat(chunks));
  } catch (error) {
    return res.status(502).end();
  } finally {
    clearTimeout(timer);
  }
}
