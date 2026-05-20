import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain, Zap } from "lucide-react";
import { useRef, useState } from "react";

interface LoginScreenProps {
  onLogin: (username: string) => void;
  username: string;
}

export function LoginScreen({
  onLogin,
  username: savedUsername,
}: LoginScreenProps) {
  const [value, setValue] = useState(savedUsername);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) {
      setError("Please enter a username");
      inputRef.current?.focus();
      return;
    }
    if (trimmed.length < 2) {
      setError("Username must be at least 2 characters");
      return;
    }
    setError("");
    onLogin(trimmed);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Floating logo */}
        <div className="flex justify-center mb-8">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center floating"
            style={{
              background: "linear-gradient(135deg, #22C55E, #3B82F6)",
              boxShadow: "0 0 40px rgba(34,197,94,0.4)",
            }}
          >
            <Brain className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8 screen-fade-in"
          style={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
          }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black mb-2">
              <span className="text-gradient-primary">BrainByte</span>
            </h1>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              Challenge your mind. Climb the leaderboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">
                Your Name
              </Label>
              <Input
                ref={inputRef}
                id="username"
                data-ocid="login.input"
                placeholder="e.g. QuizMaster99"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  setError("");
                }}
                autoFocus
                autoComplete="username"
                className="h-12 text-base rounded-xl"
                style={{
                  backgroundColor: "var(--input)",
                  borderColor: error ? "var(--destructive)" : "var(--border)",
                }}
              />
              {error && (
                <p
                  data-ocid="login.field_error"
                  className="text-xs"
                  style={{ color: "var(--destructive)" }}
                >
                  {error}
                </p>
              )}
            </div>

            <Button
              type="submit"
              data-ocid="login.submit_button"
              className="w-full h-12 text-base font-bold rounded-xl btn-glow-primary ripple-container"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
              }}
            >
              <Zap className="w-5 h-5 mr-2" />
              Start Quiz
            </Button>
          </form>

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-3 text-center">
            {[
              { icon: "🧠", label: "15 Topics" },
              { icon: "⏱️", label: "Timed" },
              { icon: "🏆", label: "Leaderboard" },
            ].map((f) => (
              <div
                key={f.label}
                className="rounded-xl p-3"
                style={{ backgroundColor: "var(--muted)" }}
              >
                <div className="text-xl mb-1">{f.icon}</div>
                <div
                  className="text-xs font-medium"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {f.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
