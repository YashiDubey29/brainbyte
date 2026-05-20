import { Button } from "@/components/ui/button";
import { Brain, Moon, Sun, Trophy } from "lucide-react";
import type { ReactNode } from "react";
import { useTheme } from "../hooks/useTheme";

interface LayoutProps {
  children: ReactNode;
  onLeaderboard?: () => void;
  showLeaderboardBtn?: boolean;
}

export function Layout({
  children,
  onLeaderboard,
  showLeaderboardBtn = true,
}: LayoutProps) {
  const { theme, toggle } = useTheme();
  const year = new Date().getFullYear();
  const utmUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      {/* Header */}
      <header
        data-ocid="header"
        className="sticky top-0 z-50 border-b"
        style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #22C55E, #3B82F6)",
              }}
            >
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-gradient-primary">
              BrainByte
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {showLeaderboardBtn && onLeaderboard && (
              <Button
                data-ocid="leaderboard.open_modal_button"
                variant="ghost"
                size="sm"
                onClick={onLeaderboard}
                className="gap-2 font-medium"
                style={{ color: "var(--muted-foreground)" }}
              >
                <Trophy
                  className="w-4 h-4"
                  style={{ color: "var(--primary)" }}
                />
                <span className="hidden sm:inline">Leaderboard</span>
              </Button>
            )}

            <Button
              data-ocid="theme.toggle"
              variant="ghost"
              size="icon"
              onClick={toggle}
              aria-label="Toggle theme"
              className="rounded-xl"
              style={{ color: "var(--muted-foreground)" }}
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer
        className="border-t py-4 text-center text-xs"
        style={{
          backgroundColor: "var(--card)",
          borderColor: "var(--border)",
          color: "var(--muted-foreground)",
        }}
      >
        © {year}. Built with ❤️ using{" "}
        <a
          href={utmUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
          style={{ color: "var(--primary)" }}
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
