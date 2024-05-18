import "./color-radio-button.css";
function ColorRadioButton({ className, value, color, onChange, isActive }) {
  return (
    <label className={`${className ? className : ""}`}>
      <input type="radio" name="color" value={value} onChange={onChange} />
      <div className={`color-selector`}>
        <span
          className={`${isActive ? "active-color" : ""}`}
          style={{
            background: color,
          }}
        ></span>
      </div>
    </label>
  );
}

export default ColorRadioButton;
