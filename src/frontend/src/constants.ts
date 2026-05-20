// BrainByte — app-wide constants

export const APP_NAME = "BrainByte";

export const LEADERBOARD_KEY = "brainbyte_leaderboard";
export const USERNAME_KEY = "brainbyte_username";
export const THEME_KEY = "brainbyte_theme";

export const MAX_LEADERBOARD_ENTRIES = 50;
export const TOP_LEADERBOARD_DISPLAY = 10;

export const DIFFICULTY_TIME: Record<string, number> = {
  beginner: 30,
  intermediate: 45,
  advanced: 60,
};

export const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: "#22C55E",
  intermediate: "#F59E0B",
  advanced: "#EF4444",
};

export const PERFORMANCE_TIERS = [
  { min: 90, label: "Genius", emoji: "🧠", color: "#22C55E" },
  { min: 70, label: "Smart", emoji: "🚀", color: "#3B82F6" },
  { min: 50, label: "Good Effort", emoji: "👍", color: "#F59E0B" },
  { min: 0, label: "Keep Practicing", emoji: "💪", color: "#EF4444" },
] as const;
