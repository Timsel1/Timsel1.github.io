import styles from "./FlappyBurd.module.css";

export default function FlappyBird() {
  return (
    <div className={styles.frame}>
      <p>This game is meant to be played as a discord activity</p>
      <iframe
        src="/Unity/index.html"
        style={{
          width: "960",
          height: "600",
          border: "none",
        }}
        allow="fullscreen; autoplay"
      />
    </div>
  );
}
