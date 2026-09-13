import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ConfigStatus, PartName } from "@/lib/types";
import { PART_NAMES } from "@/lib/types";

const PART_ICONS: Record<PartName, string> = {
  body: "/configurator/icons/body.svg",
  joyControllerLeft: "/configurator/icons/joycon-left.svg",
  joyControllerRight: "/configurator/icons/joycon-right.svg",
  thumbSticks: "/configurator/icons/thumb-sticks.svg",
  abxy: "/configurator/icons/abxy.svg",
  dpad: "/configurator/icons/dpad.svg",
  utils: "/configurator/icons/utils.svg",
};

type NavItemListProps = {
  configStatus: ConfigStatus;
  activePart: PartName;
  onSelect: (part: PartName) => void;
};

const NavItemList = ({ configStatus, activePart, onSelect }: NavItemListProps) => (
  <ul
    className="mb-5 flex justify-around md:mb-0 md:flex-col md:justify-start"
    role="tablist"
  >
    {PART_NAMES.filter((part) => configStatus[part]).map((part) => (
      <li key={part} className="my-2">
        <button
          type="button"
          role="tab"
          aria-selected={activePart === part}
          onClick={() => onSelect(part)}
          className={cn(
            "flex size-12 items-center justify-center rounded-none p-2 transition-colors md:size-18 md:p-4",
            activePart === part ? "bg-neutral-600" : "hover:bg-neutral-700"
          )}
        >
          <Image
            src={PART_ICONS[part]}
            alt={configStatus[part].displayName}
            width={45}
            height={45}
            className="opacity-70"
          />
        </button>
      </li>
    ))}
  </ul>
);

export default NavItemList;
