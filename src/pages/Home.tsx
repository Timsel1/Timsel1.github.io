import { useEffect, useState } from "react";
import { GithubService } from "../services/GithubService";
import { PHOTO_URL, BIO, SKILLS, INTERNSHIPS } from "../data/homeData";
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

  return (
    <div className={styles.page}>
      {/* About section */}
      <section className={styles.about}>
        <img src={PHOTO_URL} alt="Profile photo" className={styles.photo} />
        <div className={styles.aboutText}>
          <div className={styles.nameRow}>
            <h1 className={styles.name}>Tim M.</h1>
            <span className={styles.role}>// software developer</span>
          </div>
          <div className={styles.bio}>
            {BIO.map((section) => (
              <div key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.content}</p>
              </div>
            ))}
          </div>
          <div className={styles.skills}>
            {SKILLS.map((skill) => (
              <span key={skill} className={styles.skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>
      {/* Repo carousel */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Public repos</h2>
        <p className={styles.sectionSub}>// {repos.length} fetched from github</p>
        {loading && <div className={styles.state}>Fetching repos...</div>}
        {error && <div className={styles.state}>{error}</div>}
        {!loading && !error && <RepoCarousel repos={repos} />}
      </section>
      {/* Internship projects */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Internship projects</h2>
        <p className={styles.sectionSub}>// private repos, described below</p>
        <div className={styles.internships}>
          {INTERNSHIPS.map((item) => (
            <div key={item.project} className={styles.internshipCard}>
              <div className={styles.internshipHeader}>
                <div>
                  <div className={styles.internshipProject}>{item.project}</div>
                  <div className={styles.internshipCompany}>{item.company}</div>
                </div>
                <span className={styles.internshipDuration}>{item.duration}</span>
              </div>
              <p className={styles.internshipDesc}>{item.description}</p>
              <div className={styles.internshipStack}>
                {item.stack.map((tech) => (
                  <span key={tech} className={styles.skill}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
