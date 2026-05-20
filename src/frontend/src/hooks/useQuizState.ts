import { useCallback, useState } from "react";
import { getQuestions } from "../quizData";
import type {
  Difficulty,
  Question,
  QuizState,
  Screen,
  SubTheme,
} from "../types";

const difficultyTime: Record<Difficulty, number> = {
  beginner: 30,
  intermediate: 45,
  advanced: 60,
};

const initialState: QuizState = {
  screen: "login",
  username: "",
  coreTheme: null,
  subTheme: null,
  difficulty: null,
  questionCount: 10,
  questions: [],
  currentIndex: 0,
  answers: [],
  startTime: null,
  endTime: null,
  timePerQuestion: 30,
};

export function useQuizState() {
  const [state, setState] = useState<QuizState>(() => {
    const savedUser = localStorage.getItem("brainbyte-username");
    return { ...initialState, username: savedUser ?? "" };
  });

  const navigate = useCallback((screen: Screen) => {
    setState((s) => ({ ...s, screen }));
  }, []);

  const login = useCallback((username: string) => {
    localStorage.setItem("brainbyte-username", username);
    setState((s) => ({ ...s, username, screen: "themeSelect" }));
  }, []);

  const selectCoreTheme = useCallback((coreTheme: QuizState["coreTheme"]) => {
    setState((s) => ({ ...s, coreTheme, subTheme: null }));
  }, []);

  const selectSubTheme = useCallback((subTheme: SubTheme) => {
    setState((s) => ({ ...s, subTheme, screen: "quizSetup" }));
  }, []);

  const updateSetup = useCallback(
    (difficulty: Difficulty, questionCount: number) => {
      setState((s) => ({
        ...s,
        difficulty,
        questionCount,
        timePerQuestion: difficultyTime[difficulty],
      }));
    },
    [],
  );

  const startQuiz = useCallback(() => {
    setState((s) => {
      if (!s.subTheme || !s.difficulty) return s;
      const questions = getQuestions(s.subTheme, s.questionCount);
      return {
        ...s,
        questions,
        currentIndex: 0,
        answers: new Array<number | null>(questions.length).fill(null),
        startTime: Date.now(),
        endTime: null,
        screen: "quiz",
      };
    });
  }, []);

  const submitAnswer = useCallback((answerIndex: number | null) => {
    setState((s) => {
      const newAnswers = [...s.answers];
      newAnswers[s.currentIndex] = answerIndex;
      const isLast = s.currentIndex === s.questions.length - 1;
      return {
        ...s,
        answers: newAnswers,
        currentIndex: isLast ? s.currentIndex : s.currentIndex + 1,
        endTime: isLast ? Date.now() : s.endTime,
        screen: isLast ? "results" : s.screen,
      };
    });
  }, []);

  const retakeQuiz = useCallback(() => {
    setState((s) => {
      if (!s.subTheme || !s.difficulty) return s;
      const questions = getQuestions(s.subTheme, s.questionCount);
      return {
        ...s,
        questions,
        currentIndex: 0,
        answers: new Array<number | null>(questions.length).fill(null),
        startTime: Date.now(),
        endTime: null,
        screen: "quiz",
      };
    });
  }, []);

  const resetToThemeSelect = useCallback(() => {
    setState((s) => ({
      ...s,
      coreTheme: null,
      subTheme: null,
      difficulty: null,
      questions: [],
      currentIndex: 0,
      answers: [],
      startTime: null,
      endTime: null,
      screen: "themeSelect",
    }));
  }, []);

  const getScore = () => {
    return state.answers.reduce<number>((acc, answer, i) => {
      return answer === state.questions[i]?.correctIndex ? acc + 1 : acc;
    }, 0);
  };

  const getTimeTaken = (): number => {
    if (!state.startTime) return 0;
    const end = state.endTime ?? Date.now();
    return Math.floor((end - state.startTime) / 1000);
  };

  return {
    state,
    navigate,
    login,
    selectCoreTheme,
    selectSubTheme,
    updateSetup,
    startQuiz,
    submitAnswer,
    retakeQuiz,
    resetToThemeSelect,
    getScore,
    getTimeTaken,
  };
}
