"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isWorkoutActive =
    pathname === "/" || pathname.startsWith("/workout/");

  const isPlanActive = pathname.startsWith("/my-plan");

  return (
    <header className="border-b border-[#202329] bg-[#0d0f12]">
      <div className="mx-auto flex min-h-[72px] w-full max-w-[1180px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="FitLog logo"
            width={30}
            height={30}
            priority
          />

          <span className="font-display text-xl font-bold uppercase tracking-[0.06em] text-white">
            FitLog
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-5">
          <Link
            href="/"
            className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-colors ${
              isWorkoutActive
                ? "bg-[#18230f] text-[#c7ff00]"
                : "text-[#9ca0aa] hover:text-white"
            }`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={`rounded-full px-3 py-2.5 text-sm font-medium transition-colors ${
              isPlanActive
                ? "bg-[#18230f] text-[#c7ff00]"
                : "text-[#9ca0aa] hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Plan and Saved counters */}
        <div className="flex items-center gap-8">
          <Link
            href="/my-plan"
            className="flex items-center gap-3 text-sm font-medium text-[#d2d3d6]"
          >
            <span>Plan</span>

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c7ff00] text-xs font-bold text-[#0d0f12]">
              0
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-3 text-sm font-medium text-[#9ca0aa]"
          >
            <span>Saved</span>

            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#343842] text-xs font-medium text-[#9ca0aa]">
              0
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}