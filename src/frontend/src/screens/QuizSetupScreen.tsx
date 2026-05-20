import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ChevronLeft, Clock, Hash } from "lucide-react";
import { useEffect, useState } from "react";
import { themeLabels } from "../quizData";
import type { Difficulty, SubTheme } from "../types";

const difficulties: {
  id: Difficulty;
  label: string;
  time: number;
  color: string;
  description: string;
}[] = [
  {
    id: "beginner",
    label: "Beginner",
    time: 30,
    color: "#22C55E",
    description: "30 sec / question",
  },
  {
    id: "intermediate",
    label: "Intermediate",
    time: 45,
    color: "#F59E0B",
    description: "45 sec / question",
  },
  {
    id: "advanced",
    label: "Advanced",
    time: 60,
    color: "#EF4444",
    description: "60 sec / question",
  },
];

interface QuizSetupScreenProps {
  subTheme: SubTheme;
  difficulty: Difficulty | null;
  questionCount: number;
  onUpdate: (difficulty: Difficulty, count: number) => void;
  onStart: () => void;
  onBack: () => void;
}

export function QuizSetupScreen({
  subTheme,
  difficulty,
  questionCount,
  onUpdate,
  onStart,
  onBack,
}: QuizSetupScreenProps) {
  const [localDiff, setLocalDiff] = useState<Difficulty>(
    difficulty ?? "beginner",
  );
  const [localCount, setLocalCount] = useState(questionCount);

  useEffect(() => {
    onUpdate(localDiff, localCount);
  }, [localDiff, localCount, onUpdate]);

  const timePerQ = difficulties.find((d) => d.id === localDiff)?.time ?? 30;
  const estimatedMinutes = Math.ceil((localCount * timePerQ) / 60);

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 sm:py-14">
      <div className="flex items-center gap-4 mb-8">
        <Button
          type="button"
          data-ocid="setup.back_button"
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="gap-1"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </Button>
        <div>
          <h2 className="text-2xl font-black">Quiz Setup</h2>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            {themeLabels[subTheme]}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Difficulty */}
        <div
          className="rounded-2xl p-6"
          style={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <span>⚡</span> Select Difficulty
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {difficulties.map((d) => (
              <button
                key={d.id}
                type="button"
                data-ocid={`setup.difficulty.${d.id}`}
                onClick={() => setLocalDiff(d.id)}
                className="rounded-xl p-4 text-center transition-all duration-200"
                style={{
                  border: `2px solid ${localDiff === d.id ? d.color : "var(--border)"}`,
                  backgroundColor:
                    localDiff === d.id ? `${d.color}18` : "var(--muted)",
                  boxShadow:
                    localDiff === d.id ? `0 0 16px ${d.color}40` : "none",
                }}
              >
                <div
                  className="text-lg font-bold"
                  style={{
                    color: localDiff === d.id ? d.color : "var(--foreground)",
                  }}
                >
                  {d.label}
                </div>
                <div
                  className="text-xs mt-1"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {d.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Question count */}
        <div
          className="rounded-2xl p-6"
          style={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Hash className="w-4 h-4" /> Number of Questions
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span
                className="text-sm"
                style={{ color: "var(--muted-foreground)" }}
              >
                Questions
              </span>
              <span
                className="text-2xl font-black"
                style={{ color: "var(--primary)" }}
                data-ocid="setup.question_count"
              >
                {localCount}
              </span>
            </div>
            <Slider
              data-ocid="setup.count_slider"
              min={1}
              max={50}
              step={1}
              value={[localCount]}
              onValueChange={([v]) => setLocalCount(v)}
              className="w-full"
            />
            <div
              className="flex justify-between text-xs"
              style={{ color: "var(--muted-foreground)" }}
            >
              <span>1</span>
              <span>50</span>
            </div>
          </div>
        </div>

        {/* Estimated time */}
        <div
          className="rounded-2xl p-5 flex items-center gap-4"
          style={{
            backgroundColor: "var(--muted)",
            border: "1px solid var(--border)",
          }}
        >
          <Clock
            className="w-8 h-8 flex-shrink-0"
            style={{ color: "var(--accent)" }}
          />
          <div>
            <div
              className="text-sm"
              style={{ color: "var(--muted-foreground)" }}
            >
              Estimated Time
            </div>
            <div
              className="text-xl font-black"
              data-ocid="setup.estimated_time"
            >
              ~{estimatedMinutes} min
            </div>
          </div>
          <div className="ml-auto text-right">
            <div
              className="text-xs"
              style={{ color: "var(--muted-foreground)" }}
            >
              Total time
            </div>
            <div className="text-sm font-bold">{localCount * timePerQ}s</div>
          </div>
        </div>

        <Button
          type="button"
          data-ocid="setup.start_button"
          onClick={onStart}
          className="w-full h-14 text-lg font-black rounded-2xl btn-glow-primary"
          style={{
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
          }}
        >
          Start Quiz 🚀
        </Button>
      </div>
    </div>
  );
}
