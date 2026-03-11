import React from "react";
import { useLocation } from "react-router-dom";

function PSidebar({
  sidebarOpen,
  menuItems,
  navigate,
  openMenu,
  setOpenMenu,
  setIsDashborad,
  Logo
}) {
  const location = useLocation();

  return (
    <div className={`sidebar ${sidebarOpen ? "" : "collapsed"}`}>
      {/* Header */}
      {/* <div className="sidebar-header">
        {sidebarOpen && (
          <img src={Logo} alt="Logo" style={{ height: 35 }} />
        )}
      </div> */}

      {/* Menu */}
      <nav className="sidebar-nav">
        <div className="menu-section">
          {menuItems.map((item) => (
            <div key={item.name}>
              
              {/* Main Menu */}
              <div
                className={`nav-item ${
                  location.pathname === item.route ? "active" : ""
                }`}
                onClick={() => {
                //   if (item.children) {
                //     setOpenMenu(openMenu === item.name ? null : item.name);
                //   } else {
                    navigate(item.route);
                    setIsDashborad(item.name === "Dashboard");
                  //}
                }}
              >
                {item.icon}
                {sidebarOpen && <span>{item.name}</span>}
              </div>

              {/* Submenu */}
              {item.children && openMenu === item.name && (
                <div className="submenu">
                  {item.children.map((sub) => (
                    <div
                      key={sub.name}
                      className="submenu-item"
                      onClick={() => navigate(sub.route)}
                    >
                      {sidebarOpen && sub.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default PSidebar;