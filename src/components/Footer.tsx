import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#1A1C22] bg-[#090A0D]">
      <div className="mx-auto flex min-h-[120px] w-full max-w-[1180px] flex-col items-start justify-center gap-4 px-4 py-6 sm:px-6 lg:h-[100px] lg:min-h-[100px] lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-8 lg:py-0">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
        >
          <Image
            src="/footer-logo.svg"
            alt="FitLog footer logo"
            width={20}
            height={20}
            className="h-[20px] w-[20px] object-contain"
          />

          <span
            className="text-[20px] font-bold uppercase leading-none tracking-[0.04em] text-white"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            FitLog
          </span>
        </Link>

        <p className="max-w-full text-[13px] font-normal leading-5 text-[#747B88] lg:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}