import "./configs-list.css";
import { useEffect, useState } from "react";
import { getConfigs, getPopularConfigs } from "../../../services/api.services";
import ConfigRender from "../config-render/Config-render";
import { useNavigate, useLocation } from "react-router-dom";

function ConfigsList({ reload, onTemplateButtonClick }) {
  const [configs, setConfigs] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const isProfileConfigurations =
    location.pathname === "/profile/configurations";

  useEffect(() => {
    async function fetchData() {
      try {
        let fetchedConfigs;
        if (isProfileConfigurations) {
          fetchedConfigs = await getConfigs();
        } else {
          fetchedConfigs = await getPopularConfigs();
        }
        setConfigs(fetchedConfigs.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [reload, isProfileConfigurations]);

  const handleTemplateButtonClick = (config) => {
    navigate("/configurator", { state: { config } });
  };

  return (
    <div className="configs-list">
      {configs.map((config) => {
        const configRenderFormat = {
          body: { color: { value: config.body } },
          joyControllerLeft: { color: { value: config.joyControllerLeft } },
          joyControllerRight: { color: { value: config.joyControllerRight } },
          thumbSticks: { color: { value: config.thumbSticks } },
          abxy: { color: { value: config.abxy } },
          dpad: { color: { value: config.dpad } },
          utils: { color: { value: config.utils } },
        };
        return (
          <div key={config._id}>
            <ConfigRender configStatus={configRenderFormat} />
            <button
              type="button"
              className="btn btn-link link-light text-decoration-none"
              onClick={() => handleTemplateButtonClick(config)}
            >
              {isProfileConfigurations
                ? "Edit my configuration"
                : "Use as a template"}{" "}
              <i className="mx-1 bi bi-chevron-right"></i>
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default ConfigsList;
