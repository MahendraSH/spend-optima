"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconSize?: number;
  showText?: boolean;
  textClassName?: string;
}

export function Logo({
  className,
  iconSize = 32,
  showText = true,
  textClassName,
}: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5 select-none", className)}>
      {/* Icon with gradient matching website primary color */}
      <div
        style={{ width: iconSize, height: iconSize }}
        className="relative flex items-center justify-center rounded-[28%] shadow-sm overflow-hidden transition-all duration-300 bg-gradient-to-br from-primary via-primary to-violet-500 dark:from-primary dark:to-indigo-500 hover:scale-[1.05]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
          style={{ width: iconSize * 0.6, height: iconSize * 0.6 }}
        >
          <path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z" />
          <path d="m7 16.5-4.74-2.85" />
          <path d="m7 16.5 5-3" />
          <path d="M7 16.5v5.17" />
          <path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z" />
          <path d="m17 16.5-5-3" />
          <path d="m17 16.5 4.74-2.85" />
          <path d="M17 16.5v5.17" />
          <path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z" />
          <path d="M12 8 7.26 5.15" />
          <path d="m12 8 4.74-2.85" />
          <path d="M12 13.5V8" />
        </svg>
      </div>

      {showText && (
        <span
          className={cn(
            "font-bold tracking-tight text-foreground transition-colors duration-300",
            textClassName
          )}
          style={{ fontSize: iconSize * 0.55 }}
        >
          SpendOptima
        </span>
      )}
    </div>
  );
}
