import "./nav-item.css";

function NavItem({ activeTab, tabId, label, onClick }) {
  const partImage = {
    body: "/configurator/icons/body.svg",
    joyControllerLeft: "/configurator/icons/joycon-left.svg",
    joyControllerRight: "/configurator/icons/joycon-right.svg",
    thumbSticks: "/configurator/icons/thumb-sticks.svg",
    abxy: "/configurator/icons/abxy.svg",
    dpad: "/configurator/icons/dpad.svg",
    utils: "/configurator/icons/utils.svg",
  };
  return (
    <li className="nav-item my-2">
      <a
        type="button"
        className={`nav-link ${activeTab === tabId ? "active" : ""}`}
        onClick={() => onClick(tabId)}
      >
        <img src={partImage[tabId]} alt={label} />
      </a>
    </li>
  );
}

export default NavItem;
