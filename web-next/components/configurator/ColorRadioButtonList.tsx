import "@/styles/color-radio-button-list.css";
import ColorRadioButton from "./ColorRadioButton";
import type { Color, PartSelection } from "@/lib/types";

type ColorRadioButtonListProps = {
  part: PartSelection;
  onChange: (color: Color) => void;
};

const ColorRadioButtonList = ({
  part,
  onChange,
}: ColorRadioButtonListProps) => {
  const selected = part.colorOptions.find((option) => option.name === part.color.name);

  return (
    <div className="mx-5">
      <div className="color-selection">
        {selected && (
          <h4 className="mb-4">
            <span>{part.displayName} - </span>
            {selected.name.charAt(0).toUpperCase() + selected.name.slice(1)}
          </h4>
        )}
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
