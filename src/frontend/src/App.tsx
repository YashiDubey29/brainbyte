import { useEffect, useRef, useState } from "react";
import { Layout } from "./components/Layout";
import { useLeaderboard } from "./hooks/useLeaderboard";
import { useQuizState } from "./hooks/useQuizState";
import { LeaderboardScreen } from "./screens/LeaderboardScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { QuizScreen } from "./screens/QuizScreen";
import { QuizSetupScreen } from "./screens/QuizSetupScreen";
import { ResultsScreen } from "./screens/ResultsScreen";
import { ThemeSelectScreen } from "./screens/ThemeSelectScreen";

export default function App() {
  const quiz = useQuizState();
  const { entries, addEntry } = useLeaderboard();
  const [prevScreen, setPrevScreen] = useState(quiz.state.screen);
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prevScreen !== quiz.state.screen) {
      setPrevScreen(quiz.state.screen);
      if (screenRef.current) {
        screenRef.current.classList.remove("screen-fade-in");
        void screenRef.current.offsetWidth;
        screenRef.current.classList.add("screen-fade-in");
      }
    }
  }, [quiz.state.screen, prevScreen]);

  const handleResults = () => {
    const score = quiz.getScore();
    const total = quiz.state.questions.length;
    const timeTaken = quiz.getTimeTaken();
    addEntry({
      username: quiz.state.username,
      score,
      total,
      percentage: total > 0 ? Math.round((score / total) * 100) : 0,
      timeTaken,
      theme: quiz.state.subTheme ?? "unknown",
      difficulty: quiz.state.difficulty ?? "beginner",
    });
  };

  const renderScreen = () => {
    const { screen } = quiz.state;
    switch (screen) {
      case "login":
        return (
          <LoginScreen onLogin={quiz.login} username={quiz.state.username} />
        );
      case "themeSelect":
        return (
          <ThemeSelectScreen
            coreTheme={quiz.state.coreTheme}
            onSelectCore={quiz.selectCoreTheme}
            onSelectSub={quiz.selectSubTheme}
          />
        );
      case "quizSetup":
        return (
          <QuizSetupScreen
            subTheme={quiz.state.subTheme!}
            difficulty={quiz.state.difficulty}
            questionCount={quiz.state.questionCount}
            onUpdate={quiz.updateSetup}
            onStart={quiz.startQuiz}
            onBack={() => quiz.navigate("themeSelect")}
          />
        );
      case "quiz":
        return (
          <QuizScreen
            state={quiz.state}
            onAnswer={quiz.submitAnswer}
            onComplete={handleResults}
          />
        );
      case "results":
        return (
          <ResultsScreen
            state={quiz.state}
            score={quiz.getScore()}
            timeTaken={quiz.getTimeTaken()}
            onRetake={quiz.retakeQuiz}
            onChangeTheme={quiz.resetToThemeSelect}
            onLeaderboard={() => quiz.navigate("leaderboard")}
          />
        );
      case "leaderboard":
        return (
          <LeaderboardScreen
            entries={entries}
            onBack={() =>
              quiz.navigate(quiz.state.subTheme ? "results" : "themeSelect")
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <Layout
      onLeaderboard={() => quiz.navigate("leaderboard")}
      showLeaderboardBtn={quiz.state.screen !== "login"}
    >
      <div ref={screenRef} className="screen-fade-in">
        {renderScreen()}
      </div>
    </Layout>
  );
}
