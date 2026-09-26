import { notFound } from "next/navigation";
import Navbar from "../../../components/Navbar";
import WorkoutActions from "../../../components/WorkoutActions";
import type { Workout } from "../../../types/workout";

type WorkoutDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function getWorkout(
  id: string
): Promise<Workout | null> {
  const response = await fetch(
    `https://api.api-store.workers.dev/api/fitlog/${id}`,
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
    {
      label: "Equipment",
      value: workout.equipment,
    },
    {
      label: "Difficulty",
      value: workout.difficulty,
    },
    {
      label: "Sets",
      value: workout.sets,
    },
    {
      label: "Reps",
      value: workout.reps,
    },
    {
      label: "Duration",
      value: `${workout.duration} min`,
    },
    {
      label: "Calories",
      value: `${workout.caloriesBurned} kcal`,
    },
    {
      label: "Rating",
      value: workout.rating,
    },
  ];

  return (
    <>
      <Navbar />

      <main className="bg-[#0F1115] py-10 sm:py-12">
        <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            {/* Left image */}
            <div className="overflow-hidden rounded-[16px] bg-[#151922]">
              <img
                src={workout.image}
                alt={workout.name}
                className="h-[520px] w-full object-cover sm:h-[620px] lg:h-[700px]"
              />
            </div>

            {/* Right content */}
            <div className="flex flex-col">
              <h1
                className="text-[38px] font-bold uppercase leading-[1.05] tracking-[0.01em] text-white sm:text-[44px]"
                style={{
                  fontFamily:
                    "var(--font-oswald)",
                }}
              >
                {workout.name}
              </h1>

              <p className="mt-4 max-w-[570px] text-[15px] leading-[24px] text-[#9CA3AF]">
                {workout.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                {workout.muscleGroups.map(
                  (group) => (
                    <span
                      key={group}
                      className="inline-flex items-center justify-center rounded-full bg-[#CCFF00] px-[14px] py-[5px] text-[11px] font-bold uppercase leading-[16.5px] tracking-[0.55px] text-black"
                    >
                      {group}
                    </span>
                  )
                )}
              </div>

              {/* Key specs */}
              <section className="mt-7">
                <div className="overflow-hidden rounded-[16px] border border-[#262C37] bg-[#151922]">
                  {specs.map(
                    (spec, index) => (
                      <div
                        key={spec.label}
                        className={`flex min-h-[58px] items-center justify-between gap-5 px-6 ${
                          index !==
                          specs.length - 1
                            ? "border-b border-[#252B35]"
                            : ""
                        }`}
                      >
                        <span className="text-[11px] font-bold uppercase leading-4 tracking-[0.08em] text-[#9CA3AF]">
                          {spec.label}
                        </span>

                        <span className="text-right text-[14px] font-medium leading-5 text-[#E5E7EB]">
                          {spec.value}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </section>

              {/* Instructions */}
              <section className="mt-8">
                <h2 className="text-[18px] font-bold uppercase leading-7 text-white">
                  Instructions
                </h2>

                <ol className="mt-5 space-y-4">
                  {workout.instructions.map(
                    (instruction, index) => (
                      <li
                        key={instruction}
                        className="flex items-start gap-3 text-[14px] leading-[22px] text-[#D1D5DB]"
                      >
                        <span className="shrink-0 text-[#9CA3AF]">
                          {index + 1}.
                        </span>

                        <span>
                          {instruction}
                        </span>
                      </li>
                    )
                  )}
                </ol>
              </section>

              {/* Action buttons */}
              <WorkoutActions
                workout={workout}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}