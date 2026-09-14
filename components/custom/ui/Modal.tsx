"use client";

import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcn/dialog";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
};

/**
 * Wraps shadcn's Dialog in the shape this app uses (`open` / `onClose` rather
 * than `onOpenChange`, and a mandatory title so Radix always has an accessible
 * name). Radix supplies the focus trap, focus restore, scroll lock and Escape
 * handling.
 */
const Modal = ({ open, onClose, title, description, children }: ModalProps) => (
  <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
    <DialogContent className="max-h-[90dvh] overflow-y-auto rounded-none border-neutral-700 bg-neutral-800 p-0 sm:max-w-lg">
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
      </DialogHeader>
      {children}
    </DialogContent>
  </Dialog>
);

export default Modal;
