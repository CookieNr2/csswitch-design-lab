"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { deleteConfigAction } from "@/app/actions/configs";
import { idleState } from "@/lib/form-state";

const DeleteIcon = ({ className }: { className?: string }) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={className}
      aria-label="Delete configuration"
      disabled={pending}
    >
      <i className={pending ? "bi bi-hourglass-split" : "bi bi-dash-circle"} />
    </button>
  );
};

const DeleteConfigButton = ({
  configId,
  className,
}: {
  configId: string;
  className?: string;
}) => {
  const [state, formAction] = useActionState(deleteConfigAction, idleState);

  return (
    <form action={formAction}>
      <input type="hidden" name="configId" value={configId} readOnly />
      <DeleteIcon className={className} />
      {state.status === "error" && (
        <span className="visually-hidden" role="alert">
          {state.message}
        </span>
      )}
    </form>
  );
};

export default DeleteConfigButton;
