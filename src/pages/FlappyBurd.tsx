import styles from "./FlappyBurd.module.css";

export default function FlappyBird() {
  return (
    <div className={styles.frame}>
      <iframe
        src="/Unity/index.html"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
        allow="fullscreen; autoplay"
      />
    </div>
  );
}
