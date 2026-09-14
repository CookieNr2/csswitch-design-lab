import { Loader2 } from "lucide-react";

const Spinner = ({ label }: { label: string }) => (
  <div className="container mx-auto flex items-center gap-3 px-4 py-12">
    <Loader2 className="size-5 animate-spin text-white" aria-hidden="true" />
    <span className="text-neutral-400">{label}</span>
  </div>
);

export default Spinner;
