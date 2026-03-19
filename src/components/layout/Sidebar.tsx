import { NavLink } from "react-router-dom";
import { House, Gamepad2, Trophy } from "lucide-react";
import { ALL_PAGES, TabEntry } from "./pages";
import styles from "./Sidebar.module.css";

interface Props {
  onNavigate: (page: TabEntry) => void;
}

const NAV_ITEMS = [
  { page: ALL_PAGES[0], Icon: House },
  { page: ALL_PAGES[1], Icon: Gamepad2 },
  { page: ALL_PAGES[2], Icon: Trophy },
];

export default function Sidebar({ onNavigate }: Props) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <span className={styles.logoMark}>YN</span>
        <div>
          <div className={styles.logoText}>yourname.dev</div>
          <div className={styles.logoSub}>portfolio</div>
        </div>
      </div>

      <nav className={styles.nav}>
        <span className={styles.navLabel}>pages</span>
        {NAV_ITEMS.map(({ page, Icon }) => (
          <NavLink
            key={page.path}
            to={page.path}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ""}`
            }
            onClick={(e) => {
              e.preventDefault();
              onNavigate(page);
            }}
          >
            <Icon size={14} />
            {page.label.replace(".tsx", "")}
          </NavLink>
        ))}
      </nav>

      <div className={styles.footer}>
        <span className={styles.statusDot} />
        github pages
      </div>
    </aside>
  );
}
