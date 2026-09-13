"use client";

import "@/styles/modal.css";
import { useEffect, type ReactNode } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

/**
 * A controlled replacement for the Bootstrap `data-bs-toggle` modal. React owns
 * the open state, so the app no longer needs Bootstrap's JavaScript bundle.
 */
const Modal = ({ open, onClose, children }: ModalProps) => {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("modal-open");

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("modal-open");
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div className="modal-backdrop fade show" />
      <div
        className="modal fade show d-block rounded-0"
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <div className="modal-dialog" data-bs-theme="dark">
          <div className="modal-content rounded-0">
            <div className="modal-body p-0">
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
              />
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
