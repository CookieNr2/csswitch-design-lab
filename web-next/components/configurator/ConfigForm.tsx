import "@/styles/config-form.css";
import { useState } from "react";
import NavItemList from "./NavItemList";
import ColorRadioButtonList from "./ColorRadioButtonList";
import type { Color, ConfigStatus, PartName } from "@/lib/types";

type ConfigFormProps = {
  configStatus: ConfigStatus;
  onColorChange: (part: PartName, color: Color) => void;
};

const ConfigForm = ({ configStatus, onColorChange }: ConfigFormProps) => {
  const [activePart, setActivePart] = useState<PartName>("body");
  const active = configStatus[activePart];

  return (
    <>
      <NavItemList
        configStatus={configStatus}
        activePart={activePart}
        onSelect={setActivePart}
      />
      {active && (
        <ColorRadioButtonList
          part={active}
          onChange={(color) => onColorChange(activePart, color)}
        />
      )}
    </>
  );
};

export default ConfigForm;
