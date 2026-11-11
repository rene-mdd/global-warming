import { test } from "node:test";
import assert from "node:assert/strict";
import {
  proxiedImageUrl,
  verifyImageUrl,
  proxyArticleImages,
} from "../lib/news-image";

const SECRET = "test-secret";
const URL_A = "https://example.com/a.jpg?x=1&y=2";

test("a signed URL verifies, a tampered one doesn't", () => {
  const path = proxiedImageUrl(URL_A, SECRET);
  const params = new URLSearchParams(path.split("?")[1]);
  assert.equal(params.get("u"), URL_A);
  assert.equal(verifyImageUrl(params.get("u"), params.get("s"), SECRET), true);
  assert.equal(
    verifyImageUrl("https://example.com/b.jpg", params.get("s"), SECRET),
    false
  );
  assert.equal(verifyImageUrl(URL_A, params.get("s"), "other"), false);
  assert.equal(verifyImageUrl(URL_A, "abc", SECRET), false);
  assert.equal(verifyImageUrl(URL_A, undefined, SECRET), false);
});

test("no secret or a non-http URL gives no image, never a direct link", () => {
  assert.equal(proxiedImageUrl(URL_A, ""), null);
  assert.equal(proxiedImageUrl("javascript:alert(1)", SECRET), null);
  assert.equal(proxiedImageUrl("/local.png", SECRET), null);
  assert.equal(proxiedImageUrl(undefined, SECRET), null);
  assert.equal(verifyImageUrl(URL_A, "00", ""), false);
});

test("proxyArticleImages replaces only the image field", () => {
  const [article] = proxyArticleImages(
    [{ title: "t", media: URL_A }],
    "media",
    SECRET
  );
  assert.equal(article.title, "t");
  assert.match(article.media, /^\/api\/news-image\?u=/);
});
