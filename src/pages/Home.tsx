import { useEffect, useState } from "react";
import { GithubService } from "../services/GithubService";
import type { Repo } from "../interfaces/models/repo";
import styles from "./Home.module.css";

// Language colours matching GitHub's own palette
const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  "C#": "#178600",
  Python: "#3572A5",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
};

// One card — its own component to keep things readable
function RepoCard({ repo }: { repo: Repo }) {
  return (
    <a href={repo.html_url} target="_blank" rel="noreferrer" className={styles.card}>
      <div className={styles.cardTop}>
        <span className={styles.repoName}>{repo.name}</span>
        <span className={styles.stars}>★ {repo.stargazers_count}</span>
      </div>

      <p className={styles.description}>
        {repo.description || "No description provided."}
      </p>

      <div className={styles.cardBottom}>
        {repo.language && (
          <>
            <span
              className={styles.langDot}
              style={{ background: LANG_COLORS[repo.language] ?? "#888" }}
            />
            <span className={styles.lang}>{repo.language}</span>
          </>
        )}
      </div>
    </a>
  );
}

const github = new GithubService();

export default function Home() {
  // Three possible states: loading, error, or data
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // useEffect runs after the component first renders.
    // This is where you kick off side effects like API calls.
    github
      .getRepos("Timsel1") // ← your GitHub username
      .then((data) => {
        // Filter out forks, sort by stars descending
        const filtered = data
          .filter((r) => !r.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count);
        setRepos(filtered);
      })
      .catch(() => setError("Failed to fetch repos."))
      .finally(() => setLoading(false));
  }, []); // the [] means "run once on mount, never again"

  if (loading) return <div className={styles.state}>Fetching repos...</div>;
  if (error) return <div className={styles.state}>{error}</div>;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Projects</h1>
      <p className={styles.sub}>// {repos.length} public repos</p>
      <div className={styles.grid}>
        {repos.map((repo) => (
          <RepoCard key={repo.name} repo={repo} />
        ))}
      </div>
    </div>
  );
}
