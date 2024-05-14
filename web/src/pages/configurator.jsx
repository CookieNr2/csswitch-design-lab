import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ConfigForm from "../components/configurator/config-form/Config-form";
import ConfigRender from "../components/configurator/config-render/Config-render";
import { createConfig } from "../services/api.services";

function Configurator() {
  const initialConfigStatus = {
    body: { label: "Body", color: "#353535" },
    joyControllerLeft: { label: "Joy Controller Left", color: "#353535" },
    joyControllerRight: { label: "Joy Controller Right", color: "#353535" },
    thumbSticks: { label: "Thumb Sticks", color: "#353535" },
    abxy: { label: "ABXY", color: "#353535" },
    dpad: { label: "DPAD", color: "#353535" },
    utils: { label: "Utils", color: "#353535" },
  };

  const location = useLocation();
  const [configStatus, setConfigStatus] = useState(
    location.state?.config || initialConfigStatus
  );
  console.log(location.state?.config);

  useEffect(() => {
    if (location.state?.config) {
      initialConfigStatus.joyControllerLeft.color =
        location.state.config.joyControllerLeft;
      initialConfigStatus.joyControllerRight.color =
        location.state.config.joyControllerRight;
      setConfigStatus(initialConfigStatus);
    }
  }, [location]);

  const saveConfig = () => {
    createConfig({
      name: "New config",
      body: configStatus.body.color,
      joyControllerLeft: configStatus.joyControllerLeft.color,
      joyControllerRight: configStatus.joyControllerRight.color,
      thumbSticks: configStatus.thumbSticks.color,
      abxy: configStatus.abxy.color,
      dpad: configStatus.dpad.color,
      utils: configStatus.utils.color,
    });
  };

  return (
    <>
      <div className="container-fluid d-flex px-0">
        <div className="col-sm-6 col-12">
          <ConfigRender configStatus={configStatus} />
        </div>
        <div className="col-sm-6 col-12 p-5 d-flex selection-section">
          <ConfigForm
            configStatus={configStatus}
            setConfigStatus={setConfigStatus}
          />
        </div>
      </div>
      <div className="actions">
        <p>Name</p>
        <input id="configName"></input>
        <button
          className="btn btn-primary btn-lg rounded-0 my-3 mx-2"
          onClick={saveConfig}
        >
          Submit request
        </button>
        <button
          className="btn btn-secondary btn-lg rounded-0 my-3 mx-2"
          onClick={saveConfig}
        >
          Save draft
        </button>
      </div>
    </>
  );
}
export default Configurator;
