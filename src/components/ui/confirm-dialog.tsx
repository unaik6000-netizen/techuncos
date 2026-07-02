"use client";

import { AnimatePresence, motion } from "framer-motion";
import { TriangleAlert, Loader2 } from "lucide-react";
import { transitions } from "@/lib/motion";

/** Reusable destructive-action confirmation modal. */
export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Delete",
  pending = false,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  pending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transitions.fast}
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
          onClick={onCancel}
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="confirm-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={transitions.base}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl border border-border-strong bg-popover p-5 shadow-[0_24px_64px_rgba(0,0,0,0.6)]"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-error/10 text-error">
              <TriangleAlert className="h-5 w-5" aria-hidden="true" />
            </span>
            <h2 id="confirm-title" className="mt-3 font-display text-base font-semibold text-foreground">
              {title}
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={onCancel}
                className="inline-flex h-10 items-center rounded-lg border border-border px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={pending}
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-error px-4 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {pending && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
