import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CoreTheme, CoreThemeMeta, SubTheme } from "../types";

const coreThemes: CoreThemeMeta[] = [
  {
    id: "tech",
    label: "Tech Themes",
    icon: "💻",
    description: "Programming, Web Dev, AI, Cybersecurity & Data",
    gradient:
      "linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(34,197,94,0.1) 100%)",
    cardClass: "card-gradient-blue",
    hoverClass: "card-hover-blue",
    subThemes: [
      {
        id: "programming",
        label: "Programming Languages",
        icon: "🖥️",
        gradient: "card-gradient-blue",
        hoverClass: "card-hover-blue",
      },
      {
        id: "webdev",
        label: "Web Development",
        icon: "🌐",
        gradient: "card-gradient-green",
        hoverClass: "card-hover-green",
      },
      {
        id: "ai_ml",
        label: "AI & Machine Learning",
        icon: "🤖",
        gradient: "card-gradient-purple",
        hoverClass: "card-hover-purple",
      },
      {
        id: "cybersecurity",
        label: "Cybersecurity",
        icon: "🔐",
        gradient: "card-gradient-blue",
        hoverClass: "card-hover-blue",
      },
      {
        id: "data_science",
        label: "Data Science",
        icon: "📊",
        gradient: "card-gradient-orange",
        hoverClass: "card-hover-orange",
      },
    ],
  },
  {
    id: "fun",
    label: "Fun Themes",
    icon: "🎉",
    description: "Movies, Music, Sports, Memes & Marvel/Anime",
    gradient:
      "linear-gradient(135deg, rgba(168,85,247,0.2) 0%, rgba(59,130,246,0.1) 100%)",
    cardClass: "card-gradient-purple",
    hoverClass: "card-hover-purple",
    subThemes: [
      {
        id: "movies",
        label: "Movies & Series",
        icon: "🎬",
        gradient: "card-gradient-purple",
        hoverClass: "card-hover-purple",
      },
      {
        id: "music",
        label: "Music & Pop Culture",
        icon: "🎵",
        gradient: "card-gradient-blue",
        hoverClass: "card-hover-blue",
      },
      {
        id: "sports",
        label: "Sports",
        icon: "⚽",
        gradient: "card-gradient-green",
        hoverClass: "card-hover-green",
      },
      {
        id: "memes",
        label: "Memes & Internet",
        icon: "😂",
        gradient: "card-gradient-orange",
        hoverClass: "card-hover-orange",
      },
      {
        id: "marvel_anime",
        label: "Marvel / Anime",
        icon: "⚡",
        gradient: "card-gradient-purple",
        hoverClass: "card-hover-purple",
      },
    ],
  },
  {
    id: "smart",
    label: "Smart Themes",
    icon: "🎓",
    description: "Aptitude, GK, Business, Space & History",
    gradient:
      "linear-gradient(135deg, rgba(34,197,94,0.2) 0%, rgba(245,158,11,0.1) 100%)",
    cardClass: "card-gradient-green",
    hoverClass: "card-hover-green",
    subThemes: [
      {
        id: "aptitude",
        label: "Aptitude & Logic",
        icon: "🧮",
        gradient: "card-gradient-orange",
        hoverClass: "card-hover-orange",
      },
      {
        id: "general_knowledge",
        label: "General Knowledge",
        icon: "🌍",
        gradient: "card-gradient-green",
        hoverClass: "card-hover-green",
      },
      {
        id: "startup",
        label: "Startup & Business",
        icon: "🚀",
        gradient: "card-gradient-blue",
        hoverClass: "card-hover-blue",
      },
      {
        id: "space_science",
        label: "Space & Science",
        icon: "🔭",
        gradient: "card-gradient-purple",
        hoverClass: "card-hover-purple",
      },
      {
        id: "history",
        label: "History Battles",
        icon: "⚔️",
        gradient: "card-gradient-orange",
        hoverClass: "card-hover-orange",
      },
    ],
  },
];

interface ThemeSelectScreenProps {
  coreTheme: CoreTheme | null;
  onSelectCore: (theme: CoreTheme | null) => void;
  onSelectSub: (theme: SubTheme) => void;
}

export function ThemeSelectScreen({
  coreTheme,
  onSelectCore,
  onSelectSub,
}: ThemeSelectScreenProps) {
  const selected = coreThemes.find((t) => t.id === coreTheme);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 sm:py-14">
      {/* Step indicator */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center gap-2">
          <span
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
            }}
          >
            {coreTheme ? "✓" : "1"}
          </span>
          <span
            className="text-sm font-medium"
            style={{
              color: coreTheme
                ? "var(--muted-foreground)"
                : "var(--foreground)",
            }}
          >
            Choose Category
          </span>
        </div>
        <ChevronRight
          className="w-4 h-4"
          style={{ color: "var(--muted-foreground)" }}
        />
        <div className="flex items-center gap-2">
          <span
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
            style={{
              backgroundColor: coreTheme ? "var(--primary)" : "var(--muted)",
              color: coreTheme
                ? "var(--primary-foreground)"
                : "var(--muted-foreground)",
            }}
          >
            2
          </span>
          <span
            className="text-sm font-medium"
            style={{
              color: coreTheme
                ? "var(--foreground)"
                : "var(--muted-foreground)",
            }}
          >
            Choose Topic
          </span>
        </div>
      </div>

      {!coreTheme ? (
        <>
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-black mb-2">
              Choose a Category
            </h2>
            <p style={{ color: "var(--muted-foreground)" }}>
              Select the type of quiz you want to take
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {coreThemes.map((theme) => (
              <button
                key={theme.id}
                type="button"
                data-ocid={`theme.core.${theme.id}`}
                onClick={() => onSelectCore(theme.id)}
                className={`rounded-2xl p-6 text-left card-hover ${theme.hoverClass} ${theme.cardClass}`}
              >
                <div className="text-4xl mb-4">{theme.icon}</div>
                <h3 className="text-lg font-bold mb-2">{theme.label}</h3>
                <p
                  className="text-sm"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {theme.description}
                </p>
                <div
                  className="mt-4 flex items-center gap-1 text-xs font-semibold"
                  style={{ color: "var(--accent)" }}
                >
                  5 Topics <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-4 mb-8">
            <Button
              type="button"
              data-ocid="theme.back_button"
              variant="ghost"
              size="sm"
              onClick={() => onSelectCore(null)}
              className="gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </Button>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black">
                {selected?.icon} {selected?.label}
              </h2>
              <p
                className="text-sm"
                style={{ color: "var(--muted-foreground)" }}
              >
                Pick your topic
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {selected?.subThemes.map((sub, i) => (
              <button
                key={sub.id}
                type="button"
                data-ocid={`theme.sub.item.${i + 1}`}
                onClick={() => onSelectSub(sub.id as SubTheme)}
                className={`rounded-2xl p-5 text-left card-hover ${sub.hoverClass} ${sub.gradient}`}
              >
                <div className="text-3xl mb-3">{sub.icon}</div>
                <h3 className="font-bold text-base">{sub.label}</h3>
                <div
                  className="mt-3 text-xs"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  10 Questions available
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
