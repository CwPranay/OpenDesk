import axios from "axios"

function parseGithubRepoUrl(url) {
    if (!url) return null;
    try {
        url = url.split("?")[0].replace(/\.git$/, "").trim();
        const sshMatch = url.match(/git@github\.com:([^/]+)\/(.+)/);
        if (sshMatch) return { owner: sshMatch[1], repo: sshMatch[2] };

        const httpMatch = url.match(/github\.com\/([^/]+)\/([^/]+)(?:\/|$)/);
        if (httpMatch) return { owner: httpMatch[1], repo: httpMatch[2] };

        return null;
    } catch (error) {
        return null;
    }
}

// utils/detectGithubLanguage.js
const axios = require("axios");

function parseGithubRepoUrl(url) {
    // support: https://github.com/owner/repo, git@github.com:owner/repo.git, https://github.com/owner/repo.git
    if (!url) return null;
    try {
        // remove trailing .git and params
        url = url.split("?")[0].replace(/\.git$/, "").trim();

        // git@github.com:owner/repo.git
        const sshMatch = url.match(/git@github\.com:([^/]+)\/(.+)/);
        if (sshMatch) return { owner: sshMatch[1], repo: sshMatch[2] };

        // https://github.com/owner/repo
        const httpMatch = url.match(/github\.com\/([^/]+)\/([^/]+)(?:\/|$)/);
        if (httpMatch) return { owner: httpMatch[1], repo: httpMatch[2] };

        return null;
    } catch (err) {
        return null;
    }
}

async function detectLanguageFromGithub(repoUrl) {
    const parsed = parseGithubRepoUrl(repoUrl);
    if (!parsed) return null;

    const { owner, repo } = parsed;
    const endpoint = `https://api.github.com/repos/${owner}/${repo}/languages`;

    const headers = {};
    // prefer token to avoid low rate limit
    if (process.env.GITHUB_TOKEN) {
        headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
    }

    try {
        const res = await axios.get(endpoint, { headers, timeout: 8000 });
        const data = res.data; // e.g. { "JavaScript": 15432, "HTML": 2340 }
        if (!data || Object.keys(data).length === 0) return null;

        // pick the language with largest bytes
        const entries = Object.entries(data);
        entries.sort((a, b) => b[1] - a[1]);
        return entries[0][0]; // language name string
    } catch (err) {
        // handle 404 (repo not found) or rate limit etc.
        // return null to let caller fallback
        return null;
    }
}

module.exports = { detectLanguageFromGithub, parseGithubRepoUrl };

