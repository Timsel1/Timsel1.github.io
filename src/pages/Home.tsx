import { useEffect, useState } from "react";
import { GithubService } from "../services/GithubService";
import type { Repo } from "../interfaces/models/repo";
import RepoCarousel from "../components/carousel/RepoCarousel";
import styles from "./Home.module.css";

const github = new GithubService();

export default function Home() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    github
      .getRepos("Timsel1")
      .then((data) => {
        const filtered = data
          .filter((r) => !r.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count);
        setRepos(filtered);
      })
      .catch(() => setError("Failed to fetch repos."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className={styles.state}>Fetching repos...</div>;
  if (error) return <div className={styles.state}>{error}</div>;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Projects</h1>
      <p className={styles.sub}>// {repos.length} public repos</p>
      <RepoCarousel repos={repos} />
    </div>
  );
}
