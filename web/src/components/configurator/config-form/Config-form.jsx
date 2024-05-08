import "./config-form.css";
import { useState } from "react";
import NavItemList from "./nav-item-list/NavItemList";
import ColorRadioButtonList from "./color-radio-button-list/ColorRadioButtonList";

const colorOptions = [
  { className: "black", value: "black", color: "#353535" },
  { className: "purple", value: "purple", color: "#815790" },
  { className: "orange", value: "orange", color: "#f6bd60" },
  { className: "sunset-rose", value: "Sunset Rose", color: "#d65d9d" },
  { className: "lime", value: "lime", color: "#31572c" },
  { className: "teal", value: "teal", color: "#009688" },
  { className: "blue", value: "blue", color: "#1d3557" },
  { className: "indigo", value: "indigo", color: "#3f51b5" },
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
