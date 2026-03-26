import styles from "./FlappyBurd.module.css";

export default function FlappyBird() {
  return (
    <div>
      <p>This game is meant to be played as a discord activity</p>
      <iframe
        className={styles.frame}
        src="/Unity/index.html"
        allow="fullscreen; autoplay"
      />
    </div>
  );
}
