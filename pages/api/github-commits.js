// pages/api/github-commits.js — commit list for the About page
//
// The About page used to call the GitHub API from the visitor's browser,
// which sent every visitor's IP address to GitHub. Fetching here keeps the
// call between this server and GitHub, and lets API_GITHUB (never exposed to
// the browser) authenticate it.

import { Octokit } from "octokit";

const OWNER = "rene-mdd";
const REPO = "global-warming";
// The page asks for one GitHub result page at a time; anything outside this
// range is a malformed request, not a valid page.
const MAX_PAGE = 100;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "method not allowed" });
  }
  const page = Number(req.query.page);
  if (!Number.isInteger(page) || page < 1 || page > MAX_PAGE) {
    return res.status(400).json({ error: "invalid page" });
  }

  const octokit = new Octokit({ auth: process.env.API_GITHUB });
  try {
    const commits = await octokit.paginate(
      "GET /repos/{owner}/{repo}/commits",
      {
        owner: OWNER,
        repo: REPO,
        per_page: 30,
        page,
        headers: { "X-GitHub-Api-Version": "2022-11-28" },
      }
    );
    // Only the fields the table shows; the rest of GitHub's payload (author
    // emails, avatars, URLs) has no reason to reach the browser.
    const body = commits.map(({ sha, commit }) => ({
      sha,
      commit: {
        message: commit.message,
        author: { name: commit.author?.name, date: commit.author?.date },
      },
    }));
    // The repository changes a few times a day at most, so the CDN answers
    // repeat views and GitHub's rate limit is not spent per visitor.
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=86400"
    );
    return res.status(200).json(body);
  } catch (error) {
    console.error(
      `GitHub commits request failed: ${error.status ?? ""} ${error.message}`
    );
    return res.status(502).json({ error: "upstream unavailable" });
  }
}
