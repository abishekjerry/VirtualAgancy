import {
  FaHome,
  FaBuilding
} from "react-icons/fa";
import React, { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import "../../App.css";
import Logo from '../../utils/assets/Navbar/Logo.svg'
import PTypography from "../../component/PTypography/PTypography";
import FooterLogo from "../../utils/assets/images/FooterLogo.png";
import { Labels } from "../../utils/constants/labels";
import { CommonColors } from "../../utils/constants/colors";
import PNavbar from "../../component/PNavbar/PNavbar";
import PSidebar from "../../component/PSidebar/PSidebar";
import { labelRoutes } from "../../navigations/labelRoutes";
import { FontWeight } from "../../utils/constants/fonts";
import { useLocation } from "react-router-dom";
function PageLayout() {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);
  const [isDashborad, setIsDashborad] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

   const menuItems = [
    {
      icon: <FaHome size={20} />,
      name: "Dashboard",
      route: labelRoutes.dashboard,
    },
    {
      icon: <FaBuilding size={20} />,
      name: "Enquiries",
      route: labelRoutes.eqDashboard,
      children: [
        {
          name: "Create Enquiry",
          route: "/enquiry/new"
        },
        {
          name: "Report",
          route: "/enquiry/list"
        }
      ]
    }
  ];

  const location = useLocation();

  const findTitle = (items, pathname) => {
    for (let item of items) {
      if (item.route === pathname) return item.name;

      if (item.children) {
        for (let child of item.children) {
          if (child.route === pathname) return child.name;
        }
      }
    }
    return "";
  };

  const title = findTitle(menuItems, location.pathname);
 
  const user = {
    name: "demouser.sg",
    avatar: "",
    email: "",
  };

  return (
    <div className="app-container">

      <PNavbar
        name={user.name}
        email={user.email}
        avatar={user.avatar}
        title ={title}
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className="body-layout">

        <PSidebar
          sidebarOpen={sidebarOpen}
          menuItems={menuItems}
          navigate={navigate}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          setIsDashborad={setIsDashborad}
          Logo={Logo}
        />

        <div className="main-content">
          <div className="page-content">
            <Outlet />
          </div>

          <div className="footer">
              <img
              src={FooterLogo}
              alt={Labels.footerLogo}
              className="footer-logo"
            />
            <br/>
            <PTypography
              labelText={`© ${new Date().getFullYear()} ${Labels.footer.footer}`}
              flag={Labels.fontFlags.smallText}
              font={FontWeight.bold}
            />   
          </div>
        </div>

      </div>

    </div>
  );
}

export default PageLayout;