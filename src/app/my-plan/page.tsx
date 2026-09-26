"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar";
import { useFitLog } from "../../context/FitLogContext";

type TabName = "plan" | "saved";

export default function MyPlanPage() {
  const {
    plan,
    saved,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
  } = useFitLog();

  const [activeTab, setActiveTab] = useState<TabName>("plan");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalMinutes = useMemo(() => {
    return plan.reduce((total, workout) => total + workout.duration, 0);
  }, [plan]);

  const totalCalories = useMemo(() => {
    return plan.reduce(
      (total, workout) => total + workout.caloriesBurned,
      0
    );
  }, [plan]);

  function handleDone(id: number) {
    markAsDone(id);
    toast.success("Workout marked as done");
  }

  function handleRemovePlan(id: number) {
    removeFromPlan(id);
    toast.success("Workout removed from today's plan");
  }

  function handleRemoveSaved(id: number) {
    removeFromSaved(id);
    toast.success("Workout removed from saved");
  }

  return (
    <>
      <Navbar />

      <main className="min-h-[760px] bg-[#0b0d10] py-11">
        <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <h1
            className="text-[42px] font-bold uppercase leading-none text-white"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            My Plan
          </h1>

          <p className="mt-3 text-sm text-[#9297a1]">
            Cap of five lifts for today. Finish them, then load more.
          </p>

          {/* Metrics */}
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <MetricCard label="Exercises" value={plan.length} />
            <MetricCard label="Minutes" value={totalMinutes} />
            <MetricCard label="Calories" value={totalCalories} />
          </div>

          {/* Tabs */}
          <div className="mt-9">
            <div className="inline-flex h-[40px] items-center gap-[4px] rounded-[12px] border border-[#232732] bg-[#151921] p-[4px]">
              <button
                type="button"
                onClick={() => setActiveTab("plan")}
                className={`flex h-[30px] items-center justify-center whitespace-nowrap rounded-[8px] border px-[16px] py-[6px] text-[12px] leading-[16px] transition-colors ${
                  activeTab === "plan"
                    ? "border-[#2B303D] bg-[#1F242D] font-bold text-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)]"
                    : "border-transparent bg-transparent font-normal text-[#8A92A0]"
                }`}
              >
                Today&apos;s Plan
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("saved")}
                className={`flex h-[30px] items-center justify-center whitespace-nowrap rounded-[8px] border px-[16px] py-[6px] text-[12px] leading-[16px] transition-colors ${
                  activeTab === "saved"
                    ? "border-[#2B303D] bg-[#1F242D] font-bold text-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)]"
                    : "border-transparent bg-transparent font-normal text-[#8A92A0]"
                }`}
              >
                Saved
              </button>
            </div>
          </div>

          {/* Loading */}
          {!mounted && (
            <div className="flex min-h-[260px] items-center justify-center">
              <div className="flex items-center gap-3 text-sm text-[#9297a1]">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#343842] border-t-[#ccff00]" />
                <span>Loading workouts…</span>
              </div>
            </div>
          )}

          {/* Today's Plan */}
          {mounted && activeTab === "plan" && (
            <div className="mt-7">
              {plan.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="space-y-4">
                  {plan.map((workout) => (
                    <WorkoutRow
                      key={workout.id}
                      image={workout.image}
                      name={workout.name}
                      equipment={workout.equipment}
                      duration={workout.duration}
                      calories={workout.caloriesBurned}
                      rating={workout.rating}
                      href={`/workout/${workout.id}`}
                      completed={workout.completed}
                      showDoneButton={true}
                      onDone={() => handleDone(workout.id)}
                      onRemove={() => handleRemovePlan(workout.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Saved */}
          {mounted && activeTab === "saved" && (
            <div className="mt-7">
              {saved.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="space-y-4">
                  {saved.map((workout) => (
                    <WorkoutRow
                      key={workout.id}
                      image={workout.image}
                      name={workout.name}
                      equipment={workout.equipment}
                      duration={workout.duration}
                      calories={workout.caloriesBurned}
                      rating={workout.rating}
                      href={`/workout/${workout.id}`}
                      completed={false}
                      showDoneButton={false}
                      onDone={() => {}}
                      onRemove={() => handleRemoveSaved(workout.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

type WorkoutRowProps = {
  image: string;
  name: string;
  equipment: string;
  duration: number;
  calories: number;
  rating: number;
  href: string;
  completed: boolean;
  showDoneButton: boolean;
  onDone: () => void;
  onRemove: () => void;
};

function WorkoutRow({
  image,
  name,
  equipment,
  duration,
  calories,
  rating,
  href,
  completed,
  showDoneButton,
  onDone,
  onRemove,
}: WorkoutRowProps) {
  return (
    <article className="rounded-[14px] border border-[#2b303d] bg-[#15181f] px-4 py-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        {/* Thumbnail */}
        <div className="h-[82px] w-full shrink-0 overflow-hidden rounded-[10px] bg-[#20242c] sm:w-[140px]">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Workout info */}
        <div className="min-w-0 flex-1">
          <h2
            className={`text-[20px] font-bold uppercase leading-tight text-white ${
              completed ? "line-through opacity-50" : ""
            }`}
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            {name}
          </h2>

          <p className="mt-[3px] text-[13px] text-[#969ba5]">
            {equipment}
          </p>

          {/* Stats */}
          <div className="mt-3 flex flex-wrap items-center gap-4 text-[13px] text-[#c3c6cc]">
            <StatClock value={`${duration} min`} />
            <StatFire value={`${calories} kcal`} />
            <StatStar value={String(rating)} />
          </div>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 flex-wrap items-center gap-3 lg:ml-5">
          <Link
            href={href}
            className="inline-flex h-[38px] items-center justify-center rounded-full border border-[#3a414e] px-5 text-[12px] font-medium text-white transition-colors hover:border-[#596270]"
          >
            View Details
          </Link>

          {showDoneButton && (
            <button
              type="button"
              disabled={completed}
              onClick={onDone}
              className="inline-flex h-[38px] items-center justify-center gap-2 rounded-full bg-[#ccff00] px-5 text-[12px] font-semibold text-[#090b0d] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-[15px] w-[15px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m5 12 4 4L19 6" />
              </svg>

              {completed ? "Completed" : "Mark as Done"}
            </button>
          )}

          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove ${name}`}
            className="flex h-9 w-9 items-center justify-center text-[#6f7580] transition-colors hover:text-white"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[18px] w-[18px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}

function MetricCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-[12px] border border-[#292f39] bg-[#15181f] px-5 py-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#7c818a]">
        {label}
      </p>

      <p
        className="mt-2 text-[30px] font-bold leading-none text-[#ccff00]"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        {value}
      </p>
    </div>
  );
}

function StatClock({ value }: { value: string }) {
  return (
    <span className="flex items-center gap-[7px]">
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px] text-[#ccff00]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>

      <span>{value}</span>
    </span>
  );
}

function StatFire({ value }: { value: string }) {
  return (
    <span className="flex items-center gap-[7px]">
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px] text-[#ccff00]"
        fill="currentColor"
      >
        <path d="M13.8 2.5c.3 2.7-.7 4.4-2 5.9-1.1 1.5-2.1 2.8-1.5 4.8.4-1.1 1.1-1.9 2-2.7 1.4 1.5 2.4 3 2.4 5 0 2.4-1.7 4.5-4.4 4.5-3.2 0-5.3-2.4-5.3-5.5 0-3.5 2.2-6.1 4.8-8.7.1 1.6.5 2.7 1.1 3.5.6-2.2 1.3-4.4 2.9-6.8Z" />
      </svg>

      <span>{value}</span>
    </span>
  );
}

function StatStar({ value }: { value: string }) {
  return (
    <span className="flex items-center gap-[7px]">
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px] text-[#ccff00]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      >
        <path d="m12 2.8 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9L6.4 20l1.1-6.2L3 9.4l6.2-.9L12 2.8Z" />
      </svg>

      <span>{value}</span>
    </span>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-[14px] border border-[#2b303d] bg-[#15181f] px-6 text-center">
      <h2
        className="text-[30px] font-bold uppercase text-white"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        Nothing Here Yet
      </h2>

      <p className="mt-3 text-sm text-[#9297a1]">
        Browse the library and add a lift to get today moving.
      </p>

      <Link
        href="/#library"
        className="mt-6 inline-flex h-[40px] items-center justify-center rounded-full bg-[#ccff00] px-6 text-[12px] font-semibold text-black"
      >
        Go to workouts
      </Link>
    </div>
  );
}