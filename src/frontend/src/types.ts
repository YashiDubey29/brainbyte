// BrainByte shared types

export type Screen =
  | "login"
  | "themeSelect"
  | "quizSetup"
  | "quiz"
  | "results"
  | "leaderboard";

export type CoreTheme = "tech" | "fun" | "smart";

export type SubTheme =
  // Tech
  | "programming"
  | "webdev"
  | "ai_ml"
  | "cybersecurity"
  | "data_science"
  // Fun
  | "movies"
  | "music"
  | "sports"
  | "memes"
  | "marvel_anime"
  // Smart
  | "aptitude"
  | "general_knowledge"
  | "startup"
  | "space_science"
  | "history";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface Question {
  id: string;
  text: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation?: string;
}

export interface QuizState {
  screen: Screen;
  username: string;
  coreTheme: CoreTheme | null;
  subTheme: SubTheme | null;
  difficulty: Difficulty | null;
  questionCount: number;
  questions: Question[];
  currentIndex: number;
  answers: (number | null)[];
  startTime: number | null;
  endTime: number | null;
  timePerQuestion: number;
}

export interface LeaderboardEntry {
  username: string;
  score: number;
  total: number;
  percentage: number;
  timeTaken: number;
  theme: string;
  difficulty: Difficulty;
  date: number;
}

export interface ThemeMeta {
  id: SubTheme;
  label: string;
  icon: string;
  gradient: string;
  hoverClass: string;
}

export interface CoreThemeMeta {
  id: CoreTheme;
  label: string;
  icon: string;
  description: string;
  gradient: string;
  cardClass: string;
  hoverClass: string;
  subThemes: ThemeMeta[];
}
