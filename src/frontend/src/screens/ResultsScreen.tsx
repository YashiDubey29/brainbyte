import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, Trophy } from "lucide-react";
import { themeLabels } from "../quizData";
import type { QuizState } from "../types";

interface ResultsScreenProps {
  state: QuizState;
  score: number;
  timeTaken: number;
  onRetake: () => void;
  onChangeTheme: () => void;
  onLeaderboard: () => void;
}

function getPerformance(pct: number) {
  if (pct >= 90)
    return {
      label: "Genius!",
      emoji: "🧠",
      color: "var(--primary)",
      colorRaw: "#22C55E",
    };
  if (pct >= 70)
    return {
      label: "Smart!",
      emoji: "🚀",
      color: "var(--accent)",
      colorRaw: "#3B82F6",
    };
  if (pct >= 50)
    return {
      label: "Good Effort!",
      emoji: "💡",
      color: "var(--chart-4)",
      colorRaw: "#F59E0B",
    };
  return {
    label: "Keep Practicing!",
    emoji: "💪",
    color: "var(--destructive)",
    colorRaw: "#EF4444",
  };
}

export function ResultsScreen({
  state,
  score,
  timeTaken,
  onRetake,
  onChangeTheme,
  onLeaderboard,
}: ResultsScreenProps) {
  const total = state.questions.length;
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const perf = getPerformance(pct);
  const mins = Math.floor(timeTaken / 60);
  const secs = timeTaken % 60;
  const themeName = state.subTheme ? themeLabels[state.subTheme] : "Quiz";

  return (
    <div className="max-w-lg mx-auto px-4 py-10 sm:py-14">
      <div
        className="rounded-3xl p-8 text-center screen-fade-in"
        style={{
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
        }}
      >
        {/* Performance emoji */}
        <div className="text-7xl mb-4 floating">{perf.emoji}</div>
        <div className="text-2xl font-black mb-1" style={{ color: perf.color }}>
          {perf.label}
        </div>
        <p
          className="text-sm mb-8"
          style={{ color: "var(--muted-foreground)" }}
        >
          {themeName}
        </p>

        {/* Score circle */}
        <div
          className="relative w-36 h-36 mx-auto mb-8 rounded-full flex items-center justify-center"
          style={{
            background: `conic-gradient(${perf.colorRaw} ${pct * 3.6}deg, var(--muted) 0deg)`,
            boxShadow: `0 0 32px ${perf.colorRaw}40`,
          }}
        >
          <div
            className="w-28 h-28 rounded-full flex flex-col items-center justify-center"
            style={{ backgroundColor: "var(--card)" }}
          >
            <span className="text-3xl font-black" style={{ color: perf.color }}>
              {pct}%
            </span>
            <span
              className="text-xs"
              style={{ color: "var(--muted-foreground)" }}
            >
              {score}/{total}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { label: "Score", value: `${score}/${total}`, icon: "🎯" },
            {
              label: "Time",
              value: mins > 0 ? `${mins}m ${secs}s` : `${secs}s`,
              icon: "⏱️",
            },
            { label: "Difficulty", value: state.difficulty ?? "-", icon: "⚡" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl p-3"
              style={{ backgroundColor: "var(--muted)" }}
            >
              <div className="text-xl mb-1">{stat.icon}</div>
              <div
                className="text-xs"
                style={{ color: "var(--muted-foreground)" }}
              >
                {stat.label}
              </div>
              <div className="text-sm font-bold capitalize">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Per-question breakdown */}
        <div className="flex gap-1 justify-center mb-8 flex-wrap">
          {state.answers.map((ans, i) => (
            <div
              key={`q-${state.questions[i]?.text?.slice(0, 20) ?? i}-${i}`}
              className="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center"
              title={`Q${i + 1}: ${ans === state.questions[i]?.correctIndex ? "Correct" : "Wrong"}`}
              style={{
                backgroundColor:
                  ans === state.questions[i]?.correctIndex
                    ? "rgba(34,197,94,0.3)"
                    : "rgba(239,68,68,0.3)",
                color:
                  ans === state.questions[i]?.correctIndex
                    ? "var(--primary)"
                    : "var(--destructive)",
                border: `1px solid ${ans === state.questions[i]?.correctIndex ? "var(--primary)" : "var(--destructive)"}`,
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* Badge */}
        <div className="flex justify-center mb-8">
          <Badge
            style={{
              backgroundColor: `${perf.colorRaw}20`,
              color: perf.color,
              border: `1px solid ${perf.colorRaw}40`,
            }}
          >
            {pct >= 90
              ? "🏆 Top Score!"
              : pct >= 70
                ? "🥈 Great Job!"
                : pct >= 50
                  ? "🥉 Nice Try!"
                  : "📚 Keep Learning!"}
          </Badge>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            type="button"
            data-ocid="results.retake_button"
            onClick={onRetake}
            className="w-full h-12 font-bold rounded-xl btn-glow-primary"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
            }}
          >
            <RefreshCw className="w-4 h-4 mr-2" /> Retake Quiz
          </Button>
          <Button
            type="button"
            data-ocid="results.change_theme_button"
            variant="outline"
            onClick={onChangeTheme}
            className="w-full h-12 font-bold rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Change Theme
          </Button>
          <Button
            type="button"
            data-ocid="results.leaderboard_button"
            variant="ghost"
            onClick={onLeaderboard}
            className="w-full h-12 gap-2"
            style={{ color: "var(--muted-foreground)" }}
          >
            <Trophy className="w-4 h-4" style={{ color: "var(--accent)" }} />{" "}
            View Leaderboard
          </Button>
        </div>
      </div>
    </div>
  );
}
