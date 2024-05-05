import "./config-form.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import NavItemList from "./nav-item-list/NavItemList";
import ColorRadioButtonList from "./color-radio-button-list/ColorRadioButtonList";

function ConfigForm({ onCreate }) {
  const [activeTab, setActiveTab] = useState(
    process.env.REACT_APP_TAB_BODY
  );
  const [selectedColor, setSelectedColor] = useState(null);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const colorOptions = [
    {
      className: process.env.REACT_APP_COLOR_ORANGE,
      value: process.env.REACT_APP_COLOR_ORANGE,
    },
    {
      className: process.env.REACT_APP_COLOR_AMBER,
      value: process.env.REACT_APP_COLOR_AMBER,
    },
    {
      className: process.env.REACT_APP_COLOR_LIME,
      value: process.env.REACT_APP_COLOR_LIME,
    },
  ];

  const navItems = [
    {
      tabId: process.env.REACT_APP_TAB_VARIABLE,
      label: process.env.REACT_APP_TAB_VARIABLE,
    },
    {
      tabId: process.env.REACT_APP_TAB_JOY_CONTROLLER_LEFT,
      label: process.env.REACT_APP_TAB_JOY_CONTROLLER_LEFT,
    },
    {
      tabId: process.env.REACT_APP_TAB_JOY_CONTROLLER_RIGHT,
      label: process.env.REACT_APP_TAB_JOY_CONTROLLER_RIGHT,
    },
    {
      tabId: process.env.REACT_APP_TAB_THUMB_STICKS,
      label: process.env.REACT_APP_TAB_THUMB_STICKS,
    },
    {
      tabId: process.env.REACT_APP_TAB_ABXY,
      label: process.env.REACT_APP_TAB_ABXY,
    },
    {
      tabId: process.env.REACT_APP_TAB_DPAD,
      label: process.env.REACT_APP_TAB_DPAD,
    },
    {
      tabId: process.env.REACT_APP_TAB_UTILS,
      label: process.env.REACT_APP_TAB_UTILS,
    },
  ];

  return (
    <div className="col-sm-6 col-12 mh-100 selection-section">
      <NavItemList
        navItems={navItems}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      <ColorRadioButtonList
        colorOptions={colorOptions}
        onChange={handleColorChange}
      />
    </div>
  );
}

export default ConfigForm;
