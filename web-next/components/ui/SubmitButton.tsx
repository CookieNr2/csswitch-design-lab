"use client";

import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  children: React.ReactNode;
  pendingLabel: string;
  className?: string;
  /** Submits the enclosing form to a different action (multi-button forms). */
  formAction?: (formData: FormData) => void;
};

/**
 * useFormStatus reads the pending state of the nearest enclosing <form>, so
 * the button needs no props threaded down from the page.
 */
const SubmitButton = ({
  children,
  pendingLabel,
  className = "btn btn-primary btn-lg rounded-0 my-3",
  formAction,
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={className} disabled={pending} formAction={formAction}>
      {pending ? pendingLabel : children}
    </button>
  );
};

export default SubmitButton;
