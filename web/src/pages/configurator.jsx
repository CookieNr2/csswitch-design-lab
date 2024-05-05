import React, { useState } from "react";
import ConfigForm from "../components/configurator/config-form/Config-form";
import ConfigRender from "../components/configurator/config-render/Config-render";

const initialConfigStatus = {
  body: { label: "Body", color: "orange" },
  joyControllerLeft: { label: "Joy Controller Left", color: "orange" },
  joyControllerRight: { label: "Joy Controller Right", color: "orange" },
  thumbSticks: { label: "Thumb Sticks", color: "orange" },
  abxy: { label: "ABXY", color: "orange" },
  dpad: { label: "DPAD", color: "orange" },
  utils: { label: "Utils", color: "orange" },
};

function Configurator() {
  const [configStatus, setConfigStatus] = useState(initialConfigStatus);

  return (
    <div className="container-fluid d-flex px-0">
      <div className="col-sm-6 col-12">
        <ConfigRender configStatus={configStatus} />
      </div>
      <div className="col-sm-6 col-12 mh-100 p-5 d-flex selection-section">
        <ConfigForm
          configStatus={configStatus}
          setConfigStatus={setConfigStatus}
        />
      </div>
    </div>
  );
}
export default Configurator;
