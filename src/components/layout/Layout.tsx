import { useState, useCallback } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import styles from "./Layout.module.css";
import { TabEntry, ALL_PAGES } from "./pages";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Start with Home open by default
  const [openTabs, setOpenTabs] = useState<TabEntry[]>([ALL_PAGES[0]]);

  const openTab = useCallback(
    (page: TabEntry) => {
      // If the tab isn't open yet, add it
      setOpenTabs((prev) =>
        prev.find((t) => t.path === page.path) ? prev : [...prev, page],
      );
      navigate(page.path);
    },
    [navigate],
  );

  const closeTab = useCallback(
    (e: React.MouseEvent, path: string) => {
      e.stopPropagation(); // don't also trigger the tab's onClick

      setOpenTabs((prev) => {
        if (prev.length === 1) return prev; // never close the last tab

        const idx = prev.findIndex((t) => t.path === path);
        const next = prev.filter((t) => t.path !== path);

        // If we closed the active tab, switch to the one to its left (or new last)
        if (location.pathname === path) {
          const newActive = next[Math.max(0, idx - 1)];
          navigate(newActive.path);
        }

        return next;
      });
    },
    [location.pathname, navigate],
  );

  return (
    <div className={styles.shell}>
      <Sidebar onNavigate={openTab} />

      <main className={styles.main}>
        {/* Tab bar */}
        <div className={styles.tabbar}>
          {openTabs.map((tab) => (
            <div
              key={tab.path}
              className={`${styles.tab} ${location.pathname === tab.path ? styles.activeTab : ""}`}
              onClick={() => navigate(tab.path)}
            >
              <span className={styles.tabLabel}>{tab.label}</span>
              <button
                className={styles.tabClose}
                onClick={(e) => closeTab(e, tab.path)}
                // Don't show × if it's the only tab — nowhere to close to
                style={{ visibility: openTabs.length === 1 ? "hidden" : "visible" }}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* The active page renders here */}
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
