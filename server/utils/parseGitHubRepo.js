export function parseGithubRepo(repoUrl){
    if (!repoUrl) return null;

    const match =repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if(!match) return null;

    return {
        owner:match[1],
        repo:match[2].replace(".git","")
    }
}