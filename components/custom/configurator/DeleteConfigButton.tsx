"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { CircleMinus } from "lucide-react";
import { deleteConfigAction } from "@/app/actions/configs";
import { Spinner } from "@/components/shadcn/spinner";
import { idleState } from "@/lib/form-state";

const DeleteIcon = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-label="Delete configuration"
      disabled={pending}
      className="text-white transition-colors hover:text-red-400 disabled:opacity-50"
    >
      {pending ? (
        <Spinner className="size-5" />
      ) : (
        <CircleMinus className="size-5" />
      )}
    </button>
  );
};

const DeleteConfigButton = ({ configId }: { configId: string }) => {
  const [state, formAction] = useActionState(deleteConfigAction, idleState);

  return (
    <form action={formAction} className="absolute right-2 top-2 z-10">
      <input type="hidden" name="configId" value={configId} readOnly />
      <DeleteIcon />
      {state.status === "error" && (
        <span className="sr-only" role="alert">
          {state.message}
        </span>
      )}
    </form>
  );
};

export default DeleteConfigButton;
