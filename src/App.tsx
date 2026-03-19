import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import FlappyBurd from "./pages/FlappyBurd";
import Leaderboard from "./pages/Leaderboard";

export default function App() {
  return (
    // HashRouter means routes look like /#/leaderboard
    // This avoids the GitHub Pages 404 problem with zero extra config
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/game" element={<FlappyBurd />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
