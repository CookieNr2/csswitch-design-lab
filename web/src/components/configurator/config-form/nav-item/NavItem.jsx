function NavItem({ activeTab, tabId, label, onClick }) {
  return (
    <li className="nav-item">
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
