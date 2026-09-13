import { cn } from "@/lib/utils";

type ColorRadioButtonProps = {
  name: string;
  color: string;
  label: string;
  isActive: boolean;
  onSelect: () => void;
};

const ColorRadioButton = ({
  name,
  color,
  label,
  isActive,
  onSelect,
}: ColorRadioButtonProps) => (
  <label title={label} className="group relative inline-flex size-14 cursor-pointer items-center justify-center">
    {/* Visually hidden rather than display:none, so it stays focusable. */}
    <input
      type="radio"
      name={name}
      value={color}
      checked={isActive}
      onChange={onSelect}
      className="peer sr-only"
    />
    <span className="sr-only">{label}</span>
    <span
      className={cn(
        "size-11 rounded-full shadow-md transition-all duration-300",
        "group-hover:size-14",
        "peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-400 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-neutral-800",
        isActive && "ring-2 ring-white/50"
      )}
      style={{ backgroundColor: color }}
    />
  </label>
);

export default ColorRadioButton;
