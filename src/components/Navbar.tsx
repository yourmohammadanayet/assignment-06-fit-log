"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFitLog } from "../context/FitLogContext";

export default function Navbar() {
  const pathname = usePathname();
  const { planCount, savedCount } = useFitLog();

  const isWorkoutActive =
    pathname === "/" || pathname.startsWith("/workout/");

  const isPlanActive = pathname.startsWith("/my-plan");

  const desktopNavItemClass =
    "flex h-[40px] w-[118px] items-center justify-center rounded-full text-sm transition-colors";

  const mobileNavItemClass =
    "flex h-[40px] w-full items-center justify-center rounded-[10px] text-sm transition-colors";

  return (
    <header
      className="border-b"
      style={{
        backgroundColor: "#0C0D10",
        borderColor: "#1A1C22",
      }}
    >
      {/* Mobile + Tablet */}
      <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:hidden">

        <div className="flex min-h-[64px] items-center justify-between gap-4">

          <Link
            href="/"
            className="flex shrink-0 items-center gap-2"
          >
            <Image
              src="/primary-logo.svg"
              alt="FitLog icon"
              width={28}
              height={28}
              priority
              className="h-[28px] w-[28px] shrink-0"
            />

            <span
              className="whitespace-nowrap text-[19px] font-bold uppercase tracking-[0.05em] text-white"
              style={{
                fontFamily: "var(--font-oswald)",
              }}
            >
              FitLog
            </span>
          </Link>


          <div className="flex min-w-0 items-center gap-4">
            <Link
              href="/my-plan#plan"
              className="flex items-center gap-2 whitespace-nowrap text-[12px] font-medium text-[#D1D5DB] sm:text-sm"
              title="Open today's plan"
            >
              <span>Plan</span>

              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#CCFF00] text-[11px] font-bold text-[#0D0F12] sm:h-7 sm:w-7 sm:text-xs">
                {planCount}
              </span>
            </Link>

            <Link
              href="/my-plan#saved"
              className="flex items-center gap-2 whitespace-nowrap text-[12px] font-medium text-[#9CA3AF] sm:text-sm"
              title="Open saved workouts"
            >
              <span>Saved</span>

              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#343842] text-[11px] font-medium text-[#9CA3AF] sm:h-7 sm:w-7 sm:text-xs">
                {savedCount}
              </span>
            </Link>
          </div>
        </div>


        <nav className="grid grid-cols-2 gap-2 border-t border-[#1A1C22] py-2">
          <Link
            href="/"
            className={`${mobileNavItemClass} ${
              isWorkoutActive ? "font-bold" : "font-normal"
            }`}
            style={{
              backgroundColor: isWorkoutActive
                ? "#1A2312"
                : "transparent",
              color: isWorkoutActive
                ? "#C2F903"
                : "#9CA3AF",
            }}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan#plan"
            className={`${mobileNavItemClass} ${
              isPlanActive ? "font-bold" : "font-normal"
            }`}
            style={{
              backgroundColor: isPlanActive
                ? "#1A2312"
                : "transparent",
              color: isPlanActive
                ? "#C2F903"
                : "#9CA3AF",
            }}
          >
            My Plan
          </Link>
        </nav>
      </div>

      {/* Desktop */}
      <div className="mx-auto hidden min-h-[72px] w-full max-w-[1180px] grid-cols-[1fr_auto_1fr] items-center px-8 lg:grid">

        <div className="justify-self-start">
          <Link
            href="/"
            className="flex items-center gap-2"
          >
            <Image
              src="/primary-logo.svg"
              alt="FitLog icon"
              width={30}
              height={30}
              priority
              className="h-[30px] w-[30px] shrink-0"
            />

            <span
              className="whitespace-nowrap text-xl font-bold uppercase tracking-[0.05em] text-white"
              style={{
                fontFamily: "var(--font-oswald)",
              }}
            >
              FitLog
            </span>
          </Link>
        </div>


        <nav className="flex items-center gap-4 justify-self-center">
          <Link
            href="/"
            className={`${desktopNavItemClass} ${
              isWorkoutActive ? "font-bold" : "font-normal"
            }`}
            style={{
              backgroundColor: isWorkoutActive
                ? "#1A2312"
                : "transparent",
              color: isWorkoutActive
                ? "#C2F903"
                : "#9CA3AF",
            }}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan#plan"
            className={`${desktopNavItemClass} ${
              isPlanActive ? "font-bold" : "font-normal"
            }`}
            style={{
              backgroundColor: isPlanActive
                ? "#1A2312"
                : "transparent",
              color: isPlanActive
                ? "#C2F903"
                : "#9CA3AF",
            }}
          >
            My Plan
          </Link>
        </nav>


        <div className="flex items-center gap-8 justify-self-end">
          <Link
            href="/my-plan#plan"
            className="flex items-center gap-3 whitespace-nowrap text-sm font-medium text-[#D1D5DB]"
            title="Open today's plan"
          >
            <span>Plan</span>

            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#CCFF00] text-xs font-bold text-[#0D0F12]">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan#saved"
            className="flex items-center gap-3 whitespace-nowrap text-sm font-medium text-[#9CA3AF]"
            title="Open saved workouts"
          >
            <span>Saved</span>

            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#343842] text-xs font-medium text-[#9CA3AF]">
              {savedCount}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}