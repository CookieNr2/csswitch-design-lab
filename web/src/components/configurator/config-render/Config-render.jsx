import "./config-render.css";

function ConfigRender({ selectedColor }) {
  return (
    <div className="square" style={{ backgroundColor: selectedColor }}></div>
  );
}
export default ConfigRender;
