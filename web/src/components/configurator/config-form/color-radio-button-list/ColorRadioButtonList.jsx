import "./color-radio-button-list.css";
import ColorRadioButton from "../color-radio-button/ColorRadioButton";

function ColorRadioButtonList({ onChange, tab }) {
  let selectedColor = "Orange";
  tab.colorOptions.forEach((elem) => {
    if (elem.name == tab.color.name) selectedColor = elem.name;
  });

  return (
    <div className="mx-5">
      <div className="color-selection">
        {selectedColor && (
          <h4 className="mb-4">
            <span>{tab.displayName} - </span>
            {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}
          </h4>
        )}
        {tab.colorOptions.map((colorOption) => (
          <ColorRadioButton
            key={colorOption.name}
            className={colorOption.className}
            color={colorOption.value}
            onChange={() => onChange(colorOption)}
            isActive={selectedColor === colorOption.name}
          />
        ))}
      </div>
    </div>
  );
}
export default ColorRadioButtonList;
