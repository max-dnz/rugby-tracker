import * as React from "react";
import { cn } from "@/lib/utils";

export function Dialog({ open, onOpenChange, children }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40"
      style={{ zIndex: 2147483647, pointerEvents: 'none' }}
      onClick={() => onOpenChange(false)}
    >
      <div
        className="bg-white rounded-lg shadow-2xl p-6 min-w-[320px] max-w-[90vw] w-full sm:w-auto"
        style={{ zIndex: 2147483647, pointerEvents: 'auto', position: 'relative' }}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}


export function DialogContent({ children }: { children: React.ReactNode }) {
  return <div style={{ zIndex: 2147483647, position: 'relative' }}>{children}</div>;
}

export function DialogHeader({ children }: { children: React.ReactNode }) {
  return <div className="mb-2">{children}</div>;
}

export function DialogTitle({ children }: { children: React.ReactNode }) {
  return <div className="text-lg font-bold mb-2">{children}</div>;
}
