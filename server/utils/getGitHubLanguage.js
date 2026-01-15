import fetch from "node-fetch"

export async function getGitHubLanguage(owner, repo) {
    try {
        const res = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/languages`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                    Accept: "application/vnd.github+json"
                }
            }
        );

        if (!res.ok) return null;
        const data = await res.json()
        const languages = Object.keys(data)
        return languages.length > 0 ? languages[0] : null;
    } catch (error) {
        console.error("GitHub language fetch failed:", err);
        return null;
    }
}