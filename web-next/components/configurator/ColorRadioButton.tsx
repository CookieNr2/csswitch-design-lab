import "@/styles/color-radio-button.css";

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
}: ColorRadioButtonProps) => {
  return (
    <label title={label}>
      <input
        type="radio"
        name={name}
        value={color}
        checked={isActive}
        onChange={onSelect}
      />
      <span className="visually-hidden">{label}</span>
      <div className="color-selector">
        <span
          className={isActive ? "active-color" : undefined}
          style={{ backgroundColor: color }}
        />
      </div>
    </label>
  );
};

export default ColorRadioButton;
