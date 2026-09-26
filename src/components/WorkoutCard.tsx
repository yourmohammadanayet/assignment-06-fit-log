import Link from "next/link";
import type { Workout } from "../types/workout";

type WorkoutCardProps = {
  workout: Workout;
};

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group overflow-hidden rounded-[14px] border border-[#262a33] bg-[#15171d] transition duration-200 hover:-translate-y-1 hover:border-[#3a3f49]"
    >
      <div className="aspect-[16/10] overflow-hidden bg-[#1a1d22]">
        <img
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />
      </div>

      <div className="p-5">
        <div className="mb-4 flex flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="rounded-full border border-[#343842] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#ccff00]"
            >
              {group}
            </span>
          ))}
        </div>

        <h3
          className="text-[24px] font-bold uppercase leading-tight text-white"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          {workout.name}
        </h3>

        <p className="mt-2 text-sm text-[#92969f]">{workout.equipment}</p>

        <div className="mt-5 flex items-center gap-5 border-t border-[#262a33] pt-4 text-xs text-[#9ca0aa]">
          <div className="flex items-center gap-1.5">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-4 w-4 text-[#ccff00]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>

            <span>{workout.duration} min</span>
          </div>

          <div className="flex items-center gap-1.5">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-4 w-4 text-[#ccff00]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 3s1 3-2 6c-2 2-3 4-3 6a4 4 0 0 0 8 0c0-2-1-4-3-6 0 2-1 3-2 4" />
            </svg>

            <span>{workout.caloriesBurned} kcal</span>
          </div>

          <div className="flex items-center gap-1.5">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-4 w-4 text-[#ccff00]"
              fill="currentColor"
            >
              <path d="m12 2.8 2.75 5.57 6.15.9-4.45 4.33 1.05 6.12L12 16.83l-5.5 2.89 1.05-6.12L3.1 9.27l6.15-.9L12 2.8Z" />
            </svg>

            <span>{workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}