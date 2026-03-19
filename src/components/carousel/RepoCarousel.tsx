import { useCallback, useEffect, useRef } from "react";
import { EmblaCarouselType, EmblaEventType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { PrevButton, NextButton, usePrevNextButtons } from "./EmblaCarouselArrowButton";
import type { Repo } from "../../interfaces/models/repo";
import styles from "./RepoCarousel.module.css";

// How strongly the scale effect applies — higher = more shrink on side slides
const TWEEN_FACTOR_BASE = 0.52;

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

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

// Split array into chunks — each chunk becomes one carousel slide
function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

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

type Props = {
  repos: Repo[];
  options?: EmblaOptionsType;
};

// Autoplay plugin — 10 seconds, pause on user interaction
const autoplay = Autoplay({ delay: 10000, stopOnInteraction: true });

export default function RepoCarousel({ repos, options }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", containScroll: false, ...options },
    [autoplay],
  );

  // tweenFactor and tweenNodes are refs, not state —
  // we don't want React to re-render when these change,
  // we just want to hold a mutable value between renders
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const { onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  // Collect the inner content nodes that we'll scale
  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(".embla-slide-inner") as HTMLElement;
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  // This runs on every scroll tick and updates the scale of each slide
  const tweenScale = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          // Adjust diff for looping slides so the scale stays correct
          // when wrapping from last → first or first → last
          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();
              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);
                if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
                if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
              }
            });
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
          const scale = numberWithinRange(tweenValue, 0, 1).toString();
          const tweenNode = tweenNodes.current[slideIndex];
          if (tweenNode) tweenNode.style.transform = `scale(${scale})`;
        });
      });
    },
    [],
  );

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenScale(emblaApi);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenScale)
      .on("scroll", tweenScale)
      .on("slideFocus", tweenScale);
  }, [emblaApi, tweenScale, setTweenNodes, setTweenFactor]);

  const pages = chunk(repos, 4);

  return (
    <div className={styles.embla}>
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container}>
          {pages.map((page, i) => (
            <div className={styles.slide} key={i}>
              {/* tweenScale targets this inner div — the slide shrinks, not the outer wrapper */}
              <div className={`${styles.slideInner} embla-slide-inner`}>
                <div className={styles.grid}>
                  {page.map((repo) => (
                    <RepoCard key={repo.name} repo={repo} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows sit outside the viewport so they don't get clipped */}
      <div className={styles.controls}>
        <PrevButton onClick={onPrevButtonClick} />
        <NextButton onClick={onNextButtonClick} />
      </div>
    </div>
  );
}
