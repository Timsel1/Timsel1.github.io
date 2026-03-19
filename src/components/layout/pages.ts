export interface TabEntry {
  path: string;
  label: string;
}

export const ALL_PAGES: TabEntry[] = [
  { path: "/home", label: "Home.tsx" },
  { path: "/game", label: "FlappyBurd.tsx" },
  { path: "/leaderboard", label: "Leaderboard.tsx" },
];
