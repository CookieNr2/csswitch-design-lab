import "./color-radio-button-list.css";
import { useState, useEffect } from "react";
import ColorRadioButton from "../color-radio-button/ColorRadioButton";

function ColorRadioButtonList({ colorOptions, onChange, tab }) {
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    setSelectedColor(tab.color);
  }, [tab]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
    onChange(color);
  };

  return (
    <div className="mx-5">
      <div className="color-selection">
        {selectedColor && (
          <h4 className="mb-4">
            <span>{tab.label} - </span>
            {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}
          </h4>
        )}
        {colorOptions.map((colorOption) => (
          <ColorRadioButton
            key={colorOption.value}
            className={colorOption.className}
            value={colorOption.value}
            checked={selectedColor === colorOption.value}
            onChange={() => handleColorChange(colorOption.value)}
          />
        ))}
      </div>
    </div>
  );
}
export default ColorRadioButtonList;
