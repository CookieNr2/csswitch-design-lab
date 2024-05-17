import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ConfigForm from "../components/configurator/config-form/Config-form";
import ConfigRender from "../components/configurator/config-render/Config-render";
import { createConfig, getParts } from "../services/api.services";

function Configurator() {
  const location = useLocation();
  const [configStatus, setConfigStatus] = useState();
  const lsc = location.state?.config;

  useEffect(() => {
    async function fetchData() {
      try {
        let fetchedInitialConfigStatus = {};
        (await getParts()).data.forEach((element) => {
          fetchedInitialConfigStatus[element.name] = {
            ...element,
            color: element.defaultColor,
          };
        });
        if (location.state?.config)
          fetchedInitialConfigStatus = {
            ...fetchedInitialConfigStatus,
            ...{
              body: { ...fetchedInitialConfigStatus.body, value: lsc.body },
              joyControllerLeft: {
                ...fetchedInitialConfigStatus.joyControllerLeft,
                value: lsc.joyControllerLeft,
              },
              joyControllerRight: {
                ...fetchedInitialConfigStatus.joyControllerRight,
                value: lsc.joyControllerRight,
              },
              thumbSticks: {
                ...fetchedInitialConfigStatus.thumbSticks,
                value: lsc.thumbSticks,
              },
              abxy: { ...fetchedInitialConfigStatus.abxy, value: lsc.abxy },
              dpad: { ...fetchedInitialConfigStatus.dpad, value: lsc.dpad },
              utils: { ...fetchedInitialConfigStatus.utils, value: lsc.utils },
            },
          };
        console.log(fetchedInitialConfigStatus);
        setConfigStatus(fetchedInitialConfigStatus);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const saveConfig = () => {
    console.log(configStatus);
    createConfig({
      name: "New config",
      body: configStatus.body.color.value,
      joyControllerLeft: configStatus.joyControllerLeft.color.value,
      joyControllerRight: configStatus.joyControllerRight.color.value,
      thumbSticks: configStatus.thumbSticks.color.value,
      abxy: configStatus.abxy.color.value,
      dpad: configStatus.dpad.color.value,
      utils: configStatus.utils.color.value,
    });
  };

  function displayConfigurator() {
    if (!configStatus) return <p>Loading...</p>;
    else
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

  return <>{displayConfigurator()}</>;
}
export default Configurator;
