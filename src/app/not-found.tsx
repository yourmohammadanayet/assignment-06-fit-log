import Link from "next/link";
import Navbar from "../components/Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />

      <main className="flex min-h-[70vh] items-center justify-center bg-[#0C0D10] px-4">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#CCFF00]">
            404
          </p>

          <h1
            className="mt-4 text-[48px] font-bold uppercase leading-none text-white sm:text-[64px]"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Page Not Found
          </h1>

          <p className="mx-auto mt-5 max-w-[480px] text-sm leading-6 text-[#9CA3AF]">
            The page you are looking for does not exist or may have been moved.
          </p>

          <Link
            href="/"
            className="mt-7 inline-flex h-[42px] items-center justify-center rounded-[8px] bg-[#CCFF00] px-6 text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ color: "#000000" }}
          >
            Back to workouts
          </Link>
        </div>
      </main>
    </>
  );
}