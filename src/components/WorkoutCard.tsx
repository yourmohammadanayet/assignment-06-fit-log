import Link from "next/link";
import type { Workout } from "../types/workout";

type WorkoutCardProps = {
  workout: Workout;
};

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group overflow-hidden rounded-[14px] border border-[#262B35] bg-[#15181F] transition duration-200 hover:-translate-y-1 hover:border-[#3A404B]"
    >
      {/* Workout image */}
      <div className="aspect-[16/10] overflow-hidden bg-[#1A1D22]">
        <img
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />
      </div>

      {/* Card content */}
      <div className="p-5">
        {/* Muscle tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="inline-flex items-center justify-center rounded-full bg-[#CCFF00] px-3 py-1"
              style={{
                color: "#000000",
                fontSize: "11px",
                fontFamily: "var(--font-inter)",
                fontWeight: 700,
                lineHeight: "16.5px",
                letterSpacing: "0.55px",
                textTransform: "uppercase",
              }}
            >
              {group}
            </span>
          ))}
        </div>

        {/* Workout name */}
        <h3
          style={{
            color: "#FFFFFF",
            fontSize: "18px",
            fontFamily: "var(--font-oswald)",
            fontWeight: 700,
            lineHeight: "28px",
            letterSpacing: "0.45px",
            textTransform: "uppercase",
          }}
        >
          {workout.name}
        </h3>

        {/* Equipment */}
        <p
          className="mt-1"
          style={{
            color: "#9CA3AF",
            fontSize: "12px",
            fontFamily: "var(--font-inter)",
            fontWeight: 400,
            lineHeight: "16px",
          }}
        >
          {workout.equipment}
        </p>

        {/* Divider */}
        <div className="mt-5 border-t border-[#232833]" />

        {/* Stats */}
        <div className="mt-4 flex items-center gap-6">
          {/* Duration */}
          <div className="flex items-center gap-2">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-[18px] w-[18px] text-[#9CA3AF]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>

            <span
              style={{
                color: "#9CA3AF",
                fontSize: "12px",
                fontFamily: "var(--font-inter)",
                fontWeight: 400,
                lineHeight: "16px",
              }}
            >
              {workout.duration} min
            </span>
          </div>

          {/* Calories */}
          <div className="flex items-center gap-2">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-[18px] w-[18px] text-[#9CA3AF]"
              fill="currentColor"
            >
              <path d="M13.8 2.5c.3 2.7-.7 4.4-2 5.9-1.1 1.5-2.1 2.8-1.5 4.8.4-1.1 1.1-1.9 2-2.7 1.4 1.5 2.4 3 2.4 5 0 2.4-1.7 4.5-4.4 4.5-3.2 0-5.3-2.4-5.3-5.5 0-3.5 2.2-6.1 4.8-8.7.1 1.6.5 2.7 1.1 3.5.6-2.2 1.3-4.4 2.9-6.8Z" />
            </svg>

            <span
              style={{
                color: "#9CA3AF",
                fontSize: "12px",
                fontFamily: "var(--font-inter)",
                fontWeight: 400,
                lineHeight: "16px",
              }}
            >
              {workout.caloriesBurned} kcal
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-[18px] w-[18px] text-[#9CA3AF]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            >
              <path d="m12 2.8 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9L6.4 20l1.1-6.2L3 9.4l6.2-.9L12 2.8Z" />
            </svg>

            <span
              style={{
                color: "#9CA3AF",
                fontSize: "12px",
                fontFamily: "var(--font-inter)",
                fontWeight: 400,
                lineHeight: "16px",
              }}
            >
              {workout.rating}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}