"use client";

import toast from "react-hot-toast";
import { useFitLog } from "../context/FitLogContext";
import type { Workout } from "../types/workout";

type WorkoutActionsProps = {
  workout: Workout;
};

export default function WorkoutActions({
  workout,
}: WorkoutActionsProps) {
  const { addToPlan, saveWorkout } = useFitLog();

  function handleAddToPlan() {
    const result = addToPlan(workout);

    if (result === "added") {
      toast.success("Added to today's plan");
      return;
    }

    if (result === "exists") {
      toast.error("Already in today's plan");
      return;
    }

    toast.error("Today's plan is full");
  }

  function handleSaveWorkout() {
    const result = saveWorkout(workout);

    if (result === "saved") {
      toast.success("Saved for later");
      return;
    }

    toast.error("Workout already saved");
  }

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      {/* Add to plan */}
      <button
        type="button"
        onClick={handleAddToPlan}
        className="inline-flex h-[46px] items-center justify-center gap-3 rounded-[9px] bg-[#CCFF00] px-6 text-[14px] font-semibold leading-5 text-black transition-opacity hover:opacity-90"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-[18px] w-[18px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect
            x="3"
            y="5"
            width="18"
            height="16"
            rx="2"
          />
          <path d="M16 3v4M8 3v4M3 10h18" />
          <path d="M12 13v5M9.5 15.5h5" />
        </svg>

        <span>Add to today&apos;s plan</span>
      </button>

      {/* Save */}
      <button
        type="button"
        onClick={handleSaveWorkout}
        className="inline-flex h-[46px] items-center justify-center gap-3 rounded-[9px] border border-[#3A4352] bg-transparent px-6 text-[14px] font-medium leading-5 text-[#E5E7EB] transition-colors hover:border-[#566171]"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-[18px] w-[18px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 4.5A2.5 2.5 0 0 1 8.5 2h7A2.5 2.5 0 0 1 18 4.5V22l-6-4-6 4V4.5Z" />
        </svg>

        <span>Save for later</span>
      </button>
    </div>
  );
}