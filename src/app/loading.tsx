import { Spinner } from "@/components/shadcn/spinner";

const Loading = () => (
  <div className="container mx-auto flex items-center gap-3 px-4 py-12">
    <Spinner className="size-5 text-white" />
    <span className="text-neutral-400">Loading…</span>
  </div>
);

export default Loading;
