import { useCallback, useEffect, useState } from "react";
import type { Difficulty, LeaderboardEntry } from "../types";

const STORAGE_KEY = "brainbyte-leaderboard";

export function useLeaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as LeaderboardEntry[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const addEntry = useCallback((entry: Omit<LeaderboardEntry, "date">) => {
    setEntries((prev) => {
      const withDate: LeaderboardEntry = { ...entry, date: Date.now() };
      // Keep only best score per user per theme
      const filtered = prev.filter(
        (e) => !(e.username === entry.username && e.theme === entry.theme),
      );
      const updated = [...filtered, withDate];
      // Sort by percentage desc, then by timeTaken asc
      updated.sort((a, b) =>
        b.percentage !== a.percentage
          ? b.percentage - a.percentage
          : a.timeTaken - b.timeTaken,
      );
      return updated.slice(0, 10);
    });
  }, []);

  const bestPerPlayer = entries.reduce<LeaderboardEntry[]>((acc, entry) => {
    const existing = acc.find((e) => e.username === entry.username);
    if (!existing || entry.percentage > existing.percentage) {
      return [...acc.filter((e) => e.username !== entry.username), entry];
    }
    return acc;
  }, []);

  bestPerPlayer.sort((a, b) =>
    b.percentage !== a.percentage
      ? b.percentage - a.percentage
      : a.timeTaken - b.timeTaken,
  );

  return { entries: bestPerPlayer.slice(0, 10), addEntry };
}

export type { Difficulty, LeaderboardEntry };
