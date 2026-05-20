import { useCallback, useEffect, useRef, useState } from "react";
import type { QuizState } from "../types";

interface QuizScreenProps {
  state: QuizState;
  onAnswer: (index: number | null) => void;
  onComplete: () => void;
}

const ANSWER_REVEAL_DELAY = 1200;

export function QuizScreen({ state, onAnswer, onComplete }: QuizScreenProps) {
  const { questions, currentIndex, timePerQuestion } = state;
  const question = questions[currentIndex];
  const [timeLeft, setTimeLeft] = useState(timePerQuestion);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const completeCalled = useRef(false);

  const isLastQuestion = currentIndex === questions.length - 1;

  const proceed = useCallback(
    (answerIdx: number | null) => {
      if (revealed) return;
      setRevealed(true);
      clearInterval(timerRef.current!);
      setTimeout(() => {
        if (isLastQuestion && !completeCalled.current) {
          completeCalled.current = true;
          onComplete();
        }
        onAnswer(answerIdx);
        setSelected(null);
        setRevealed(false);
        setTimeLeft(timePerQuestion);
      }, ANSWER_REVEAL_DELAY);
    },
    [revealed, isLastQuestion, onComplete, onAnswer, timePerQuestion],
  );

  useEffect(() => {
    setTimeLeft(timePerQuestion);
    setSelected(null);
    setRevealed(false);
    completeCalled.current = false;
  }, [timePerQuestion]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          proceed(null);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [proceed]);

  if (!question) return null;

  const progress = (currentIndex + 1) / questions.length;
  const timerProgress = timeLeft / timePerQuestion;
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const timerColor =
    timerProgress > 0.5
      ? "#22C55E"
      : timerProgress > 0.25
        ? "#F59E0B"
        : "#EF4444";

  const getOptionStyle = (idx: number): React.CSSProperties => {
    if (!revealed) {
      return {
        backgroundColor:
          selected === idx ? "rgba(59,130,246,0.2)" : "var(--muted)",
        border: `2px solid ${selected === idx ? "var(--accent)" : "var(--border)"}`,
        cursor: "pointer",
      };
    }
    if (idx === question.correctIndex) {
      return {
        backgroundColor: "rgba(34,197,94,0.2)",
        border: "2px solid #22C55E",
        boxShadow: "0 0 16px rgba(34,197,94,0.4)",
      };
    }
    if (idx === selected && idx !== question.correctIndex) {
      return {
        backgroundColor: "rgba(239,68,68,0.2)",
        border: "2px solid #EF4444",
      };
    }
    return {
      backgroundColor: "var(--muted)",
      border: "2px solid var(--border)",
      opacity: 0.5,
    };
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span
            className="text-sm font-semibold"
            style={{ color: "var(--primary)" }}
          >
            Q {currentIndex + 1}
          </span>
          <span
            className="text-sm"
            style={{ color: "var(--muted-foreground)" }}
          >
            {" "}
            / {questions.length}
          </span>
        </div>

        {/* Circular timer */}
        <div
          className="relative flex items-center justify-center"
          style={{ width: 88, height: 88 }}
        >
          <svg
            width="88"
            height="88"
            className="absolute"
            aria-label="Countdown timer"
            role="img"
          >
            <circle
              cx="44"
              cy="44"
              r={radius}
              fill="none"
              stroke="var(--border)"
              strokeWidth="5"
            />
            <circle
              cx="44"
              cy="44"
              r={radius}
              fill="none"
              stroke={timerColor}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - timerProgress)}
              className="timer-ring"
              style={{ filter: `drop-shadow(0 0 6px ${timerColor}80)` }}
            />
          </svg>
          <span
            className="text-xl font-black z-10"
            style={{ color: timerColor }}
            data-ocid="quiz.timer"
          >
            {timeLeft}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="h-1.5 rounded-full mb-8 overflow-hidden"
        style={{ backgroundColor: "var(--border)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${progress * 100}%`,
            background: "linear-gradient(90deg, #22C55E, #3B82F6)",
          }}
        />
      </div>

      {/* Question */}
      <div
        key={currentIndex}
        className="rounded-2xl p-6 mb-6 question-slide-in"
        style={{
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
        }}
      >
        <p
          className="text-lg sm:text-xl font-semibold leading-relaxed"
          data-ocid="quiz.question_text"
        >
          {question.text}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((opt, idx) => (
          <button
            key={opt}
            type="button"
            data-ocid={`quiz.option.${idx + 1}`}
            disabled={revealed}
            onClick={() => {
              if (!revealed) {
                setSelected(idx);
                proceed(idx);
              }
            }}
            className="w-full rounded-xl p-4 text-left font-medium transition-all duration-200"
            style={getOptionStyle(idx)}
          >
            <span
              className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold mr-3"
              style={{
                backgroundColor:
                  revealed && idx === question.correctIndex
                    ? "var(--primary)"
                    : revealed &&
                        idx === selected &&
                        idx !== question.correctIndex
                      ? "var(--destructive)"
                      : "var(--secondary)",
                color:
                  revealed &&
                  (idx === question.correctIndex || idx === selected)
                    ? "white"
                    : "var(--muted-foreground)",
              }}
            >
              {String.fromCharCode(65 + idx)}
            </span>
            {opt}
          </button>
        ))}
      </div>

      {/* Revealed feedback */}
      {revealed && (
        <div
          className="mt-4 rounded-xl p-4 text-sm font-medium text-center screen-fade-in"
          style={{
            backgroundColor:
              selected === question.correctIndex
                ? "rgba(34,197,94,0.15)"
                : "rgba(239,68,68,0.15)",
            color: selected === question.correctIndex ? "#22C55E" : "#EF4444",
            border: `1px solid ${selected === question.correctIndex ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
          }}
        >
          {selected === null
            ? "⏱️ Time's up! Moving on..."
            : selected === question.correctIndex
              ? "✅ Correct! Well done!"
              : `❌ Wrong! Correct: ${question.options[question.correctIndex]}`}
        </div>
      )}
    </div>
  );
}
