import "./color-radio-button.css";
function ColorRadioButton({ className, value, color, onChange }) {
  return (
    <label className={className}>
      <input type="radio" name="color" value={value} onChange={onChange} />
      <div className="color-selector">
        <span
          style={{
            background: color,
          }}
        ></span>
      </div>
    </label>
  );
}

export default ColorRadioButton;
