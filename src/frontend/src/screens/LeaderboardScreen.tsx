import { Button } from "@/components/ui/button";
import { ArrowLeft, Medal, Trophy } from "lucide-react";
import { themeLabels } from "../quizData";
import type { LeaderboardEntry, SubTheme } from "../types";

interface LeaderboardScreenProps {
  entries: LeaderboardEntry[];
  onBack: () => void;
}

const medals = ["🥇", "🥈", "🥉"];

function formatTime(secs: number) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

export function LeaderboardScreen({ entries, onBack }: LeaderboardScreenProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10 sm:py-14">
      <div className="flex items-center gap-4 mb-8">
        <Button
          type="button"
          data-ocid="leaderboard.back_button"
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="gap-1"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center pulse-glow"
            style={{ background: "linear-gradient(135deg, #F59E0B, #EF4444)" }}
          >
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black">Leaderboard</h2>
            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
              Top 10 Players · Best Score
            </p>
          </div>
        </div>
      </div>

      {entries.length === 0 ? (
        <div
          data-ocid="leaderboard.empty_state"
          className="rounded-2xl p-16 text-center"
          style={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          <Trophy
            className="w-16 h-16 mx-auto mb-4 opacity-30"
            style={{ color: "var(--primary)" }}
          />
          <h3 className="text-xl font-bold mb-2">No scores yet!</h3>
          <p style={{ color: "var(--muted-foreground)" }}>
            Complete a quiz to appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3" data-ocid="leaderboard.list">
          {entries.map((entry, i) => (
            <div
              key={`${entry.username}-${entry.theme}`}
              data-ocid={`leaderboard.item.${i + 1}`}
              className="rounded-2xl p-5 flex items-center gap-4 screen-fade-in"
              style={{
                backgroundColor:
                  i < 3
                    ? `${["rgba(251,191,36,0.1)", "rgba(148,163,184,0.1)", "rgba(251,146,60,0.1)"][i]}`
                    : "var(--card)",
                border: `1px solid ${i < 3 ? ["rgba(251,191,36,0.3)", "rgba(148,163,184,0.3)", "rgba(251,146,60,0.3)"][i] : "var(--border)"}`,
                animationDelay: `${i * 0.05}s`,
              }}
            >
              {/* Rank */}
              <div className="text-2xl w-10 text-center flex-shrink-0">
                {medals[i] ?? (
                  <span
                    className="text-base font-bold"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    #{i + 1}
                  </span>
                )}
              </div>

              {/* Avatar */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0"
                style={{
                  background: `hsl(${(entry.username.charCodeAt(0) * 37) % 360}, 60%, 45%)`,
                  color: "white",
                }}
              >
                {entry.username.charAt(0).toUpperCase()}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="font-bold truncate">{entry.username}</div>
                <div
                  className="text-xs"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {themeLabels[entry.theme as SubTheme] ?? entry.theme} ·{" "}
                  {entry.difficulty}
                </div>
              </div>

              {/* Stats */}
              <div className="text-right flex-shrink-0">
                <div
                  className="text-xl font-black"
                  style={{
                    color:
                      entry.percentage >= 90
                        ? "var(--primary)"
                        : entry.percentage >= 70
                          ? "var(--accent)"
                          : entry.percentage >= 50
                            ? "var(--chart-4)"
                            : "var(--destructive)",
                  }}
                >
                  {entry.percentage}%
                </div>
                <div
                  className="text-xs"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {entry.score}/{entry.total} · {formatTime(entry.timeTaken)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Legend */}
      {entries.length > 0 && (
        <div
          className="mt-6 flex items-center gap-2 justify-center text-xs"
          style={{ color: "var(--muted-foreground)" }}
        >
          <Medal className="w-3.5 h-3.5" />
          <span>One best score per player is shown</span>
        </div>
      )}
    </div>
  );
}
