import ColorRadioButton from "./ColorRadioButton";
import type { Color, PartSelection } from "@/lib/types";

type ColorRadioButtonListProps = {
  part: PartSelection;
  onChange: (color: Color) => void;
};

const ColorRadioButtonList = ({ part, onChange }: ColorRadioButtonListProps) => {
  const selected = part.colorOptions.find((option) => option.name === part.color.name);

  return (
    <div className="flex-1">
      {selected && (
        <h2 className="mb-6 text-xl font-black text-neutral-400">
          <span>{part.displayName} - </span>
          <span className="text-white">
            {selected.name.charAt(0).toUpperCase() + selected.name.slice(1)}
          </span>
        </h2>
      )}
      <div className="flex flex-wrap gap-1">
        {part.colorOptions.map((option) => (
          <ColorRadioButton
            key={option._id}
            name={`color-${part.name}`}
            color={option.value}
            label={option.name}
            isActive={selected?.name === option.name}
            onSelect={() => onChange(option)}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorRadioButtonList;
