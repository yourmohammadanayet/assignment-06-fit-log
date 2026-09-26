"use client";

import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { FitLogProvider } from "../context/FitLogContext";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <FitLogProvider>
      {children}

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2500,
          style: {
            background: "#181b20",
            color: "#f5f5f5",
            border: "1px solid #30343c",
            borderRadius: "10px",
            padding: "12px 14px",
            fontSize: "14px",
          },
          success: {
            iconTheme: {
              primary: "#ccff00",
              secondary: "#0d0f12",
            },
          },
          error: {
            iconTheme: {
              primary: "#ccff00",
              secondary: "#181b20",
            },
          },
        }}
      />
    </FitLogProvider>
  );
}