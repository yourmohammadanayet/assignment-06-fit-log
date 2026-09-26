import { notFound } from "next/navigation";
import Navbar from "../../../components/Navbar";
import type { Workout } from "../../../types/workout";

type WorkoutDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function getWorkout(id: string): Promise<Workout | null> {
  const response = await fetch(
    `https://api.abcz.workers.dev/api/fitlog/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export default async function WorkoutDetailsPage({
  params,
}: WorkoutDetailsPageProps) {
  const { id } = await params;
  const workout = await getWorkout(id);

  if (!workout) {
    notFound();
  }

  const specs = [
    { label: "Equipment", value: workout.equipment },
    { label: "Difficulty", value: workout.difficulty },
    { label: "Sets", value: workout.sets },
    { label: "Reps", value: workout.reps },
    { label: "Duration", value: `${workout.duration} min` },
    { label: "Calories", value: `${workout.caloriesBurned} kcal` },
    { label: "Rating", value: workout.rating },
  ];

  return (
    <>
      <Navbar />

      <main className="bg-[#0d0f12] py-10">
        <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="overflow-hidden rounded-[16px] border border-[#262a33] bg-[#15171d]">
              <img
                src={workout.image}
                alt={workout.name}
                className="h-full min-h-[520px] w-full object-cover"
              />
            </div>

            <div>
              <div className="flex flex-wrap gap-2">
                {workout.muscleGroups.map((group) => (
                  <span
                    key={group}
                    className="rounded-full border border-[#343842] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#ccff00]"
                  >
                    {group}
                  </span>
                ))}
              </div>

              <h1
                className="mt-5 text-[46px] font-bold uppercase leading-[0.95] text-white sm:text-[54px]"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                {workout.name}
              </h1>

              <p className="mt-5 text-sm leading-6 text-[#9ca0aa]">
                {workout.description}
              </p>

              <section className="mt-8">
                <h2
                  className="mb-4 text-[24px] font-bold uppercase text-white"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  Key Specs
                </h2>

                <div className="overflow-hidden rounded-[12px] border border-[#262a33] bg-[#15171d]">
                  {specs.map((spec, index) => (
                    <div
                      key={spec.label}
                      className={`flex items-center justify-between gap-4 px-5 py-3 ${
                        index !== specs.length - 1
                          ? "border-b border-[#262a33]"
                          : ""
                      }`}
                    >
                      <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#777b84]">
                        {spec.label}
                      </span>

                      <span className="text-sm font-medium text-[#e4e4e6]">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-8">
                <h2
                  className="mb-5 text-[24px] font-bold uppercase text-white"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  Instructions
                </h2>

                <ol className="space-y-4">
                  {workout.instructions.map((instruction, index) => (
                    <li
                      key={instruction}
                      className="flex items-start gap-4 text-sm leading-6 text-[#a0a3aa]"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#343842] text-xs font-bold text-[#ccff00]">
                        {index + 1}
                      </span>

                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </section>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[5px] bg-[#ccff00] px-6 text-xs font-bold uppercase text-black"
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="5" width="18" height="16" rx="2" />
                    <path d="M16 3v4M8 3v4M3 10h18" />
                    <path d="M12 13v5M9.5 15.5h5" />
                  </svg>

                  <span>Add to today&apos;s plan</span>
                </button>

                <button
                  type="button"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[5px] border border-[#343842] px-6 text-xs font-bold uppercase text-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-4 w-4"
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
            </div>
          </div>
        </div>
      </main>
    </>
  );
}