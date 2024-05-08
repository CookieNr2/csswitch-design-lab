import "./color-radio-button-list.css";
import { useState, useEffect } from "react";
import ColorRadioButton from "../color-radio-button/ColorRadioButton";

function ColorRadioButtonList({ colorOptions, onChange, tab }) {
  let selectedColor = "Orange";
  colorOptions.forEach((elem) => {
    if (elem.color == tab.color) selectedColor = elem.value;
  });

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
            color={colorOption.color}
            checked={tab.color === colorOption.value}
            onChange={() => onChange(colorOption.color)}
          />
        ))}
      </div>
    </div>
  );
}
export default ColorRadioButtonList;
