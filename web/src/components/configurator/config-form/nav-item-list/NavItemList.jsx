import NavItem from "../nav-item/NavItem";

function NavItemList({ navItems, activeTab, onTabChange }) {
  return (
    <ul className="nav flex-column nav-pills text-center">
      {navItems.map((item) => (
        <NavItem
          key={item.tabId}
          activeTab={activeTab}
          tabId={item.tabId}
          label={item.label}
          onClick={onTabChange}
        />
      ))}
    </ul>
  );
}

export default NavItemList;
