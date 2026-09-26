"use client";

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar";
import { useFitLog } from "../../context/FitLogContext";

type TabName = "plan" | "saved";
type SortOption = "duration" | "calories" | "rating";

export default function MyPlanPage() {
  const {
    plan,
    saved,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
  } = useFitLog();

  const [activeTab, setActiveTab] =
    useState<TabName>("plan");

  const [sortBy, setSortBy] =
    useState<SortOption>("duration");

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [mounted, setMounted] =
    useState(false);

  const mobileSearchInputRef =
    useRef<HTMLInputElement>(null);

  useEffect(() => {
    function updateTabFromHash() {
      if (window.location.hash === "#saved") {
        setActiveTab("saved");
      } else {
        setActiveTab("plan");
      }
    }

    updateTabFromHash();
    setMounted(true);

    window.addEventListener(
      "hashchange",
      updateTabFromHash
    );

    return () => {
      window.removeEventListener(
        "hashchange",
        updateTabFromHash
      );
    };
  }, []);

  useEffect(() => {
    if (searchOpen) {
      mobileSearchInputRef.current?.focus();
    }
  }, [searchOpen]);

  const summaryExercises = useMemo(() => {
    return activeTab === "plan"
      ? plan.length
      : saved.length;
  }, [activeTab, plan, saved]);

  const summaryMinutes = useMemo(() => {
    const workouts =
      activeTab === "plan"
        ? plan
        : saved;

    return workouts.reduce(
      (total, workout) =>
        total + workout.duration,
      0
    );
  }, [activeTab, plan, saved]);

  const summaryCalories = useMemo(() => {
    const workouts =
      activeTab === "plan"
        ? plan
        : saved;

    return workouts.reduce(
      (total, workout) =>
        total + workout.caloriesBurned,
      0
    );
  }, [activeTab, plan, saved]);

  const sortedPlan = useMemo(() => {
    const sorted = [...plan];

    if (sortBy === "duration") {
      return sorted.sort(
        (a, b) =>
          a.duration - b.duration
      );
    }

    if (sortBy === "calories") {
      return sorted.sort(
        (a, b) =>
          a.caloriesBurned -
          b.caloriesBurned
      );
    }

    return sorted.sort(
      (a, b) =>
        b.rating - a.rating
    );
  }, [plan, sortBy]);

  const sortedSaved = useMemo(() => {
    const sorted = [...saved];

    if (sortBy === "duration") {
      return sorted.sort(
        (a, b) =>
          a.duration - b.duration
      );
    }

    if (sortBy === "calories") {
      return sorted.sort(
        (a, b) =>
          a.caloriesBurned -
          b.caloriesBurned
      );
    }

    return sorted.sort(
      (a, b) =>
        b.rating - a.rating
    );
  }, [saved, sortBy]);

  const filteredPlan = useMemo(() => {
    const query = searchTerm
      .trim()
      .toLowerCase();

    if (!query) {
      return sortedPlan;
    }

    return sortedPlan.filter((workout) => {
      const matchesName =
        workout.name
          .toLowerCase()
          .includes(query);

      const matchesEquipment =
        workout.equipment
          .toLowerCase()
          .includes(query);

      const matchesMuscleGroup =
        workout.muscleGroups.some((group) =>
          group
            .toLowerCase()
            .includes(query)
        );

      return (
        matchesName ||
        matchesEquipment ||
        matchesMuscleGroup
      );
    });
  }, [sortedPlan, searchTerm]);

  const filteredSaved = useMemo(() => {
    const query = searchTerm
      .trim()
      .toLowerCase();

    if (!query) {
      return sortedSaved;
    }

    return sortedSaved.filter((workout) => {
      const matchesName =
        workout.name
          .toLowerCase()
          .includes(query);

      const matchesEquipment =
        workout.equipment
          .toLowerCase()
          .includes(query);

      const matchesMuscleGroup =
        workout.muscleGroups.some((group) =>
          group
            .toLowerCase()
            .includes(query)
        );

      return (
        matchesName ||
        matchesEquipment ||
        matchesMuscleGroup
      );
    });
  }, [sortedSaved, searchTerm]);

  function changeTab(tab: TabName) {
    setActiveTab(tab);
    setSearchTerm("");

    const hash =
      tab === "saved"
        ? "#saved"
        : "#plan";

    window.history.replaceState(
      null,
      "",
      `/my-plan${hash}`
    );
  }

  function openSearch() {
    setSearchOpen(true);
  }

  function closeSearch() {
    setSearchOpen(false);
    setSearchTerm("");
  }

  function handleDone(id: number) {
    markAsDone(id);

    toast.success(
      "Workout marked as done"
    );
  }

  function showRemoveToast(
    message: string
  ) {
    toast(message, {
      icon: "✕",
      duration: 2500,
      style: {
        background: "#1B1215",
        color: "#FCA5A5",
        border: "1px solid #7F1D1D",
        borderRadius: "10px",
        padding: "12px 14px",
        fontSize: "14px",
        fontWeight: "500",
      },
    });
  }

  function handleRemovePlan(id: number) {
    removeFromPlan(id);

    showRemoveToast(
      "Removed from today's plan"
    );
  }

  function handleRemoveSaved(id: number) {
    removeFromSaved(id);

    showRemoveToast(
      "Removed from saved workouts"
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-[760px] bg-[#0C0D10] py-9 sm:py-11">
        <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <h1
            className="text-[38px] font-bold uppercase leading-none text-white sm:text-[42px]"
            style={{
              fontFamily:
                "var(--font-oswald)",
            }}
          >
            My Plan
          </h1>

          <p className="mt-3 max-w-[620px] text-sm leading-6 text-[#8992A0]">
            Cap of five lifts for today.
            Finish them, then load more.
          </p>

          <div className="mt-8 grid overflow-hidden rounded-[16px] border border-[#21252F] bg-[#14161D] sm:grid-cols-3">
            <MetricCard
              label="Exercises"
              value={summaryExercises}
              accent
            />

            <MetricCard
              label="Minutes"
              value={summaryMinutes}
              divider
            />

            <MetricCard
              label="Calories"
              value={summaryCalories}
              divider
            />
          </div>

          <div className="mt-9 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Tabs */}
            <div className="inline-flex h-[40px] w-fit items-center gap-[4px] rounded-[12px] border border-[#232732] bg-[#151921] p-[4px]">
              <button
                type="button"
                onClick={() =>
                  changeTab("plan")
                }
                className={`flex h-[30px] items-center justify-center whitespace-nowrap rounded-[8px] border px-[16px] py-[6px] text-[12px] leading-[16px] transition-colors ${
                  activeTab === "plan"
                    ? "border-[#2B303D] bg-[#1F242D] font-bold text-[#CCFF00]"
                    : "border-transparent bg-transparent font-normal text-[#8A92A0] hover:text-white"
                }`}
              >
                Today&apos;s Plan
              </button>

              <button
                type="button"
                onClick={() =>
                  changeTab("saved")
                }
                className={`flex h-[30px] items-center justify-center whitespace-nowrap rounded-[8px] border px-[16px] py-[6px] text-[12px] leading-[16px] transition-colors ${
                  activeTab === "saved"
                    ? "border-[#2B303D] bg-[#1F242D] font-bold text-[#CCFF00]"
                    : "border-transparent bg-transparent font-normal text-[#8A92A0] hover:text-white"
                }`}
              >
                Saved
              </button>
            </div>

            {/* Mobile + Tablet controls */}
            <div className="flex w-full min-w-0 items-center gap-3 lg:hidden">
              <div
                className={
                  searchOpen
                    ? "min-w-0 flex-1"
                    : "shrink-0"
                }
              >
                {!searchOpen ? (
                  <button
                    type="button"
                    onClick={openSearch}
                    aria-label="Search workouts"
                    className="inline-flex h-[40px] items-center justify-center gap-2 rounded-[8px] border border-[#2B303D] bg-[#151921] px-4 text-[12px] font-medium text-[#C1C6CF] transition-colors hover:border-[#4A5260] hover:text-white"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-[16px] w-[16px]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <circle
                        cx="11"
                        cy="11"
                        r="7"
                      />

                      <path d="m20 20-3.5-3.5" />
                    </svg>

                    <span>
                      Search
                    </span>
                  </button>
                ) : (
                  <div className="relative w-full">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="pointer-events-none absolute left-3 top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-[#7F8794]"
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
                      ref={
                        mobileSearchInputRef
                      }
                      type="text"
                      value={searchTerm}
                      onChange={(event) =>
                        setSearchTerm(
                          event.target.value
                        )
                      }
                      onKeyDown={(event) => {
                        if (
                          event.key === "Escape"
                        ) {
                          closeSearch();
                        }
                      }}
                      placeholder={
                        activeTab === "plan"
                          ? "Search plan..."
                          : "Search saved..."
                      }
                      autoComplete="off"
                      aria-label="Search workouts"
                      className="h-[40px] w-full rounded-[8px] border border-[#CCFF00] bg-[#151921] py-2 pl-10 pr-10 text-[12px] text-white outline-none placeholder:text-[#686F7B]"
                    />

                    <button
                      type="button"
                      onClick={closeSearch}
                      aria-label="Close search"
                      title="Close search"
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
                  </div>
                )}
              </div>

              <div className="ml-auto flex shrink-0 items-center gap-2">
                <label
                  htmlFor="plan-sort-mobile"
                  className={`whitespace-nowrap text-[12px] font-medium text-[#9CA3AF] ${
                    searchOpen
                      ? "hidden sm:block"
                      : "block"
                  }`}
                >
                  Sort By
                </label>

                <div className="relative">
                  <select
                    id="plan-sort-mobile"
                    value={sortBy}
                    onChange={(event) =>
                      setSortBy(
                        event.target
                          .value as SortOption
                      )
                    }
                    className="h-[40px] min-w-[120px] cursor-pointer appearance-none rounded-[8px] border border-[#2B303D] bg-[#151921] py-2 pl-3 pr-9 text-[12px] font-medium text-white outline-none transition-colors focus:border-[#CCFF00] sm:min-w-[145px]"
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

            {/* Desktop controls */}
            <div className="hidden items-center gap-3 lg:flex">
              <div className="relative w-[280px]">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-[#7F8794]"
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
                  type="text"
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(
                      event.target.value
                    )
                  }
                  placeholder={
                    activeTab === "plan"
                      ? "Search today's plan..."
                      : "Search saved workouts..."
                  }
                  autoComplete="off"
                  aria-label="Search workouts"
                  className="h-[40px] w-full rounded-[8px] border border-[#2B303D] bg-[#151921] py-2 pl-10 pr-10 text-[12px] text-white outline-none transition-colors placeholder:text-[#686F7B] focus:border-[#CCFF00]"
                />

                {searchTerm && (
                  <button
                    type="button"
                    onClick={() =>
                      setSearchTerm("")
                    }
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

              <label
                htmlFor="plan-sort-desktop"
                className="whitespace-nowrap text-[12px] font-medium text-[#9CA3AF]"
              >
                Sort By
              </label>

              <div className="relative">
                <select
                  id="plan-sort-desktop"
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(
                      event.target
                        .value as SortOption
                    )
                  }
                  className="h-[40px] min-w-[145px] cursor-pointer appearance-none rounded-[8px] border border-[#2B303D] bg-[#151921] py-2 pl-4 pr-10 text-[12px] font-medium text-white outline-none transition-colors focus:border-[#CCFF00]"
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

          {!mounted && (
            <div className="flex min-h-[260px] items-center justify-center">
              <div className="flex items-center gap-3 text-sm text-[#9297A1]">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#343842] border-t-[#CCFF00]" />

                <span>
                  Loading workouts…
                </span>
              </div>
            </div>
          )}

          {mounted &&
            activeTab === "plan" && (
              <div className="mt-7">
                {plan.length === 0 ? (
                  <EmptyState />
                ) : filteredPlan.length ===
                  0 ? (
                  <SearchEmptyState
                    onClear={() =>
                      setSearchTerm("")
                    }
                  />
                ) : (
                  <div className="space-y-4">
                    {filteredPlan.map(
                      (workout) => (
                        <WorkoutRow
                          key={workout.id}
                          image={workout.image}
                          name={workout.name}
                          equipment={
                            workout.equipment
                          }
                          duration={
                            workout.duration
                          }
                          calories={
                            workout.caloriesBurned
                          }
                          rating={
                            workout.rating
                          }
                          href={`/workout/${workout.id}`}
                          completed={
                            workout.completed
                          }
                          showDoneButton
                          onDone={() =>
                            handleDone(
                              workout.id
                            )
                          }
                          onRemove={() =>
                            handleRemovePlan(
                              workout.id
                            )
                          }
                        />
                      )
                    )}
                  </div>
                )}
              </div>
            )}

          {mounted &&
            activeTab === "saved" && (
              <div className="mt-7">
                {saved.length === 0 ? (
                  <EmptyState />
                ) : filteredSaved.length ===
                  0 ? (
                  <SearchEmptyState
                    onClear={() =>
                      setSearchTerm("")
                    }
                  />
                ) : (
                  <div className="space-y-4">
                    {filteredSaved.map(
                      (workout) => (
                        <WorkoutRow
                          key={workout.id}
                          image={workout.image}
                          name={workout.name}
                          equipment={
                            workout.equipment
                          }
                          duration={
                            workout.duration
                          }
                          calories={
                            workout.caloriesBurned
                          }
                          rating={
                            workout.rating
                          }
                          href={`/workout/${workout.id}`}
                          completed={false}
                          showDoneButton={false}
                          onRemove={() =>
                            handleRemoveSaved(
                              workout.id
                            )
                          }
                        />
                      )
                    )}
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
  onDone?: () => void;
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
  const actionLayout =
    showDoneButton
      ? "grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)_40px]"
      : "grid-cols-[minmax(0,1fr)_40px]";

  return (
    <article className="rounded-[14px] border border-[#2B303D] bg-[#15181F] p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="h-[150px] w-full shrink-0 overflow-hidden rounded-[10px] bg-[#20242C] sm:h-[82px] sm:w-[140px]">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h2
            className={`text-[20px] font-bold uppercase leading-tight text-white ${
              completed
                ? "line-through opacity-50"
                : ""
            }`}
            style={{
              fontFamily:
                "var(--font-oswald)",
            }}
          >
            {name}
          </h2>

          <p className="mt-[3px] text-[13px] text-[#969BA5]">
            {equipment}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-[13px] text-[#C3C6CC]">
            <StatClock
              value={`${duration} min`}
            />

            <StatFire
              value={`${calories} kcal`}
            />

            <StatStar
              value={String(rating)}
            />
          </div>
        </div>

        <div
          className={`grid w-full ${actionLayout} items-center gap-2 sm:flex sm:w-auto sm:flex-wrap sm:gap-3 lg:ml-5`}
        >
          <Link
            href={href}
            className="inline-flex h-[40px] w-full items-center justify-center whitespace-nowrap rounded-[10px] border border-[#3A414E] px-2 text-[11px] font-semibold text-white transition-colors hover:border-[#596270] hover:bg-[#1C2028] sm:w-auto sm:rounded-full sm:px-5 sm:text-[12px]"
          >
            View Details
          </Link>

          {showDoneButton && (
            <button
              type="button"
              disabled={completed}
              onClick={onDone}
              className="inline-flex h-[40px] w-full items-center justify-center gap-[6px] whitespace-nowrap rounded-[10px] bg-[#CCFF00] px-2 text-[11px] font-semibold transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:rounded-full sm:px-5 sm:text-[12px]"
              style={{
                color: "#000000",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-[14px] w-[14px] shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m5 12 4 4L19 6" />
              </svg>

              {completed
                ? "Completed"
                : "Mark as Done"}
            </button>
          )}

          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove ${name}`}
            title="Remove workout"
            className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[10px] border border-[#4A3035] bg-[#1C1518] text-[#F87171] transition-colors hover:border-[#EF4444] hover:bg-[#29181C] hover:text-[#FF9A9A] sm:rounded-full"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[17px] w-[17px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              aria-hidden="true"
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
  accent = false,
  divider = false,
}: {
  label: string;
  value: number;
  accent?: boolean;
  divider?: boolean;
}) {
  return (
    <div
      className={`px-6 py-6 sm:px-8 sm:py-7 ${
        divider
          ? "border-t border-[#1B1E25] sm:border-l sm:border-t-0"
          : ""
      }`}
    >
      <p className="text-[14px] font-normal leading-5 text-[#8992A0]">
        {label}
      </p>

      <p
        className={`mt-2 text-[34px] font-bold leading-none ${
          accent
            ? "text-[#CCFF00]"
            : "text-white"
        }`}
        style={{
          fontFamily:
            "var(--font-oswald)",
        }}
      >
        {value}
      </p>
    </div>
  );
}

function StatClock({
  value,
}: {
  value: string;
}) {
  return (
    <span className="flex items-center gap-[7px]">
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px] text-[#CCFF00]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="9"
        />

        <path d="M12 7v5l3 2" />
      </svg>

      <span>{value}</span>
    </span>
  );
}

function StatFire({
  value,
}: {
  value: string;
}) {
  return (
    <span className="flex items-center gap-[7px]">
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px] text-[#CCFF00]"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M13.8 2.5c.3 2.7-.7 4.4-2 5.9-1.1 1.5-2.1 2.8-1.5 4.8.4-1.1 1.1-1.9 2-2.7 1.4 1.5 2.4 3 2.4 5 0 2.4-1.7 4.5-4.4 4.5-3.2 0-5.3-2.4-5.3-5.5 0-3.5 2.2-6.1 4.8-8.7.1 1.6.5 2.7 1.1 3.5.6-2.2 1.3-4.4 2.9-6.8Z" />
      </svg>

      <span>{value}</span>
    </span>
  );
}

function StatStar({
  value,
}: {
  value: string;
}) {
  return (
    <span className="flex items-center gap-[7px]">
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px] text-[#CCFF00]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m12 2.8 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9L6.4 20l1.1-6.2L3 9.4l6.2-.9L12 2.8Z" />
      </svg>

      <span>{value}</span>
    </span>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-[14px] border border-[#2B303D] bg-[#15181F] px-6 text-center">
      <h2
        className="text-[30px] font-bold uppercase text-white"
        style={{
          fontFamily:
            "var(--font-oswald)",
        }}
      >
        Nothing Here Yet
      </h2>

      <p className="mt-3 text-sm leading-6 text-[#9297A1]">
        Browse the library and add a lift to get today moving.
      </p>

      <Link
        href="/#library"
        className="mt-6 inline-flex h-[40px] items-center justify-center rounded-full bg-[#CCFF00] px-6 text-[12px] font-semibold"
        style={{
          color: "#000000",
        }}
      >
        Go to workouts
      </Link>
    </div>
  );
}

function SearchEmptyState({
  onClear,
}: {
  onClear: () => void;
}) {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center rounded-[14px] border border-[#2B303D] bg-[#15181F] px-6 text-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#343842] bg-[#1A1E25] text-[#9CA3AF]">
        <svg
          viewBox="0 0 24 24"
          className="h-[18px] w-[18px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle
            cx="11"
            cy="11"
            r="7"
          />

          <path d="m20 20-3.5-3.5" />
        </svg>
      </div>

      <h2
        className="mt-4 text-[24px] font-bold uppercase text-white"
        style={{
          fontFamily:
            "var(--font-oswald)",
        }}
      >
        No Workouts Found
      </h2>

      <p className="mt-2 text-sm leading-6 text-[#9297A1]">
        Try another workout name,
        equipment, or muscle group.
      </p>

      <button
        type="button"
        onClick={onClear}
        className="mt-5 inline-flex h-[38px] items-center justify-center rounded-full border border-[#3A414E] px-5 text-[12px] font-medium text-white transition-colors hover:border-[#596270]"
      >
        Clear Search
      </button>
    </div>
  );
}