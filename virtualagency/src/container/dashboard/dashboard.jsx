// import React, { Component } from "react";
// import { Box, Grid, Button, Typography, Container, Paper } from "@mui/material";
// import "./dashboard.css";
// import { Person, Language, Logout } from "@mui/icons-material";
// import logo from "../../utils/assets/Navbar/logo.png";
// import DescriptionIcon from "@mui/icons-material/Description";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import MenuBookIcon from "@mui/icons-material/MenuBook";
// import BarChartIcon from "@mui/icons-material/BarChart";
// import { AppNavigation } from "../../navigations/appNavigation";
// import { labelRoutes } from "../../navigations/labelRoutes";

// class Dashboard extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       apps: [
//         { title: "ENQUIRIES", color: "#e30613", icon: DescriptionIcon },
//         { title: "EBIDDING", color: "#9ca3af", icon: AccessTimeIcon },
//         { title: "ECATALOGUE", color: "#c4c4c4", icon: MenuBookIcon },
//         { title: "REPORTS", color: "#000000", icon: BarChartIcon },
//       ],
//     };
//   }

//   render() {
//     return (
//       <>
//         <Box sx={{ px: 3, py: 3 }}>
//           <div className="home-container">
//             <div className="logo-section">
//               <h3>WELCOME TO VIRTUAL AGENCY</h3>
//               <h2>Agency Portal</h2>
//               <p>To begin, please choose an application</p>
//             </div>
//             <div className="card-container">
//               {this.state.apps.map((app, index) => (
//                 <div
//                   className="card"
//                   key={index}
//                   onClick={() => {
//                     if (index === 0) {
//                       this.props.navigate(labelRoutes.eqDashboard);
//                     }
//                   }}
//                   style={{ cursor: "pointer" }}
//                 >
//                   <div
//                     className="card-top"
//                     style={{ backgroundColor: app.color }}
//                   >
//                     <app.icon sx={{ fontSize: 60, color: "#ffffff" }} />
//                   </div>

//                   <div className="card-bottom">{app.title}</div>
//                 </div>
//               ))}
//             </div>
//           </div>

//         </Box>
//       </>
//     );
//   }
// }
// export default AppNavigation(Dashboard);

import React from "react";
import {
  Box, Grid, Typography, Paper, Container,
  Avatar, Card, CardContent, Divider
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DescriptionIcon from "@mui/icons-material/Description";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import BarChartIcon from "@mui/icons-material/BarChart";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { labelRoutes } from "../../navigations/labelRoutes";
import PGrid from "../../component/PGrid/PGrid";
import { Labels } from "../../utils/constants/labels";
import PDashboardCard from "../../component/PDashboardCard/PDashboardCard";
import PTypography from "../../component/PTypography/PTypography";
import { FontWeight } from "../../utils/constants/fonts";

const Dashboard = () => {
  const navigate = useNavigate();

  // const apps = [
  //   {
  //     title: "ENQUIRIES",
  //     color: "#6366f1", // Soft Indigo from your screenshot
  //     icon: <DescriptionIcon />,
  //     route: labelRoutes.eqDashboard
  //   },
  //   {
  //     title: "EBIDDING",
  //     color: "#8b5cf6", // Purple tone
  //     icon: <AccessTimeIcon />,
  //     route: null
  //   },
  //   {
  //     title: "ECATALOGUE",
  //     color: "#6366f1",
  //     icon: <MenuBookIcon />,
  //     route: null
  //   },
  //   {
  //     title: "REPORTS",
  //     color: "#4f46e5",
  //     icon: <BarChartIcon />,
  //     route: null
  //   },
  // ];

  const apps = [
    {
      title: "ENQUIRIES",
      icon: <DescriptionIcon />,
      iconBg: "#6366f1",
      route: labelRoutes.eqDashboard,
      showNavIcon: true // override default
    },
    {
      title: "EBIDDING",
      icon: <AccessTimeIcon />,
      iconBg: "#8b5cf6",
      route: null
    },
    {
      title: "ECATALOGUE",
      icon: <MenuBookIcon />,
      iconBg: "#6366f1",
      route: null
    },
    {
      title: "REPORTS",
      icon: <BarChartIcon />,
      iconBg: "#4f46e5",
      route: null
    }
  ];

  // Default props to pass to PDashboardCard
  const defaultCardProps = {
    showNavIcon: false,
    iconBoxSize: 100,
    iconSize: 100,
    titleSize: 20
  };
  return (
    <>
      
        <Container>
          <PGrid container className="text-center mt-5">
            {/* Header */}
            <PGrid item className="mb-3">
              <PTypography
                labelText={Labels.dashboard.welcomeToVirtualAgency}
                font={FontWeight.upnormal}
                flag={Labels.fontFlags.header}
              />
            </PGrid>
            {/* <PGrid item className="mb-3">
              <PTypography
                labelText={Labels.dashboard.agencyPortal}
                font={FontWeight.bold}
                flag={Labels.fontFlags.subHeader}
              />
            </PGrid> */}

            {/* Subheader */}
            {/* <PGrid item className="mb-3">
              <PTypography
                labelText={Labels.dashboard.toBeginPleaseChooseAnApplication}
                flag={Labels.fontFlags.errorLbl}
                font={FontWeight.medium}
              />
            </PGrid> */}
          </PGrid>
          <br/><br/><br/>
          <PGrid container className= {`${Labels.margin.mt4}${Labels.margin.mb4}`}>
            {apps.map((app, index) => (
              <PGrid
                key={index}
                item
                xs={12}  
                sm={3}  
                md={3}  
                lg={3}   
                className="mb-3" 
              >
                <PDashboardCard key={index} {...defaultCardProps} {...app} />
              </PGrid>
            ))}
          </PGrid>
        </Container>
        <br/><br/><br/><br/>
        
    </>
    

  );
};

export default Dashboard;