import type { ComponentProps, ReactNode } from "react";
import { Input } from "@/components/shadcn/input";
import { Label } from "@/components/shadcn/label";
import { cn } from "@/lib/utils";

/** The bottom-rule text field used throughout the app. */
const fieldStyles =
  "rounded-none border-0 border-b border-neutral-400 bg-transparent px-0 text-white shadow-none focus-visible:border-emerald-400 focus-visible:ring-0 dark:bg-transparent";

type FieldProps = ComponentProps<typeof Input> & {
  label: string;
  id: string;
  hint?: ReactNode;
};

export const Field = ({ label, id, hint, className, ...props }: FieldProps) => (
  <div className="mb-4 grid gap-1.5">
    <Label htmlFor={id} className="text-neutral-400">
      {label}
    </Label>
    <Input id={id} className={cn(fieldStyles, className)} {...props} />
    {hint}
  </div>
);

type SelectFieldProps = ComponentProps<"select"> & {
  label: string;
  id: string;
};

/**
 * A native <select>, deliberately not shadcn's Radix Select: this one takes
 * part in FormData and works before JavaScript loads, which the forms rely on.
 */
export const SelectField = ({ label, id, className, children, ...props }: SelectFieldProps) => (
  <div className="mb-4 grid gap-1.5">
    <Label htmlFor={id} className="text-neutral-400">
      {label}
    </Label>
    <select
      id={id}
      className={cn(
        fieldStyles,
        "h-9 w-full text-sm outline-none focus-visible:border-emerald-400 [&>option]:bg-neutral-800",
        className
      )}
      {...props}
    >
      {children}
    </select>
  </div>
);
