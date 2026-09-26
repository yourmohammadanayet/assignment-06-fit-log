import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#1A1C22] bg-[#090A0D]">
      <div className="mx-auto flex h-[100px] w-full max-w-[1180px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
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

        {/* Copyright */}
        <p className="text-[13px] font-normal leading-5 text-[#747B88]">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}