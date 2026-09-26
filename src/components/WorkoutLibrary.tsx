"use client";

import { useEffect, useState } from "react";
import WorkoutCard from "./WorkoutCard";
import type { Workout } from "../types/workout";

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <section id="library" className="bg-[#0d0f12] py-14">
      <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <div className="mb-9">
          <h2
            className="text-[34px] font-bold uppercase leading-none text-white sm:text-[40px]"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            The Library
          </h2>

          <p className="mt-3 text-sm text-[#92969f]">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {loading && (
          <div className="flex min-h-[240px] items-center justify-center">
            <div className="flex items-center gap-3 text-sm text-[#9ca0aa]">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#343842] border-t-[#ccff00]" />
              <span>Loading workouts…</span>
            </div>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-[12px] border border-[#262a33] bg-[#15171d] px-5 py-8 text-center text-sm text-[#9ca0aa]">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}