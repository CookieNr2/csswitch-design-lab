import "./configs-list.css";
import { useEffect, useState } from "react";
import { getConfigs } from "../../../services/api.services";
import ConfigRender from "../config-render/Config-render";
import { useNavigate } from "react-router-dom";

function ConfigsList({ reload, onTemplateButtonClick }) {
  const [configs, setConfigs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchConfigs() {
      try {
        const { data: fetchedConfigs } = await getConfigs();
        setConfigs(fetchedConfigs);
      } catch (error) {
        console.error(error);
      }
    }

    fetchConfigs();
  }, [reload]);

  const handleTemplateButtonClick = (config) => {
    navigate("/configurator", { state: { config } });
  };
  return (
    <div className="configs-list">
      {configs.map((config) => {
        const configRenderFormat = {
          body: { color: config.body },
          joyControllerLeft: { color: config.joyControllerLeft },
          joyControllerRight: { color: config.joyControllerRight },
          thumbSticks: { color: config.thumbSticks },
          abxy: { color: config.abxy },
          dpad: { color: config.dpad },
          utils: { color: config.utils },
        };
        return (
          <div key={config._id}>
            <ConfigRender configStatus={configRenderFormat} />
            <button
              type="button"
              className="btn btn-link link-light text-decoration-none"
              onClick={() => handleTemplateButtonClick(config)}
            >
              Use as a template <i class="mx-1 bi bi-chevron-right"></i>
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default ConfigsList;
