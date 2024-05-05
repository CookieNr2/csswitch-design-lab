import "./config-form.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import NavItemList from "./nav-item-list/NavItemList";
import ColorRadioButtonList from "./color-radio-button-list/ColorRadioButtonList";

const colorOptions = [
  { className: "orange", value: "orange" },
  { className: "amber", value: "amber" },
  { className: "lime", value: "lime" },
  { className: "teal", value: "teal" },
  { className: "blue", value: "blue" },
  { className: "indigo", value: "indigo" },
];

function ConfigForm({ configStatus, setConfigStatus }) {
  const [activeTab, setActiveTab] = useState("body");

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleColorChange = (color) => {
    const newNav = { ...configStatus };
    newNav[activeTab] = { ...configStatus[activeTab], color };
    setConfigStatus(newNav);
  };

  return (
    <>
      <NavItemList
        navItems={configStatus}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      <ColorRadioButtonList
        colorOptions={colorOptions}
        tab={configStatus[activeTab]}
        onChange={handleColorChange}
      />
    </>
  );
}

export default ConfigForm;
