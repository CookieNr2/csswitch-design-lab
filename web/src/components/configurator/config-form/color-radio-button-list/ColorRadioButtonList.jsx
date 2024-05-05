import ColorRadioButton from "../color-radio-button/ColorRadioButton";

function ColorRadioButtonList({ colorOptions, onChange }) {
  return (
    <div>
      {colorOptions.map((colorOption) => (
        <ColorRadioButton
          key={colorOption.value}
          className={colorOption.className}
          value={colorOption.value}
          onChange={onChange}
        />
      ))}
    </div>
  );
}

export default ColorRadioButtonList;
