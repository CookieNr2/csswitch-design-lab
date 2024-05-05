import React, { useState } from "react";
import ConfigForm from "../components/configurator/config-form/Config-form";
import ConfigRender from "../components/configurator/config-render/Config-render";

function Configurator() {
  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className="container-fluid d-flex px-0">
      <div className="col-sm-6 col-12">
        <ConfigRender selectedColor={selectedColor} />
      </div>
      <div className="col-sm-6 col-12 mh-100 selection-section">
        <ConfigForm onColorChange={handleColorChange} />
      </div>
    </div>
  );
}
export default Configurator;
