"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Workout } from "../types/workout";

export type PlannedWorkout = Workout & {
  completed: boolean;
};

type AddToPlanResult = "added" | "exists" | "full";
type SaveWorkoutResult = "saved" | "exists";

type FitLogContextType = {
  plan: PlannedWorkout[];
  saved: Workout[];
  planCount: number;
  savedCount: number;
  addToPlan: (workout: Workout) => AddToPlanResult;
  saveWorkout: (workout: Workout) => SaveWorkoutResult;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markAsDone: (id: number) => void;
};

const FitLogContext = createContext<FitLogContextType | undefined>(
  undefined
);

type FitLogProviderProps = {
  children: ReactNode;
};

export function FitLogProvider({
  children,
}: FitLogProviderProps) {
  const [plan, setPlan] = useState<PlannedWorkout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const storedPlan = localStorage.getItem("fitlog-plan");
      const storedSaved = localStorage.getItem("fitlog-saved");

      try {
        if (storedPlan) {
          setPlan(JSON.parse(storedPlan));
        }

        if (storedSaved) {
          setSaved(JSON.parse(storedSaved));
        }
      } catch {
        localStorage.removeItem("fitlog-plan");
        localStorage.removeItem("fitlog-saved");
      }

      setLoaded(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!loaded) {
      return;
    }

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(plan)
    );
  }, [plan, loaded]);

  useEffect(() => {
    if (!loaded) {
      return;
    }

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(saved)
    );
  }, [saved, loaded]);

  function addToPlan(
    workout: Workout
  ): AddToPlanResult {
    const alreadyAdded = plan.some(
      (item) => item.id === workout.id
    );

    if (alreadyAdded) {
      return "exists";
    }

    if (plan.length >= 5) {
      return "full";
    }

    setPlan((currentPlan) => [
      ...currentPlan,
      {
        ...workout,
        completed: false,
      },
    ]);

    return "added";
  }

  function saveWorkout(
    workout: Workout
  ): SaveWorkoutResult {
    const alreadySaved = saved.some(
      (item) => item.id === workout.id
    );

    if (alreadySaved) {
      return "exists";
    }

    setSaved((currentSaved) => [
      ...currentSaved,
      workout,
    ]);

    return "saved";
  }

  function removeFromPlan(id: number) {
    setPlan((currentPlan) =>
      currentPlan.filter(
        (workout) => workout.id !== id
      )
    );
  }

  function removeFromSaved(id: number) {
    setSaved((currentSaved) =>
      currentSaved.filter(
        (workout) => workout.id !== id
      )
    );
  }

  function markAsDone(id: number) {
    setPlan((currentPlan) =>
      currentPlan.map((workout) =>
        workout.id === id
          ? {
              ...workout,
              completed: true,
            }
          : workout
      )
    );
  }

  return (
    <FitLogContext.Provider
      value={{
        plan,
        saved,
        planCount: plan.length,
        savedCount: saved.length,
        addToPlan,
        saveWorkout,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  const context = useContext(FitLogContext);

  if (!context) {
    throw new Error(
      "useFitLog must be used inside FitLogProvider"
    );
  }

  return context;
}