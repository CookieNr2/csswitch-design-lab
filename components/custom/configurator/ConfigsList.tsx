import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ConfigRender from "./ConfigRender";
import DeleteConfigButton from "./DeleteConfigButton";
import { configuratorHref } from "@/lib/template-link";
import type { PartColors } from "@/lib/types";

export type ConfigCard = {
  id: string;
  colors: PartColors;
};

type ConfigsListProps = {
  configs: ConfigCard[];
  /** Owned cards can be deleted and are edited rather than used as a template. */
  owned?: boolean;
  emptyMessage?: string;
};

const ConfigsList = ({
  configs,
  owned = false,
  emptyMessage = "No configurations yet.",
}: ConfigsListProps) => {
  if (configs.length === 0) {
    return <p className="text-neutral-400">{emptyMessage}</p>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {configs.map((config) => (
        <div
          key={config.id}
          className="relative m-1 mb-5 flex w-full max-w-xl flex-col lg:flex-1 lg:basis-1/3"
        >
          {owned && <DeleteConfigButton configId={config.id} />}
          {/* --sw-scale drives the console: its internals are all em-based. */}
          <ConfigRender
            colors={config.colors}
            className="max-h-112 rounded-lg [--sw-scale:1.2em] max-lg:[--sw-scale:0.8em]"
            isDisplay
          />
          <Link
            href={configuratorHref(config.colors)}
            className="-mt-12 inline-flex items-center justify-center gap-1 text-neutral-400 hover:text-white"
          >
            {owned ? "Edit my configuration" : "Use as a template"}
            <ChevronRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ConfigsList;
