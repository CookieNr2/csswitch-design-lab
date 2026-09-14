"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/shadcn/button";
import { Spinner } from "@/components/shadcn/spinner";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type SubmitButtonProps = ComponentProps<typeof Button> & {
  pendingLabel: string;
};

/**
 * useFormStatus reads the pending state of the nearest enclosing <form>, so
 * the button needs no props threaded down from the page.
 */
const SubmitButton = ({
  children,
  pendingLabel,
  className,
  ...props
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className={cn("h-11 rounded-none px-6 text-base", className)}
      {...props}
    >
      {pending && <Spinner />}
      {pending ? pendingLabel : children}
    </Button>
  );
};

export default SubmitButton;
