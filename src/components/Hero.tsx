import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-[#0d0f12] py-10">
      <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-[470px] w-full items-center gap-8 rounded-[22px] border border-[#262a33] bg-[#15171d] px-8 py-10 md:grid-cols-[1.2fr_0.8fr] lg:px-14 lg:py-12">
          <div>
            <p
              className="mb-6 text-xs font-bold uppercase tracking-[0.16em]"
              style={{ color: "#ccff00" }}
            >
              Workout Library
            </p>

            <h1
              className="text-[46px] font-bold uppercase leading-[0.94] tracking-[-0.02em] sm:text-[52px] lg:text-[58px]"
              style={{
                color: "#f5f5f5",
                fontFamily: "var(--font-oswald)",
              }}
            >
              <span className="block">Train with intent. Log</span>
              <span className="block">every set.</span>
            </h1>

            <p
              className="mt-6 max-w-[540px] text-sm leading-6 sm:text-[15px]"
              style={{ color: "#9a9da6" }}
            >
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <a
              href="#library"
              className="mt-7 inline-flex h-[40px] min-w-[180px] items-center justify-center rounded-[5px] px-6 text-xs font-bold uppercase tracking-[0.02em] transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "#ccff00",
                color: "#0b0d0f",
              }}
            >
              Browse Workouts
            </a>
          </div>

          <div className="flex items-center justify-center md:justify-end">
            <Image
              src="/banner.png"
              alt="FitLog workout illustration"
              width={390}
              height={430}
              priority
              className="h-auto w-full max-w-[310px] object-contain lg:max-w-[340px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}