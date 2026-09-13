import { CircleAlert, CircleCheck } from "lucide-react";
import { Alert, AlertDescription } from "@/components/shadcn/alert";
import type { FormState } from "@/lib/form-state";

const FormAlert = ({ state }: { state: FormState }) => {
  if (state.status === "idle") return null;

  const isError = state.status === "error";

  return (
    <Alert
      variant={isError ? "destructive" : "default"}
      className="mb-4 rounded-none"
      aria-live="polite"
    >
      {isError ? <CircleAlert /> : <CircleCheck />}
      <AlertDescription>{state.message}</AlertDescription>
    </Alert>
  );
};

export default FormAlert;
