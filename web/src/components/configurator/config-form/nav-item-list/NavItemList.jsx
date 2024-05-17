import NavItem from "../nav-item/NavItem";

function NavItemList({ navItems, activeTab, onTabChange }) {
  return (
    <ul className="nav flex-column nav-pills text-center">
      {Object.entries(navItems).map((item) => {
        return (
          <NavItem
            key={item[0]}
            activeTab={activeTab}
            tabId={item[0]}
            label={item[1].displayName}
            onClick={onTabChange}
          />
        );
      })}
    </ul>
  );
}

export default NavItemList;
