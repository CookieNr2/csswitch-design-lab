import "./nav-item.css";
import ColorRadioButtonList from "../color-radio-button-list/ColorRadioButtonList";

function NavItem({ activeTab, tabId, label, onClick }) {
  return (
    <li className="nav-item my-2">
      <a
        type="button"
        className={`nav-link ${activeTab === tabId ? "active" : ""}`}
        onClick={() => onClick(tabId)}
      >
        {label}
      </a>
    </li>
  );
}

export default NavItem;
