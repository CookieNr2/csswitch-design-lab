import "./color-radio-button.css";
function ColorRadioButton({ className, value, onChange }) {
  return (
    <label className={className}>
      <input type="radio" name="color" value={value} onChange={onChange} />
      <div className="color-selector">
        <span></span>
      </div>
    </label>
  );
}

export default ColorRadioButton;
