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
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(
          "https://api.api-store.workers.dev/api/fitlog"
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

  const filteredAndSortedWorkouts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const filtered = workouts.filter((workout) => {
      if (!normalizedSearch) {
        return true;
      }

      const matchesName = workout.name
        .toLowerCase()
        .includes(normalizedSearch);

      const matchesMuscleGroup = workout.muscleGroups.some((group) =>
        group.toLowerCase().includes(normalizedSearch)
      );

      return matchesName || matchesMuscleGroup;
    });

    const sorted = [...filtered];

    if (sortBy === "duration") {
      return sorted.sort(
        (a, b) => a.duration - b.duration
      );
    }

    if (sortBy === "calories") {
      return sorted.sort(
        (a, b) => a.caloriesBurned - b.caloriesBurned
      );
    }

    return sorted.sort(
      (a, b) => b.rating - a.rating
    );
  }, [workouts, searchTerm, sortBy]);

  function clearSearch() {
    setSearchTerm("");
  }

  return (
    <section
      id="library"
      className="bg-[#0C0D10] py-14"
    >
      <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
        {/* Heading + Controls */}
        <div className="mb-9 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2
              className="text-[34px] font-bold uppercase leading-none text-white sm:text-[40px]"
              style={{
                fontFamily: "var(--font-oswald)",
              }}
            >
              The Library
            </h2>

            <p className="mt-3 text-sm text-[#9CA3AF]">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Search + Sort */}
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-end lg:w-auto">
            <div className="w-full sm:w-[270px]">
              <div className="relative">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-[#7F8794]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="7"
                  />

                  <path d="m20 20-3.5-3.5" />
                </svg>

                <input
                  id="workout-search"
                  type="text"
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(event.target.value)
                  }
                  placeholder="Search workouts..."
                  autoComplete="off"
                  aria-label="Search workouts"
                  className="h-[40px] w-full rounded-[8px] border border-[#2B303D] bg-[#151921] py-2 pl-10 pr-10 text-[12px] text-white outline-none transition-colors placeholder:text-[#686F7B] focus:border-[#CCFF00]"
                />

                {searchTerm && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    aria-label="Clear search"
                    title="Clear search"
                    className="absolute right-3 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center text-[#7F8794] transition-colors hover:text-white"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-[15px] w-[15px]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <path d="M6 6l12 12M18 6 6 18" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className="w-full sm:w-auto">
              <label
                htmlFor="workout-sort"
                className="mb-2 block text-[12px] font-medium text-[#9CA3AF]"
              >
                Sort By
              </label>

              <div className="relative">
                <select
                  id="workout-sort"
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(
                      event.target.value as SortOption
                    )
                  }
                  className="h-[40px] w-full min-w-[145px] cursor-pointer appearance-none rounded-[8px] border border-[#2B303D] bg-[#151921] py-2 pl-4 pr-10 text-[12px] font-medium text-white outline-none transition-colors focus:border-[#CCFF00] sm:w-auto"
                >
                  <option value="duration">
                    Duration
                  </option>

                  <option value="calories">
                    Calories
                  </option>

                  <option value="rating">
                    Rating
                  </option>
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
        </div>

        {loading && (
          <div className="flex min-h-[240px] items-center justify-center">
            <div className="flex items-center gap-3 text-sm text-[#9CA3AF]">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#343842] border-t-[#CCFF00]" />

              <span>
                Loading workouts…
              </span>
            </div>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-[12px] border border-[#232732] bg-[#151921] px-5 py-8 text-center text-sm text-[#9CA3AF]">
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          filteredAndSortedWorkouts.length === 0 && (
            <div className="flex min-h-[260px] flex-col items-center justify-center rounded-[14px] border border-[#2B303D] bg-[#15181F] px-6 text-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#343842] bg-[#1A1E25]">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-5 w-5 text-[#9CA3AF]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="7"
                  />

                  <path d="m20 20-3.5-3.5" />
                </svg>
              </div>

              <h3
                className="mt-4 text-[24px] font-bold uppercase text-white"
                style={{
                  fontFamily: "var(--font-oswald)",
                }}
              >
                No Workouts Found
              </h3>

              <p className="mt-2 max-w-[420px] text-sm leading-6 text-[#9297A1]">
                Try searching by workout name or muscle group.
              </p>

              <button
                type="button"
                onClick={clearSearch}
                className="mt-5 inline-flex h-[38px] items-center justify-center rounded-[8px] border border-[#3A414E] px-5 text-[12px] font-medium text-white transition-colors hover:border-[#596270]"
              >
                Clear Search
              </button>
            </div>
          )}

        {/* Workout grid */}
        {!loading &&
          !error &&
          filteredAndSortedWorkouts.length > 0 && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredAndSortedWorkouts.map(
                (workout) => (
                  <WorkoutCard
                    key={workout.id}
                    workout={workout}
                  />
                )
              )}
            </div>
          )}
      </div>
    </section>
  );
}