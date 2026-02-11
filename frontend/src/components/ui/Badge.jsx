import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Badge = ({ children, variant = 'default', className }) => {
  const variants = {
    default: "bg-[var(--color-background)] text-[var(--color-text-muted)] border border-[var(--color-border)]",
    GK: "bg-[var(--color-pos-gk)] text-black",
    DEF: "bg-[var(--color-pos-def)] text-white",
    MID: "bg-[var(--color-pos-mid)] text-black",
    ATT: "bg-[var(--color-pos-att)] text-white",
    success: "bg-green-500/20 text-green-400 border border-green-500/50",
    warning: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50"
  };

  return (
    <span className={twMerge(clsx(
      "inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider",
      variants[variant],
      className
    ))}>
      {children}
    </span>
  );
};