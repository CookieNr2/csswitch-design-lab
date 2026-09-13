import "@/styles/nav-item-list.css";
import "@/styles/nav-item.css";
import Image from "next/image";
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

const NavItemList = ({
  configStatus,
  activePart,
  onSelect,
}: NavItemListProps) => {
  return (
    <ul className="nav nav-pills text-center" role="tablist">
      {PART_NAMES.filter((part) => configStatus[part]).map((part) => (
        <li key={part} className="nav-item my-2">
          <button
            type="button"
            role="tab"
            aria-selected={activePart === part}
            className={`nav-link ${activePart === part ? "active" : ""}`}
            onClick={() => onSelect(part)}
          >
            <Image
              src={PART_ICONS[part]}
              alt={configStatus[part].displayName}
              width={45}
              height={45}
            />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default NavItemList;
