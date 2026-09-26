"use client";

import { useEffect, useMemo, useState } from "react";
import WorkoutCard from "./WorkoutCard";
import type { Workout } from "../types/workout";

type SortOption = "duration" | "calories" | "rating";

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(
          "https://api.abcz.workers.dev/api/fitlog"
        );

        if (!response.ok) {
          throw new Error("Failed to load workouts");
        }

        const data: Workout[] = await response.json();

        setWorkouts(data);
      } catch {
        setError("Unable to load workouts right now.");
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  const sortedWorkouts = useMemo(() => {
    const sorted = [...workouts];

    if (sortBy === "duration") {
      return sorted.sort((a, b) => a.duration - b.duration);
    }

    if (sortBy === "calories") {
      return sorted.sort(
        (a, b) => a.caloriesBurned - b.caloriesBurned
      );
    }

    return sorted.sort((a, b) => b.rating - a.rating);
  }, [workouts, sortBy]);

  return (
    <section
      id="library"
      className="bg-[#0C0D10] py-14"
    >
      <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
        {/* Heading and sort */}
        <div className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              className="text-[34px] font-bold uppercase leading-none text-white sm:text-[40px]"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              The Library
            </h2>

            <p className="mt-3 text-sm text-[#9CA3AF]">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-3">
            <label
              htmlFor="workout-sort"
              className="text-[12px] font-medium text-[#9CA3AF]"
            >
              Sort By
            </label>

            <div className="relative">
              <select
                id="workout-sort"
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value as SortOption)
                }
                className="h-[40px] min-w-[145px] cursor-pointer appearance-none rounded-[8px] border border-[#2B303D] bg-[#151921] py-2 pl-4 pr-10 text-[12px] font-medium text-white outline-none transition-colors focus:border-[#CCFF00]"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>

              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m7 10 5 5 5-5" />
              </svg>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-[240px] items-center justify-center">
            <div className="flex items-center gap-3 text-sm text-[#9CA3AF]">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#343842] border-t-[#CCFF00]" />

              <span>Loading workouts…</span>
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-[12px] border border-[#232732] bg-[#151921] px-5 py-8 text-center text-sm text-[#9CA3AF]">
            {error}
          </div>
        )}

        {/* Workout grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sortedWorkouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}