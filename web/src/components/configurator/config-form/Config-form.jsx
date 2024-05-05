import "./config-form.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import NavItemList from "./nav-item-list/NavItemList";
import ColorRadioButtonList from "./color-radio-button-list/ColorRadioButtonList";

function ConfigForm({ onCreate }) {
  const [activeTab, setActiveTab] = useState("body");
  const [selectedColor, setSelectedColor] = useState(null);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const colorOptions = [
    { className: "orange", value: "orange" },
    { className: "amber", value: "amber" },
    { className: "lime", value: "lime" },
    { className: "teal", value: "teal" },
    { className: "blue", value: "blue" },
    { className: "indigo", value: "indigo" },
  ];

  const navItems = [
    { tabId: "body", label: "Body" },
    { tabId: "joyControllerLeft", label: "Joy Controller Left" },
    { tabId: "joyControllerRight", label: "Joy Controller Right" },
    { tabId: "thumbSticks", label: "Thumb Sticks" },
    { tabId: "abxy", label: "ABXY" },
    { tabId: "dpad", label: "DPAD" },
    { tabId: "utils", label: "Utils" },
  ];

  return (
    <>
      <NavItemList
        navItems={navItems}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      <ColorRadioButtonList
        colorOptions={colorOptions}
        tabName={activeTab}
        onChange={handleColorChange}
      />
    </>
  );
}

export default ConfigForm;
