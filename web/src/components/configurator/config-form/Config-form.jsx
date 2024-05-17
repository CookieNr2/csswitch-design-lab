import "./config-form.css";
import { useState } from "react";
import NavItemList from "./nav-item-list/NavItemList";
import ColorRadioButtonList from "./color-radio-button-list/ColorRadioButtonList";

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
        tab={configStatus[activeTab]}
        onChange={handleColorChange}
      />
    </>
  );
}

export default ConfigForm;
