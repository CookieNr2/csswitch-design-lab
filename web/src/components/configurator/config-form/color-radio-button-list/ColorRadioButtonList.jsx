import "./color-radio-button-list.css";
import { useState, useEffect } from "react";
import ColorRadioButton from "../color-radio-button/ColorRadioButton";

function ColorRadioButtonList({ onChange, tab }) {
  let selectedColor = "Orange";
  console.log(tab);
  tab.colorOptions.forEach((elem) => {
    if (elem.value == tab.value) selectedColor = elem.name;
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
            checked={tab.value === colorOption.name}
            onChange={() => onChange(colorOption)}
          />
        ))}
      </div>
    </div>
  );
}
export default ColorRadioButtonList;
