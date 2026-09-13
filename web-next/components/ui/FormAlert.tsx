import type { FormState } from "@/lib/form-state";

const FormAlert = ({ state }: { state: FormState }) => {
  if (state.status === "idle") return null;

  return (
    <div
      className={`alert alert-${state.status === "error" ? "danger" : "success"} rounded-0`}
      role="alert"
      aria-live="polite"
    >
      {state.message}
    </div>
  );
};

export default FormAlert;
